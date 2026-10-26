import { useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { technologies, type Technology } from './siteData';

type Palette = {
  gradient: string;
  glow: string;
};

const ORANGE: Palette = {
  gradient: 'linear-gradient(135deg, #ffa733 0%, #f7931e 50%, #e67e00 100%)',
  glow: 'rgba(247, 147, 30, 0.5)',
};

const BLUE: Palette = {
  gradient: 'linear-gradient(135deg, #3aa0ff 0%, #1583f0 50%, #0b63c8 100%)',
  glow: 'rgba(21, 131, 240, 0.5)',
};

// 1º e 3º card laranja, 2º e 4º card azul
const PALETTES: Palette[] = [ORANGE, BLUE];

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const MAX_TILT = 8; // graus de inclinação máxima no hover

function TechCard({ tech, palette }: { tech: Technology; palette: Palette }) {
  const { icon: Icon, name, description } = tech;
  const cardRef = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    setPointer({ x: px * 100, y: py * 100 });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      setTilt({
        x: (0.5 - py) * 2 * MAX_TILT,
        y: (px - 0.5) * 2 * MAX_TILT,
      });
    }
  };

  const handleLeave = () => {
    setHover(false);
    setTilt({ x: 0, y: 0 });
  };

  const cardStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem 1.5rem',
    borderRadius: '1.5rem',
    textAlign: 'left',
    color: '#ffffff',
    background: palette.gradient,
    boxShadow: hover
      ? `0 24px 48px -12px ${palette.glow}`
      : '0 8px 20px -10px rgba(15, 23, 42, 0.25)',
    transform: hover
      ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.03)`
      : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
    // Rápido enquanto o mouse se move (segue o cursor); lento ao sair (volta suave)
    transition: hover
      ? `transform 150ms ease-out, box-shadow 400ms ${EASE}`
      : `transform 600ms ${EASE}, box-shadow 600ms ${EASE}`,
    willChange: 'transform',
  };

  const spotlightStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: `radial-gradient(circle 180px at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.35), rgba(255,255,255,0) 70%)`,
    opacity: hover ? 1 : 0,
    transition: `opacity 400ms ${EASE}`,
  };

  const orbStyle: CSSProperties = {
    position: 'absolute',
    top: '-2.5rem',
    right: '-2.5rem',
    width: '9rem',
    height: '9rem',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.14)',
    pointerEvents: 'none',
    transform: hover ? 'scale(1.7)' : 'scale(1)',
    transition: `transform 700ms ${EASE}`,
  };

  const iconStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3.5rem',
    height: '3.5rem',
    marginBottom: '1.25rem',
    borderRadius: '1rem',
    background: 'rgba(255, 255, 255, 0.22)',
    color: '#ffffff',
    transform: hover ? 'scale(1.12) rotate(-6deg)' : 'scale(1) rotate(0deg)',
    transition: `transform 400ms ${EASE}`,
  };

  const barStyle: CSSProperties = {
    width: hover ? '4rem' : '1.75rem',
    height: '3px',
    marginTop: '1.25rem',
    borderRadius: '9999px',
    background: 'rgba(255, 255, 255, 0.85)',
    transition: `width 500ms ${EASE}`,
  };

  return (
    <article
      ref={cardRef}
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div style={orbStyle} aria-hidden="true" />
      <div style={spotlightStyle} aria-hidden="true" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={iconStyle}>
          <Icon size={28} />
        </div>
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
          {name}
        </h3>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.92)' }}>
          {description}
        </p>
        <div style={barStyle} />
      </div>
    </article>
  );
}

export default function Technologies() {
  return (
    <section className="section technologies" id="tecnologias">
      <div className="container">
        <div className="section-heading centered">
          <div className="section-kicker blue">Nosso arsenal</div>
          <h2>Tecnologias que dominamos</h2>
        </div>
        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} palette={PALETTES[index % PALETTES.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}