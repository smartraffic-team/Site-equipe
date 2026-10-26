import { Code2, Cpu, Database, Wifi, type LucideIcon } from 'lucide-react';

import imgCris from '../assets/cris.png';
import imgDelucca from '../assets/delucca.png';
import imgJp from '../assets/jp.png';
import imgMarcelo from '../assets/marcelo.png';
import imgPaulo from '../assets/paulo.png';

export type Member = {
  name: string;
  role: string;
  image: string;
  instagram: string;
  theme: 'blue' | 'orange' | 'navy' | 'light' | 'pale';
};

// Ordem de exibição (esquerda para direita)
export const members: Member[] = [
  {
    name: 'Marcelo',
    role: 'Desenvolvedor Frontend',
    image: imgMarcelo,
    instagram: 'https://www.instagram.com/sla_marcello/',
    theme: 'orange',
  },
  {
    name: 'Cristhian',
    role: 'Desenvolvedor Backend',
    image: imgCris,
    instagram: 'https://www.instagram.com/cris.hatz/',
    theme: 'orange',
  },
  {
    name: 'Paulo Seiji',
    role: 'Administrador de Database',
    image: imgPaulo,
    instagram: 'https://www.instagram.com/psyjunior1/',
    theme: 'blue',
  },
  {
    name: 'Joao Paulo',
    role: 'UX/UI Designer',
    image: imgJp,
    instagram: 'https://www.instagram.com/um_jotape/',
    theme: 'blue',
  },
  {
    name: 'Bruno De Lucca',
    role: 'Arquiteto de IOT',
    image: imgDelucca,
    instagram: 'https://www.instagram.com/bru_dlucca/',
    theme: 'blue',
  },
];

export type Technology = {
  icon: LucideIcon;
  name: string;
  description: string;
};

export const technologies: Technology[] = [
  { icon: Code2, name: 'React & Next.js', description: 'Interfaces modernas e SSR' },
  { icon: Wifi, name: 'IOT', description: 'Sensores e dispositivos conectados em tempo real' },
  { icon: Cpu, name: 'Edge Computing', description: 'Processamento local de baixa latência' },
  { icon: Database, name: 'Visão Computacional', description: 'YOLO e OpenCV em Python' },
];

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}