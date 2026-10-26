import type { CSSProperties } from 'react';
import videoSyncro from '../assets/video-syncro.mp4';

// Cor do fundo da seção seguinte (troque se não for branco puro)
const FADE_RGB = '255, 255, 255';

// Altura do degradê, como porcentagem da altura do vídeo
const FADE_HEIGHT = '40%';

const sectionStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  lineHeight: 0, // evita a pequena faixa que aparece abaixo de elementos inline
};

const videoStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  height: 'auto',
  border: 0,
  borderRadius: 0,
};

// Degradê de baixo para cima: branco sólido na base, transparente no topo
const fadeStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: -1, // sobrepõe 1px para não deixar linha de emenda
  height: FADE_HEIGHT,
  background: `linear-gradient(to top, rgb(${FADE_RGB}) 0%, rgba(${FADE_RGB}, 0) 100%)`,
  pointerEvents: 'none',
};

export default function Hero() {
  return (
    <section id="home" style={sectionStyle}>
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
      <div style={fadeStyle} aria-hidden="true" />
    </section>
  );
}