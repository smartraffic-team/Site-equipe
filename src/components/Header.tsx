import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/syncro-logo.svg';
import { scrollToSection } from './siteData';

// Cor de destaque e ritmo das animações (ajuste aqui)
const ACCENT = '#f7931e';
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const DURATION = '300ms';

type NavItemProps = {
  onClick: () => void;
  children: ReactNode;
};

// Link de texto da navbar: sobe 1px e mostra um sublinhado laranja com fade
function NavLink({ onClick, children }: NavItemProps) {
  const [active, setActive] = useState(false);

  const style: CSSProperties = {
    fontWeight: 600,
    transform: active ? 'translateY(-1px)' : 'translateY(0)',
    textDecorationLine: 'underline',
    textDecorationThickness: '2px',
    textUnderlineOffset: '0.45rem',
    textDecorationColor: active ? ACCENT : 'transparent',
    transition: `transform ${DURATION} ${EASE}, text-decoration-color ${DURATION} ${EASE}`,
  };

  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {children}
    </button>
  );
}

// Botão "Projeto": sobe, ganha mais brilho na sombra e clareia levemente
function NavCta({ onClick, children }: NavItemProps) {
  const [active, setActive] = useState(false);

  const style: CSSProperties = {
    fontWeight: 600,
    transform: active ? 'translateY(-2px)' : 'translateY(0)',
    filter: active ? 'brightness(1.06)' : 'brightness(1)',
    // Sem sombra inline em repouso: volta para a sombra definida no CSS
    ...(active ? { boxShadow: '0 10px 24px rgba(247, 147, 30, 0.45)' } : {}),
    transition: `transform ${DURATION} ${EASE}, box-shadow ${DURATION} ${EASE}, filter ${DURATION} ${EASE}`,
  };

  return (
    <button
      className="nav-cta"
      onClick={onClick}
      style={style}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {children}
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [brandHover, setBrandHover] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  const brandStyle: CSSProperties = {
    transform: brandHover ? 'scale(1.03)' : 'scale(1)',
    transition: `transform ${DURATION} ${EASE}`,
  };

  const toggleStyle: CSSProperties = {
    transform: toggleHover ? 'scale(1.08)' : 'scale(1)',
    transition: `transform ${DURATION} ${EASE}`,
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <button
          className="brand-button"
          onClick={() => navigate('home')}
          aria-label="Voltar ao início"
          style={brandStyle}
          onMouseEnter={() => setBrandHover(true)}
          onMouseLeave={() => setBrandHover(false)}
        >
          <img src={logo} alt="Syncro" />
        </button>

        <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">
          <NavLink onClick={() => navigate('quem-somos')}>Quem somos?</NavLink>
          <NavLink onClick={() => navigate('equipe')}>Equipe</NavLink>
          <NavLink onClick={() => navigate('tecnologias')}>Tecnologias</NavLink>
          <NavCta onClick={() => navigate('projeto')}>Projeto</NavCta>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          style={toggleStyle}
          onMouseEnter={() => setToggleHover(true)}
          onMouseLeave={() => setToggleHover(false)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}