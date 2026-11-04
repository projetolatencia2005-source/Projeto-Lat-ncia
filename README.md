# Latência System

O **Latência System** é um desktop interativo que simula a experiência de uma lan house brasileira. O site traz uma interface retrô em pixel art, com área de trabalho, janelas e aplicativos acessíveis pelo navegador.

**Acesse o site:** [projetolatencia.vercel.app](https://projetolatencia.vercel.app)

## O que você encontra

- Área de trabalho com papel de parede, menu Iniciar, barra de tarefas e janelas que podem ser movidas e redimensionadas.
- Explorador de arquivos com pastas e arquivos simulados no próprio navegador.
- Aplicativos como **Textos**, **Post-it**, **Rabisco**, navegador e terminal.
- Atividade escolar de múltipla escolha no aplicativo Textos. A palavra-chave **Alfabetização** aparece quando todas as questões são respondidas corretamente; em caso de erro, o resultado mostra as respostas e permite tentar novamente.
- Jogos, incluindo xadrez, com opções para jogar contra outra pessoa ou contra o computador.
- Recursos de acessibilidade, como contraste reforçado, ampliação da interface e redução de movimento.

O painel com tempo e valor faz parte da simulação e não realiza cobranças.

## Executar no computador

Requisitos: **Node.js 22 ou mais recente** e **Yarn Classic**.

Na pasta do projeto, instale as dependências e inicie o modo de desenvolvimento:

```sh
yarn install
yarn build:prebuild
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000). O comando `build:prebuild` atualiza os índices e atalhos usados pelo desktop; execute-o novamente se adicionar ou remover arquivos em `public/`.

Para gerar e servir a versão de produção localmente:

```sh
yarn build
yarn serve
```

## Tecnologias

- Next.js e React
- TypeScript
- Yarn
- BrowserFS e armazenamento local do navegador para recursos do desktop
- Vercel para hospedagem

## Publicação

O código-fonte fica no GitHub, na branch `main`, e a Vercel está conectada a essa branch. Depois de enviar um commit para `main`, a Vercel inicia uma nova implantação. Acompanhe o resultado na seção **Deployments** do projeto na Vercel; a implantação de produção deve ficar com status **Ready**.

## Testes e verificações

```sh
yarn test
yarn e2e
yarn lint
```

## Créditos

O projeto parte do desktop web [daedalOS](https://github.com/DustinBrett/daedalOS), criado por Dustin Brett, e foi adaptado para a experiência da Lan House Latência. Consulte [`LICENSE`](./LICENSE) e [`public/CREDITS.md`](./public/CREDITS.md) para os créditos e licenças dos componentes e recursos utilizados.
