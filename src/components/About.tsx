import type { CSSProperties } from 'react';
import videoSyncro from '../assets/video-about.mp4';

const videoWrapperStyle: CSSProperties = {
  alignSelf: 'center',
  width: '130%',
  overflow: 'hidden',
  borderRadius: '1.5rem',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
};

const videoStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  height: 'auto',
};

export default function About() {
  return (
    <section className="section about" id="quem-somos">
      <div className="container about-grid">
        <div className="about-copy">
          <div className="section-kicker orange">Quem somos nós?</div>
          <h2>Movidos pela curiosidade,<br /><span>guiados por dados.</span></h2>
          <p>Olá! Somos a <strong>Syncro</strong>, um grupo de estudantes e desenvolvedores apaixonados por tecnologia, originários da Faculdade de Tecnologia de Registro (Fatec).</p>
          <p>Nossa especialização abrange desde o desenvolvimento de sistemas até a aplicação de Inteligência Artificial e Visão Computacional. Acreditamos que a colaboração, o pensamento crítico e a inovação contínua são as chaves para resolver os desafios da sociedade moderna.</p>
        </div>

        <div style={videoWrapperStyle}>
          <video
            src={videoSyncro}
            style={videoStyle}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Vídeo institucional da Syncro"
          />
        </div>
      </div>
    </section>
  );
}