import { useEffect, useState, type CSSProperties } from 'react';
import { Instagram } from 'lucide-react';
import { members, type Member } from './siteData';
import logo from '../assets/syncro-logo-branca.svg';

// Ordem de exibição (esquerda para direita)
const DISPLAY_ORDER = [
  'Marcelo',
  'Cristhian',
  'Paulo Seiji',
  'Joao Paulo',
  'Bruno De Lucca',
];

// Altura da logo "Syncro" abaixo do título (ajuste aqui se quiser maior/menor)
const LOGO_HEIGHT = '3rem';

// Curva e duração das animações de hover (aumente a duração para ficar ainda mais suave)
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const CARD_DURATION = '500ms';
const BUTTON_DURATION = '450ms';

function orderIndex(name: string) {
  const index = DISPLAY_ORDER.indexOf(name);
  return index === -1 ? DISPLAY_ORDER.length : index;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

// Retorna true quando a tela é larga o bastante para os 5 cards ficarem em uma linha
function useIsWide(minWidth = 900) {
  const query = `(min-width: ${minWidth}px)`;
  const [isWide, setIsWide] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : true,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setIsWide(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return isWide;
}

const styles: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
  },
  pattern: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  // Logo em linha própria, abaixo do texto e centralizada
  titleLogo: {
    display: 'block',
    height: LOGO_HEIGHT,
    width: 'auto',
    maxWidth: '100%',
    margin: '0.75rem auto 0',
  },
  // Área da foto: altura reservada para a foto mais alta;
  // todas as fotos ficam coladas na base, então os retângulos coloridos se alinham.
  photoBox: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    aspectRatio: '68 / 100',
  },
  photo: {
    display: 'block',
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
  },
  placeholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    aspectRatio: '4 / 5',
    borderRadius: '1.5rem',
    background: 'linear-gradient(135deg, #fb923c, #ea580c)',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '3.5rem',
    fontWeight: 700,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.25rem',
    padding: '1rem 0.25rem 0',
  },
  name: {
    margin: 0,
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#ffffff',
  },
  role: {
    margin: 0,
    fontSize: '0.75rem',
    lineHeight: 1.4,
    minHeight: '2.1rem', // reserva 2 linhas para os botões ficarem alinhados
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#fb923c',
  },
  // Camada com o degradê do botão: o fade é feito pela opacidade
  buttonGradient: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    background: 'linear-gradient(90deg, #fb923c, #ec4899)',
    pointerEvents: 'none',
  },
  buttonLabel: {
    position: 'relative',
    zIndex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};

function MemberCard({ member, isWide }: { member: Member; isWide: boolean }) {
  const [cardHover, setCardHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const cardStyle: CSSProperties = {
    // Telas largas: os 5 cards dividem a linha igualmente (mesmo tamanho)
    // Telas estreitas: largura fixa e quebra de linha
    flex: isWide ? '1 1 0' : '0 1 15rem',
    minWidth: 0,
    maxWidth: '15rem',
    transform: cardHover ? 'scale(1.05)' : 'scale(1)',
    // A sombra inicial é transparente (mesma função) para a transição interpolar suavemente
    filter: cardHover
      ? 'drop-shadow(0 20px 25px rgba(0,0,0,0.45))'
      : 'drop-shadow(0 0 0 rgba(0,0,0,0))',
    transition: `transform ${CARD_DURATION} ${EASE}, filter ${CARD_DURATION} ${EASE}`,
    willChange: 'transform, filter',
  };

  const buttonStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: btnHover ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.35)',
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: 500,
    textDecoration: 'none',
    transform: btnHover ? 'translateY(-1px)' : 'translateY(0)',
    transition: `border-color ${BUTTON_DURATION} ${EASE}, transform ${BUTTON_DURATION} ${EASE}`,
  };

  const gradientStyle: CSSProperties = {
    ...styles.buttonGradient,
    opacity: btnHover ? 1 : 0,
    transition: `opacity ${BUTTON_DURATION} ${EASE}`,
  };

  return (
    <article
      style={cardStyle}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      <div style={styles.photoBox}>
        {member.image ? (
          <img
            src={member.image}
            alt={`Foto de ${member.name}`}
            style={styles.photo}
          />
        ) : (
          <div style={styles.placeholder} aria-hidden="true">
            {getInitials(member.name)}
          </div>
        )}
      </div>

      <div style={styles.info}>
        <h3 style={styles.name}>{member.name}</h3>
        <p style={styles.role}>{member.role}</p>

        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram de ${member.name}`}
          style={buttonStyle}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          onFocus={() => setBtnHover(true)}
          onBlur={() => setBtnHover(false)}
        >
          <span style={gradientStyle} aria-hidden="true" />
          <span style={styles.buttonLabel}>
            <Instagram size={16} />
            Instagram
          </span>
        </a>
      </div>
    </article>
  );
}

export default function Team() {
  const isWide = useIsWide(900);

  const orderedMembers = [...members].sort(
    (a, b) => orderIndex(a.name) - orderIndex(b.name),
  );

  const gridStyle: CSSProperties = {
    display: 'flex',
    flexWrap: isWide ? 'nowrap' : 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: isWide ? '2.5rem' : '3rem 2.5rem',
    maxWidth: '84rem',
    margin: '2rem auto 0',
    padding: '0 1rem',
  };

  return (
    <section className="section team" id="equipe" style={styles.section}>
      {/* Padrão de fundo: atrás de tudo e sem capturar cliques */}
      <div className="team-pattern" style={styles.pattern} />

      <div className="container" style={styles.content}>
        <div className="section-heading centered">
          <div className="section-kicker orange">Nossa equipe</div>
          <h2>
            Conheça as mentes por trás da
            <img
              src={logo}
              alt="Syncro"
              className="team-title-logo"
              style={styles.titleLogo}
            />
          </h2>
        </div>

        <div style={gridStyle}>
          {orderedMembers.map((member) => (
            <MemberCard key={member.name} member={member} isWide={isWide} />
          ))}
        </div>
      </div>
    </section>
  );
}