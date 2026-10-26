# Syncro | Site da Equipe

Site institucional da **Syncro**, um grupo de estudantes e desenvolvedores da Faculdade de Tecnologia de Registro (Fatec), apaixonados por tecnologia, Inteligência Artificial e Visão Computacional.

O site apresenta a equipe, as tecnologias que dominamos e o projeto em destaque, o **SmarTraffic**.

## Seções

| Seção | Descrição |
| --- | --- |
| **Hero** | Vídeo institucional em largura total, com degradê branco na base |
| **Quem somos** | Apresentação do grupo ao lado de um vídeo com as laterais esmaecidas |
| **Equipe** | Cards dos integrantes com foto, cargo e botão para o Instagram |
| **Tecnologias** | Cards animados com as tecnologias que dominamos |
| **Projeto** | Destaque do SmarTraffic, com moldura animada e link para o projeto |
| **Footer** | Rodapé do site |

## Tecnologias utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (ícones)

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm (já vem com o Node.js)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd site-Equipe-PII

# Instale as dependências
npm install
```

### Scripts disponíveis

```bash
npm run dev       # inicia o servidor de desenvolvimento
npm run build     # gera a versão de produção na pasta dist
npm run preview   # serve localmente a versão de produção
```

> Confira os scripts exatos no `package.json`, caso o projeto tenha sido personalizado.

## Estrutura do projeto

```
site-Equipe-PII/
├── src/
│   ├── assets/                # imagens, vídeos e logos
│   │   ├── cris.png
│   │   ├── delucca.png
│   │   ├── jp.png
│   │   ├── marcelo.png
│   │   ├── paulo.png
│   │   ├── camera.png
│   │   ├── video-about.mp4
│   │   ├── video-syncro.mp4
│   │   ├── syncro-logo.svg
│   │   └── syncro-logo-branca.svg
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Project.tsx
│   │   ├── Team.tsx
│   │   ├── Technologies.tsx
│   │   └── siteData.ts        # dados da equipe e das tecnologias
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Equipe

| Integrante | Cargo | Instagram |
| --- | --- | --- |
| Marcelo | Desenvolvedor Frontend | [@sla_marcello](https://www.instagram.com/sla_marcello/) |
| Cristhian | Desenvolvedor Backend | [@cris.hatz](https://www.instagram.com/cris.hatz/) |
| Paulo Seiji | Administrador de Database | [@psyjunior1](https://www.instagram.com/psyjunior1/) |
| Joao Paulo | UX/UI Designer | [@um_jotape](https://www.instagram.com/um_jotape/) |
| Bruno De Lucca | Arquiteto de IOT | [@bru_dlucca](https://www.instagram.com/bru_dlucca/) |

## Projeto em destaque: SmarTraffic

O **SmarTraffic** é um sistema inteligente para cruzamentos urbanos, orientado por visão computacional. Em vez dos semáforos tradicionais com temporizadores fixos, o projeto usa câmeras e *Edge Computing* para detectar e contar veículos em tempo real. Os dados ajustam dinamicamente os tempos dos semáforos, reduzindo filas, tempo de espera e emissão de gases poluentes nas cidades.

Acesse: [smart-traffic-pi.vercel.app](https://smart-traffic-pi.vercel.app/)

## Como personalizar

### Adicionar ou editar integrantes

Os dados ficam em `src/components/siteData.ts`, no array `members`:

```ts
{
  name: 'Nome do integrante',
  role: 'Cargo',
  image: imgNome,                      // importe a foto de src/assets
  instagram: 'https://www.instagram.com/usuario/',
  theme: 'blue',
}
```

A ordem de exibição dos cards é definida pela constante `DISPLAY_ORDER`, no topo de `src/components/Team.tsx`. Os nomes dessa lista precisam ser **idênticos** aos do campo `name` em `siteData.ts`.

### Editar as tecnologias

Altere o array `technologies` em `src/components/siteData.ts`. Cada item tem `icon` (um ícone do `lucide-react`), `name` e `description`. As cores dos cards alternam automaticamente entre laranja e azul, conforme a posição na lista.

### Trocar os vídeos e imagens

Substitua os arquivos em `src/assets` mantendo os mesmos nomes, ou ajuste o `import` no componente correspondente:

- `video-syncro.mp4`: vídeo da seção Hero
- `video-about.mp4`: vídeo da seção Quem somos
- `camera.png`: imagem do projeto em destaque

> **Dica de desempenho:** vídeos muito pesados podem deixar a rolagem lenta. Prefira arquivos comprimidos, sem áudio, e de preferência abaixo de alguns MB.

### Alterar o link do projeto

Edite a constante `PROJECT_URL` no topo de `src/components/Project.tsx`.

## Build e publicação

```bash
npm run build
```

Os arquivos otimizados são gerados na pasta `dist`, que pode ser publicada em qualquer serviço de hospedagem estática, como Vercel, Netlify ou GitHub Pages.

## Contato

Siga a equipe pelos Instagrams listados na seção [Equipe](#equipe).