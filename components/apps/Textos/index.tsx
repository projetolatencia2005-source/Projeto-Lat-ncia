import { type CursorEffectResult, fairyDustCursor } from "cursor-effects";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type Editor } from "tinymce";
import StyledTextos from "components/apps/Textos/StyledTextos";
import useTinyMCE from "components/apps/TinyMCE/useTinyMCE";
import AppContainer, {
  useAppContainer,
} from "components/system/Apps/AppContainer";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import DirectionArrow from "components/system/DirectionArrow";
import { useFileSystemActions } from "contexts/fileSystem";
import { useProcess, useProcessesActions } from "contexts/process";

const DOCUMENTS_PATH = "/Users/Public/Documents";
const INTERNAL_DOCUMENTS_PATH = `${DOCUMENTS_PATH}/.Textos`;
const DEFAULT_SAVE_PATH = `${INTERNAL_DOCUMENTS_PATH}/Novo documento.whtml`;
const CONTENT_STYLE = `
  html,
  body,
  body * {
    cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default !important;
  }

  html,
  body {
    scrollbar-width: none;
  }
  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    display: none;
    height: 0;
    width: 0;
  }
  @font-face {
    font-display: swap;
    font-family: "Pixelify Sans";
    font-style: normal;
    font-weight: 400 700;
    src: url("/System/Doors/figma/PixelifySans-LatinExt.woff2") format("woff2");
    unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7,
      U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F,
      U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
      U+A720-A7FF;
  }
  @font-face {
    font-display: swap;
    font-family: "Pixelify Sans";
    font-style: normal;
    font-weight: 400 700;
    src: url("/System/Doors/figma/PixelifySans-Latin.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  body {
    background: #fff !important;
    box-sizing: border-box;
    color: #31302c;
    font-family: "Pixelify Sans", sans-serif;
    font-size: 12pt;
    margin: 0;
    min-height: 100%;
    padding: 64px 68px;
  }
  p { margin: 0 0 1em; }
  .doors-quiz {
    color: #31302c;
    font-size: 18px;
    line-height: 1.3;
    margin: 0 auto;
    max-width: 726px;
  }
  .doors-quiz [hidden] { display: none !important; }
  .doors-quiz-student { font-size: 15px; }
  .doors-quiz-student p {
    display: flex;
    justify-content: space-between;
    margin: 0 0 4px;
  }
  .doors-quiz-title {
    font-size: 20px;
    font-weight: 400;
    margin: 24px 0 10px;
    text-align: center;
  }
  .doors-quiz-instructions {
    font-size: 15px;
    margin: 0 0 22px;
    text-align: center;
  }
  .doors-quiz-question {
    border: 0;
    margin: 0 0 20px;
    min-width: 0;
    padding: 0;
  }
  .doors-quiz-question legend {
    font-size: 18px;
    margin: 0 0 8px;
    padding: 0;
  }
  .doors-quiz-answer {
    align-items: flex-start;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    font-family: inherit;
    gap: 8px;
    margin: 5px 0;
    padding: 0;
    text-align: left;
    width: 100%;
  }
  .doors-quiz-answer:focus-visible { outline: 2px solid #7d94b8; outline-offset: 2px; }
  .doors-quiz-radio:focus-visible { outline: 2px solid #7d94b8; outline-offset: 2px; }
  .doors-quiz-radio {
    appearance: none;
    background: #fff;
    border: 2px solid #31302c;
    box-sizing: border-box;
    border-radius: 0;
    display: block;
    flex: 0 0 15px;
    height: 15px;
    margin: 3px 0 0;
    position: relative;
    width: 15px;
  }
  .doors-quiz-radio:checked {
    background: #31302c;
    box-shadow: inset 0 0 0 3px #fff;
  }
  .doors-quiz-answer.is-correct .doors-quiz-answer-text { color: #12891a; }
  .doors-quiz-answer.is-wrong .doors-quiz-answer-text { color: #f20d0d; }
  .doors-quiz-answer.is-correct .doors-quiz-radio { border-color: #12891a; }
  .doors-quiz-answer.is-correct .doors-quiz-radio:checked { background: #12891a; }
  .doors-quiz-answer.is-wrong .doors-quiz-radio { border-color: #f20d0d; }
  .doors-quiz-answer.is-wrong .doors-quiz-radio:checked { background: #f20d0d; }
  .doors-quiz-action {
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 3px 3px 0 #31302c;
    color: #31302c;
    cursor: pointer;
    font: inherit;
    font-size: 16px;
    margin: 4px 0 0;
    padding: 5px 12px;
  }
  .doors-quiz-action:hover,
  .doors-quiz-action:focus-visible { background: #d7e4f7; }
  .doors-quiz-result { margin-top: 28px; }
  .doors-quiz-result h2 {
    font-size: 25px;
    font-weight: 600;
    margin: 0 0 22px;
  }
  .doors-quiz-result p {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 5px;
  }
  .doors-quiz-key {
    color: #7d94b8;
    cursor: pointer !important;
    display: inline-block;
    text-decoration: underline;
  }
  .doors-quiz-feedback { font-size: 14px !important; font-weight: 400 !important; margin: 12px 0 !important; }
  @media (max-width: 640px) {
    .doors-quiz-student p { display: block; }
    .doors-quiz-student span { display: block; }
  }
`;
const TINYMCE_OPTIONS = {
  contentStyle: CONTENT_STYLE,
  editable: true,
  menubar: false,
  savePath: DEFAULT_SAVE_PATH,
  statusbar: false,
  toolbar: false,
} as const;

const RESUME_TEMPLATE_CONTENT = [
  "<h1>NOME COMPLETO:</h1>",
  "<p><br>Cidade – Estado<br>Telefone: (xx) xxxxx-xxxx<br>E-mail: seuemail@email.com</p>",
  "<h2>- OBJETIVO PROFISSIONAL</h2>",
  "<p>Busco uma oportunidade de emprego para desenvolver minhas habilidades, adquirir experiência e contribuir para o crescimento da empresa.</p>",
  "<h2>- FORMAÇÃO ESCOLAR</h2>",
  "<p>Escolaridade: (Ensino Fundamental / Médio / Superior)<br>Instituição: (Nome da escola ou faculdade)<br>Situação: (Completo ou cursando)</p>",
  "<h2>- EXPERIÊNCIA PROFISSIONAL</h2>",
  "<p>Empresa: (Nome da empresa)<br>Cargo: (Nome do cargo)<br>Período: (Mês/ano até mês/ano)<br>Descrição das principais atividades realizadas.<br>Se você não tiver experiência profissional, pode retirar esta seção.</p>",
  "<h2>- CURSOS E QUALIFICAÇÕES</h2>",
  "<p>(Nome do curso)<br>(Informática, atendimento ao cliente ou outros cursos, se tiver)</p>",
  "<h2>- HABILIDADES</h2>",
  "<p>Facilidade para aprender.<br>Boa comunicação.<br>Organização e responsabilidade.<br>Trabalho em equipe.<br>Pontualidade e comprometimento.</p>",
].join("");
const LEGACY_RESUME_TEMPLATE_CONTENT = [
  "<h1>Seu nome</h1>",
  "<p><strong>Telefone:</strong> (00) 00000-0000<br><strong>E-mail:</strong> seuemail@exemplo.com<br><strong>Cidade:</strong> Sua cidade</p>",
  "<h2>Objetivo</h2>",
  "<p>Escreva aqui um breve resumo sobre seus objetivos profissionais.</p>",
  "<h2>Experiência</h2>",
  "<p><strong>Nome da empresa</strong> — Cargo (ano–ano)</p>",
  "<ul><li>Descreva uma responsabilidade ou conquista.</li><li>Adicione outra experiência relevante.</li></ul>",
  "<h2>Formação</h2>",
  "<p>Curso — Instituição (ano de conclusão)</p>",
  "<h2>Habilidades</h2>",
  "<p>Inclua suas principais habilidades.</p>",
].join("");
const GTA_CODES_TEMPLATE_CONTENT = [
  "<h1>Códigos de GTA: São Paulo</h1>",
  "<h2>Vida, Dinheiro e Status</h2>",
  "<ul>",
  "<li><strong>HESOYAM:</strong> Restaura a vida, o colete e adiciona $250.000 (também repara o veículo se o CJ estiver dirigindo).</li>",
  "<li><strong>BAGUVIX:</strong> Saúde infinita / Imunidade a quase todos os danos.</li>",
  "<li><strong>FULLCLIP:</strong> Munição infinita (sem precisar recarregar).</li>",
  "<li><strong>BUFFMEUP:</strong> Máximo de músculos.</li>",
  "<li><strong>WHOATEALLTHEPIES:</strong> Máximo de gordura.</li>",
  "<li><strong>LEANANDMEAN:</strong> Mínimo de gordura e de músculos.</li>",
  "<li><strong>WORSHIPME:</strong> Respeito máximo.</li>",
  "<li><strong>HELLOLADIES:</strong> Sex appeal máximo.</li>",
  "<li><strong>ICANGOALLNIGHT:</strong> Stamina (fôlego) máxima.</li>",
  "<li><strong>MANFROMATLANTIS:</strong> Capacidade pulmonar infinita.</li>",
  "</ul>",
  '<p><strong>Fontes:</strong> <a href="https://blog.kabum.com.br/macetes-do-gta-san-andreas/" target="_blank" rel="noreferrer">[1]</a>, <a href="https://www.gamefoxhub.com.br/guias/todos-os-codigos-do-gta-san-andreas-para-pc" target="_blank" rel="noreferrer">[2]</a>, <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2090970021" target="_blank" rel="noreferrer">[3]</a>, <a href="https://www.buscape.com.br/console-de-video-game/conteudo/codigos-gta-san-andreas-macetes-manhas-ps2-ps4-xbox-pc" target="_blank" rel="noreferrer">[4]</a>.</p>',
  "<h2>Armas e Habilidades</h2>",
  "<ul>",
  "<li><strong>LXGIWYL:</strong> Pacote de armas 1 (grupo básico).</li>",
  "<li><strong>PROFESSIONALSKIT:</strong> Pacote de armas 2 (grupo profissional).</li>",
  "<li><strong>UZUMYMW:</strong> Pacote de armas 3 (armas pesadas).</li>",
  "<li><strong>PROFESSIONALKILLER:</strong> Nível máximo de habilidade com todas as armas.</li>",
  "<li><strong>NATURALTALENT:</strong> Habilidade máxima com veículos.</li>",
  "<li><strong>AIYPWZQP:</strong> Adiciona um paraquedas.</li>",
  "</ul>",
  '<p><strong>Fontes:</strong> <a href="https://www.zoom.com.br/notebook/deumzoom/codigos-gta-san-andreas" target="_blank" rel="noreferrer">[1]</a>, <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2090970021" target="_blank" rel="noreferrer">[2]</a>, <a href="https://blog.kabum.com.br/macetes-do-gta-san-andreas/" target="_blank" rel="noreferrer">[3]</a>.</p>',
  "<h2>Veículos e Spawn</h2>",
  "<ul>",
  "<li><strong>ROCKETMAN:</strong> Gera o Jetpack.</li>",
  "<li><strong>JUMPJET:</strong> Gera o caça Hydra.</li>",
  "<li><strong>AIWPRTON:</strong> Gera o tanque de guerra Rhino.</li>",
  "<li><strong>OHDUDE:</strong> Gera o helicóptero de combate Hunter.</li>",
  "</ul>",
  '<p><strong>Fonte:</strong> <a href="https://www.gamefoxhub.com.br/guias/todos-os-codigos-do-gta-san-andreas-para-pc" target="_blank" rel="noreferrer">[1]</a>.</p>',
  "<h2>Polícia e Nível de Procurado</h2>",
  "<ul>",
  "<li><strong>ASNAEB:</strong> Limpa o nível de procurado (tira as estrelas).</li>",
  "<li><strong>AEZAKMI:</strong> Nunca fica procurado (polícia nunca te persegue).</li>",
  "<li><strong>BRINGITON:</strong> Define o nível máximo de procurado (6 estrelas).</li>",
  "</ul>",
  '<p><strong>Fontes:</strong> <a href="https://www.buscape.com.br/console-de-video-game/conteudo/codigos-gta-san-andreas-macetes-manhas-ps2-ps4-xbox-pc" target="_blank" rel="noreferrer">[1]</a>, <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2090970021" target="_blank" rel="noreferrer">[2]</a>.</p>',
  "<h2>Mundo e Tráfego</h2>",
  "<ul>",
  "<li><strong>STATEOFEMERGENCY:</strong> Modo caos (pedestres revoltados).</li>",
  "<li><strong>WHEELSONLYPLEASE:</strong> Deixa os carros invisíveis.</li>",
  "<li><strong>RIPAZHA:</strong> Carros voadores.</li>",
  "<li><strong>AFZLLQLL:</strong> Deixa o céu completamente limpo.</li>",
  "</ul>",
  '<p><strong>Fontes:</strong> <a href="https://gta.fandom.com/pt/wiki/C%C3%B3digos_do_GTA_San_Andreas_(PC)" target="_blank" rel="noreferrer">[1]</a>, <a href="https://www.gamefoxhub.com.br/guias/todos-os-codigos-do-gta-san-andreas-para-pc" target="_blank" rel="noreferrer">[2]</a>, <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2090970021" target="_blank" rel="noreferrer">[3]</a>.</p>',
].join("");
const LEGACY_GTA_CODES_TEMPLATE_CONTENT = [
  "<h1>Códigos do GTA</h1>",
  "<p>Guia pessoal de códigos e comandos.</p>",
  '<table style="border-collapse: collapse; width: 100%;"><tbody><tr><th style="border: 2px solid #31302c; padding: 6px;">Jogo / plataforma</th><th style="border: 2px solid #31302c; padding: 6px;">Código</th><th style="border: 2px solid #31302c; padding: 6px;">Efeito</th></tr><tr><td style="border: 2px solid #31302c; padding: 6px;">&nbsp;</td><td style="border: 2px solid #31302c; padding: 6px;">&nbsp;</td><td style="border: 2px solid #31302c; padding: 6px;">&nbsp;</td></tr><tr><td style="border: 2px solid #31302c; padding: 6px;">&nbsp;</td><td style="border: 2px solid #31302c; padding: 6px;">&nbsp;</td><td style="border: 2px solid #31302c; padding: 6px;">&nbsp;</td></tr></tbody></table>',
].join("");
const LEGACY_SCHOOL_TEMPLATE_CONTENT = `<h1>Título do trabalho</h1><p><strong>Aluno:</strong> Seu nome<br><strong>Turma:</strong> Sua turma<br><strong>Matéria:</strong> Disciplina<br><strong>Data:</strong> ____ / ____ / ______</p><h2>Introdução</h2><p>Apresente o assunto e explique o objetivo do trabalho.</p><h2>Desenvolvimento</h2><p>Organize aqui as informações, ideias e referências pesquisadas.</p><h2>Conclusão</h2><p>Registre o que você aprendeu e retome os pontos principais.</p><h2>Referências</h2><p>Informe as fontes consultadas.</p>`;

const SCHOOL_TEST_TEMPLATE_CONTENT = `
  <div class="doors-quiz" data-doors-quiz>
    <div class="doors-quiz-student">
      <p><span>Nome: __________________________________</span><span>Data: ____ / ____ / ______</span></p>
      <p><span>Escola: __________________________________</span><span>Turma: __________</span></p>
    </div>
    <h1 class="doors-quiz-title">Atividade: Conhecendo o passado</h1>
    <p class="doors-quiz-instructions">Marque uma alternativa em cada questão.</p>
    <form data-doors-quiz-form>
      <fieldset aria-label="Questão 1" class="doors-quiz-question" data-answer="d" role="radiogroup">
        <legend>1. Em 1822, o Brasil declarou sua independência. De qual país queria se separar?</legend>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="a" name="doors-quiz-question-1" type="radio" value="a" /><span class="doors-quiz-answer-text">a) Espanha</span></label>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="b" name="doors-quiz-question-1" type="radio" value="b" /><span class="doors-quiz-answer-text">b) França</span></label>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="c" name="doors-quiz-question-1" type="radio" value="c" /><span class="doors-quiz-answer-text">c) Inglaterra</span></label>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="d" name="doors-quiz-question-1" type="radio" value="d" /><span class="doors-quiz-answer-text">d) Portugal</span></label>
      </fieldset>
      <fieldset aria-label="Questão 2" class="doors-quiz-question" data-answer="c" role="radiogroup">
        <legend>2. Em 1889, o Brasil passou por uma mudança política importante. O que aconteceu?</legend>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="a" name="doors-quiz-question-2" type="radio" value="a" /><span class="doors-quiz-answer-text">a) A escravidão foi abolida e a monarquia permaneceu.</span></label>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="b" name="doors-quiz-question-2" type="radio" value="b" /><span class="doors-quiz-answer-text">b) O Brasil se tornou independente de Portugal.</span></label>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="c" name="doors-quiz-question-2" type="radio" value="c" /><span class="doors-quiz-answer-text">c) A monarquia chegou ao fim e a República foi proclamada.</span></label>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="d" name="doors-quiz-question-2" type="radio" value="d" /><span class="doors-quiz-answer-text">d) A capital do país foi transferida para Brasília.</span></label>
      </fieldset>
      <fieldset aria-label="Questão 3" class="doors-quiz-question" data-answer="b" role="radiogroup">
        <legend>3. Durante a ditadura iniciada em 1964, o que aconteceu com a liberdade de expressão?</legend>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="a" name="doors-quiz-question-3" type="radio" value="a" /><span class="doors-quiz-answer-text">a) A imprensa passou a divulgar livremente qualquer crítica ao governo.</span></label>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="b" name="doors-quiz-question-3" type="radio" value="b" /><span class="doors-quiz-answer-text">b) A censura limitou a divulgação de notícias, músicas, filmes e outras formas de expressão.</span></label>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="c" name="doors-quiz-question-3" type="radio" value="c" /><span class="doors-quiz-answer-text">c) A censura se limitou a obras estrangeiras.</span></label>
        <label class="doors-quiz-answer"><input class="doors-quiz-radio" data-quiz-option="d" name="doors-quiz-question-3" type="radio" value="d" /><span class="doors-quiz-answer-text">d) A liberdade de expressão não sofreu restrições.</span></label>
      </fieldset>
      <button class="doors-quiz-action" data-quiz-submit type="submit">Finalizar prova</button>
    </form>
    <section aria-live="polite" class="doors-quiz-result" data-quiz-result hidden>
      <h2>Resultado:</h2>
      <p data-quiz-score></p>
      <p data-quiz-grade></p>
      <p data-quiz-key-row hidden>Palavra chave: <span class="doors-quiz-key" style="cursor: pointer !important;">Alfabetização</span></p>
      <p data-quiz-blocked hidden>Palavra chave: Bloqueado</p>
      <p class="doors-quiz-feedback" data-quiz-feedback hidden>As respostas corretas estão em verde. Reinicie o teste para tentar novamente.</p>
      <button class="doors-quiz-action" data-quiz-restart hidden type="button">Tentar novamente ←</button>
    </section>
  </div>
`;

const templateContentText = (html: string): string =>
  new DOMParser()
    .parseFromString(html, "text/html")
    .body.textContent?.replace(/\s+/g, " ")
    .trim() ?? "";

const updateLegacyTemplates = (content: string, url: string): string => {
  const fileName = url.split("/").pop()?.toLocaleLowerCase("pt-BR") || "";
  const parsedContent = new DOMParser().parseFromString(content, "text/html");
  const quiz =
    parsedContent.body.querySelector<HTMLElement>("[data-doors-quiz]");
  const quizContent = (() => {
    if (!quiz || quiz.getAttribute("contenteditable") !== "false") {
      return content;
    }

    quiz.removeAttribute("contenteditable");
    return parsedContent.body.innerHTML;
  })();
  const text = templateContentText(quizContent);

  if (
    fileName.startsWith("códigos do gta") &&
    (text === "" ||
      text === templateContentText(LEGACY_GTA_CODES_TEMPLATE_CONTENT))
  ) {
    return GTA_CODES_TEMPLATE_CONTENT;
  }

  if (
    fileName.startsWith("modelo currículo") &&
    text === templateContentText(LEGACY_RESUME_TEMPLATE_CONTENT)
  ) {
    return RESUME_TEMPLATE_CONTENT;
  }

  if (
    fileName.startsWith("trabalho de escola") &&
    (text === "" ||
      text === templateContentText(LEGACY_SCHOOL_TEMPLATE_CONTENT))
  ) {
    return SCHOOL_TEST_TEMPLATE_CONTENT;
  }

  return quizContent;
};

const templates = [
  {
    content: SCHOOL_TEST_TEMPLATE_CONTENT,
    name: "Trabalho de escola",
    preview: "lines",
  },
  {
    content: RESUME_TEMPLATE_CONTENT,
    name: "Modelo currículo",
    preview: "lines",
  },
  {
    content: GTA_CODES_TEMPLATE_CONTENT,
    name: "Códigos do GTA",
    preview: "lines",
  },
  {
    content: "<p>&nbsp;</p>",
    name: "Papel em branco",
    preview: "blank",
  },
] as const;

type TextosRibbonProps = {
  editor?: Editor;
  id: string;
  onReturnToModels?: () => void;
};

type TextAlignment = "center" | "justify" | "left" | "right";
type TextosColorTarget = "highlight" | "text";

const keepEditorSelection: React.MouseEventHandler<HTMLButtonElement> = (
  event
) => event.preventDefault();

const TEXTOS_COLOR_SWATCHES = [
  { color: "#31302c", name: "Preto" },
  { color: "#6b6257", name: "Cinza escuro" },
  { color: "#a59b8b", name: "Cinza" },
  { color: "#ffffff", name: "Branco" },
  { color: "#a61c1c", name: "Vermelho escuro" },
  { color: "#e04432", name: "Vermelho" },
  { color: "#ef8a23", name: "Laranja" },
  { color: "#f5d547", name: "Amarelo" },
  { color: "#9acb3c", name: "Verde claro" },
  { color: "#278b4a", name: "Verde" },
  { color: "#31aaa0", name: "Turquesa" },
  { color: "#55b5e8", name: "Azul claro" },
  { color: "#2672c9", name: "Azul" },
  { color: "#293e8b", name: "Azul escuro" },
  { color: "#874fa6", name: "Roxo" },
  { color: "#d34d91", name: "Rosa" },
] as const;

const TextosRibbon: FC<TextosRibbonProps> = ({
  editor,
  id,
  onReturnToModels,
}) => {
  const { open } = useProcessesActions();
  const [activeAlignment, setActiveAlignment] = useState<TextAlignment>("left");
  const [openColorPalette, setOpenColorPalette] =
    useState<null | TextosColorTarget>(null);
  const [colorPalettePosition, setColorPalettePosition] = useState({
    left: 8,
    top: 48,
  });
  const [selectedTextColor, setSelectedTextColor] = useState("#31302c");
  const [selectedHighlightColor, setSelectedHighlightColor] =
    useState("#fff29b");
  const colorPaletteRef = useRef<HTMLDivElement | null>(null);
  const selectionBookmark = useRef<null | ReturnType<
    Editor["selection"]["getBookmark"]
  >>(null);

  useEffect(() => {
    if (!openColorPalette) return;

    const closePaletteOnOutsideClick = (event: PointerEvent): void => {
      const {target} = event;

      if (!(target instanceof Element)) return;
      if (
        colorPaletteRef.current?.contains(target) ||
        target.closest(".textos-color-picker")
      ) {
        return;
      }

      setOpenColorPalette(null);
    };
    const closePaletteOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpenColorPalette(null);
    };

    document.addEventListener("pointerdown", closePaletteOnOutsideClick);
    document.addEventListener("keydown", closePaletteOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closePaletteOnOutsideClick);
      document.removeEventListener("keydown", closePaletteOnEscape);
    };
  }, [openColorPalette]);

  useEffect(() => {
    const updateAlignment = (): void => {
      if (!editor) return;

      const selectionNode = editor.selection.getNode();
      const block =
        editor.dom.getParent(
          selectionNode,
          "p,h1,h2,h3,h4,h5,h6,div,li,blockquote,td,th"
        ) || selectionNode;
      const textAlign =
        editor.dom.getStyle(block, "text-align") ||
        editor.dom.getStyle(editor.getBody(), "text-align");

      setActiveAlignment(
        textAlign === "center"
          ? "center"
          : textAlign === "right" || textAlign === "end"
            ? "right"
            : textAlign === "justify"
              ? "justify"
              : "left"
      );
    };

    const initialAlignmentUpdate =
      window.requestAnimationFrame(updateAlignment);
    editor?.on("NodeChange", updateAlignment);
    editor?.on("ExecCommand", updateAlignment);

    return () => {
      window.cancelAnimationFrame(initialAlignmentUpdate);
      editor?.off("NodeChange", updateAlignment);
      editor?.off("ExecCommand", updateAlignment);
    };
  }, [editor]);

  const command = useCallback(
    (name: string, value?: string): void => {
      if (!editor) return;
      if (
        editor.getBody().querySelector("[data-doors-quiz]") &&
        name !== "mceSave"
      ) {
        return;
      }

      editor.execCommand(name, false, value);
    },
    [editor]
  );

  const captureEditorSelection = (): void => {
    if (editor)
      {selectionBookmark.current = editor.selection.getBookmark(2, true);}
  };

  const commandOnSelection = (name: string, value?: string): void => {
    if (!editor || editor.getBody().querySelector("[data-doors-quiz]")) {
      return;
    }

    editor.focus();
    if (selectionBookmark.current) {
      editor.selection.moveToBookmark(selectionBookmark.current);
      selectionBookmark.current = null;
    }
    editor.execCommand(name, false, value);
  };

  const showColorPalette = (
    target: TextosColorTarget,
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    if (!editor) return;

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const ribbon = event.currentTarget.closest(".textos-ribbon");
    const rootRect = ribbon?.parentElement?.getBoundingClientRect();

    if (rootRect) {
      const paletteWidth = 218;
      setColorPalettePosition({
        left: Math.max(
          8,
          Math.min(
            buttonRect.left - rootRect.left,
            rootRect.width - paletteWidth - 8
          )
        ),
        top: buttonRect.bottom - rootRect.top + 4,
      });
    }

    setOpenColorPalette((currentTarget) =>
      currentTarget === target ? null : target
    );
  };

  const applyPaletteColor = (color: string): void => {
    if (openColorPalette === "text") {
      setSelectedTextColor(color);
      commandOnSelection("ForeColor", color);
    } else if (openColorPalette === "highlight") {
      setSelectedHighlightColor(color);
      commandOnSelection("HiliteColor", color);
    }

    setOpenColorPalette(null);
  };

  return (
    <>
      <div aria-label="Ferramentas de edição" className="textos-ribbon">
        <div className="textos-ribbon-group">
          {onReturnToModels && (
            <button
              aria-label="Voltar à tela inicial do Textos"
              className="textos-ribbon-button textos-home-button"
              onClick={onReturnToModels}
              title="Voltar à tela inicial do Textos"
              type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                className="textos-home-icon"
                src="/System/Doors/textos/my-computer.svg"
              />
              <span>Início</span>
            </button>
          )}
          <button
            aria-label="Desfazer"
            className="textos-ribbon-button textos-history-button"
            disabled={!editor}
            onClick={() => command("Undo")}
            onMouseDown={keepEditorSelection}
            title="Desfazer"
            type="button"
          >
            <DirectionArrow
              className="textos-arrow-button"
              direction="left"
              size={25}
            />
            <span>Desfazer</span>
          </button>
          <button
            aria-label="Avançar"
            className="textos-ribbon-button textos-history-button"
            disabled={!editor}
            onClick={() => command("Redo")}
            onMouseDown={keepEditorSelection}
            title="Refazer"
            type="button"
          >
            <span>Avançar</span>
            <DirectionArrow
              className="textos-arrow-button"
              direction="right"
              size={25}
            />
          </button>
        </div>

        <div className="textos-ribbon-group">
          <button
            aria-label="Salvar"
            className="textos-ribbon-button textos-icon-button"
            disabled={!editor}
            onClick={() => command("mceSave")}
            onMouseDown={keepEditorSelection}
            title="Salvar"
            type="button"
          >
            <img alt="" src="/System/Doors/textos/save-2.svg" />
          </button>
          <button
            aria-label="Recortar"
            className="textos-ribbon-button textos-icon-button"
            disabled={!editor}
            onClick={() => command("Cut")}
            onMouseDown={keepEditorSelection}
            title="Recortar seleção"
            type="button"
          >
            <img alt="" src="/System/Doors/textos/scissors-2.svg" />
          </button>
        </div>

        <div className="textos-ribbon-group">
          <button
            className="textos-ribbon-button textos-library-button"
            onClick={() => open("FileExplorer", { url: DOCUMENTS_PATH })}
            onMouseDown={keepEditorSelection}
            title="Abrir Biblioteca de documentos"
            type="button"
          >
            <img alt="" src="/System/Doors/textos/folder.svg" />
            <span>Biblioteca</span>
          </button>
        </div>

        <div className="textos-ribbon-group">
          <label className="textos-font-label" htmlFor={`${id}-font-family`}>
            Fonte
          </label>
          <select
            aria-label="Fonte"
            className="textos-font-select"
            defaultValue="Pixelify Sans"
            disabled={!editor}
            id={`${id}-font-family`}
            onChange={(event) =>
              commandOnSelection("FontName", event.currentTarget.value)
            }
            onMouseDown={captureEditorSelection}
          >
            {[
              "Pixelify Sans",
              "Arial",
              "Calibri",
              "Comic Sans MS",
              "Georgia",
              "Times New Roman",
              "Verdana",
            ].map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          <select
            aria-label="Tamanho da fonte"
            className="textos-size-select"
            defaultValue="12pt"
            disabled={!editor}
            onChange={(event) =>
              commandOnSelection("FontSize", event.currentTarget.value)
            }
            onMouseDown={captureEditorSelection}
          >
            {["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"].map(
              (size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              )
            )}
          </select>
          <select
            aria-label="Estilo do parágrafo"
            className="textos-paragraph-select"
            defaultValue="p"
            disabled={!editor}
            onChange={(event) =>
              commandOnSelection("FormatBlock", event.currentTarget.value)
            }
            onMouseDown={captureEditorSelection}
          >
            <option value="p">Normal</option>
            <option value="h1">Título 1</option>
            <option value="h2">Título 2</option>
            <option value="h3">Título 3</option>
            <option value="blockquote">Citação</option>
          </select>
        </div>

        <div className="textos-ribbon-group">
          <button
            aria-label="Negrito"
            className="textos-ribbon-button textos-character-button is-bold"
            disabled={!editor}
            onClick={() => command("Bold")}
            onMouseDown={keepEditorSelection}
            title="Negrito"
            type="button"
          >
            B
          </button>
          <button
            aria-label="Itálico"
            className="textos-ribbon-button textos-character-button is-italic"
            disabled={!editor}
            onClick={() => command("Italic")}
            onMouseDown={keepEditorSelection}
            title="Itálico"
            type="button"
          >
            I
          </button>
          <button
            aria-label="Sublinhado"
            className="textos-ribbon-button textos-character-button is-underline"
            disabled={!editor}
            onClick={() => command("Underline")}
            onMouseDown={keepEditorSelection}
            title="Sublinhado"
            type="button"
          >
            U
          </button>
          <button
            aria-expanded={openColorPalette === "text"}
            aria-haspopup="dialog"
            aria-label="Cor do texto"
            className="textos-ribbon-button textos-color-button textos-color-picker"
            disabled={!editor}
            onClick={(event) => showColorPalette("text", event)}
            onMouseDown={(event) => {
              event.preventDefault();
              captureEditorSelection();
            }}
            title="Cor do texto"
            type="button"
          >
            <span
              aria-hidden="true"
              className="textos-color-preview"
              style={{ borderBottomColor: selectedTextColor }}
            >
              A
            </span>
          </button>
          <button
            aria-label="Tachado"
            className="textos-ribbon-button textos-character-button is-strikethrough"
            disabled={!editor}
            onClick={() => command("Strikethrough")}
            onMouseDown={keepEditorSelection}
            title="Tachado"
            type="button"
          >
            S
          </button>
          <button
            aria-expanded={openColorPalette === "highlight"}
            aria-haspopup="dialog"
            aria-label="Cor de destaque"
            className="textos-ribbon-button textos-color-button textos-highlight-button textos-color-picker"
            disabled={!editor}
            onClick={(event) => showColorPalette("highlight", event)}
            onMouseDown={(event) => {
              event.preventDefault();
              captureEditorSelection();
            }}
            title="Cor de destaque"
            type="button"
          >
            <span
              aria-hidden="true"
              className="textos-highlight-preview"
              style={{ backgroundColor: selectedHighlightColor }}
            />
          </button>
        </div>

        <div className="textos-ribbon-group">
          {(
            [
              ["JustifyLeft", "left", "Alinhar à esquerda"],
              ["JustifyCenter", "center", "Centralizar"],
              ["JustifyRight", "right", "Alinhar à direita"],
              ["JustifyFull", "justify", "Justificar"],
            ] as const
          ).map(([action, alignment, label]) => (
            <button
              key={action}
              aria-label={label}
              aria-pressed={activeAlignment === alignment}
              className={`textos-ribbon-button textos-alignment-button${
                activeAlignment === alignment ? " is-active" : ""
              }`}
              disabled={!editor}
              onClick={() => command(action)}
              onMouseDown={keepEditorSelection}
              title={label}
              type="button"
            >
              <span
                aria-hidden="true"
                className={`textos-alignment-mark is-${alignment}`}
              >
                <i />
                <i />
                <i />
              </span>
            </button>
          ))}
        </div>

        <div className="textos-ribbon-group">
          <button
            aria-label="Lista com marcadores"
            className="textos-ribbon-button textos-character-button"
            disabled={!editor}
            onClick={() => command("InsertUnorderedList")}
            onMouseDown={keepEditorSelection}
            title="Lista com marcadores"
            type="button"
          >
            •≡
          </button>
          <button
            aria-label="Lista numerada"
            className="textos-ribbon-button textos-character-button"
            disabled={!editor}
            onClick={() => command("InsertOrderedList")}
            onMouseDown={keepEditorSelection}
            title="Lista numerada"
            type="button"
          >
            1≡
          </button>
        </div>
      </div>
      {openColorPalette && (
        <div
          ref={colorPaletteRef}
          aria-label={
            openColorPalette === "text"
              ? "Amostras de cor do texto"
              : "Amostras de cor de destaque"
          }
          className="textos-color-palette"
          role="dialog"
          style={colorPalettePosition}
        >
          <div className="textos-color-palette-heading">
            <span>
              {openColorPalette === "text" ? "Cor do texto" : "Cor de destaque"}
            </span>
            <button
              aria-label="Fechar amostras de cor"
              className="textos-color-palette-close"
              onClick={() => setOpenColorPalette(null)}
              type="button"
            >
              ×
            </button>
          </div>
          <div className="textos-color-swatches">
            {TEXTOS_COLOR_SWATCHES.map(({ color, name }) => {
              const selectedColor =
                openColorPalette === "text"
                  ? selectedTextColor
                  : selectedHighlightColor;

              return (
                <button
                  key={color}
                  aria-label={`${name} ${color}`}
                  aria-pressed={selectedColor === color}
                  className="textos-color-swatch"
                  onClick={() => applyPaletteColor(color)}
                  onMouseDown={keepEditorSelection}
                  style={{ backgroundColor: color }}
                  title={`${name} (${color})`}
                  type="button"
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

type TextosModelsProps = ComponentProcessProps;

const TextosModels: FC<TextosModelsProps> = ({ id }) => {
  const containerProps = useAppContainer(id);
  const { setLoading } = containerProps;
  const { createPath, readdir, readFile, unlink, updateFolder } =
    useFileSystemActions();
  const { open, url: setProcessUrl } = useProcessesActions();
  const templateMigrationStarted = useRef(false);

  useEffect(() => {
    if (templateMigrationStarted.current) return;

    templateMigrationStarted.current = true;

    const hideExistingTemplateFiles = async (): Promise<void> => {
      let documentFiles: string[];

      try {
        documentFiles = await readdir(DOCUMENTS_PATH);
      } catch {
        return;
      }

      // Move one file at a time so a failed copy never removes its source.
      // oxlint-disable no-await-in-loop -- The migration must copy, then delete, then refresh each file.
      for (const fileName of documentFiles) {
        if (fileName.toLowerCase().endsWith(".whtml")) {
          const baseName = fileName
            .replace(/\.whtml$/i, "")
            .replace(/ \(\d+\)$/, "");
          const template = templates.find(
            ({ name }) =>
              name.toLocaleLowerCase() === baseName.toLocaleLowerCase()
          );

          if (template) {
            const sourcePath = `${DOCUMENTS_PATH}/${fileName}`;
            let contents: Buffer | undefined;

            try {
              contents = await readFile(sourcePath);
            } catch {
              contents = undefined;
            }

            if (contents) {
              const hiddenName = await createPath(
                fileName,
                INTERNAL_DOCUMENTS_PATH,
                contents
              );

              if (hiddenName) {
                if (await unlink(sourcePath)) {
                  await updateFolder(DOCUMENTS_PATH, undefined, fileName);
                  await updateFolder(INTERNAL_DOCUMENTS_PATH, hiddenName);
                } else {
                  await unlink(`${INTERNAL_DOCUMENTS_PATH}/${hiddenName}`);
                }
              }
            }
          }
        }
      }
      // oxlint-enable no-await-in-loop
    };

    void hideExistingTemplateFiles();
  }, [createPath, readFile, readdir, unlink, updateFolder]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const createFromTemplate = async (
    name: string,
    content: string
  ): Promise<void> => {
    const fileName = await createPath(
      `${name}.whtml`,
      INTERNAL_DOCUMENTS_PATH,
      Buffer.from(content)
    );

    if (!fileName) return;

    updateFolder(INTERNAL_DOCUMENTS_PATH, fileName);
    setProcessUrl(id, `${INTERNAL_DOCUMENTS_PATH}/${fileName}`);
  };

  const openLibrary = (): void => open("FileExplorer", { url: DOCUMENTS_PATH });

  return (
    <AppContainer {...containerProps} StyledComponent={StyledTextos}>
      <TextosRibbon id={id} />
      <div className="textos-home">
        <nav aria-label="Navegação do Textos" className="textos-home-sidebar">
          <button onClick={openLibrary} type="button">
            <img alt="" src="/System/Doors/textos/folder.svg" />
            Abrir
          </button>
          <button
            onClick={() =>
              createFromTemplate("Papel em branco", "<p>&nbsp;</p>")
            }
            type="button"
          >
            <img alt="" src="/System/Doors/textos/clipboard-copy.png" />
            Novo
          </button>
          <button onClick={openLibrary} type="button">
            <img alt="" src="/System/Doors/textos/folder.svg" />
            Biblioteca
          </button>
        </nav>

        <main className="textos-models-area">
          <h1 className="textos-models-heading">
            Modelos
            <DirectionArrow
              className="textos-models-next"
              direction="right"
              size={22}
            />
          </h1>
          <div className="textos-template-list">
            {templates.map(({ content, name, preview }) => (
              <button
                key={name}
                aria-label={`Abrir modelo: ${name}`}
                className={`textos-template-card${
                  name === "Trabalho de escola" ? " is-school-test" : ""
                }`}
                onClick={() => createFromTemplate(name, content)}
                type="button"
              >
                <span className={`textos-template-preview is-${preview}`}>
                  {preview === "lines" && (
                    <span className="textos-template-preview-lines" />
                  )}
                </span>
                <span className="textos-template-name">{name}</span>
              </button>
            ))}
          </div>
        </main>
      </div>
    </AppContainer>
  );
};

const TextosDocument: FC<ComponentProcessProps> = ({ id }) => {
  const containerProps = useAppContainer(id);
  const editorOptions = useMemo(
    () => ({ ...TINYMCE_OPTIONS, transformContent: updateLegacyTemplates }),
    []
  );
  const editor = useTinyMCE(containerProps, editorOptions);
  const { url: setProcessUrl } = useProcessesActions();
  const [showReturnPrompt, setShowReturnPrompt] = useState(false);

  useEffect(() => {
    const doc = editor?.getDoc();

    if (!doc) return;

    let keywordCursorEffect: CursorEffectResult | undefined;
    let keywordCursorHost: HTMLDivElement | undefined;
    let activeKeywordElement: HTMLElement | undefined;
    let relayKeywordMouseMove: ((event: MouseEvent) => void) | undefined;
    let activeQuizSignature = "";
    let activeQuizQuestionIndex = 0;
    const selectedQuizAnswers = new Map<number, string>();
    let submittedQuizResult: { score: number; total: number } | undefined;
    const clearKeywordCursorEffect = (): void => {
      if (activeKeywordElement && relayKeywordMouseMove) {
        activeKeywordElement.removeEventListener(
          "mousemove",
          relayKeywordMouseMove
        );
      }
      keywordCursorEffect?.destroy();
      keywordCursorEffect = undefined;
      keywordCursorHost?.remove();
      keywordCursorHost = undefined;
      activeKeywordElement = undefined;
      relayKeywordMouseMove = undefined;
    };
    const enableKeywordCursorEffect = (
      keywordElement: HTMLElement | undefined
    ): void => {
      clearKeywordCursorEffect();
      const prefersReducedMotion =
        doc.defaultView?.matchMedia("(prefers-reduced-motion: reduce)")
          .matches ?? false;
      const cursorView = doc.defaultView;
      let overlayWindow: undefined | Window;
      let overlayDocument: Document | undefined;
      let frameElement: HTMLIFrameElement | undefined;

      try {
        overlayWindow = cursorView?.parent;
        overlayDocument = overlayWindow?.document;
        const candidateFrame = cursorView?.frameElement;
        frameElement =
          candidateFrame?.tagName === "IFRAME"
            ? (candidateFrame as HTMLIFrameElement)
            : undefined;
      } catch {
        overlayWindow = cursorView ?? undefined;
        overlayDocument = doc;
      }

      if (
        !keywordElement ||
        !cursorView ||
        !overlayWindow ||
        !overlayDocument ||
        prefersReducedMotion
      ) {
        return;
      }

      const cursorHost = overlayDocument.createElement("div");
      cursorHost.setAttribute("aria-hidden", "true");
      cursorHost.style.position = "fixed";
      cursorHost.style.inset = "0";
      cursorHost.style.width = "100vw";
      cursorHost.style.height = "100vh";
      cursorHost.style.pointerEvents = "none";
      cursorHost.style.zIndex = "2147483647";
      overlayDocument.documentElement.append(cursorHost);

      keywordCursorHost = cursorHost;
      activeKeywordElement = keywordElement;
      keywordCursorEffect = fairyDustCursor({
        colors: ["#f7edd7", "#86baff", "#7d94b8"],
        element: cursorHost,
      });
      relayKeywordMouseMove = ({ clientX, clientY }) => {
        const frameRect = frameElement?.getBoundingClientRect();
        const scaleX =
          frameRect && cursorView.innerWidth
            ? frameRect.width / cursorView.innerWidth
            : 1;
        const scaleY =
          frameRect && cursorView.innerHeight
            ? frameRect.height / cursorView.innerHeight
            : 1;
        cursorHost.dispatchEvent(
          new overlayWindow.MouseEvent("mousemove", {
            clientX: frameRect ? frameRect.left + clientX * scaleX : clientX,
            clientY: frameRect ? frameRect.top + clientY * scaleY : clientY,
          })
        );
      };
      keywordElement.addEventListener("mousemove", relayKeywordMouseMove);
    };
    const isQuizControl = (target: EventTarget | null): boolean => {
      const element = target as Element | null;
      return Boolean(element?.closest?.('input[type="radio"], button'));
    };
    const selectionIsInQuiz = (quiz: HTMLElement): boolean => {
      const selection = doc.getSelection();

      if (!selection || selection.rangeCount === 0) return false;
      if (
        quiz.contains(selection.anchorNode) ||
        quiz.contains(selection.focusNode)
      ) {
        return true;
      }

      for (
        let rangeIndex = 0;
        rangeIndex < selection.rangeCount;
        rangeIndex++
      ) {
        if (selection.getRangeAt(rangeIndex).intersectsNode(quiz)) return true;
      }

      return false;
    };
    const selectionTouchesQuiz = (target: EventTarget | null): boolean => {
      const quiz = doc.querySelector<HTMLElement>("[data-doors-quiz]");
      const targetNode = target as Node | null;

      return Boolean(
        quiz &&
        ((targetNode && quiz.contains(targetNode)) || selectionIsInQuiz(quiz))
      );
    };
    const onBeforeInput = (event: InputEvent): void => {
      if (!isQuizControl(event.target) && selectionTouchesQuiz(event.target)) {
        event.preventDefault();
      }
    };
    const applyQuizOption = (
      question: HTMLFieldSetElement,
      option: HTMLInputElement
    ): void => {
      question
        .querySelectorAll<HTMLInputElement>('input[type="radio"]')
        .forEach((candidate) => {
          const selected = candidate === option;
          candidate.checked = selected;
        });
    };
    const selectQuizOption = (option: HTMLInputElement): void => {
      const question = option.closest<HTMLFieldSetElement>(
        ".doors-quiz-question"
      );
      if (!question || question.disabled) return;

      const quiz = question.closest<HTMLElement>("[data-doors-quiz]");
      const questions = [
        ...(quiz?.querySelectorAll<HTMLFieldSetElement>(
          ".doors-quiz-question"
        ) ?? []),
      ];
      const questionIndex = questions.indexOf(question);
      if (questionIndex !== -1 && option.dataset.quizOption) {
        activeQuizQuestionIndex = questionIndex;
        selectedQuizAnswers.set(questionIndex, option.dataset.quizOption);
      }
      applyQuizOption(question, option);
    };
    const onKeyDown = (event: KeyboardEvent): void => {
      const answer = (
        event.target as Element | null
      )?.closest<HTMLInputElement>('input.doors-quiz-radio[type="radio"]');
      const quiz =
        answer?.closest<HTMLElement>("[data-doors-quiz]") ??
        doc.querySelector<HTMLElement>("[data-doors-quiz]");
      const questions = [
        ...(quiz?.querySelectorAll<HTMLFieldSetElement>(
          ".doors-quiz-question"
        ) ?? []),
      ];
      const questionIndex = answer
        ? questions.indexOf(
            answer.closest(".doors-quiz-question") as HTMLFieldSetElement
          )
        : activeQuizQuestionIndex;
      const question = questions[questionIndex];
      if (
        question &&
        (answer || doc.activeElement === doc.body) &&
        ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"].includes(event.key)
      ) {
        const options = [
          ...question.querySelectorAll<HTMLInputElement>(
            'input.doors-quiz-radio[type="radio"]'
          ),
        ];
        const selectedValue = selectedQuizAnswers.get(questionIndex);
        const selectedIndex = options.findIndex(
          (option) => option.dataset.quizOption === selectedValue
        );
        const currentIndex = answer
          ? options.indexOf(answer)
          : selectedIndex === -1
            ? 0
            : selectedIndex;
        const step =
          event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
        const next =
          options[(currentIndex + step + options.length) % options.length];
        if (next) {
          event.preventDefault();
          event.stopPropagation();
          selectQuizOption(next);
          next.focus();
        }
        return;
      }

      if (!selectionTouchesQuiz(event.target) || isQuizControl(event.target)) {
        return;
      }

      const key = event.key.toLocaleLowerCase("pt-BR");
      const editShortcut =
        (event.ctrlKey || event.metaKey) &&
        ["a", "b", "i", "s", "u", "v", "x", "y", "z"].includes(key);

      if (
        event.key.length === 1 ||
        ["Backspace", "Delete", "Enter"].includes(event.key) ||
        editShortcut
      ) {
        event.preventDefault();
      }
    };
    const onClipboardEdit = (event: ClipboardEvent): void => {
      if (!isQuizControl(event.target) && selectionTouchesQuiz(event.target)) {
        event.preventDefault();
      }
    };
    const onDrop = (event: DragEvent): void => {
      if (selectionTouchesQuiz(event.target)) event.preventDefault();
    };
    const onBeforeExecCommand = (event: {
      preventDefault: () => void;
    }): void => {
      const quiz = doc.querySelector<HTMLElement>("[data-doors-quiz]");
      if (quiz && selectionIsInQuiz(quiz)) event.preventDefault();
    };
    const applyQuizResult = (
      quiz: HTMLElement,
      score: number,
      total: number
    ): void => {
      const questions = [
        ...quiz.querySelectorAll<HTMLFieldSetElement>(".doors-quiz-question"),
      ];
      questions.forEach((question, index) => {
        const answer = question.dataset.answer || "";
        const selectedValue =
          selectedQuizAnswers.get(index) ??
          question.querySelector<HTMLInputElement>(
            'input.doors-quiz-radio[type="radio"]:checked'
          )?.dataset.quizOption;
        const correctInput = question.querySelector<HTMLInputElement>(
          `[data-quiz-option="${answer}"]`
        );
        correctInput
          ?.closest<HTMLElement>(".doors-quiz-answer")
          ?.classList.add("is-correct");
        if (selectedValue && selectedValue !== answer) {
          question
            .querySelector<HTMLInputElement>(
              `[data-quiz-option="${selectedValue}"]`
            )
            ?.closest<HTMLElement>(".doors-quiz-answer")
            ?.classList.add("is-wrong");
        }
        question.setAttribute("disabled", "");
      });

      const isPerfect = score === total && total > 0;
      const result = quiz.querySelector<HTMLElement>("[data-quiz-result]");
      const submitButton =
        quiz.querySelector<HTMLButtonElement>("[data-quiz-submit]");
      const scoreText = quiz.querySelector<HTMLElement>("[data-quiz-score]");
      const gradeText = quiz.querySelector<HTMLElement>("[data-quiz-grade]");
      const keyRow = quiz.querySelector<HTMLElement>("[data-quiz-key-row]");
      const blockedRow = quiz.querySelector<HTMLElement>("[data-quiz-blocked]");
      const feedback = quiz.querySelector<HTMLElement>("[data-quiz-feedback]");
      const restartButton = quiz.querySelector<HTMLButtonElement>(
        "[data-quiz-restart]"
      );

      const quizNode = quiz;
      quizNode.dataset.quizSubmitted = "true";
      if (result) result.hidden = false;
      if (submitButton) submitButton.hidden = true;
      if (scoreText) scoreText.textContent = `Acertos: ${score}/${total}`;
      if (gradeText) {
        const grade = total ? (score / total) * 10 : 0;
        gradeText.textContent = `Nota: ${grade.toLocaleString("pt-BR", { maximumFractionDigits: 1, minimumFractionDigits: 1 })}`;
      }
      if (keyRow) keyRow.hidden = !isPerfect;
      if (blockedRow) blockedRow.hidden = isPerfect;
      if (feedback) feedback.hidden = isPerfect;
      if (restartButton) restartButton.hidden = isPerfect;
      enableKeywordCursorEffect(
        isPerfect
          ? (keyRow?.querySelector<HTMLElement>(".doors-quiz-key") ?? undefined)
          : undefined
      );
    };

    const submitQuiz = (form: HTMLFormElement, event: Event): void => {
      const quiz = form.closest<HTMLElement>("[data-doors-quiz]");
      if (!quiz) return;

      event.preventDefault();
      if (quiz.dataset.quizSubmitted === "true" || submittedQuizResult) return;

      const questions = [
        ...quiz.querySelectorAll<HTMLFieldSetElement>(".doors-quiz-question"),
      ];
      const score = questions.reduce((correctCount, question, index) => {
        const selectedValue =
          selectedQuizAnswers.get(index) ??
          question.querySelector<HTMLInputElement>(
            'input.doors-quiz-radio[type="radio"]:checked'
          )?.dataset.quizOption;
        return (
          correctCount +
          Number(selectedValue === (question.dataset.answer || ""))
        );
      }, 0);

      submittedQuizResult = { score, total: questions.length };
      applyQuizResult(quiz, score, questions.length);
    };
    const resetQuiz = (quiz: HTMLElement, focusFirstAnswer = true): void => {
      clearKeywordCursorEffect();
      selectedQuizAnswers.clear();
      activeQuizQuestionIndex = 0;
      submittedQuizResult = undefined;
      const quizNode = quiz;
      delete quizNode.dataset.quizSubmitted;

      quiz
        .querySelectorAll<HTMLFieldSetElement>(".doors-quiz-question")
        .forEach((question) => {
          question.removeAttribute("disabled");
          question
            .querySelectorAll<HTMLInputElement>('input[type="radio"]')
            .forEach((option) => {
              option.checked = false;
              option
                .closest<HTMLElement>(".doors-quiz-answer")
                ?.classList.remove("is-correct", "is-wrong");
            });
        });

      const result = quiz.querySelector<HTMLElement>("[data-quiz-result]");
      const submitButton =
        quiz.querySelector<HTMLButtonElement>("[data-quiz-submit]");
      const scoreText = quiz.querySelector<HTMLElement>("[data-quiz-score]");
      const gradeText = quiz.querySelector<HTMLElement>("[data-quiz-grade]");
      const restartButton = quiz.querySelector<HTMLButtonElement>(
        "[data-quiz-restart]"
      );

      if (result) result.hidden = true;
      if (submitButton) submitButton.hidden = false;
      if (scoreText) scoreText.textContent = "";
      if (gradeText) gradeText.textContent = "";
      if (restartButton) restartButton.hidden = true;
      quiz
        .querySelector<HTMLElement>("[data-quiz-key-row]")
        ?.setAttribute("hidden", "");
      quiz
        .querySelector<HTMLElement>("[data-quiz-blocked]")
        ?.setAttribute("hidden", "");
      quiz
        .querySelector<HTMLElement>("[data-quiz-feedback]")
        ?.setAttribute("hidden", "");
      if (focusFirstAnswer) {
        quiz
          .querySelector<HTMLInputElement>(
            'input.doors-quiz-radio[type="radio"]'
          )
          ?.focus();
      }
    };
    const migrateQuizOptions = (quiz: HTMLElement): void => {
      const questions = [
        ...quiz.querySelectorAll<HTMLFieldSetElement>(".doors-quiz-question"),
      ];

      questions.forEach((question, questionIndex) => {
        question
          .querySelectorAll<HTMLButtonElement>("button[data-quiz-option]")
          .forEach((oldButton) => {
            const option = oldButton.dataset.quizOption;
            const answerText = oldButton.querySelector<HTMLElement>(
              ".doors-quiz-answer-text"
            );
            if (!option || !answerText) return;

            const label = doc.createElement("label");
            label.className = oldButton.className;
            const input = doc.createElement("input");
            input.className = "doors-quiz-radio";
            input.dataset.quizOption = option;
            input.name = `doors-quiz-question-${questionIndex + 1}`;
            input.type = "radio";
            input.value = option;
            input.checked = oldButton.getAttribute("aria-checked") === "true";
            answerText.className = "doors-quiz-answer-text";
            label.append(input, answerText);
            oldButton.replaceWith(label);

            if (input.checked) {
              selectedQuizAnswers.set(questionIndex, option);
            }
          });
      });
    };
    const resetLoadedQuizzes = (): void => {
      const quizzes = [
        ...doc.querySelectorAll<HTMLElement>("[data-doors-quiz]"),
      ];

      if (quizzes.length === 0) {
        activeQuizSignature = "";
        selectedQuizAnswers.clear();
        submittedQuizResult = undefined;
        clearKeywordCursorEffect();
        return;
      }

      quizzes.forEach((quiz) => {
        quiz.removeAttribute("contenteditable");
        migrateQuizOptions(quiz);
        const questions = [
          ...quiz.querySelectorAll<HTMLFieldSetElement>(".doors-quiz-question"),
        ];
        const signature = questions
          .map((question) => {
            const legend = question.querySelector("legend")?.textContent ?? "";
            const options = [
              ...question.querySelectorAll<HTMLInputElement>(
                "input[data-quiz-option]"
              ),
            ]
              .map(
                (option) =>
                  `${option.dataset.quizOption}:${option.closest(".doors-quiz-answer")?.textContent}`
              )
              .join("|");
            return `${legend}:${options}`;
          })
          .join("||");

        if (signature !== activeQuizSignature) {
          activeQuizSignature = signature;
          submittedQuizResult = undefined;
          resetQuiz(quiz, false);
          return;
        }

        questions.forEach((question, index) => {
          if (submittedQuizResult) question.setAttribute("disabled", "");
          else question.removeAttribute("disabled");
          const selectedOption = selectedQuizAnswers.get(index);
          const option = selectedOption
            ? question.querySelector<HTMLInputElement>(
                `input[data-quiz-option="${selectedOption}"]`
              )
            : undefined;
          if (option) applyQuizOption(question, option);
        });

        if (submittedQuizResult) {
          applyQuizResult(
            quiz,
            submittedQuizResult.score,
            submittedQuizResult.total
          );
        }
      });
    };

    const onSubmit = (event: Event): void => {
      const form = event.target as HTMLFormElement | null;

      if (form?.matches("form[data-doors-quiz-form]")) {
        submitQuiz(form, event);
      }
    };

    const onClick = (event: MouseEvent): void => {
      const target = event.target as Element | null;
      const button = target?.closest<HTMLButtonElement>(
        "[data-quiz-submit], [data-quiz-restart]"
      );

      if (!button) return;

      const quiz = button.closest<HTMLElement>("[data-doors-quiz]");
      if (!quiz) return;

      if (button.matches("[data-quiz-submit]")) {
        const form = button.closest<HTMLFormElement>("form");
        if (form) submitQuiz(form, event);
      } else {
        event.preventDefault();
        resetQuiz(quiz);
      }
      event.stopPropagation();
    };
    const onQuizChange = (event: Event): void => {
      const option = (
        event.target as Element | null
      )?.closest<HTMLInputElement>('input.doors-quiz-radio[type="radio"]');
      if (option) selectQuizOption(option);
    };

    editor?.on("SetContent", resetLoadedQuizzes);
    editor?.on("BeforeExecCommand", onBeforeExecCommand);
    resetLoadedQuizzes();
    doc.addEventListener("beforeinput", onBeforeInput, true);
    doc.defaultView?.addEventListener("keydown", onKeyDown, true);
    doc.addEventListener("cut", onClipboardEdit, true);
    doc.addEventListener("paste", onClipboardEdit, true);
    doc.addEventListener("drop", onDrop, true);
    doc.addEventListener("submit", onSubmit);
    doc.addEventListener("change", onQuizChange, true);
    doc.defaultView?.addEventListener("click", onClick, true);

    return () => {
      editor?.off("SetContent", resetLoadedQuizzes);
      editor?.off("BeforeExecCommand", onBeforeExecCommand);
      doc.removeEventListener("beforeinput", onBeforeInput, true);
      doc.defaultView?.removeEventListener("keydown", onKeyDown, true);
      doc.removeEventListener("cut", onClipboardEdit, true);
      doc.removeEventListener("paste", onClipboardEdit, true);
      doc.removeEventListener("drop", onDrop, true);
      doc.removeEventListener("submit", onSubmit);
      doc.removeEventListener("change", onQuizChange, true);
      doc.defaultView?.removeEventListener("click", onClick, true);
      clearKeywordCursorEffect();
    };
  }, [editor]);

  const returnToHome = (): void => {
    if (editor?.isDirty()) {
      setShowReturnPrompt(true);
      return;
    }

    setProcessUrl(id, "");
  };
  const discardAndReturn = (): void => {
    setShowReturnPrompt(false);
    setProcessUrl(id, "");
  };

  return (
    <AppContainer {...containerProps} StyledComponent={StyledTextos}>
      <TextosRibbon editor={editor} id={id} onReturnToModels={returnToHome} />
      <div className="textos-workspace">
        <div aria-hidden="true" className="textos-ruler">
          <img alt="" src="/System/Doors/textos/vertical-ruler.svg" />
        </div>
        <div className="textos-page-scroll">
          <div className="textos-paper">
            <div id={id} />
          </div>
        </div>
      </div>
      {showReturnPrompt && (
        <div className="textos-return-dialog-backdrop">
          <section
            aria-labelledby={`${id}-return-title`}
            aria-modal="true"
            className="textos-return-dialog"
            role="dialog"
          >
            <h2 id={`${id}-return-title`}>Voltar à tela inicial?</h2>
            <p>As alterações não salvas serão descartadas.</p>
            <div className="textos-return-dialog-actions">
              <button onClick={() => setShowReturnPrompt(false)} type="button">
                Continuar editando
              </button>
              <button onClick={discardAndReturn} type="button">
                Voltar sem salvar
              </button>
            </div>
          </section>
        </div>
      )}
    </AppContainer>
  );
};

const Textos: FC<ComponentProcessProps> = ({ id }) => {
  const { url = "" } = useProcess(id);

  return url ? <TextosDocument id={id} /> : <TextosModels id={id} />;
};

export default Textos;
