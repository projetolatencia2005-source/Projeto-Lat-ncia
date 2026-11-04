# Doors - Latência System

Doors é um desktop interativo no navegador, inspirado nas telas da Lan House Latência do PDF de referência. A base de janelas, arquivos, menu Iniciar, barra de tarefas, aplicativos e jogos vem do daedalOS, de Dustin Brett, distribuído sob a licença MIT. Os créditos originais estão preservados em LICENSE e public/CREDITS.md.

## Executar localmente

Requisitos: Node.js 22 ou mais recente e Yarn Classic.

~~~sh
yarn install
yarn build:prebuild
yarn dev
~~~

Abra http://localhost:3000. O comando build:prebuild indexa os arquivos e atalhos que aparecem no sistema.

## Usar o desktop

- Clique ou pressione uma tecla na tela inicial para entrar na área de trabalho.
- Abra o Menu Iniciar pelo botão verde ou com Shift+Esc.
- Use Shift+Ctrl+E para abrir o Explorador de Arquivos, Shift+F10 para o Terminal e F11 para tela cheia.
- O atalho Acessibilidade no Menu Iniciar oferece contraste reforçado, ampliação da interface e redução de movimento.
- Os ícones Rascunho e Post-it abrem arquivos editáveis no Monaco Editor e TinyMCE.

## Aplicativos e requisitos

O catálogo integrado mantém os aplicativos e jogos do daedalOS: navegador, editor de código, Paint, PDF, terminal, emuladores, xadrez, pinball, DX-Ball, Quake III e outros. Alguns recursos dependem do suporte do navegador, conexão à internet ou WebGPU. Emuladores de consoles precisam de arquivos de jogos fornecidos pelo usuário; o projeto não inclui ROMs.

O painel Latência System apresenta uma sessão demonstrativa de 30 minutos e o valor de referência do PDF. Ele não realiza cobranças.

## Créditos

Código original: Dustin Brett / daedalOS. Consulte as licenças dos componentes e dependências originais antes de redistribuir o projeto.
