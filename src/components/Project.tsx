import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, Globe2 } from 'lucide-react';
import imgCamera from '../assets/camera.png';

// Link do botão "Detalhes do projeto"
const PROJECT_URL = 'https://smart-traffic-pi.vercel.app/';

// Ajuste manual extra (opcional): empurra a imagem mais para baixo.
// Use só se ainda sobrar espaço, por exemplo '24px'.
const EXTRA_NUDGE = '0px';

// Moldura animada (ajuste aqui)
const RING_THICKNESS = 3; // espessura da linha, em px
const SPIN_DURATION = '6s'; // tempo de uma volta completa
const GLOW_BLUR = '22px';
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

// Dois "cometas" (laranja e azul) em lados opostos: cauda suave e cabeça marcada
const COMET_GRADIENT = `conic-gradient(
  from 0deg,
  rgba(247, 147, 30, 0) 0deg,
  rgba(247, 147, 30, 0) 20deg,
  #f7931e 86deg,
  rgba(247, 147, 30, 0) 96deg,
  rgba(21, 131, 240, 0) 180deg,
  rgba(21, 131, 240, 0) 200deg,
  #1583f0 266deg,
  rgba(21, 131, 240, 0) 276deg,
  rgba(21, 131, 240, 0) 360deg
)`;

// Keyframes e preferência de movimento reduzido (não dá para usar inline)
const ANIMATION_CSS = `
@keyframes project-frame-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .project-frame-spinner { animation: none !important; }
}
`;

// Mede a fração transparente no rodapé do PNG (0 a 1)
function useBottomTransparency(src: string) {
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Procura, de baixo para cima, a primeira linha com pixels visíveis
      let lastRow = -1;
      for (let y = canvas.height - 1; y >= 0 && lastRow === -1; y--) {
        for (let x = 0; x < canvas.width; x++) {
          if (data[(y * canvas.width + x) * 4 + 3] > 16) {
            lastRow = y;
            break;
          }
        }
      }

      if (lastRow >= 0) {
        setRatio((canvas.height - 1 - lastRow) / canvas.height);
      }
    };
    img.src = src;
  }, [src]);

  return ratio;
}

// Marca como visível na primeira vez que o elemento entra na tela
function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Project() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardPaddingBottom, setCardPaddingBottom] = useState(0);
  const [cardRadius, setCardRadius] = useState(32);
  const [frameHover, setFrameHover] = useState(false);
  const transparentRatio = useBottomTransparency(imgCamera);
  const { ref: frameRef, inView } = useInView<HTMLDivElement>(0.2);

  // Lê o padding-bottom e o raio da borda reais do card
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const read = () => {
      const computed = getComputedStyle(card);
      setCardPaddingBottom(parseFloat(computed.paddingBottom) || 0);
      setCardRadius(parseFloat(computed.borderTopLeftRadius) || 32);
    };

    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, []);

  const frameRadius = cardRadius + RING_THICKNESS;

  // Moldura: aparece com fade/subida ao entrar na tela
  const frameStyle: CSSProperties = {
    position: 'relative',
    isolation: 'isolate',
    padding: RING_THICKNESS,
    borderRadius: frameRadius,
    background: 'rgba(15, 23, 42, 0.06)', // linha fina estática sob os cometas
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
  };

  const clipBase: CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    overflow: 'hidden',
    borderRadius: frameRadius,
    pointerEvents: 'none',
    transform: 'translateZ(0)', // evita falha de recorte arredondado no Safari
  };

  // Linha nítida com os cometas
  const ringStyle: CSSProperties = { ...clipBase };

  // Mesma animação, desfocada: vaza para fora da moldura como brilho
  const glowStyle: CSSProperties = {
    ...clipBase,
    filter: `blur(${GLOW_BLUR})`,
    opacity: frameHover ? 0.75 : 0.4,
    transition: `opacity 500ms ${EASE}`,
  };

  // Quadrado enorme girando atrás do card; só a faixa da borda fica visível
  const spinnerStyle: CSSProperties = {
    position: 'absolute',
    inset: '-150%',
    background: COMET_GRADIENT,
    animation: `project-frame-spin ${SPIN_DURATION} linear infinite`,
  };

  // O card fica acima da animação e cobre tudo, exceto a borda de RING_THICKNESS
  const cardLayerStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
  };

  // Coluna da imagem: ocupa toda a altura do card e ancora a imagem na base
  const imageWrapperStyle: CSSProperties = {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 0,
    margin: 0,
    marginBottom: -cardPaddingBottom, // cancela o padding inferior do card
    padding: 0,
    lineHeight: 0, // evita a faixa extra que aparece abaixo de imagens inline
  };

  const imageStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
    margin: 0,
    objectFit: 'contain',
    objectPosition: 'center bottom',
    // Desce a parte transparente do PNG para o pedestal encostar na borda
    transform: `translateY(calc(${transparentRatio * 100}% + ${EXTRA_NUDGE}))`,
  };

  // Um <a> não tem o reset de um <button>: tira o sublinhado padrão do link
  const linkButtonStyle: CSSProperties = {
    textDecoration: 'none',
  };

  return (
    <section className="section project" id="projeto">
      <style>{ANIMATION_CSS}</style>

      <div className="container">
        <div
          ref={frameRef}
          style={frameStyle}
          onMouseEnter={() => setFrameHover(true)}
          onMouseLeave={() => setFrameHover(false)}
        >
          <div style={glowStyle} aria-hidden="true">
            <div className="project-frame-spinner" style={spinnerStyle} />
          </div>
          <div style={ringStyle} aria-hidden="true">
            <div className="project-frame-spinner" style={spinnerStyle} />
          </div>

          <div className="project-card" ref={cardRef} style={cardLayerStyle}>
            <div className="project-accent" />
            <div style={imageWrapperStyle}>
              <img
                src={imgCamera}
                alt="Câmera do projeto SmarTraffic"
                style={imageStyle}
              />
            </div>
            <div className="project-copy">
              <div className="project-title"><Globe2 size={25} /><h2>Projeto em destaque</h2></div>
              <p>Nosso projeto atual, o <strong>SmarTraffic</strong>, propõe um sistema inteligente para cruzamentos urbanos orientado por visão computacional.</p>
              <p>Diferente dos semáforos tradicionais com temporizadores fixos, utilizamos câmeras e <em>Edge Computing</em> para detectar e contar veículos em tempo real. Os dados ajustam dinamicamente os tempos dos semáforos, reduzindo filas, tempo de espera e emissão de gases poluentes nas cidades.</p>
              <a
                className="button button-blue"
                href={PROJECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={linkButtonStyle}
              >
                Detalhes do projeto <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}