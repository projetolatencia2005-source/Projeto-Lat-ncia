import { type FormEvent, type ReactElement, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useBrowserTabs from "components/apps/Browser/BrowserTabsContext";
import { SITE_URLS } from "components/apps/Browser/config";
import { recordDoorsKeyword } from "utils/doorsKeywords";

const ASSETS = "/System/Doors/sites/youspace/";
const LOGO = "/System/Doors/sites/youspace-logo-pixel.png";
const REACTION_ASSETS = "/System/Doors/sites/reactions";

type Video = {
  id: string;
  title: string;
  creator: string;
  views: string;
  duration: string;
  category: string;
  image: string;
  avatar?: string;
  description: string;
  videoSrc?: string;
};

type CommentReply = { author: string; age: string; color?: string; keywordId?: number; text: string; };

type Comment = {
  id: number;
  author: string;
  age: string;
  text: string;
  color: string;
  likes: number;
  replies?: CommentReply[];
};

const videos: Video[] = [
  { id: "eles-sabem", title: "A verdade que eles não te contam, mas nós vamso te contar, porque nós não somos eles!!", creator: "eles.sabem", views: "10,1 mil", duration: "4:45", category: "Comédia", image: "thumbb.png", avatar: "perfil.png", videoSrc: `${ASSETS}verdade-internet.mp4`, description: "Um vídeo que mostra tudo o que ninguém conta. Assista até o final e descubra a verdade." },
  { id: "ensaio-banda", title: "ensaio de banda de garagem (deu tudo errado)", creator: "mari.mp3", views: "3,4 mil", duration: "4:38", category: "Música", image: "banda.png", description: "Primeiro ensaio com todo mundo junto, numa sala emprestada. O som ficou estranho e a viola desafinou no meio." },
  { id: "skate-amigos", title: "um dia inteiro andando de skate com meus amigos", creator: "guizera1993", views: "900", duration: "6:09", category: "Esportes", image: "skate.png", description: "Meu amigo tentando fazer uma manobra. Demorou, mas caiu no final." },
  { id: "role-centro", title: "rolê no centro gravando com uma câmera velha", creator: "nat.videos", views: "610", duration: "3:04", category: "Vlogs", image: "role-centro.png", description: "Passeio no centro, na Fonte da Fonte. A câmera é velha e a imagem ficou com chuviscos." },
  { id: "cachorro", title: "meu cachorro tentando pegar o chinelo", creator: "tiaguinho.x", views: "2,1 mil", duration: "0:47", category: "Comédia", image: "cachorro.png", description: "Ele faz isso todo dia e nunca desiste. Hoje eu resolvi filmar porque o vídeo parou de funcionar." },
  { id: "festa-junina", title: "Festa Junina da escola, minha mãe filmou", creator: "dudu_rj", views: "880", duration: "8:31", category: "Vlogs", image: "festa-junina.png", description: "Todo mundo passando no final da festa. Minha mãe pediu para eu guardar a câmera." },
  { id: "webcam", title: "minha avó descobrindo a webcam kkkkk", creator: "lu.fernandes", views: "4,2 mil", duration: "2:19", category: "Tecnologia", image: "webcam.png", description: "Minha avó descobrindo a webcam pela primeira vez. Ela olha para a câmera e começa a rir." },
  { id: "bicicleta", title: "a primeira vez que eu andei de bicicleta sem rodinha!!", creator: "gabi.santos", views: "1,1 mil", duration: "1:56", category: "Vlogs", image: "bicicleta.png", description: "Meu pai tirou as rodinhas no meio da manhã e eu não achei que ia conseguir." },
  { id: "chuveiro", title: "meu irmão cantando no chuveiro (não me mata natan)", creator: "tati.oliveira", views: "4,8 mil", duration: "1:23", category: "Comédia", image: "chuveiro.png", description: "Gravei enquanto ninguém estava vendo. Não sei se ele percebeu a câmera no final." },
];

const categories = ["Todos", "Música", "Vlogs", "Esportes", "Comédia", "Tecnologia"];
const starterComments: Comment[] = [
  { id: 1, author: "lu.fernandes", age: "1 semana", text: "Eu assisti até o final, cadê minha palavra-chave???", color: "#74ed55", likes: 12, replies: [{ author: "Chumbobagoso", age: "1 semana", color: "#6b7392", keywordId: 6, text: "A palavra piscou bem rápido no vídeo, parecia mensagem subliminar, no minuto 2:31. A palavra é Sinal" }] },
  { id: 2, author: "joao.oliveira", age: "1 semana", text: "Não acredito que fui enganado esse tempo todo, obrigado por mostrar a VERDADE. +1 INSCRITO", color: "#214bff", likes: 8 },
  { id: 3, author: "mariana.mp3", age: "2 semanas", text: "Faz um vídeo sobre como os computadores mudaram a nossa vida. Manda um salve!", color: "#ff3333", likes: 5 },
  { id: 4, author: "gui1993", age: "2 semanas", text: "MANO!!! Eu sabia que tinha alguma coisa estranha com essa internet!!!", color: "#ffdf00", likes: 3 },
  { id: 5, author: "eliaszinho", age: "1 mês", text: "O vídeo é muito bom. Só add com som, quer ter?", color: "#00bdd4", likes: 1 },
];

const Root = styled.div`
  background: #fff;
  color: #151515;
  font-family: "Pixelify Sans", monospace;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100%;
  overflow: visible;
  width: 100%;
  *, *::before, *::after { box-sizing: border-box; }
  button, input, textarea { font: inherit; }
  button { cursor: url("/System/Doors/cursors/hand.svg") 0 0, none; }
  .ry-topbar { align-items: center; background: #f5f5f5; border-bottom: 2px solid #222; display: grid; grid-template-columns: 1fr minmax(260px, 36vw) 1fr; min-height: 62px; padding: 8px 22px; }
  .ry-home { background: transparent; border: 0; justify-self: start; padding: 0; }
  .ry-logo { display: block; height: auto; max-height: 42px; max-width: 170px; object-fit: contain; object-position: left center; width: 100%; }
  .ry-search { display: flex; height: 42px; min-width: 0; position: relative; }
  .ry-search input { background: #fff; border: 2px solid #222; border-right: 0; min-width: 0; padding: 0 12px; width: 100%; }
  .ry-search > button { align-items: center; background: #f5f5f5; border: 2px solid #222; display: grid; flex: 0 0 44px; height: 42px; margin-left: 0; place-items: center; position: relative; width: 44px; z-index: 1; }
  .ry-search > button img { height: 20px; object-fit: contain; width: 20px; }
  .ry-suggestions { background: #fff; border: 2px solid #222; left: 0; max-height: 260px; overflow: auto; position: absolute; right: 0; top: calc(100% + 3px); z-index: 5; }
  .ry-suggestions button { background: #fff; border: 0; border-bottom: 1px solid #ccc; display: block; padding: 10px; text-align: left; width: 100%; }
  .ry-user { justify-self: end; }
  .ry-user button { align-items: center; background: transparent; border: 0; border-radius: 0; display: grid; height: 42px; padding: 0; place-items: center; width: 42px; }
  .ry-user button img { display: block; height: 42px; object-fit: contain; width: 42px; }
  .ry-page { flex: 1 0 auto; margin: 0 auto; max-width: 1760px; padding: clamp(24px, 3.5vw, 64px) clamp(20px, 3.8vw, 72px); }
  .ry-layout { display: grid; gap: clamp(28px, 5vw, 90px); grid-template-columns: minmax(0, 1fr) minmax(260px, 0.32fr); }
  .ry-main { min-width: 0; }
  .ry-heading { align-items: end; border-bottom: 4px solid #ff3038; display: flex; gap: 16px; justify-content: space-between; margin-bottom: 30px; padding-bottom: 14px; }
  .ry-heading small { color: #ff3038; font-size: 14px; }
  .ry-heading h1 { font-size: clamp(26px, 2.4vw, 42px); line-height: 1.05; margin: 2px 0 0; }
  .ry-found { font-size: 16px; padding-bottom: 8px; white-space: nowrap; }
  .ry-categories { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 36px; }
  .ry-button { background: #ff3038; border: 2px solid #111; box-shadow: 5px 5px 0 #111; color: #fff; font-size: 17px; min-height: 52px; padding: 10px 18px; }
  .ry-button[aria-pressed="true"] { background: #ef242d; }
  .ry-video-grid { display: grid; gap: 30px 22px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ry-video-card { min-width: 0; }
  .ry-thumbnail { background: #111; border: 2px solid #111; box-shadow: 5px 5px 0 #111; display: block; margin: 0 7px 14px 0; overflow: hidden; padding: 0; position: relative; width: calc(100% - 7px); }
  .ry-thumbnail img { aspect-ratio: 16 / 9; display: block; height: auto; object-fit: cover; transition: opacity .12s ease; width: 100%; }
  .ry-thumbnail:hover img { opacity: .9; }
  .ry-duration { background: #111; bottom: 4px; color: white; font-size: 13px; padding: 2px 5px; position: absolute; right: 4px; }
  .ry-video-title { color: #0872d1; display: block; font-size: clamp(14px, 1vw, 18px); line-height: 1.35; margin: 0 3px 10px; text-decoration: underline; text-underline-offset: 2px; }
  .ry-video-meta { font-size: 13px; margin: 0 3px; }
  .ry-video-meta a { color: #0872d1; }
  .ry-sidebar { display: grid; gap: 28px; align-content: start; }
  .ry-panel { border: 2px solid #111; box-shadow: 5px 5px 0 #111; }
  .ry-panel h2 { background: #ff3038; border-bottom: 2px solid #111; color: #fff; font-size: 22px; margin: 0; padding: 14px 18px; text-align: center; }
  .ry-panel-body { padding: 14px 18px; }
  .ry-toplist { list-style: none; margin: 0; padding: 0; }
  .ry-toplist li { align-items: center; border-bottom: 1px solid #aaa; display: grid; gap: 12px; grid-template-columns: 44px 1fr; padding: 10px 0; }
  .ry-toplist li:last-child { border-bottom: 0; }
  .ry-rank { align-items: center; background: #ff3038; border: 2px solid #111; box-shadow: 3px 3px 0 #111; color: white; display: flex; font-size: 21px; height: 40px; justify-content: center; }
  .ry-toplist button { background: none; border: 0; line-height: 1.3; padding: 0; text-align: left; text-decoration: underline; text-underline-offset: 2px; }
  .ry-tag-list { display: flex; flex-wrap: wrap; gap: 10px; }
  .ry-tag-list button { background: #ff3038; border: 2px solid #111; box-shadow: 3px 3px 0 #111; color: #fff; padding: 7px 10px; }
  .ry-tag-list .ry-trending-reset { background: #f5f5f5; color: #111; flex: 1 0 100%; text-align: center; }
  .ry-load-area { align-items: center; display: flex; flex-direction: column; margin: 42px auto 0; max-width: 680px; }
  .ry-load-area > .ry-button { position: relative; top: 20px; }
  .ry-load-message { margin: 90px 0 0; text-align: center; }
  .ry-footer { align-items: center; background: #f2f2f2; border-top: 2px solid #222; display: flex; gap: 42px; margin-top: auto; min-height: 96px; padding: 18px clamp(20px, 3vw, 50px); }
  .ry-footer img { height: auto; max-width: 170px; width: 100%; }
  .ry-footer nav { display: flex; gap: 24px; }
  .ry-footer a { color: #647c9b; text-decoration: none; }
  .ry-footer small { color: #647c9b; margin-left: auto; }
  .ry-watch { align-items: start; display: grid; gap: 48px; grid-template-columns: minmax(0, 981px) minmax(270px, 1fr); }
  .ry-watch-main, .ry-watch-side { align-self: start; min-width: 0; }
  .ry-player { aspect-ratio: 16 / 9; background: #101010; border: 5px solid #111; box-shadow: 5px 5px 0 #111; justify-self: stretch; margin-top: 0; overflow: hidden; position: relative; width: 100%; }
  .ry-watch-title, .ry-watch-meta, .ry-comments { width: 100%; }
  .ry-player > img { display: block; height: 100%; object-fit: contain; width: 100%; }
  .ry-player > video { background: #101010; display: block; height: 100%; object-fit: contain; width: 100%; }
  .ry-play { align-items: center; background: transparent; border: 0; display: grid; height: 66px; left: 50%; padding: 0; place-items: center; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 66px; }\n  .ry-play img { display: block; height: 100%; image-rendering: pixelated; width: 100%; }
  .ry-player-feedback { align-items: center; background: rgb(0 0 0 / 62%); color: white; display: flex; flex-direction: column; gap: 14px; inset: 0; justify-content: center; padding: 20px; position: absolute; text-align: center; }
  .ry-player-feedback--error { background: rgb(0 0 0 / 72%); }
  .ry-spinner { animation: ry-spin .8s linear infinite; border: 4px solid #fff7; border-radius: 50%; border-top-color: #fff; height: 36px; width: 36px; }
  @keyframes ry-spin { to { transform: rotate(360deg); } }
  .ry-watch-title { border-bottom: 2px solid #aaa; font-size: clamp(23px, 1.7vw, 30px); line-height: 1.25; margin: 18px 0 12px; padding-bottom: 12px; }
  .ry-watch-meta { align-items: center; border-bottom: 2px solid #aaa; display: flex; gap: 18px; min-height: 72px; padding: 10px 0; }
  .ry-channel-avatar { background: #ddd; border: 2px solid #111; border-radius: 0; height: 56px; object-fit: cover; width: 56px; }
  .ry-watch-meta .ry-subscribe { background: #ff3038; border: 2px solid #111; box-shadow: 5px 5px 0 #111 !important; color: white; margin: 0 0 6px 8px; padding: 9px 13px; }
  .ry-watch-meta .ry-subscribe.is-subscribed { background: #b8b8b8; color: #222; }
  .ry-watch-actions { display: flex; gap: 16px; margin-left: auto; }
  .ry-watch-actions button { align-items: center; background: transparent; border: 0; display: inline-flex; flex-direction: row; gap: 6px; padding: 4px; white-space: nowrap; }
  .ry-comment-actions button { align-items: center; background: transparent; border: 0; display: inline-flex; flex-direction: column; gap: 2px; padding: 4px; }
  .ry-comment-actions .ry-comment-like { flex-direction: row; gap: 5px; }
  .ry-watch-actions img, .ry-comment-actions img { height: 18px; width: 18px; }
  .ry-comments { border: 2px solid #111; box-shadow: 4px 4px 0 #111; margin-top: 22px; padding: 18px; }
  .ry-comments h2 { font-size: 22px; margin: 0 0 16px; }
  .ry-comment-composer { align-items: center; background: #f6f6f6; border: 2px solid #111; box-shadow: 3px 3px 0 #111; display: flex; gap: 8px; margin-bottom: 20px; padding: 8px; }
  .ry-comment-composer textarea { background: transparent; border: 0; min-height: 42px; padding: 10px; resize: vertical; width: 100%; }
  .ry-comment-composer button { align-items: center; background: transparent; border: 0; box-shadow: none; display: flex; height: 38px; justify-content: center; padding: 0; width: 38px; }
  .ry-comment-composer button img { height: 22px; width: 22px; }
  .ry-comment-list { display: grid; gap: 18px; }
  .ry-comment-thread { display: grid; gap: 0; }
  .ry-comment { background: #fff; border: 2px solid #111; box-shadow: 4px 4px 0 #111; display: grid; gap: 12px; grid-template-columns: 36px minmax(0, 1fr); padding: 12px; }
  .ry-comment-color { border: 0; height: 36px; width: 36px; }
  .ry-comment-author { font-size: 12px; }
  .ry-comment-text { margin: 3px 0 8px; }
  .ry-comment-keyword { align-items: center; background: transparent; border: 0; color: #0872d1; display: inline-flex; gap: 3px; padding: 0; text-decoration: underline; text-underline-offset: 2px; vertical-align: middle; }
  .ry-comment-key-icon { display: inline-block; flex: 0 0 12px; height: 12px; vertical-align: middle; width: 12px; }
  .ry-comment-actions, .ry-reply-actions { align-items: center; display: flex; gap: 14px; margin: 5px 0 10px; min-height: 24px; }
  .ry-comment-actions button, .ry-reply-actions button { align-items: center; background: transparent; border: 0; display: inline-flex; justify-content: center; min-height: 24px; padding: 2px; }
  .ry-comment-actions .ry-comment-like { flex-direction: row; gap: 5px; }
  .ry-comment-actions .ry-reply { font-size: 13px; padding: 0; position: relative; text-decoration: none; top: 0; }
  .ry-reply-list { display: grid; gap: 10px; margin: 2px 0 0 34px; }
  .ry-reply-thread { display: grid; gap: 0; }
  .ry-comment--reply { min-height: 0; }
  .ry-reply-actions { gap: 12px; margin: 5px 0 0; }
  .ry-reply-actions img { height: 18px; width: 18px; }
  .ry-reply-actions .ry-dislike img { transform: rotate(180deg); }
  .ry-comment-count { position: static; }
  .ry-related { display: grid; gap: 18px; }
  .ry-related-card { display: grid; gap: 12px; grid-template-columns: minmax(130px, 42%) minmax(0, 1fr); }
  .ry-related-card button { background: #111; border: 2px solid #111; box-shadow: 5px 5px 0 #111; padding: 0; }
  .ry-related-card img { aspect-ratio: 16 / 9; display: block; object-fit: cover; width: 100%; }
  .ry-related-card a { color: #0872d1; line-height: 1.3; text-decoration: underline; }
  .ry-related-card p { font-size: 13px; margin: 6px 0 0; }
  @media (max-width: 1050px) {
    .ry-layout { grid-template-columns: minmax(0, 1fr) 280px; gap: 24px; }
    .ry-video-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .ry-watch { gap: 28px; grid-template-columns: minmax(0, 1fr); }
    .ry-watch-side { border-top: 2px solid #aaa; padding-top: 20px; }
  }
  @media (min-width: 1051px) and (max-width: 1350px) {
    .ry-watch { gap: 28px; }
  }
  @media (max-width: 700px) {
    .ry-topbar { gap: 10px; grid-template-columns: minmax(0, 1fr) auto; padding: 8px 12px; }
    .ry-logo { max-width: 140px; }
    .ry-search { grid-column: 1 / -1; grid-row: 2; }
    .ry-user { grid-column: 2; grid-row: 1; }
    .ry-page { padding: 24px 14px; }
    .ry-layout { grid-template-columns: minmax(0, 1fr); }
    .ry-sidebar { grid-template-columns: minmax(0, 1fr); }
    .ry-video-grid { grid-template-columns: minmax(0, 1fr); gap: 26px; }
    .ry-heading { align-items: flex-start; flex-direction: column; gap: 6px; }
    .ry-found { padding: 0; }
    .ry-categories { gap: 10px; }
    .ry-button { flex: 1 1 auto; min-height: 44px; padding: 8px 10px; }
    .ry-footer { align-items: flex-start; flex-wrap: wrap; gap: 16px 22px; }
    .ry-footer nav { flex-wrap: wrap; gap: 12px; }
    .ry-footer small { flex: 1 0 100%; margin-left: 0; }
    .ry-related-card { grid-template-columns: minmax(120px, 40%) minmax(0, 1fr); }
  }
  /* Keep the category choices in one horizontal row in 4:3 layouts. */
  @media (min-aspect-ratio: 1/1) and (max-aspect-ratio: 4/3) {
    .ry-categories {
      flex-wrap: nowrap;
      gap: clamp(8px, 1vw, 12px);
      justify-content: flex-start;
      margin-bottom: 31px;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0 5px 5px 0;
      scrollbar-width: none;
      width: 100%;
    }

    .ry-categories::-webkit-scrollbar {
      display: none;
    }

    .ry-button {
      box-shadow: 3px 3px 0 #111;
      flex: 0 0 auto;
      font-size: clamp(12px, 1.1vw, 15px);
      min-height: 46px;
      padding: 8px clamp(14px, 1.55vw, 20px);
      white-space: nowrap;
    }
  }

  /* Keep the YouSpace player beside its related videos on 4:3 desktop screens. */
  @media (min-width: 901px) and (min-aspect-ratio: 1/1) and (max-aspect-ratio: 4/3) {
    .ry-watch {
      gap: clamp(18px, 2.2vw, 28px);
      grid-template-columns: minmax(0, 1.55fr) minmax(250px, 0.9fr);
    }

    .ry-watch-main,
    .ry-watch-side {
      min-width: 0;
    }

    .ry-watch-side {
      border-left: 2px solid #c7c7c7;
      border-top: 0;
      padding: 0 0 20px clamp(14px, 1.8vw, 22px);
    }

    .ry-related {
      gap: clamp(14px, 1.8vw, 20px);
    }

    .ry-related-card {
      gap: clamp(8px, 1vw, 12px);
      grid-template-columns: minmax(100px, 42%) minmax(0, 1fr);
    }

    .ry-related-card button {
      min-width: 0;
    }

    .ry-related-card a {
      display: block;
      font-size: clamp(12px, 1.05vw, 15px);
      line-height: 1.25;
      overflow-wrap: anywhere;
    }

    .ry-related-card p {
      font-size: clamp(10px, 0.86vw, 12px);
      line-height: 1.2;
    }
  }

`;

const Icon = ({ kind, active = false }: { kind: "like" | "dislike" | "comment"; active?: boolean }): ReactElement => {
  const iconName =
    kind === "comment"
      ? "comentário.svg"
      : kind === "like"
        ? active
          ? "like_confirm.svg"
          : "like.svg"
        : active
          ? "unlike_confirm.svg"
          : "unlike.svg";

  return <img alt="" aria-hidden="true" src={`${REACTION_ASSETS}/${iconName}`} />;
};

const YouSpacePage = ({ url }: { url: string }): ReactElement => {
  const browserTabs = useBrowserTabs();
  const navigate = useCallback((next: string): void => { browserTabs?.navigate(next); }, [browserTabs]);
  const path = useMemo(() => {
    try { return new URL(url).pathname.replace(/^\/+|\/+$/g, ""); } catch { return ""; }
  }, [url]);
  const videoId = path.startsWith("watch/") ? path.slice("watch/".length) : "";
  const activeVideo = videos.find((video) => video.id === videoId);
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "error">("idle");
  const [playerState, setPlayerState] = useState<
    "idle" | "loading" | "error" | "playing"
  >("idle");
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [draft, setDraft] = useState("");
  const [replyDraft, setReplyDraft] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [commentsByVideo, setCommentsByVideo] = useState<Record<string, Comment[]>>(() => ({
    "eles-sabem": [...starterComments],
  }));
  const [commentLikes, setCommentLikes] = useState<number[]>([]);
  const [commentDislikes, setCommentDislikes] = useState<number[]>([]);
  const [replyLikes, setReplyLikes] = useState<string[]>([]);
  const [replyDislikes, setReplyDislikes] = useState<string[]>([]);
  const visibleVideos = useMemo(() => videos.filter((video) => (category === "Todos" || video.category === category) && `${video.title} ${video.creator} ${video.category}`.toLowerCase().includes(search.toLowerCase())), [category, search]);
  const suggestions = useMemo(() => videos.filter((video) => search.trim() && video.title.toLowerCase().includes(search.toLowerCase())).slice(0, 4), [search]);

  useEffect(() => {
    if (
      playerState === "idle" ||
      playerState === "playing" ||
      activeVideo?.videoSrc
    ) {
      return undefined;
    }
    if (playerState === "loading") {
      const timer = window.setTimeout(() => setPlayerState("error"), 850);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => navigate(SITE_URLS.youspace), 1700);
    return () => window.clearTimeout(timer);
  }, [activeVideo?.videoSrc, navigate, playerState]);

  const openVideo = (id: string): void => {
    setPlayerState("idle");
    setLiked(false);
    setDisliked(false);
    setReplyingTo(null);
    setReplyDraft("");
    navigate(`${SITE_URLS.youspace}watch/${id}`);
  };

  const submitComment = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!draft.trim() || !activeVideo) return;
    const videoId = activeVideo.id;
    setCommentsByVideo((current) => ({
      ...current,
      [videoId]: [...(current[videoId] || []), { id: Date.now(), author: "Você", age: "agora", text: draft.trim(), color: "#71d65c", likes: 0 }],
    }));
    setDraft("");
  };

  const submitReply = (event: FormEvent<HTMLFormElement>, commentId: number): void => {
    event.preventDefault();
    if (!replyDraft.trim() || !activeVideo) return;
    const videoId = activeVideo.id;
    setCommentsByVideo((current) => ({
      ...current,
      [videoId]: (current[videoId] || []).map((comment) => comment.id === commentId ? { ...comment, replies: [...(comment.replies || []), { author: "Você", age: "agora", text: replyDraft.trim() }] } : comment),
    }));
    setReplyDraft("");
    setReplyingTo(null);
  };

  const activeComments = activeVideo ? commentsByVideo[activeVideo.id] || [] : [];
  const seededVideo = activeVideo?.id === "eles-sabem";
  const commentCount = activeVideo
    ? (seededVideo ? 34 : 0) + Math.max(0, activeComments.length - (seededVideo ? starterComments.length : 0))
    : 0;
  const renderCommentText = (comment: Pick<Comment, "id" | "text">): ReactNode => {
    if (comment.id !== 6) return comment.text;
    return comment.text.split(/(Sinal)/g).map((part, index) =>
      part === "Sinal" ? (
        <button
          aria-label="Coletar a palavra-chave Sinal"
          className="ry-comment-keyword"
          key={`sinal-${index}`}
          onClick={() => recordDoorsKeyword("Sinal")}
          type="button"
        >
          {part}
          <svg aria-hidden="true" className="ry-comment-key-icon" viewBox="0 0 32 32">
            <circle cx="10" cy="12" fill="#f6c344" r="7" stroke="#31302c" strokeWidth="2" />
            <circle cx="10" cy="12" fill="#fff4d0" r="2.4" stroke="#31302c" strokeWidth="1.5" />
            <path d="M16 12h14v4h-4v4h-4v-4h-6z" fill="#f6c344" stroke="#31302c" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
      ) : part
    );
  };
  const searchForm = (event: FormEvent<HTMLFormElement>): void => { event.preventDefault(); setSearchOpen(false); };
  const resetTrending = (): void => {
    setCategory("Todos");
    setSearch("");
    setSearchOpen(false);
    setLoadState("idle");
  };

  return (
    <Root>
      <header className="ry-topbar">
        <button aria-label="Início do YouSpace" className="ry-home" onClick={() => { resetTrending(); setPlayerState("idle"); navigate(SITE_URLS.youspace); }} type="button"><img alt="YouSpace" className="ry-logo" src={LOGO} /></button>
        <form className="ry-search" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false); }} onSubmit={searchForm}>
          <input aria-label="Pesquisar vídeos" onChange={(event) => { setSearch(event.currentTarget.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} placeholder="Pesquisar" value={search} />
          <button aria-label="Pesquisar" type="submit"><img alt="" src="/System/Doors/search.svg" /></button>
          {searchOpen && suggestions.length > 0 && <div className="ry-suggestions">{suggestions.map((video) => <button key={video.id} onClick={() => openVideo(video.id)} type="button">{video.title}</button>)}</div>}
        </form>
        <div className="ry-user"><button aria-label="Conta do YouSpace" type="button"><img alt="" src="/System/Doors/sites/youspace/perfil-youtube.svg" /></button></div>
      </header>

      {!activeVideo && (
        <div className="ry-page ry-layout">
          <main className="ry-main">
            <div className="ry-heading"><div><small>HOJE</small><h1>Vídeos em alta</h1></div><span className="ry-found">{visibleVideos.length} vídeos encontrados</span></div>
            <nav aria-label="Categorias de vídeo" className="ry-categories">{categories.map((item) => <button aria-pressed={category === item} className="ry-button" key={item} onClick={() => { setCategory(item); if (item === "Todos") setSearch(""); }} type="button">{item}</button>)}</nav>
            <div className="ry-video-grid">{visibleVideos.map((video) => <article className="ry-video-card" key={video.id}>
              <button aria-label={`Assistir ${video.title}`} className="ry-thumbnail" onClick={() => openVideo(video.id)} type="button"><img alt={video.title} src={`${ASSETS}${video.image}`} /><span className="ry-duration">{video.duration}</span></button>
              <a className="ry-video-title" href={`${SITE_URLS.youspace}watch/${video.id}`} onClick={(event) => { event.preventDefault(); openVideo(video.id); }}>{video.title}</a>
              <p className="ry-video-meta">por <a href="#creator" onClick={(event) => event.preventDefault()}>{video.creator}</a> · {video.views} visualizações</p>
            </article>)}</div>
            <div className="ry-load-area"><button className="ry-button" disabled={loadState === "loading"} onClick={() => { setLoadState("loading"); window.setTimeout(() => setLoadState("error"), 900); }} type="button">{loadState === "loading" ? "Carregando..." : loadState === "error" ? "Erro ao carregar" : "Carregar mais vídeos"}</button>{loadState === "error" && <p aria-live="polite" className="ry-load-message">Não foi possível carregar mais vídeos. Tente novamente.</p>}</div>
          </main>
          <aside className="ry-sidebar">
            <section className="ry-panel"><h2>Bem-vindo ao YouSpace!</h2><div className="ry-panel-body">Vídeos, histórias e momentos compartilhados.</div></section>
            <section className="ry-panel"><h2>Mais assistidos hoje</h2><div className="ry-panel-body"><ol className="ry-toplist">{videos.slice(0, 5).map((video, index) => <li key={video.id}><span className="ry-rank">{index + 1}</span><button onClick={() => openVideo(video.id)} type="button">{video.title}</button></li>)}</ol></div></section>
            <section className="ry-panel"><h2>Buscas populares</h2><div className="ry-panel-body ry-tag-list"><button className="ry-trending-reset" onClick={resetTrending} type="button">Voltar para vídeos em alta</button>{["videoclipes", "skate", "vlog", "engraçado", "games", "amigos", "tutorial", "escola"].map((tag) => <button key={tag} onClick={() => { setSearch(tag); setCategory("Todos"); }} type="button">{tag}</button>)}</div></section>
          </aside>
        </div>
      )}

      {activeVideo && (
        <div className="ry-page ry-watch">
          <main className="ry-watch-main">
            <section aria-label="Player de vídeo" className="ry-player">
              {activeVideo.videoSrc && playerState === "playing" ? (
                <video
                  autoPlay
                  controls
                  playsInline
                  preload="metadata"
                  poster={`${ASSETS}${activeVideo.image}`}
                  src={activeVideo.videoSrc}
                  onError={() => setPlayerState("error")}
                />
              ) : (
                <img alt={activeVideo.title} src={`${ASSETS}${activeVideo.image}`} />
              )}
              {playerState === "idle" && (
                <button
                  aria-label="Reproduzir vídeo"
                  className="ry-play"
                  onClick={() =>
                    setPlayerState(activeVideo.videoSrc ? "playing" : "loading")
                  }
                  type="button"
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    src={`${REACTION_ASSETS}/play.svg`}
                  />
                </button>
              )}
              {playerState === "loading" && <div className="ry-player-feedback"><span className="ry-spinner" /><span>Carregando vídeo...</span></div>}
              {playerState === "error" && (
                <div
                  aria-live="assertive"
                  className="ry-player-feedback ry-player-feedback--error"
                >
                  <strong>Erro</strong>
                  <span>
                    {activeVideo.videoSrc
                      ? "Não foi possível reproduzir o vídeo."
                      : "Erro ao carregar o vídeo. Voltando ao início do YouSpace."}
                  </span>
                </div>
              )}
            </section>
            <h1 className="ry-watch-title">{activeVideo.title}</h1>
            <section className="ry-watch-meta">
              <img alt="Canal" className="ry-channel-avatar" src={`${ASSETS}${activeVideo.avatar ?? "perfil-youtube.svg"}`} />
              <div><strong>{activeVideo.creator}</strong><div>{activeVideo.views} visualizações</div></div>
              <button aria-pressed={subscribed} className={`ry-subscribe${subscribed ? " is-subscribed" : ""}`} onClick={() => setSubscribed((current) => !current)} type="button">{subscribed ? "INSCRITO" : "INSCREVA-SE"}</button>
              <div className="ry-watch-actions"><button aria-pressed={liked} onClick={() => { setLiked((current) => !current); setDisliked(false); }} type="button"><Icon active={liked} kind="like" />{liked ? "67" : "66"}</button><button aria-pressed={disliked} className="ry-dislike" onClick={() => { setDisliked((current) => !current); setLiked(false); }} type="button"><Icon active={disliked} kind="dislike" />{disliked ? "13" : "12"}</button><button aria-label="Comentários" onClick={() => document.getElementById("ry-comments")?.scrollIntoView({ behavior: "smooth" })} type="button"><Icon kind="comment" />{commentCount}</button></div>
            </section>
            <section aria-label="Comentários do vídeo" className="ry-comments" id="ry-comments">
              <h2>{commentCount} comentários</h2>
              <form className="ry-comment-composer" onSubmit={submitComment}><textarea aria-label="Deixe seu comentário" onChange={(event) => setDraft(event.currentTarget.value)} placeholder="Deixe seu comentário..." value={draft} /><button aria-label="Publicar comentário" type="submit"><img alt="" aria-hidden="true" src="/System/Doors/sites/reactions/comentário.svg" /></button></form>
              {activeComments.length > 0 && (
                <div className="ry-comment-list">
                  {activeComments.map((comment) => (
                    <div className="ry-comment-thread" key={comment.id}>
                      <article className="ry-comment">
                        <span className="ry-comment-color" style={{ backgroundColor: comment.color }} />
                        <div className="ry-comment-content">
                          <div className="ry-comment-author">{comment.author} · {comment.age}</div>
                          <p className="ry-comment-text">{renderCommentText(comment)}</p>
                        </div>
                      </article>
                      <div className="ry-comment-actions">
                        <button aria-label={`Responder ao comentário de ${comment.author}`} className="ry-reply" onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} type="button"><Icon kind="comment" /></button>
                        <button aria-label={`Curtir comentário de ${comment.author}`} aria-pressed={commentLikes.includes(comment.id)} className="ry-comment-like" onClick={() => setCommentLikes((current) => current.includes(comment.id) ? current.filter((id) => id !== comment.id) : [...current, comment.id])} type="button"><Icon active={commentLikes.includes(comment.id)} kind="like" /><span className="ry-comment-count">{comment.likes + (commentLikes.includes(comment.id) ? 1 : 0)}</span></button>
                        <button aria-label="Não gostei do comentário" aria-pressed={commentDislikes.includes(comment.id)} className="ry-dislike" onClick={() => setCommentDislikes((current) => current.includes(comment.id) ? current.filter((id) => id !== comment.id) : [...current, comment.id])} type="button"><Icon active={commentDislikes.includes(comment.id)} kind="dislike" /></button>
                      </div>
                      {comment.replies?.length ? (
                        <div className="ry-reply-list">
                          {comment.replies.map((reply, index) => (
                            <div className="ry-reply-thread" key={`${comment.id}-${index}`}>
                              <article className="ry-comment ry-comment--reply">
                                <span className="ry-comment-color" style={{ backgroundColor: reply.color || "#6b7392" }} />
                                <div className="ry-comment-content">
                                  <div className="ry-comment-author">{reply.author} · {reply.age}</div>
                                  <p className="ry-comment-text">{renderCommentText({ id: reply.keywordId ?? 0, text: reply.text })}</p>
                                </div>
                              </article>
                              <div className="ry-reply-actions">
                                <button aria-label={`Responder a ${reply.author}`} className="ry-reply" onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} type="button"><Icon kind="comment" /></button>
                                <button aria-label={`Curtir resposta de ${reply.author}`} aria-pressed={replyLikes.includes(`${comment.id}-${index}`)} onClick={() => { const id = `${comment.id}-${index}`; setReplyLikes((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); setReplyDislikes((current) => current.filter((item) => item !== id)); }} type="button"><Icon active={replyLikes.includes(`${comment.id}-${index}`)} kind="like" /></button>
                                <button aria-label={`Não gostei da resposta de ${reply.author}`} aria-pressed={replyDislikes.includes(`${comment.id}-${index}`)} className="ry-dislike" onClick={() => { const id = `${comment.id}-${index}`; setReplyDislikes((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); setReplyLikes((current) => current.filter((item) => item !== id)); }} type="button"><Icon active={replyDislikes.includes(`${comment.id}-${index}`)} kind="dislike" /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {replyingTo === comment.id && <form className="ry-comment-composer" onSubmit={(event) => submitReply(event, comment.id)}><textarea aria-label={`Responder a ${comment.author}`} onChange={(event) => setReplyDraft(event.currentTarget.value)} placeholder={`Responder a ${comment.author}...`} value={replyDraft} /><button aria-label="Enviar resposta" type="submit"><img alt="" aria-hidden="true" src="/System/Doors/sites/reactions/comentário.svg" /></button></form>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
          <aside aria-label="Mais vídeos" className="ry-watch-side"><div className="ry-related">{videos.filter((video) => video.id !== activeVideo.id).map((video) => <article className="ry-related-card" key={video.id}><button aria-label={`Assistir ${video.title}`} onClick={() => openVideo(video.id)} type="button"><img alt="" src={`${ASSETS}${video.image}`} /></button><div><a href={`${SITE_URLS.youspace}watch/${video.id}`} onClick={(event) => { event.preventDefault(); openVideo(video.id); }}>{video.title}</a><p>{video.description}</p></div></article>)}</div></aside>
        </div>
      )}

      <footer className="ry-footer"><img alt="YouSpace" src={LOGO} /><nav><a href="#sobre">sobre</a><a href="#seguranca">segurança</a><a href="#privacidade">privacidade</a><a href="#ajuda">ajuda</a></nav><small>© YouSpace, 2007. Todos os direitos reservados</small></footer>
    </Root>
  );
};

export default YouSpacePage;

