import { type FormEvent, type MouseEvent as ReactMouseEvent, type ReactElement, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import useBrowserTabs from "components/apps/Browser/BrowserTabsContext";
import { SITE_URLS } from "components/apps/Browser/config";
import { attachDoorsKeywordCursorEffect } from "utils/doorsKeywordCursor";
import { isDoorsKeywordCollected, recordDoorsKeyword } from "utils/doorsKeywords";

const BUBBLE_ASSETS = "/System/Doors/sites/bubble/";
const bubbleImage = (name: string): string => `${BUBBLE_ASSETS}${name}`;

type Friend = {
  avatar: string;
  handle: string;
  mutual: number;
  name: string;
  online: boolean;
  preview?: string;
  status?: string;
};

type Message = {
  from: "friend" | "me";
  text: string;
  time: string;
  day?: string;
};

type Conversation = Friend & {
  messages: Message[];
};

type FeedPost = {
  author: string;
  avatar: string;
  comments: number;
  handle: string;
  image?: string;
  likes: number;
  message: string;
  time: string;
};

const friends: Friend[] = [
  { name: "Jorge Roberto", handle: "@jorgeberto", avatar: "avatar-jorge.png", mutual: 13, online: true, preview: "Aquela conexão foi mágica.", status: "online ontem às 19:30" },
  { name: "Gustavo Ribeiro", handle: "@guguribeiro", avatar: "avatar-gustavo.png", mutual: 8, online: true, preview: "lança perfume ♪♪♪" },
  { name: "Bárbara Guedes", handle: "@babigu", avatar: "avatar-barbara.png", mutual: 2, online: false, preview: "não mos isso foi muito injusto", status: "online ontem às 16:20" },
  { name: "Malu Souza", handle: "@maluzinhaaaa", avatar: "avatar-malu.png", mutual: 9, online: true, preview: "Feliz aniversário!!!" },
  { name: "Gabriela Rosa", handle: "@rosagabi", avatar: "avatar-gabriela.png", mutual: 16, online: true, preview: "descobri uma banda nova" },
  { name: "Rui Mendonça", handle: "@rui.mendonca", avatar: "avatar-rui.png", mutual: 12, online: true, preview: "eai gatinha. O_-" },
  { name: "Paulo Barbosa", handle: "@paulinho89", avatar: "avatar-paulo.png", mutual: 6, online: false, preview: "nóisss na aula do Josi ontem" },
  { name: "Larissa Oda", handle: "@odalorissa", avatar: "avatar-larissa.png", mutual: 11, online: true, preview: "NÃO ACREDITO AMGGGG" },
];

const conversations: Conversation[] = [
  {
    ...friends[3],
    messages: [
      { from: "friend", text: "boa noiteee!!", time: "19:08" },
      { from: "friend", text: "você ainda vai naquele encontro de sábado?", time: "14:08", day: "Ontem" },
      { from: "me", text: "vou sim! só tava esperando confirmarem o horário", time: "14:29" },
      { from: "friend", text: "confirmaram agora. começa às oito e a gente se encontra na entrada.", time: "14:30" },
      { from: "friend", text: "Fechado! eu levo os CDs", time: "14:30" },
      { from: "me", text: "pode crer, posso levar aquela câmera pequena também!", time: "14:33" },
      { from: "me", text: "Feliz aniversário!!!", time: "11:39", day: "Hoje" },
    ],
  },
  {
    ...friends[7],
    messages: [
      { from: "friend", text: "boa noite ai mano", time: "13:08" },
      { from: "friend", text: "manoooooooooo tu não sabe !!", time: "10:00", day: "Hoje" },
      { from: "me", text: "oque Fala ai", time: "10:21" },
      { from: "friend", text: "Eu finalmente achei o novo DVD da sandy e Junior para vender lá no bar do gato", time: "10:21" },
      { from: "me", text: "Eu já sabia, e comprei um para mim e para você", time: "10:28" },
      { from: "friend", text: "NÃO ACREDITO AMGGGG", time: "10:34" },
    ],
  },
  {
    ...friends[0],
    messages: [
      { from: "me", text: "ta bom tchou, vê se você leva dinheiro a mais para a lan house", time: "14:29" },
      { from: "friend", text: "ana, acabei de voltar do encontro com a Stella.", time: "19:18", day: "Ontem" },
      { from: "me", text: "Eai como Foi ??", time: "19:18" },
      { from: "friend", text: "Foi muito bom ela é perfeita e eu achei ela tão fofa e engraçada, acho que to apaixonado", time: "19:19" },
      { from: "me", text: "Pelo amor de Deus que melação, credo", time: "19:20" },
      { from: "friend", text: "Aquela conexão Foi mágica.", time: "19:23" },
    ],
  },
  {
    ...friends[2],
    messages: [
      { from: "me", text: "Ba você vai estar na sua casa no dia 11", time: "14:29" },
      { from: "friend", text: "oi eu sai mais cedo da lan houses ontem", time: "19:18", day: "Ontem" },
      { from: "me", text: "você ??? por que ??", time: "19:18" },
      { from: "friend", text: "Meu pai ta Falando que eu to gastando muito dinheiro na lan house", time: "19:19" },
      { from: "friend", text: "aquele velho", time: "19:23" },
      { from: "me", text: "mas também vc fica a semana toda na lan house", time: "19:20" },
      { from: "friend", text: "não mos isso Foi muito injusto", time: "19:23" },
    ],
  },
  {
    ...friends[5],
    messages: [
      { from: "friend", text: "oi, tudo bem ? rs", time: "12:06" },
      { from: "friend", text: "oi eu saí mais cedo da lan houses ontem", time: "19:18", day: "11/11" },
      { from: "friend", text: "oi, linda, vamos sair por Favor", time: "19:18" },
      { from: "friend", text: "olá gata, te achei mó bonita, me responde para a gente marcar de ir na praça.", time: "14:14", day: "12/11" },
      { from: "friend", text: "eu sou um cara legal confia", time: "14:16" },
      { from: "friend", text: "nossa não vai me responder mesmo, sabia que vc não prestava", time: "14:14", day: "13/11" },
      { from: "friend", text: "eai gatinha. O_-", time: "19:33", day: "Sexta-Feira" },
    ],
  },
];

const initialPosts: FeedPost[] = [
  { author: "Ana Paula ^0^", handle: "@anaa_paula93", avatar: "avatar-ana.png", message: "ba da bim, ba da bum", time: "há 6min", likes: 0, comments: 0 },
  { author: "Jorge Roberto", handle: "@jorgeberto", avatar: "avatar-jorge.png", message: "Aniversário da Dona Odete hoje! Te amo mãe ♡♡♡", image: "post-cooking.png", time: "há 23min", likes: 9, comments: 3 },
  { author: "Gabriela Rosa", handle: "@rosagabi", avatar: "avatar-gabriela.png", message: "descobri uma banda nova e agora esse é o único assunto que eu tenho!!!", time: "há 49min", likes: 6, comments: 1 },
  { author: "Gustavo Ribeiro", handle: "@guguribeiro", avatar: "avatar-gustavo.png", message: "lançaaaaa, lança perfume ♪♪♪", time: "há 1h", likes: 4, comments: 1 },
  { author: "Paulo Barbosa", handle: "@paulinho89", avatar: "avatar-paulo.png", message: "nóisss na aula do Josi ontem >:D", image: "post-group.png", time: "há 2h", likes: 20, comments: 3 },
];

const communities = [
  { title: "Eu Odeio Acordar Cedo", description: "Comunidade feita para todos aqueles que odeiam acordar cedo.", count: "2.842 pessoas", category: "Relacionamentos & Amizades", image: "community-garfield.jpg" },
  { title: "Deus me disse: desce e arrasa!", description: "Comunidade para pessoas que NÃO estão na terra à passeio.", count: "684 pessoas", category: "Cotidiano", image: "bubble-community-daydream.png" },
  { title: "Te incomodo? Que peeena!", description: "Tem gente que se incomoda com pessoas felizes e bem resolvidos.", count: "938 pessoas", category: "Vida Cotidiana", image: "community-cat.jpg" },
  { title: "Eu amo chocolate!", description: "Comunidade criada para os chocolatras de montão!", count: "2.842 pessoas", category: "Culinária, Bebidas e Vinhos", image: "community-chocolate.jpg" },
];

const homeCommunities = [
  { title: "Internet lenta, papo bom", image: "post-lan-house.png" },
  { title: "Clube dos norturnos", image: "bubble-home-night.png" },
  { title: "Bandas de garagem", image: "bubble-home-bands.png" },
];

const profileCommunities = [
  { title: "Eu colho flores e TONY RAMOS!!!", image: "bubble-community-tony.png" },
  { title: "Tinha medo da Gina Palitos", image: "bubble-community-gina.png" },
  { title: "Queria sorvete, mas era feijão", image: "bubble-community-beans.png" },
];

const communityCategories = [
  { name: "Música", count: 438 }, { name: "Arte", count: 308 },
  { name: "Filmes", count: 174 }, { name: "Culinária", count: 692 },
  { name: "Jogos", count: 308 }, { name: "Tecnologia", count: 72 },
  { name: "Amizades", count: 93 }, { name: "Cotidiano", count: 216 },
];

const initialMyCommunities = [
  { title: "Eu colho Flores e TONY RAMOS!!!", count: "1.344 pessoas", image: "bubble-community-tony.png" },
  { title: "Tinha medo da Gina Palitos", count: "816 pessoas", image: "bubble-community-gina.png" },
  { title: "Queria sorvete, mas era Feijão", count: "4.603 pessoas", image: "bubble-community-beans.png" },
];

const Root = styled.div`
  --rb-orange: #f37319;
  --rb-peach: #fbd9c6;
  --rb-ink: #171717;
  --rb-line: #222;
  background: #fff;
  color: var(--rb-ink);
  font-family: "Pixelify Sans", monospace;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: auto;
  scrollbar-color: var(--rb-orange) #f7edd7;
  scrollbar-width: thin;
  width: 100%;

  &::-webkit-scrollbar { height: 14px; width: 14px; }
  &::-webkit-scrollbar-track { background: #f7edd7; border-left: 2px solid var(--rb-line); }
  &::-webkit-scrollbar-thumb { background: var(--rb-orange); border: 2px solid var(--rb-line); border-radius: 0; }
  &::-webkit-scrollbar-thumb:hover { filter: brightness(.88); }

  *, *::before, *::after { box-sizing: border-box; }
  button, input, select, textarea { font: inherit; }
  button { color: inherit; cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer; }
  a { color: #1768b2; text-decoration: underline; }

  .rb-nav {
    align-items: center;
    background: var(--rb-orange);
    border-bottom: 2px solid #222;
    color: #fff;
    display: flex;
    gap: clamp(14px, 2.1vw, 44px);
    min-height: 66px;
    padding: 8px clamp(18px, 2.2vw, 44px);
    width: 100%;
  }
  .rb-brand { background: transparent; border: 0; color: white; display: flex; flex: 0 0 auto; line-height: 1; margin-right: auto; padding: 0; text-decoration: none; }
  .rb-brand img { display: block; height: 38px; object-fit: contain; width: 118px; }
  .rb-nav-links { align-items: center; display: flex; flex: 0 0 auto; gap: clamp(14px, 2vw, 42px); }
  .rb-nav-links button, .rb-signout {
    background: transparent; border: 0; color: white; font-size: clamp(14px, 1vw, 20px); padding: 8px 0; white-space: nowrap;
  }
  .rb-nav-links button { align-items: center; display: inline-flex; gap: 8px; }
  .rb-nav-links img { height: 20px; object-fit: contain; width: 20px; }
  .rb-nav-links button[aria-current="page"] { text-decoration: underline; text-underline-offset: 5px; }
  .rb-search { display: flex; flex: 0 1 430px; margin-left: auto; min-width: 140px; }
  .rb-search input { background: white; border: 2px solid #292929; border-right: 0; height: 42px; min-width: 0; padding: 0 12px; width: 100%; }
  .rb-search button { align-items: center; background: #f6f4f4; border: 2px solid #292929; display: flex; flex: 0 0 44px; justify-content: center; }
  .rb-search img { height: 20px; width: 20px; }
  .rb-signout { border-left: 1px solid rgb(255 255 255 / 60%); padding: 8px 0 8px 24px; }
  .rb-shell { flex: 1 0 auto; margin: 0 auto; max-width: 1920px; padding: clamp(20px, 2.3vw, 44px); width: 100%; }
  .rb-page-heading { background: var(--rb-orange); border: 2px solid var(--rb-line); box-shadow: 4px 4px 0 var(--rb-line); color: white; margin: 0 0 clamp(28px, 3vw, 54px); min-height: 145px; padding: clamp(22px, 2.4vw, 42px); }
  .rb-page-heading h1 { font-size: clamp(26px, 2.5vw, 46px); line-height: 1; margin: 0 0 10px; }
  .rb-page-heading p { font-size: clamp(15px, 1vw, 20px); margin: 0; }
  .rb-columns { display: grid; gap: clamp(24px, 2.8vw, 48px); grid-template-columns: minmax(0, 2.55fr) minmax(270px, 1fr); }
  .rb-stack { display: grid; gap: 22px; align-content: start; min-width: 0; }
  .rb-box { background: #fff; border: 2px solid var(--rb-line); box-shadow: 4px 4px 0 var(--rb-line); min-width: 0; }
  .rb-box-title { align-items: center; background: var(--rb-orange); color: white; display: flex; justify-content: space-between; min-height: 66px; padding: 12px 20px; }
  .rb-box-title h2 { font-size: clamp(19px, 1.55vw, 28px); line-height: 1.05; margin: 0; }
  .rb-box-title > button { background: #fff; border: 2px solid #222; box-shadow: 3px 3px 0 #222; color: #222; min-height: 34px; padding: 4px 10px; }
  .rb-panel-content { padding: 18px 20px; }
  .rb-composer { background: var(--rb-orange); border: 2px solid var(--rb-line); box-shadow: 4px 4px 0 var(--rb-line); color: white; padding: clamp(16px, 1.6vw, 28px); }
  .rb-home-composer, .rb-home-mini-profile { box-sizing: border-box; height: 282px; }
  .rb-composer h2 { font-size: clamp(19px, 1.5vw, 28px); margin: 0 0 14px; }
  .rb-composer h2 img { height: 22px; margin-left: 5px; object-fit: contain; vertical-align: middle; width: 22px; }
  .rb-composer textarea { background: #fff; border: 2px solid #222; color: #202020; display: block; min-height: 118px; padding: 12px; resize: vertical; width: 100%; }
  .rb-composer-actions { align-items: center; display: flex; gap: 12px; justify-content: flex-end; padding-top: 12px; }
  .rb-composer-actions .rb-attach { margin-right: auto; }
  .rb-button { background: #fff; border: 2px solid #222; box-shadow: 3px 3px 0 #222; color: #222; min-height: 38px; padding: 6px 12px; }
  .rb-button--orange { background: var(--rb-orange); color: #fff; }
  .rb-button:hover, .rb-icon-button:hover { filter: brightness(.94); }
  .rb-post { overflow: hidden; }
  .rb-post-header { align-items: center; background: var(--rb-orange); color: #fff; display: flex; gap: 12px; min-height: 70px; padding: 10px 16px; }
  .rb-avatar { border: 2px solid #222; display: block; flex: 0 0 auto; height: 56px; object-fit: cover; width: 56px; }
  .rb-post-author { font-size: clamp(16px, 1.2vw, 22px); font-weight: 700; line-height: 1.1; }
  .rb-post-meta { font-size: 13px; margin-top: 2px; }
  .rb-post-menu { background: none; border: 0; color: white; font-size: 28px; margin-left: auto; }
  .rb-post-body { padding: 18px 20px 12px; }
  .rb-post-text { font-size: clamp(16px, 1vw, 19px); line-height: 1.45; margin: 0 0 14px; }
  .rb-post-image { border: 0; display: block; height: auto; margin: 12px 0 18px; max-height: 480px; max-width: 100%; object-fit: contain; object-position: left center; }
  .rb-post-actions { align-items: center; border-top: 1px solid #c9c9c9; display: flex; gap: 20px; margin-top: 18px; min-height: 42px; }
  .rb-inline-action { align-items: center; background: none; border: 0; color: #666; display: inline-flex; gap: 5px; padding: 4px 0; text-decoration: underline; }
  .rb-inline-action img { height: 17px; object-fit: contain; width: 17px; }
  .rb-visibility { color: #777; font-size: 13px; margin-left: auto; }
  .rb-mini-profile { background: var(--rb-orange); color: white; display: grid; grid-template-columns: 1fr 1fr; min-height: 170px; overflow: hidden; }
  .rb-mini-profile img { border: 2px solid #222; height: 100%; max-height: 210px; min-height: 170px; object-fit: cover; width: 100%; }
  .rb-home-mini-profile img { max-height: none; min-height: 0; }
  .rb-mini-profile-copy { display: flex; flex-direction: column; justify-content: space-between; padding: 20px 16px; }
  .rb-mini-profile-copy strong { font-size: clamp(17px, 1.2vw, 23px); }
  .rb-mini-profile-copy a { color: white; font-size: 14px; }
  .rb-birthday-box { min-height: 317px; }
  .rb-birthday-box > .rb-box-title { min-height: 58px; }
  .rb-birthday-box > .rb-box-title h2 { font-size: 32px; }
  .rb-birthday { align-items: center; display: grid; gap: 22px; grid-template-columns: 150px minmax(0, 1fr); min-height: 257px; padding: 24px 22px; }
  .rb-birthday > .rb-calendar, .rb-birthday > .rb-birthday-copy { transform: translateY(-20px); }
  .rb-calendar { align-items: stretch; background: white; border: 2px solid #222; box-shadow: 3px 3px 0 #222; color: #171717; display: flex; flex-direction: column; font-size: 58px; font-weight: 700; height: 170px; justify-content: flex-start; line-height: 1; padding: 0; text-align: center; width: 150px; }
  .rb-calendar span { background: var(--rb-orange); color: white; display: block; flex: 0 0 35px; font-size: 24px; line-height: 35px; }
  .rb-calendar strong { font-size: 96px; line-height: .9; margin: auto 0; }
  .rb-birthday-copy { align-self: center; min-width: 0; }
  .rb-birthday-copy strong { display: block; font-size: 32px; line-height: 1.05; }
  .rb-birthday-copy p { color: #777; font-size: 16px; line-height: 1.3; margin: 3px 0 10px; }
  .rb-birthday-copy p:first-of-type { color: #171717; margin-bottom: 14px; }
  .rb-birthday-copy .rb-button { height: 35px; min-height: 35px; white-space: nowrap; width: 176px; }
  .rb-birthday p, .rb-suggestion p { margin: 4px 0 12px; }
  .rb-home-communities > .rb-box-title { min-height: 65px; }
  .rb-home-community-list { padding: 0 18px; }
  .rb-home-community-row { align-items: center; border-bottom: 1px solid #ccc; display: grid; gap: 18px; grid-template-columns: 100px minmax(0, 1fr) 95px; min-height: 154px; }
  .rb-home-community-row:last-child { border-bottom: 0; }
  .rb-home-community-row img { border: 2px solid #222; box-shadow: 3px 3px 0 #222; height: 100px; object-fit: cover; width: 100px; }
  .rb-home-community-row h3 { font-size: clamp(23px, 1.67vw, 32px); line-height: 1.05; margin: 0; }
  .rb-home-community-row .rb-button { background: var(--rb-orange); color: #fff; height: 35px; min-height: 35px; padding: 3px 5px; width: 95px; }
  .rb-suggestion { align-items: center; border-bottom: 1px solid #ccc; display: flex; gap: 12px; padding: 12px 0; }
  .rb-suggestion:last-child { border-bottom: 0; }
  .rb-suggestion img { border: 2px solid #222; height: 58px; object-fit: cover; width: 58px; }
  .rb-suggestion-copy { flex: 1; min-width: 0; }
  .rb-suggestion-copy small { display: block; margin-top: 2px; }
  .rb-footer { align-items: center; background: #f6f4f4; border-top: 1px solid #888; color: #5e5e5e; display: flex; gap: clamp(20px, 3vw, 56px); margin-top: auto; min-height: 105px; padding: 18px clamp(20px, 2.3vw, 44px); }
  .rb-footer img { height: 44px; object-fit: contain; width: 130px; }
  .rb-footer nav { display: flex; gap: 24px; }
  .rb-footer nav button { background: none; border: 0; color: inherit; padding: 6px 0; }
  .rb-footer small { margin-left: auto; }
  .rb-search-row { align-items: center; display: flex; gap: 10px; }
  .rb-search-row input { border: 1px solid #999; min-height: 42px; min-width: 0; padding: 8px 12px; width: 100%; }
  .rb-section-bar { align-items: center; background: var(--rb-orange); border: 2px solid #222; box-shadow: 3px 3px #222; color: #fff; display: flex; gap: 14px; justify-content: space-between; margin-bottom: 20px; min-height: 74px; padding: 10px 16px; }
  .rb-friend-filters { align-items: center; display: flex; flex: 0 0 auto; gap: 8px; }
  .rb-section-bar .rb-friend-filters button { background: #fff; border: 2px solid #222; box-shadow: 2px 2px 0 #222; color: #222; min-height: 36px; padding: 5px 12px; white-space: nowrap; }
  .rb-section-bar .rb-friend-filters button[aria-pressed="true"] { background: #f7edd7; text-decoration: underline; text-underline-offset: 2px; }
  .rb-friend-search { display: flex; flex: 0 1 515px; height: 40px; margin-left: auto; min-width: 220px; }
  .rb-friend-search input { background: #fff; border: 2px solid #222; border-right: 0; color: #222; min-width: 0; padding: 0 10px; width: 100%; }
  .rb-friend-search button { align-items: center; background: #f7edd7; border: 2px solid #222; display: grid; flex: 0 0 39px; height: 40px; justify-items: center; padding: 0; width: 39px; }
  .rb-friend-search button img { height: 19px; object-fit: contain; width: 19px; }
  .rb-friends-grid { display: grid; gap: 20px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .rb-profile-aside { align-content: start; }
  .rb-profile-panel--about { min-height: 0; }
  .rb-profile-composer, .rb-profile-panel--about { box-sizing: border-box; height: 276px; }
  .rb-profile-panel--friends, .rb-profile-panel--communities { min-height: 325px; }
  .rb-profile-panel--about > .rb-box-title, .rb-profile-panel--friends > .rb-box-title, .rb-profile-panel--communities > .rb-box-title { min-height: 57px; }
  .rb-profile-about-content { font-size: 16px; line-height: 1.25; padding: 14px 16px; }
  .rb-profile-about-content p { margin: 0; }
  .rb-profile-about-content p:first-child { border-bottom: 1px solid #ccc; margin-bottom: 10px; padding-bottom: 12px; }
  .rb-profile-about-content dl { display: grid; gap: 0; grid-template-columns: 1fr auto; margin: 0; }
  .rb-profile-about-content dt, .rb-profile-about-content dd { border-bottom: 1px solid #ccc; padding: 5px 0; }
  .rb-profile-about-content dt { color: #777; }
  .rb-profile-about-content dd { font-weight: 700; margin: 0; text-align: right; }
  .rb-profile-about-content dt:nth-last-child(2), .rb-profile-about-content dd:last-child { border-bottom: 0; }
  .rb-friends-photo-grid { display: grid; gap: 12px; grid-template-columns: repeat(3, minmax(0, 1fr)); justify-content: stretch; padding: 14px 20px; }
  .rb-friends-photo-grid img { aspect-ratio: 1; border: 2px solid #222; box-shadow: 3px 3px 0 #222; display: block; height: auto; object-fit: cover; width: 100%; }
  .rb-profile-community-list { display: grid; gap: 0; padding: 1px 14px 8px; }
  .rb-profile-community-row { align-items: center; border-bottom: 1px solid #ccc; display: flex; gap: 12px; min-height: 72px; padding: 8px 0; }
  .rb-profile-community-row:last-child { border-bottom: 0; }
  .rb-profile-community-row img { border: 2px solid #222; box-shadow: 2px 2px 0 #222; flex: 0 0 50px; height: 50px; object-fit: cover; width: 50px; }
  .rb-profile-community-row a { color: #111; font-size: 16px; line-height: 1.15; }
  .rb-friend-card { display: grid; grid-template-columns: 120px minmax(0, 1fr); min-height: 150px; }
  .rb-friend-card > img { border-right: 2px solid #222; height: 100%; min-height: 150px; object-fit: cover; width: 120px; }
  .rb-friend-info { align-content: center; display: grid; gap: 8px; padding: 16px; }
  .rb-friend-info h2 { font-size: clamp(19px, 1.5vw, 27px); margin: 0; }
  .rb-online { color: #37a83d; font-size: 12px; }
  .rb-cover { background: center 40% / cover no-repeat url("/System/Doors/sites/bubble/profile-cover.jpg"); border: 2px solid #222; height: clamp(300px, 36vw, 600px); }
  .rb-profile-summary { align-items: center; background: #fff; border: 2px solid #222; box-shadow: 4px 4px #222; display: flex; gap: 28px; margin-bottom: 30px; min-height: 185px; padding: 16px clamp(22px, 3vw, 56px); position: relative; }
  .rb-profile-avatar { align-self: flex-end; border: 2px solid #222; box-shadow: 3px 3px #222; height: clamp(130px, 14vw, 210px); margin-top: -100px; object-fit: cover; width: clamp(130px, 14vw, 210px); }
  .rb-profile-bio { flex: 1; min-width: 0; }
  .rb-profile-bio h2 { font-size: clamp(26px, 2vw, 38px); margin: 0 0 4px; }
  .rb-profile-bio p { margin: 5px 0; }
  .rb-community-page-heading { margin-bottom: clamp(20px, 2.1vw, 40px); min-height: 171px; padding: clamp(22px, 1.72vw, 33px); }
  .rb-community-page-heading h1 { font-size: clamp(30px, 3.34vw, 64px); margin-bottom: 8px; }
  .rb-community-page-heading p { font-size: clamp(16px, 1.56vw, 30px); }
  .rb-community-feature { display: grid; grid-template-columns: minmax(280px, 38.2%) minmax(0, 1fr); margin-bottom: 28px; min-height: clamp(360px, 37.55vw, 700px); }
  .rb-community-feature > img { border-right: 2px solid #222; height: 100%; min-height: clamp(360px, 37.55vw, 700px); object-fit: cover; width: 100%; }
  .rb-community-feature-copy { align-content: center; background: var(--rb-orange); color: white; display: grid; gap: clamp(12px, 1.1vw, 20px); padding: clamp(24px, 2.5vw, 48px); }
  .rb-community-feature-copy > small { font-size: clamp(17px, 1.67vw, 32px); }
  .rb-community-feature-copy h2 { font-size: clamp(34px, 3.75vw, 72px); line-height: 1.05; margin: 0; }
  .rb-community-feature-copy > p { font-size: clamp(18px, 1.67vw, 32px); line-height: 1.1; margin: 0; }
  .rb-community-feature-meta { display: flex; flex-wrap: wrap; gap: 22px; }
  .rb-community-feature-meta span { font-size: clamp(14px, 1.25vw, 24px); }
  .rb-community-feature-join { background: #fff; color: #222; font-size: clamp(16px, 1.45vw, 28px); min-height: 64px; width: min(343px, 100%); }
  .rb-communities-layout { display: grid; gap: 24px; grid-template-columns: minmax(0, 3.4fr) minmax(300px, 1fr); }
  .rb-communities-main, .rb-community-sidebar { align-content: start; display: grid; gap: 18px; min-width: 0; }
  .rb-community-discovery { align-items: center; background: var(--rb-orange); border: 2px solid #222; box-shadow: 3px 3px 0 #222; color: #fff; display: flex; flex-wrap: wrap; gap: 12px; min-height: 74px; padding: 10px 16px; }
  .rb-community-discovery > strong { font-size: 32px; margin-right: auto; white-space: nowrap; }
  .rb-community-discovery label { align-items: center; display: flex; font-size: 20px; gap: 6px; }
  .rb-community-discovery select, .rb-community-discovery input { background: #fff; border: 2px solid #222; box-shadow: 2px 2px 0 #222; color: #222; font-size: 16px; min-height: 36px; padding: 4px 10px; }
  .rb-community-discovery select { appearance: none; background-image: linear-gradient(45deg, transparent 50%, #222 50%), linear-gradient(135deg, #222 50%, transparent 50%); background-position: calc(100% - 11px) 15px, calc(100% - 6px) 15px; background-repeat: no-repeat; background-size: 5px 5px, 5px 5px; min-width: 126px; padding-right: 26px; }
  .rb-community-discovery input { min-width: 150px; width: min(220px, 22vw); }
  .rb-community-card { display: grid; grid-template-columns: 227px minmax(0, 1fr); min-height: 227px; }
  .rb-community-card > img { border-right: 2px solid #222; height: 100%; min-height: 227px; object-fit: cover; width: 227px; }
  .rb-community-details { align-content: center; display: grid; gap: 3px; padding: 15px 28px; }
  .rb-community-details > small { color: #222; font-size: 24px; }
  .rb-community-details > small:first-child { color: var(--rb-orange); }
  .rb-community-details h3 { font-size: clamp(30px, 2.15vw, 40px); line-height: 1.03; margin: 0; }
  .rb-community-details p { font-size: clamp(20px, 1.5vw, 28px); line-height: 1.08; margin: 0; }
  .rb-community-details > small:last-of-type { font-size: 24px; }
  .rb-community-details .rb-community-join { font-size: 14px; min-height: 53px; padding: 6px 5px; white-space: nowrap; width: min(189px, 100%); }
  .rb-community-sidebar > .rb-box { min-width: 0; }
  .rb-community-sidebar > .rb-box:first-child { min-height: 539px; }
  .rb-community-sidebar > .rb-box:nth-child(2) { min-height: 279px; }
  .rb-community-sidebar .rb-box-title { min-height: 65px; }
  .rb-community-sidebar .rb-box-title h2 { font-size: 32px; }
  .rb-community-list { display: grid; gap: 0; padding: 8px 18px; }
  .rb-community-list-item { align-items: center; border-bottom: 1px solid #ccc; display: flex; gap: 14px; min-height: 145px; padding: 8px 0; }
  .rb-community-list-item:last-child { border-bottom: 0; }
  .rb-community-list-item img { border: 2px solid #222; height: 100px; object-fit: cover; width: 100px; }
  .rb-community-list-item strong, .rb-community-list-item small { display: block; }
  .rb-community-list-item strong { font-size: 28px; line-height: 1.05; }
  .rb-community-list-item small { color: #666; font-size: 20px; margin-top: 3px; }
  .rb-community-categories { padding: 14px 18px; }
  .rb-community-category-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); min-height: 48px; }
  .rb-community-category-row:not(:last-child) { border-bottom: 1px solid #777; }
  .rb-community-category-cell { min-width: 0; padding: 0 14px 0 0; }
  .rb-community-category-cell + .rb-community-category-cell { border-left: 1px solid #777; padding: 0 0 0 20px; }
  .rb-community-category-cell button { align-items: center; background: transparent; border: 0; color: #111; display: flex; font-size: 24px; justify-content: space-between; min-height: 48px; padding: 4px 0; text-align: left; width: 100%; }
  .rb-community-category-cell button span:last-child { color: var(--rb-orange); }
  .rb-community-category-cell button[aria-pressed="true"] span:first-child { text-decoration: underline; text-underline-offset: 3px; }
  .rb-community-sidebar > .rb-community-create { background: var(--rb-orange); border: 2px solid #222; box-shadow: 4px 4px 0 #222; color: #fff; min-height: 294px; padding: 24px; }
  .rb-community-create-icon { height: 36px; margin-bottom: 12px; width: 36px; }
  .rb-community-create-icon img { display: block; height: 100%; object-fit: cover; width: 100%; }
  .rb-community-create h2 { font-size: 32px; line-height: 1.05; margin: 0 0 12px; }
  .rb-community-create-copy { font-size: 24px; line-height: 1.15; margin: 0 0 18px; }
  .rb-community-create .rb-community-create-form { display: grid; gap: 10px; }
  .rb-community-create-form input { border: 1px solid #888; min-height: 34px; padding: 7px 9px; width: 100%; }
  .rb-community-create .rb-community-create-start { background: #fff; color: #222; height: 53px; min-height: 53px; width: min(284px, 100%); }
  .rb-chat-layout { border: 2px solid #222; box-shadow: 4px 4px #222; display: grid; grid-template-columns: minmax(260px, 24%) minmax(0, 1fr); height: min(77vh, 920px); min-height: min(520px, 77vh); }
  .rb-inbox { border-right: 2px solid #222; display: flex; flex-direction: column; min-height: 0; }
  .rb-inbox > h2 { align-items: center; background: var(--rb-orange); border-bottom: 2px solid #222; color: white; display: flex; flex: 0 0 78px; font-size: clamp(21px, 1.7vw, 32px); height: 78px; margin: 0; min-height: 78px; padding: 16px 24px; }
  .rb-inbox-search-panel { align-items: center; background: #f7faff; border: 1px solid #9da7b5; box-sizing: border-box; display: flex; flex: 0 0 75px; height: 75px; margin: 0; padding: 10px; }
  .rb-inbox-search { align-items: stretch; background: #fff; border: 1px solid #7f8792; box-sizing: border-box; display: flex; flex: 1 1 auto; gap: 0; height: 36px; margin: 0; min-width: 0; padding: 0; width: 100%; }
  .rb-inbox-search input { border: 0; height: 100%; min-width: 0; padding: 6px 10px; width: 100%; }
  .rb-inbox-search button { align-items: center; background: #f7faff; border: 0; display: grid; flex: 0 0 36px; height: 100%; justify-items: center; padding: 0; width: 36px; }
  .rb-contact-list { border-top: 0; flex: 1; min-height: 0; overflow: auto; }
  .rb-contact { align-items: center; background: white; border: 0; border-bottom: 1px solid #ccc; display: flex; gap: 12px; min-height: 112px; padding: 12px; text-align: left; width: 100%; }
  .rb-contact[aria-current="true"] { background: var(--rb-peach); border-left: 5px solid var(--rb-orange); padding-left: 7px; }
  .rb-contact img { border: 2px solid #222; height: 74px; object-fit: cover; width: 74px; }
  .rb-contact-copy { flex: 1; min-width: 0; }
  .rb-contact-copy strong { display: block; font-size: clamp(16px, 1.2vw, 23px); }
  .rb-contact-copy small { display: block; line-height: 1.25; margin-top: 4px; }
  .rb-contact-time { align-self: flex-end; font-size: 12px; margin-left: auto; }
  .rb-conversation { display: flex; flex-direction: column; min-height: 0; min-width: 0; overflow: hidden; }
  .rb-conversation-header { align-items: center; background: var(--rb-orange); border-bottom: 2px solid #222; color: white; display: flex; flex: 0 0 78px; gap: 12px; height: 78px; min-height: 78px; padding: 8px 16px; }
  .rb-conversation-header > img { border: 2px solid #222; height: 58px; object-fit: cover; width: 58px; }
  .rb-conversation-title { flex: 1; }
  .rb-conversation-title strong { display: block; font-size: clamp(19px, 1.45vw, 28px); }
  .rb-conversation-title small { display: block; margin-top: 3px; }
  .rb-view-profile { background: white; border: 2px solid #222; box-shadow: 3px 3px #222; color: #222; font-size: clamp(12px, .9vw, 16px); min-height: 40px; min-width: 96px; padding: 5px 12px; white-space: nowrap; }
  .rb-message-list { background: #f2f2f2; display: flex; flex: 1 1 auto; flex-direction: column; gap: 20px; min-height: 0; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; padding: clamp(20px, 2vw, 36px); }
  .rb-day { align-items: center; color: #999; display: flex; gap: 16px; justify-content: center; margin: 10px 0; }
  .rb-day::before, .rb-day::after { border-top: 1px solid #bbb; content: ""; flex: 1; }
  .rb-message-row { align-items: flex-end; display: flex; gap: 12px; max-width: min(82%, 680px); }
  .rb-message-row--me { align-self: flex-end; margin-left: auto; }
  .rb-message-entry { display: flex; flex-direction: column; width: 100%; }
  .rb-message-avatar { border: 2px solid #222; height: 48px; object-fit: cover; width: 48px; }
  .rb-message { background: white; border: 2px solid #222; box-shadow: 2px 2px #222; min-width: 82px; padding: 12px 14px 22px; position: relative; }
  .rb-message-row--me .rb-message { background: var(--rb-peach); }
  .rb-message p { line-height: 1.35; margin: 0; }
  .rb-keyword { background: transparent; border: 0; color: #7d94b8; cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer; font: inherit; padding: 0; text-decoration: underline; }
  .rb-key-icon { background: transparent; border: 0; cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer; display: inline-flex; margin-left: 5px; padding: 0; vertical-align: middle; }
  .rb-key-icon svg { height: 18px; width: 24px; }
  .rb-message time { bottom: 5px; font-size: 11px; position: absolute; right: 8px; }
  .rb-message-compose { align-items: flex-end; border-top: 1px solid #aaa; display: flex; gap: 12px; padding: 12px; }
  .rb-message-compose textarea { border: 1px solid #999; height: 56px; max-height: 56px; min-height: 56px; padding: 10px; resize: none; width: 100%; }
  .rb-message-compose button { background: var(--rb-orange); border: 2px solid #222; box-shadow: 2px 2px #222; color: white; min-height: 40px; padding: 7px 14px; }
  .rb-empty { color: #666; margin: auto; text-align: center; }
  .rb-notice { background: #f8ead1; border: 1px solid #333; margin: 10px 0; padding: 10px; }
  @media (max-width: 1100px) {
    .rb-nav { flex-wrap: wrap; gap: 8px 18px; }
    .rb-brand { margin-right: 12px; }
    .rb-search { flex-basis: 240px; }
    .rb-columns { grid-template-columns: minmax(0, 1fr) minmax(230px, .42fr); }
    .rb-chat-layout { grid-template-columns: minmax(220px, 30%) minmax(0, 1fr); }
    .rb-message-avatar { height: 38px; width: 38px; }
    .rb-community-card { grid-template-columns: 180px minmax(0, 1fr); }
    .rb-community-card > img { width: 180px; }
    .rb-communities-layout { gap: 18px; grid-template-columns: minmax(0, 2.7fr) minmax(250px, 1fr); }
    .rb-community-details { padding: 18px; }
  }
  @media (max-width: 760px) {
    .rb-nav { align-items: flex-start; padding: 12px; }
    .rb-brand { flex: 1 0 100%; }
    .rb-nav-links { flex: 1 0 100%; gap: 12px; justify-content: space-between; overflow-x: auto; }
    .rb-search { flex: 1 1 100%; margin: 0; }
    .rb-signout { border: 0; padding: 7px 0; }
    .rb-shell { padding: 16px 12px; }
    .rb-page-heading { margin-bottom: 20px; min-height: auto; padding: 20px; }
    .rb-columns { grid-template-columns: minmax(0, 1fr); }
    .rb-columns > aside { grid-row: 1; }
    .rb-mini-profile { grid-template-columns: 115px minmax(0, 1fr); min-height: 130px; }
    .rb-mini-profile img { min-height: 130px; }
    .rb-footer { align-items: flex-start; flex-wrap: wrap; gap: 12px 22px; margin-top: 30px; padding: 18px 14px; }
    .rb-footer img { height: 34px; width: 100px; }
    .rb-footer nav { flex-wrap: wrap; gap: 8px 16px; }
    .rb-footer small { flex: 1 0 100%; margin-left: 0; }
    .rb-friends-grid { grid-template-columns: 1fr; }
    .rb-section-bar { align-items: stretch; flex-direction: column; }
    .rb-friend-filters { flex-wrap: wrap; }
    .rb-friend-search { flex-basis: auto; margin-left: 0; min-width: 0; width: 100%; }
    .rb-friend-search input { width: 100%; }
    .rb-friend-card { grid-template-columns: 95px minmax(0, 1fr); min-height: 125px; }
    .rb-friend-card > img { min-height: 125px; width: 95px; }
    .rb-profile-summary { align-items: flex-start; flex-wrap: wrap; gap: 14px; padding: 16px; }
    .rb-profile-avatar { height: 110px; margin-top: -50px; width: 110px; }
    .rb-profile-bio { flex: 1 1 calc(100% - 130px); }
    .rb-profile-summary > .rb-button { margin-left: auto; }
    .rb-community-page-heading { min-height: auto; }
    .rb-community-feature { grid-template-columns: 1fr; min-height: 0; }
    .rb-community-feature > img { aspect-ratio: 1 / 1; border-bottom: 2px solid #222; border-right: 0; height: auto; min-height: 0; }
    .rb-community-feature-copy { padding: 24px; }
    .rb-community-feature-copy h2 { font-size: clamp(28px, 8vw, 42px); }
    .rb-community-feature-copy > p { font-size: 17px; }
    .rb-community-feature-meta span { font-size: 14px; }
    .rb-community-feature-join { min-height: 48px; }
    .rb-communities-layout { grid-template-columns: 1fr; }
    .rb-community-sidebar { grid-template-columns: 1fr; }
    .rb-community-card { grid-template-columns: 110px minmax(0, 1fr); min-height: 155px; }
    .rb-community-card > img { min-height: 155px; width: 110px; }
    .rb-community-details { gap: 4px; padding: 10px; }
    .rb-community-details > small, .rb-community-details > small:last-of-type { font-size: 13px; }
    .rb-community-details h3 { font-size: 19px; }
    .rb-community-details p { font-size: 14px; }
    .rb-community-details .rb-community-join { min-height: 36px; }
    .rb-community-discovery { align-items: flex-start; flex-direction: column; }
    .rb-community-discovery input { width: 100%; }
    .rb-home-community-list { padding: 0 12px; }
    .rb-home-community-row { gap: 10px; grid-template-columns: 76px minmax(0, 1fr) 78px; min-height: 118px; }
    .rb-home-community-row img { height: 76px; width: 76px; }
    .rb-home-community-row .rb-button { width: 78px; }
    .rb-birthday { gap: 14px; grid-template-columns: 112px minmax(0, 1fr); padding: 18px 14px; }
    .rb-calendar { height: 145px; width: 112px; }
    .rb-calendar strong { font-size: 50px; }
    .rb-birthday-copy strong { font-size: 18px; }
    .rb-birthday-copy p { font-size: 14px; }
    .rb-profile-about-content { font-size: 14px; }
    .rb-profile-composer, .rb-profile-panel--about { height: 252px; }
    .rb-profile-community-row a { font-size: 14px; }
    .rb-chat-layout { grid-template-columns: 1fr; height: auto; min-height: 0; }
    .rb-inbox { border-bottom: 2px solid #222; border-right: 0; max-height: 360px; }
    .rb-inbox > h2 { min-height: 58px; }
    .rb-contact-list { max-height: 145px; }
    .rb-contact { min-height: 86px; }
    .rb-contact img { height: 54px; width: 54px; }
    .rb-conversation { height: min(68vh, 620px); min-height: 420px; }
    .rb-conversation-header { flex-basis: 72px; height: 72px; min-height: 72px; }
    .rb-inbox > h2 { flex-basis: 72px; height: 72px; min-height: 72px; }
    .rb-conversation-header > img { height: 54px; width: 54px; }
    .rb-message-list { min-height: 0; padding: 16px 10px; }
    .rb-message-row { max-width: 94%; }
    .rb-message-avatar { height: 30px; width: 30px; }
    .rb-message { padding: 9px 10px 21px; }
  }
`;

const Footer = (): ReactElement => (
  <footer className="rb-footer">
    <img alt="Bubble" src={bubbleImage("wordmark.png")} />
    <nav aria-label="Links do Bubble">
      {["sobre", "segurança", "privacidade", "ajuda"].map((item) => <button key={item} type="button">{item}</button>)}
    </nav>
    <small>© Bubble, 2007. Todos os direitos reservados</small>
  </footer>
);

const BubbleHeader = ({ active, onNavigate }: { active: string; onNavigate: (path: string) => void }): ReactElement => (
  <header className="rb-nav">
    <button aria-label="Página inicial do Bubble" className="rb-brand" onClick={() => onNavigate("inicio")} type="button"><img alt="Bubble" src={bubbleImage("wordmark.png")} /></button>
    <nav aria-label="Navegação do Bubble" className="rb-nav-links">
      {[{ label: "Início", path: "inicio", icon: "inicio.png" }, { label: "Perfil", path: "perfil", icon: "perfil.png" }, { label: "Amigos", path: "amigos", icon: "amigos.png" }, { label: "Comunidades", path: "comunidades", icon: "comunidades.png" }, { label: "Mensagens", path: "mensagens", icon: "mensagens.png" }].map(({ label, path, icon }) => (
        <button aria-current={active === path ? "page" : undefined} key={path} onClick={() => onNavigate(path)} type="button"><img alt="" src={bubbleImage(`icons/${icon}`)} />{label}</button>
      ))}
    </nav>
    <form aria-label="Buscar no Bubble" className="rb-search" onSubmit={(event) => event.preventDefault()}>
      <input aria-label="Buscar pessoas, comunidades" placeholder="Buscar pessoas, comunidades..." />
      <button aria-label="Pesquisar" type="submit"><img alt="" src={bubbleImage("search.svg")} /></button>
    </form>
    <button className="rb-signout" onClick={() => onNavigate("inicio")} type="button">Sair</button>
  </header>
);

const BubblePostCard = ({
  post,
  onComment,
  onLike,
}: {
  post: FeedPost;
  onComment: (value: string) => void;
  onLike: () => void;
}): ReactElement => {
  const [commenting, setCommenting] = useState(false);
  const [draft, setDraft] = useState("");
  return (
    <article className="rb-box rb-post">
      <header className="rb-post-header">
        <img alt="" className="rb-avatar" src={bubbleImage(post.avatar)} />
        <div><div className="rb-post-author">{post.author}</div><div className="rb-post-meta">{post.handle} · {post.time}</div></div>
        <button aria-label={`Mais opções para publicação de ${post.author}`} className="rb-post-menu" type="button">⋮</button>
      </header>
      <div className="rb-post-body">
        <p className="rb-post-text">{post.message}</p>
        {post.image && <img alt="Foto da publicação" className="rb-post-image" src={bubbleImage(post.image)} />}
        {commenting && <form className="rb-search-row" onSubmit={(event) => { event.preventDefault(); if (draft.trim()) { onComment(draft.trim()); setDraft(""); } }}><input aria-label="Escreva um comentário" onChange={(event) => setDraft(event.currentTarget.value)} placeholder="Escreva um comentário..." value={draft} /><button className="rb-button" type="submit">Comentar</button></form>}
        <div className="rb-post-actions">
          <button aria-label="Gostei" className="rb-inline-action" onClick={onLike} type="button"><img alt="" src={bubbleImage("icons/thumbsup.svg")} /> gostei · {post.likes}</button>
          <button aria-label="Comentar" className="rb-inline-action" onClick={() => setCommenting((value) => !value)} type="button"><img alt="" src={bubbleImage("icons/comments.svg")} /> comentar · {post.comments}</button>
          <span className="rb-visibility">visível para amigos</span>
        </div>
      </div>
    </article>
  );
};

const BubblePage = ({ url }: { url: string }): ReactElement => {
  const browserTabs = useBrowserTabs();
  const pathname = useMemo(() => {
    try { return new URL(url).pathname.replace(/^\/+|\/+$/g, "") || "inicio"; } catch { return "inicio"; }
  }, [url]);
  const nav = (path: string): void => browserTabs?.navigate(`${SITE_URLS.bubble}${path === "inicio" ? "" : path}`);
  const section = pathname.startsWith("mensagens") ? "mensagens" : pathname.split("/")[0];
  const routeConversationId = pathname.split("/")[1] || "maluzinhaaaa";
  const selectedId = routeConversationId === "malu" ? "maluzinhaaaa" : routeConversationId;
  const [posts, setPosts] = useState(initialPosts);
  const [composerText, setComposerText] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [joined, setJoined] = useState<string[]>([]);
  const [added, setAdded] = useState<string[]>([]);
  const [selectedConversation, setSelectedConversation] = useState(selectedId);
  const [messages, setMessages] = useState<Record<string, Message[]>>(() => Object.fromEntries(conversations.map((conversation) => [conversation.handle.slice(1), conversation.messages])));
  const [messageDraft, setMessageDraft] = useState("");
  const [connectionCollected, setConnectionCollected] = useState(() => isDoorsKeywordCollected("Conexão"));
  const connectionCursorCleanupsRef = useRef(new Map<HTMLElement, () => void>());
  const [profileEditing, setProfileEditing] = useState(false);
  const [bio, setBio] = useState("“Por aí, com uma câmera na bolsa e uma música na cabeça.”");
  const [communityName, setCommunityName] = useState("");
  const [communityCategory, setCommunityCategory] = useState("Todas");
  const [createdCommunities, setCreatedCommunities] = useState<typeof communities>([]);
  const [communityCreateOpen, setCommunityCreateOpen] = useState(false);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedConversation(selectedId);
  }, [selectedId]);

  useEffect(() => {
    const list = messageListRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, selectedConversation]);

  useEffect(() => {
    const onKeywordCollected = (event: Event): void => {
      const keyword = (event as CustomEvent<{ keyword?: string }>).detail?.keyword;
      if (keyword?.normalize("NFD").replace(/[\u0300-\u036F]/g, "").trim().toLocaleLowerCase("pt-BR") === "conexao") {
        setConnectionCollected(true);
      }
    };
    window.addEventListener("doors-keyword-collected", onKeywordCollected);
    return () => {
      window.removeEventListener("doors-keyword-collected", onKeywordCollected);
      connectionCursorCleanupsRef.current.forEach((cleanup) => cleanup());
      connectionCursorCleanupsRef.current.clear();
    };
  }, []);

  const collectConnection = (): void => {
    recordDoorsKeyword("Conexão");
    setConnectionCollected(true);
  };
  const startConnectionCursorEffect = (event: ReactMouseEvent<HTMLButtonElement>): void => {
    const element = event.currentTarget;
    if (connectionCursorCleanupsRef.current.has(element)) return;
    const cleanup = attachDoorsKeywordCursorEffect(element);
    if (cleanup) connectionCursorCleanupsRef.current.set(element, cleanup);
  };
  const stopConnectionCursorEffect = (event: ReactMouseEvent<HTMLButtonElement>): void => {
    const element = event.currentTarget;
    connectionCursorCleanupsRef.current.get(element)?.();
    connectionCursorCleanupsRef.current.delete(element);
  };
  const renderMessageText = (text: string): ReactNode =>
    text.split(/(conex[aã]o)/gi).map((part, index) => {
      if (!/^conex[aã]o$/i.test(part)) return part;
      return (
        <span className="rb-keyword-group" key={`connection-${index}`}>
          <button
            aria-pressed={connectionCollected}
            className="rb-keyword"
            onClick={collectConnection}
            onMouseEnter={startConnectionCursorEffect}
            onMouseLeave={stopConnectionCursorEffect}
            type="button"
          >
            {part}
          </button>
          {!connectionCollected && (
            <button
              aria-label="Coletar a chave Conexão"
              className="rb-key-icon"
              onClick={collectConnection}
              type="button"
            >
              <svg aria-hidden="true" viewBox="0 0 32 32">
                <circle cx="10" cy="12" fill="#f6c344" r="7" stroke="#31302c" strokeWidth="2" />
                <circle cx="10" cy="12" fill="#fff4d0" r="2.4" stroke="#31302c" strokeWidth="1.5" />
                <path d="M16 12h12v4h-3v3h-4v-3h-5" fill="#f6c344" stroke="#31302c" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          )}
        </span>
      );
    });

  const selected = conversations.find(({ handle }) => handle.slice(1) === selectedConversation) || conversations[0];
  const filteredConversations = conversations.filter(({ name, handle, preview }) => `${name} ${handle} ${preview || ""}`.toLowerCase().includes(search.toLowerCase()));
  const sendMessage = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!messageDraft.trim()) return;
    const sent = { from: "me" as const, text: messageDraft.trim(), time: "agora" };
    setMessages((current) => ({ ...current, [selected.handle.slice(1)]: [...(current[selected.handle.slice(1)] || []), sent] }));
    setMessageDraft("");
  };
  const publishPost = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!composerText.trim()) return;
    setPosts((current) => [{ author: "Ana Paula ^0^", handle: "@anaa_paula93", avatar: "avatar-ana.png", message: composerText.trim(), time: "agora", likes: 0, comments: 0 }, ...current]);
    setComposerText("");
  };
  const toggleLike = (index: number): void => setPosts((current) => current.map((post, i) => i === index ? { ...post, likes: post.likes + 1 } : post));
  const addPostComment = (index: number): ((value: string) => void) => (value) => setPosts((current) => current.map((post, i) => i === index ? { ...post, comments: post.comments + 1 } : post));

  const title = section === "perfil" ? "Perfil" : section === "amigos" ? "Amigos" : section === "comunidades" ? "Comunidades" : section === "mensagens" ? "Mensagens" : "";

  return (
    <Root>
      <BubbleHeader active={section} onNavigate={nav} />
      {section === "inicio" && (
        <div className="rb-shell rb-columns">
          <main className="rb-stack" aria-label="Mural do Bubble">
            <form className="rb-composer rb-home-composer" onSubmit={publishPost}>
              <h2>E aí! O que tá rolando? <img alt="" src={bubbleImage("icons/o-que-ta-rolando.png")} /></h2>
              <textarea aria-label="Escreva uma publicação" maxLength={240} onChange={(event) => setComposerText(event.currentTarget.value)} placeholder="Escreve aí..." value={composerText} />
              <div className="rb-composer-actions"><label className="rb-button rb-attach"><img alt="" src={bubbleImage("icons/link.svg")} /> Anexar Foto<input accept="image/*" aria-label="Anexar foto" hidden type="file" /></label><span>{composerText.length}/240</span><button className="rb-button" type="submit">Publicar</button></div>
            </form>
            <div className="rb-stack">
              {posts.map((post, index) => <BubblePostCard key={`${post.handle}-${post.time}-${index}`} onComment={addPostComment(index)} onLike={() => toggleLike(index)} post={post} />)}
           </div>
          </main>
          <aside className="rb-stack" aria-label="Painel do Bubble">
            <section className="rb-box rb-mini-profile rb-home-mini-profile"><img alt="Ana Paula na lan house" src={bubbleImage("ana-paula.png")} /><div className="rb-mini-profile-copy"><div><strong>Ana Paula</strong><div>@anaa_paula93</div></div><a href={`${SITE_URLS.bubble}perfil`} onClick={(event) => { event.preventDefault(); nav("perfil"); }}>Ver perfil completo →</a></div></section>
            <section className="rb-box rb-birthday-box"><header className="rb-box-title"><h2>Aniversariantes</h2></header><div className="rb-panel-content rb-birthday"><div className="rb-calendar"><span>NOV</span><strong>24</strong></div><div className="rb-birthday-copy"><strong>Malu Souza</strong><p>Faz aniversário hoje!</p><p>Mande uma mensagem antes que seja tarde!</p><button className="rb-button rb-button--orange" onClick={() => nav("mensagens/malu")} type="button">Enviar mensagem</button></div></div></section>
            <section className="rb-box"><header className="rb-box-title"><h2>Sugestões de Amigos</h2></header><div className="rb-panel-content">{friends.filter((friend) => ["Jorge Roberto", "Gustavo Ribeiro", "Bárbara Guedes"].includes(friend.name)).map((friend) => <div className="rb-suggestion" key={friend.handle}><img alt="" src={bubbleImage(friend.avatar)} /><div className="rb-suggestion-copy"><strong>{friend.name}</strong><small>{friend.mutual} amigos em comum</small></div><button className="rb-button rb-button--orange" onClick={() => setAdded((value) => value.includes(friend.handle) ? value : [...value, friend.handle])} type="button">{added.includes(friend.handle) ? "Enviado" : "+ Amigo"}</button></div>)}</div></section>
            <section className="rb-box rb-home-communities"><header className="rb-box-title"><h2>Comunidades</h2><button className="rb-button rb-button--orange" onClick={() => nav("comunidades")} type="button">ver todos →</button></header><div className="rb-home-community-list">{homeCommunities.map((community) => <article className="rb-home-community-row" key={community.title}><img alt="" src={bubbleImage(community.image)} /><h3>{community.title}</h3><button className="rb-button" onClick={() => setJoined((value) => value.includes(community.title) ? value : [...value, community.title])} type="button">{joined.includes(community.title) ? "Entrou" : "+ Entrar"}</button></article>)}</div></section>
          </aside>
        </div>
      )}
      {section === "perfil" && (
        <div className="rb-shell">
          <header className="rb-page-heading"><h1>Perfil</h1><p>Seu canto no Bubble: atualizações, fotos e tudo que seus amigos estão acompanhando.</p></header>
          <section className="rb-cover" aria-label="Foto de capa do perfil" />
          <section className="rb-profile-summary">
            <img alt="Foto de perfil de Ana Paula" className="rb-profile-avatar" src={bubbleImage("ana-paula.png")} />
            <div className="rb-profile-bio"><h2>Ana Paula <span className="rb-online">●</span></h2><p>@anaa_paula93 · São Paulo, SP</p>{profileEditing ? <form className="rb-search-row" onSubmit={(event) => { event.preventDefault(); setProfileEditing(false); }}><input aria-label="Editar biografia" onChange={(event) => setBio(event.currentTarget.value)} value={bio} /><button className="rb-button" type="submit">Salvar</button></form> : <p>{bio}</p>}</div>
            <button className="rb-button rb-button--orange" onClick={() => setProfileEditing((value) => !value)} type="button">{profileEditing ? "Cancelar" : "Editar perfil"}</button>
          </section>
          <div className="rb-columns">
            <main className="rb-stack"><section className="rb-composer rb-profile-composer"><h2>Escrever no seu mural ▣</h2><textarea aria-label="Escreva no mural" maxLength={240} onChange={(event) => setComposerText(event.currentTarget.value)} placeholder="Escreve aí..." value={composerText} /><div className="rb-composer-actions"><span>{composerText.length}/240</span><button className="rb-button" onClick={() => { if (composerText.trim()) { setPosts((current) => [{ author: "Ana Paula ^0^", handle: "@anaa_paula93", avatar: "avatar-ana.png", message: composerText, time: "agora", likes: 0, comments: 0 }, ...current]); setComposerText(""); } }} type="button">Publicar</button></div></section>{posts.map((post, index) => ({ post, index })).filter(({ post }) => post.handle === "@anaa_paula93").map(({ post, index }) => <BubblePostCard key={`${post.handle}-${index}`} onComment={addPostComment(index)} onLike={() => toggleLike(index)} post={post} />)}</main>
            <aside className="rb-stack rb-profile-aside">
              <section className="rb-box rb-profile-panel--about"><header className="rb-box-title"><h2>Sobre mim</h2><button className="rb-button rb-button--orange" onClick={() => setProfileEditing((value) => !value)} type="button">editar</button></header><div className="rb-panel-content rb-profile-about-content"><p>Fotógrafa nas horas vagas, colecionadora de fitas e sempre procurando um show pequeno</p><dl><dt>mora em</dt><dd>São Paulo, SP</dd><dt>aniversário</dt><dd>12 de maio</dd><dt>no Bubble desde</dt><dd>março de 2004</dd></dl></div></section>
              <section className="rb-box rb-profile-panel--friends"><header className="rb-box-title"><h2>Amigos</h2><button className="rb-button rb-button--orange" onClick={() => nav("amigos")} type="button">ver todas</button></header><div className="rb-friends-photo-grid">{[friends[0], friends[1], friends[2], friends[4], friends[5], friends[6]].map((friend) => <img alt={friend.name} key={friend.handle} src={bubbleImage(friend.avatar)} />)}</div></section>
              <section className="rb-box rb-profile-panel--communities"><header className="rb-box-title"><h2>Comunidades</h2><button className="rb-button rb-button--orange" onClick={() => nav("comunidades")} type="button">ver todos</button></header><div className="rb-profile-community-list">{profileCommunities.map((community) => <div className="rb-profile-community-row" key={community.title}><img alt="" src={bubbleImage(community.image)} /><a href={`${SITE_URLS.bubble}comunidades`} onClick={(event) => { event.preventDefault(); nav("comunidades"); }}>{community.title}</a></div>)}</div></section>
            </aside>
          </div>
        </div>
      )}
      {section === "amigos" && (
        <div className="rb-shell">
          <header className="rb-page-heading"><h1>Amigos</h1><p>Gente que compartilha conversas, fotos e tardes na lan house.</p></header>
          <div className="rb-columns"><main>
            <div className="rb-section-bar"><div aria-label="Filtrar amigos" className="rb-friend-filters">{["Todos", "Online", "Solicitações"].map((item) => <button aria-pressed={filter === item} key={item} onClick={() => setFilter(item)} type="button">{item}{item === "Solicitações" ? " · 3" : ""}</button>)}</div><form className="rb-friend-search" onSubmit={(event) => event.preventDefault()}><input aria-label="Buscar amigos" onChange={(event) => setSearch(event.currentTarget.value)} placeholder="Procure na sua lista..." value={search} /><button aria-label="Pesquisar amigos" type="submit"><img alt="" src={bubbleImage("search.svg")} /></button></form></div>
            <div className="rb-friends-grid">{friends.filter((friend) => `${friend.name} ${friend.handle}`.toLowerCase().includes(search.toLowerCase())).filter((friend) => filter !== "Online" || friend.online).map((friend) => <article className="rb-box rb-friend-card" key={friend.handle}><img alt={friend.name} src={bubbleImage(friend.avatar)} /><div className="rb-friend-info"><h2>{friend.name} {friend.online && <span className="rb-online">●</span>}</h2><span>{friend.handle}</span><small>{friend.mutual} amigos em comum</small></div></article>)}</div>
          </main><aside className="rb-stack"><section className="rb-box"><header className="rb-box-title"><h2>Solicitações de amizade</h2></header><div className="rb-panel-content">{["Cris Francisco", "Jamal Neves", "Elias Martins"].map((name, index) => <div className="rb-suggestion" key={name}><img alt="" src={bubbleImage(friends[index].avatar)} /><div className="rb-suggestion-copy"><strong>{name}</strong><small>14 amigos em comum</small></div><button className="rb-button" onClick={() => setAdded((value) => value.includes(name) ? value : [...value, name])} type="button">{added.includes(name) ? "Aceito" : "Aceitar"}</button></div>)}</div></section><section className="rb-box"><header className="rb-box-title"><h2>Amigos online</h2></header><div className="rb-panel-content">{friends.filter((friend) => friend.online).map((friend) => <p key={friend.handle}>● {friend.name}</p>)}</div></section></aside></div>
        </div>
      )}
      {section === "comunidades" && (
        <div className="rb-shell">
          <header className="rb-page-heading rb-community-page-heading"><h1>Comunidades</h1><p>Entre em grupos, descubra assuntos novos e encontre pessoas que também não sabem a hora de sair da internet.</p></header>
          <section className="rb-box rb-community-feature">
            <img alt="Cachorro da comunidade da semana" src={bubbleImage("community-dog.jpg")} />
            <div className="rb-community-feature-copy">
              <small>COMUNIDADE DA SEMANA</small>
              <h2>Quero reclamar sobre a vida</h2>
              <p>Uma comunidade feita com o propósito de dispersar a raiva da sua semana e entreter a rapaziada!</p>
              <div className="rb-community-feature-meta"><span>2.842 pessoas</span><span>138 tópicos ativos</span></div>
              <button aria-pressed={joined.includes("Quero reclamar sobre a vida")} className="rb-button rb-community-feature-join" onClick={() => setJoined((value) => value.includes("Quero reclamar sobre a vida") ? value.filter((item) => item !== "Quero reclamar sobre a vida") : [...value, "Quero reclamar sobre a vida"])} type="button">{joined.includes("Quero reclamar sobre a vida") ? "Sair da comunidade" : "Entrar na comunidade"}</button>
            </div>
          </section>
          <div className="rb-communities-layout">
            <main className="rb-communities-main">
              <div className="rb-community-discovery"><strong>Descobrir comunidades</strong><label>Categoria: <select aria-label="Filtrar comunidades" onChange={(event) => setCommunityCategory(event.currentTarget.value)} value={communityCategory}><option value="Todas">Todas</option>{communityCategories.map(({ name }) => <option key={name} value={name}>{name}</option>)}</select></label><input aria-label="Buscar comunidades" onChange={(event) => setSearch(event.currentTarget.value)} placeholder="Buscar comunidades" value={search} /></div>
              {[...communities, ...createdCommunities].filter((community) => `${community.title} ${community.description}`.toLocaleLowerCase("pt-BR").includes(search.toLocaleLowerCase("pt-BR"))).filter((community) => communityCategory === "Todas" || community.category.toLocaleLowerCase("pt-BR").includes(communityCategory.toLocaleLowerCase("pt-BR"))).map((community) => <article className="rb-box rb-community-card" key={community.title}><img alt="" src={bubbleImage(community.image)} /><div className="rb-community-details"><small>{community.category}</small><h3>{community.title}</h3><p>{community.description}</p><small>{community.count}</small><button className="rb-button rb-button--orange rb-community-join" onClick={() => setJoined((value) => value.includes(community.title) ? value.filter((item) => item !== community.title) : [...value, community.title])} type="button">{joined.includes(community.title) ? "Sair da comunidade" : "Entrar na comunidade"}</button></div></article>)}
            </main>
            <aside className="rb-community-sidebar">
              <section className="rb-box"><header className="rb-box-title"><h2>Minhas comunidades</h2></header><div className="rb-community-list">{[...initialMyCommunities, ...(joined.includes("Quero reclamar sobre a vida") ? [{ title: "Quero reclamar sobre a vida", count: "2.842 pessoas", image: "community-dog.jpg" }] : []), ...communities.filter((community) => joined.includes(community.title)).map((community) => ({ ...community, image: community.image }))].map((community) => <div className="rb-community-list-item" key={community.title}><img alt="" src={bubbleImage(community.image)} /><span><strong>{community.title}</strong><small>{community.count}</small></span></div>)}</div></section>
              <section className="rb-box"><header className="rb-box-title"><h2>Categorias</h2></header><div aria-label="Categorias de comunidades" className="rb-community-categories" role="table">{Array.from({ length: Math.ceil(communityCategories.length / 2) }, (_, rowIndex) => communityCategories.slice(rowIndex * 2, rowIndex * 2 + 2)).map((row) => <div className="rb-community-category-row" key={row[0].name} role="row">{row.map(({ name, count }) => <div className="rb-community-category-cell" key={name} role="cell"><button aria-pressed={communityCategory === name} onClick={() => setCommunityCategory(communityCategory === name ? "Todas" : name)} type="button"><span>{name}</span><span>{count}</span></button></div>)}</div>)}</div></section>
              <section className="rb-community-create"><div aria-hidden="true" className="rb-community-create-icon"><img alt="" src={bubbleImage("bubble-community-globe.png")} /></div><h2>Não achou sua turma?</h2><p className="rb-community-create-copy">Crie um espaço novo e convide gente que entende do assunto.</p>{communityCreateOpen ? <form className="rb-community-create-form" onSubmit={(event) => { event.preventDefault(); const title = communityName.trim(); if (!title) return; const created = { title, description: "Uma comunidade nova do Bubble.", count: "1 pessoa", category: "Cotidiano", image: "community-garfield.jpg" }; setCreatedCommunities((current) => [...current, created]); setJoined((value) => value.includes(title) ? value : [...value, title]); setCommunityName(""); setCommunityCreateOpen(false); }}><input aria-label="Nome da comunidade" onChange={(event) => setCommunityName(event.currentTarget.value)} placeholder="Nome da comunidade" value={communityName} /><button className="rb-button rb-button--orange" type="submit">Criar comunidade</button></form> : <button className="rb-button rb-community-create-start" onClick={() => setCommunityCreateOpen(true)} type="button">Começar agora</button>}</section>
              </aside>
          </div>
        </div>
      )}
      {section === "mensagens" && (
        <div className="rb-shell">
          <header className="rb-page-heading"><h1>Mensagens</h1><p>Conversas privadas, planos de última hora e links que você vai abrir só depois.</p></header>
          <section aria-label="Conversas do Bubble" className="rb-chat-layout">
            <aside className="rb-inbox"><h2>Caixa de entrada</h2><div className="rb-inbox-search-panel"><form className="rb-inbox-search" onSubmit={(event) => event.preventDefault()}><input aria-label="Buscar conversas" onChange={(event) => setSearch(event.currentTarget.value)} placeholder="Buscar conversas" value={search} /><button aria-label="Pesquisar conversas" type="submit"><img alt="" src={bubbleImage("search.svg")} /></button></form></div><div className="rb-contact-list">{filteredConversations.map((conversation) => <button aria-current={selectedConversation === conversation.handle.slice(1)} className="rb-contact" key={conversation.handle} onClick={() => setSelectedConversation(conversation.handle.slice(1))} type="button"><img alt="" src={bubbleImage(conversation.avatar)} /><span className="rb-contact-copy"><strong>{conversation.name} {conversation.online && <span className="rb-online">●</span>}</strong><small>{conversation.preview}</small></span><span className="rb-contact-time">{conversation.handle === "@maluzinhaaaa" ? "11:39" : conversation.handle === "@odalorissa" ? "10:34" : "ontem"}</span></button>)}</div></aside>
            <section aria-label={`Conversa com ${selected.name}`} className="rb-conversation">
              <header className="rb-conversation-header"><img alt="" src={bubbleImage(selected.avatar)} /><div className="rb-conversation-title"><strong>{selected.name}</strong><small>{selected.status || (selected.online ? "online agora" : "online recentemente")}</small></div><button className="rb-button rb-view-profile" onClick={() => nav("perfil")} type="button">Ver perfil</button></header>
              <div className="rb-message-list" key={selectedConversation} ref={messageListRef}>
                {(messages[selected.handle.slice(1)] || []).map((message, index) => <div className="rb-message-entry" key={`${message.time}-${index}`}>
                  {message.day && <div className="rb-day"><span>{message.day}</span></div>}
                  <div className={`rb-message-row ${message.from === "me" ? "rb-message-row--me" : ""}`}>
                    {message.from === "friend" && <img alt="" className="rb-message-avatar" src={bubbleImage(selected.avatar)} />}
                    <div className="rb-message"><p>{renderMessageText(message.text)}</p><time>{message.time}</time></div>
                  </div>
                </div>)}
              </div>
              <form className="rb-message-compose" onSubmit={sendMessage}><textarea aria-label="Escreva sua mensagem" onChange={(event) => setMessageDraft(event.currentTarget.value)} placeholder="Escreva sua mensagem..." value={messageDraft} /><button type="submit">Enviar</button></form>
            </section>
          </section>
        </div>
      )}
      {section !== "inicio" && section !== "perfil" && section !== "amigos" && section !== "comunidades" && section !== "mensagens" && (
        <div className="rb-shell"><header className="rb-page-heading"><h1>{title || "Bubble"}</h1><p>Um lugar para conversar com seus amigos.</p></header></div>
      )}
      <Footer />
    </Root>
  );
};

export default BubblePage;

