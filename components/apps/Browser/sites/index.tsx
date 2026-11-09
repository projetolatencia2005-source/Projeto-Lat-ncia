import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import useBrowserTabs from "components/apps/Browser/BrowserTabsContext";
import {
  getInternalSite,
  INTERNAL_SITES,
  type InternalSiteId,
  SITE_URLS,
} from "components/apps/Browser/config";
import StyledInternalSites from "components/apps/Browser/sites/StyledInternalSites";

type InternalSitesProps = {
  url: string;
};

type SearchProps = {
  initialValue?: string;
  label: string;
  onSearch: (query: string) => void;
};

const SearchField: FC<SearchProps> = ({
  initialValue = "",
  label,
  onSearch,
}) => {
  const [query, setQuery] = useState(initialValue);

  return (
    <form
      aria-label={label}
      className="site-search"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(query.trim());
      }}
    >
      <input
        aria-label={label}
        onChange={({ currentTarget }) => setQuery(currentTarget.value)}
        placeholder="Pesquisar"
        value={query}
      />
      <button aria-label="Pesquisar" type="submit">
        <img alt="" src="/System/Doors/search.svg" />
      </button>
    </form>
  );
};

const searchUrl = (base: string, query: string): string =>
  query ? `${base}?q=${encodeURIComponent(query)}` : base;

const GluugliPage: FC<{ url: string }> = ({ url }) => {
  const browserTabs = useBrowserTabs();
  const query = new URL(url).searchParams.get("q") || "";
  const search = (value: string): void =>
    browserTabs?.navigate(searchUrl(`${SITE_URLS.gluugli}search`, value));
  const results = query
    ? INTERNAL_SITES.filter(({ title }) =>
        title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    : [];

  return (
    <section className="site-gluugli">
      <h1 aria-label="Gluugli" className="gluugli-wordmark">
        <span>G</span>
        <span>l</span>
        <span>u</span>
        <span>u</span>
        <span>g</span>
        <span>l</span>
        <span>i</span>
      </h1>
      <SearchField key={query} initialValue={query} label="Pesquisar no Gluugli" onSearch={search} />
      {query ? (
        <div aria-live="polite" className="search-results">
          <strong>Resultados nas páginas internas para “{query}”</strong>
          {(results.length > 0 ? results : INTERNAL_SITES).map((site) => (
            <button key={site.id} onClick={() => browserTabs?.navigate(site.url)} type="button">
              <strong>{site.title}</strong>
              <span>
                {site.id === "gluugli"
                  ? "Busca local do navegador da Lan House Latência."
                  : `Visitar o site interno ${site.title}.`}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div aria-label="Sites internos" className="site-shortcuts">
          {INTERNAL_SITES.filter(({ id }) => id !== "gluugli").map((site) => (
            <button key={site.id} onClick={() => browserTabs?.navigate(site.url)} type="button">
              {site.title}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

type BubblePost = {
  author: string;
  avatar: string;
  comments: number;
  handle: string;
  id: string;
  image?: string;
  imageAlt?: string;
  likes: number;
  message: string;
  time: string;
};

const bubbleAvatar = (name: string): string =>
  "/System/Doors/sites/bubble/avatar-" + name + ".png";

const initialBubblePosts: BubblePost[] = [
  {
    author: "Ana Paula ^0^",
    avatar: bubbleAvatar("ana"),
    comments: 0,
    handle: "@anaa_paula93",
    id: "post-ana-paula",
    likes: 0,
    message: "",
    time: "há 6min",
  },
  {
    author: "Jorge Roberto",
    avatar: bubbleAvatar("jorge"),
    comments: 3,
    handle: "@jorgeberto",
    id: "post-jorge-roberto",
    image: "/System/Doors/sites/bubble/post-cooking.png",
    imageAlt: "Uma pessoa cozinhando em casa",
    likes: 9,
    message: "",
    time: "há 23min",
  },
  {
    author: "Gabriela Rosa",
    avatar: bubbleAvatar("gabriela"),
    comments: 0,
    handle: "@rosagabi",
    id: "post-gabriela-rosa",
    likes: 0,
    message: "",
    time: "há 49min",
  },
  {
    author: "Gustavo Ribeiro",
    avatar: bubbleAvatar("gustavo"),
    comments: 0,
    handle: "@guguribe",
    id: "post-gustavo-ribeiro",
    likes: 0,
    message: "",
    time: "há 1h",
  },
  {
    author: "Paulo Barbosa",
    avatar: bubbleAvatar("paulo"),
    comments: 3,
    handle: "@paulinho88",
    id: "post-paulo-barbosa",
    image: "/System/Doors/sites/bubble/post-group.png",
    imageAlt: "Grupo de amigos reunidos em uma festa",
    likes: 20,
    message: "",
    time: "há 2h",
  },
];

type BubblePageKey = "inicio" | "perfil" | "amigos" | "comunidades" | "mensagens";

type BubbleFriend = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  mutuals: number;
  online: boolean;
};

type BubbleConversation = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  preview: string;
  stamp: string;
  unread?: number;
  messages: { text: string; mine: boolean; time: string }[];
};

const bubbleNavigation: { id: BubblePageKey; label: string; path: string }[] = [
  { id: "inicio", label: "⌂ Início", path: "inicio" },
  { id: "perfil", label: "Perfil", path: "perfil" },
  { id: "amigos", label: "Amigos", path: "amigos" },
  { id: "comunidades", label: "Comunidades", path: "comunidades" },
  { id: "mensagens", label: "Mensagens", path: "mensagens" },
];

const bubbleFriends: BubbleFriend[] = [
  { id: "jorge", name: "Jorge Roberto", handle: "@jorgeberto", avatar: bubbleAvatar("jorge"), mutuals: 13, online: true },
  { id: "gustavo", name: "Gustavo Ribeiro", handle: "@guguribeiro", avatar: bubbleAvatar("gustavo"), mutuals: 8, online: true },
  { id: "barbara", name: "Bárbara Guedes", handle: "@babigu", avatar: bubbleAvatar("ana"), mutuals: 2, online: false },
  { id: "malu", name: "Malu Souza", handle: "@maluzinhaaaa...", avatar: bubbleAvatar("gabriela"), mutuals: 9, online: false },
  { id: "gabriela", name: "Gabriela Rosa", handle: "@rosagabi", avatar: bubbleAvatar("gabriela"), mutuals: 16, online: true },
  { id: "rui", name: "Rui Mendonça", handle: "@rui.mendonca", avatar: bubbleAvatar("paulo"), mutuals: 12, online: false },
  { id: "paulo", name: "Paulo Barbosa", handle: "@paulinho89", avatar: bubbleAvatar("paulo"), mutuals: 6, online: false },
  { id: "larissa", name: "Larissa Oda", handle: "@odalorissa", avatar: bubbleAvatar("ana"), mutuals: 11, online: true },
];

const bubbleCommunityList = [
  { id: "acordar", title: "Eu Odeio Acordar Cedo", category: "Relacionamentos & amizades", description: "Comunidade feita para todos aqueles que odeiam acordar cedo.", members: "2.842" },
  { id: "deus-me-disse", title: "Deus me disse: desce e arrasa!", category: "Cotidiano", description: "Comunidade para pessoas que NÃO estão na terra à passeio.", members: "684" },
  { id: "te-incomodo", title: "Te incomodo? Que pena!", category: "Vida cotidiana", description: "Tem gente que se incomoda com pessoas felizes e bem resolvidas.", members: "988" },
  { id: "chocolate", title: "Eu amo chocolate!", category: "Culinária, Bebidas e Vinhos", description: "Comunidade criada para os chocolotras de montão!", members: "2.842" },
  { id: "internet-lenta", title: "Internet lenta, papo bom", category: "Tecnologia", description: "A conexão cai, mas a conversa continua.", members: "1.344" },
  { id: "clube-noturnos", title: "Clube dos noturnos", category: "Amizades", description: "Para quem só começa a funcionar depois da meia-noite.", members: "816" },
];

const bubbleRequestsInitial: BubbleFriend[] = [
  { id: "cris", name: "Cris Francisco", handle: "@crisf", avatar: bubbleAvatar("ana"), mutuals: 14, online: false },
  { id: "jamal", name: "Jamal Neves", handle: "@jamaln", avatar: bubbleAvatar("gustavo"), mutuals: 4, online: true },
  { id: "elias", name: "Elias Martins", handle: "@eliasm", avatar: bubbleAvatar("jorge"), mutuals: 7, online: false },
];

const bubbleProfileUpdates: BubblePost[] = [
  { author: "Ana Paula ^0^", avatar: bubbleAvatar("ana"), comments: 3, handle: "@anaa_paula93", id: "profile-bim", likes: 18, message: "ba da bim, ba da bum", time: "há 6min" },
  { author: "Ana Paula ^0^", avatar: bubbleAvatar("ana"), comments: 10, handle: "@anaa_paula93", id: "profile-domingo", likes: 9, message: "que domingo cansativo né gente nossa", time: "ontem" },
  { author: "Ana Paula ^0^", avatar: bubbleAvatar("ana"), comments: 4, handle: "@anaa_paula93", id: "profile-futuro", likes: 6, message: "será que no futuro nós vamos ter carros voadores?", time: "há 3 dias" },
  { author: "Ana Paula ^0^", avatar: bubbleAvatar("ana"), comments: 1, handle: "@anaa_paula93", id: "profile-sono", likes: 4, message: "{U.U}...zzz", time: "quinta-feira" },
];

const bubbleInitialConversations: BubbleConversation[] = [
  {
    id: "malu", name: "Malu Souza", avatar: bubbleAvatar("gabriela"), online: true, preview: "Feliz aniversário!!!", stamp: "11:39",
    messages: [
      { text: "boa noiteee!!", mine: false, time: "19:08" },
      { text: "você ainda vai naquele encontro de sábado?", mine: false, time: "14:08" },
      { text: "vou sim! só tava esperando confirmarem o horário", mine: true, time: "14:29" },
      { text: "pode crer, posso levar aquela câmera pequena também!", mine: true, time: "14:38" },
      { text: "Feliz aniversário!!!", mine: true, time: "11:39" },
    ],
  },
  { id: "larissa", name: "Larissa Oda", avatar: bubbleAvatar("ana"), online: true, preview: "NÃO ACREDITO AMGGGG", stamp: "10:34", messages: [{ text: "NÃO ACREDITO AMGGGG", mine: false, time: "10:34" }] },
  { id: "jorge", name: "Jorge Roberto", avatar: bubbleAvatar("jorge"), online: true, preview: "tchaaaaau", stamp: "ontem", messages: [{ text: "tchaaaaau", mine: false, time: "ontem" }] },
  { id: "barbara", name: "Bárbara Guedes", avatar: bubbleAvatar("ana"), online: false, preview: "não mos isso foi muito...", stamp: "ontem", messages: [{ text: "não mos isso foi muito...", mine: false, time: "ontem" }] },
  { id: "rui", name: "Rui Mendonça", avatar: bubbleAvatar("paulo"), online: true, preview: "eai gatinha. O_-", stamp: "sexta-feira", unread: 8, messages: [{ text: "eai gatinha. O_-", mine: false, time: "sexta-feira" }] },
];

const BUBBLE_SESSION_KEY = "doors-bubble-session";

const BubblePage: FC<{ url: string }> = ({ url }) => {
  const browserTabs = useBrowserTabs();
  const path = new URL(url).pathname.toLowerCase();
  const routePart = path.split("/").filter(Boolean)[0] || "";
  const isLoginRoute = routePart === "";
  const validPages: BubblePageKey[] = ["inicio", "perfil", "amigos", "comunidades", "mensagens"];
  const page: BubblePageKey = validPages.includes(routePart as BubblePageKey)
    ? (routePart as BubblePageKey)
    : "inicio";
  const [loggedIn, setLoggedIn] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [postText, setPostText] = useState("");
  const [postPhoto, setPostPhoto] = useState<{ name: string; src: string } | undefined>();
  const [posts, setPosts] = useState<BubblePost[]>(initialBubblePosts);
  const [profilePosts, setProfilePosts] = useState<BubblePost[]>(bubbleProfileUpdates);
  const [profileDraft, setProfileDraft] = useState("");
  const [profileName] = useState("Ana Paula");
  const [profileAbout, setProfileAbout] = useState("“Por aí, com uma câmera na bolsa e uma música na cabeça”");
  const [editingProfile, setEditingProfile] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [friendSearch, setFriendSearch] = useState("");
  const [friendsTab, setFriendsTab] = useState<"Todos" | "Online" | "Solicitações">("Todos");
  const [requests, setRequests] = useState<BubbleFriend[]>(bubbleRequestsInitial);
  const [friendLists, setFriendLists] = useState([{ name: "Melhores amigos", count: 12 }, { name: "Escola", count: 38 }, { name: "Trabalho", count: 4 }]);
  const [friendListDraft, setFriendListDraft] = useState("");
  const [creatingFriendList, setCreatingFriendList] = useState(false);
  const [addedFriends, setAddedFriends] = useState<string[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(["clube-noturnos", "internet-lenta"]);
  const [communityCategory, setCommunityCategory] = useState("Todas");
  const [communityDraft, setCommunityDraft] = useState("");
  const [creatingCommunity, setCreatingCommunity] = useState(false);
  const [createdCommunities, setCreatedCommunities] = useState<string[]>([]);
  const [conversations, setConversations] = useState<BubbleConversation[]>(bubbleInitialConversations);
  const [activeConversation, setActiveConversation] = useState("malu");
  const [messageSearch, setMessageSearch] = useState("");
  const [messageDraft, setMessageDraft] = useState("");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [commentingPost, setCommentingPost] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [postComments, setPostComments] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const hasSession = window.sessionStorage.getItem(BUBBLE_SESSION_KEY) === "signed-in";
    setLoggedIn(hasSession && !isLoginRoute);
  }, [url, isLoginRoute]);

  const navigate = (destination: BubblePageKey): void => {
    browserTabs?.navigate(SITE_URLS.bubble + destination);
  };

  const startSession = (): void => {
    window.sessionStorage.setItem(BUBBLE_SESSION_KEY, "signed-in");
    setLoggedIn(true);
    navigate("inicio");
  };

  const endSession = (): void => {
    window.sessionStorage.removeItem(BUBBLE_SESSION_KEY);
    setLoggedIn(false);
    browserTabs?.navigate(SITE_URLS.bubble);
  };

  const publishPost = (message: string, image?: { name: string; src: string }, profile = false): void => {
    if (!message.trim() && !image) return;
    const item: BubblePost = {
      author: "Ana Paula ^0^",
      avatar: bubbleAvatar("ana"),
      comments: 0,
      handle: "@anaa_paula93",
      id: "post-" + Date.now().toString() + "-" + Math.random().toString(36).slice(2),
      image: image?.src,
      imageAlt: image?.name,
      likes: 0,
      message: message.trim(),
      time: "agora",
    };
    if (profile) setProfilePosts((current) => [item, ...current]);
    else setPosts((current) => [item, ...current]);
    setPostText("");
    setPostPhoto(undefined);
    setProfileDraft("");
  };

  const renderPost = (post: BubblePost) => {
    const isLiked = likedPosts.includes(post.id);
    const comments = postComments[post.id] || [];
    return (
      <article className="bubble-post-card" key={post.id}>
        <header className="bubble-post-header">
          <img alt="" className="bubble-avatar" src={post.avatar} />
          <div><strong>{post.author}</strong><small>{post.handle} · {post.time}</small></div>
          <button aria-label={"Mais opções para " + post.author} className="bubble-post-menu" onClick={() => {
            if (post.author.startsWith("Ana Paula")) {
              setPosts((current) => current.filter((item) => item.id !== post.id));
              setProfilePosts((current) => current.filter((item) => item.id !== post.id));
            }
          }} type="button">⋮</button>
        </header>
        <div className={"bubble-post-content" + (post.image ? " has-image" : "")}>
          {post.message && <p>{post.message}</p>}
          {post.image && <img alt={post.imageAlt || ""} className="bubble-post-image" src={post.image} />}
          <div className="bubble-post-actions">
            <button aria-pressed={isLiked} onClick={() => setLikedPosts((current) => isLiked ? current.filter((id) => id !== post.id) : [...current, post.id])} type="button">
              {isLiked ? "♥ gostei" : "♡ gostei"} · {post.likes + Number(isLiked)}
            </button>
            <button aria-expanded={commentingPost === post.id} onClick={() => {
              setCommentingPost((current) => current === post.id ? null : post.id);
              setCommentDraft("");
            }} type="button">▱ comentar · {post.comments + comments.length}</button>
            <span>visível para amigos</span>
          </div>
          {commentingPost === post.id && (
            <form className="bubble-comment-form" onSubmit={(event) => {
              event.preventDefault();
              if (!commentDraft.trim()) return;
              setPostComments((current) => ({ ...current, [post.id]: [...(current[post.id] || []), commentDraft.trim()] }));
              setCommentDraft("");
            }}>
              <input aria-label="Escreva um comentário" onChange={({ currentTarget }) => setCommentDraft(currentTarget.value)} placeholder="Escreva um comentário..." value={commentDraft} />
              <button type="submit">Comentar</button>
            </form>
          )}
          {comments.map((comment, index) => <p className="bubble-comment" key={post.id + "-comment-" + index}><strong>Você:</strong> {comment}</p>)}
        </div>
      </article>
    );
  };

  const filteredDirectory = bubbleFriends.filter((friend) => {
    const needle = friendSearch.trim().toLowerCase() || globalSearch.trim().toLowerCase();
    const matchesSearch = !needle || (friend.name + " " + friend.handle).toLowerCase().includes(needle);
    return matchesSearch && (friendsTab !== "Online" || friend.online);
  });

  const renderComposer = (profile = false) => (
    <form className="bubble-composer" onSubmit={(event) => {
      event.preventDefault();
      publishPost(profile ? profileDraft : postText, profile ? undefined : postPhoto, profile);
    }}>
      <h2 className="bubble-composer-title">{profile ? "Escrever no seu mural" : "E aí! O que tá rolando?"}<span aria-hidden="true">▤</span></h2>
      <textarea aria-label={profile ? "Escreva no seu mural" : "Escreva uma publicação"} maxLength={240}
        onChange={({ currentTarget }) => profile ? setProfileDraft(currentTarget.value) : setPostText(currentTarget.value)}
        placeholder="Escreve aí..." value={profile ? profileDraft : postText} />
      <div className="bubble-composer-controls">
        {!profile && <label className="bubble-attach-photo"><input accept="image/*" aria-label="Anexar foto" onChange={({ currentTarget }) => {
          const file = currentTarget.files?.[0];
          if (file) setPostPhoto({ name: file.name, src: URL.createObjectURL(file) });
          currentTarget.value = "";
        }} type="file" /><span>▧ Anexar foto</span></label>}
        {!profile && postPhoto && <span className="bubble-photo-name">{postPhoto.name}</span>}
        <span aria-live="polite" className="bubble-character-count">{(profile ? profileDraft : postText).length}/240</span>
        <button className="bubble-publish" type="submit">Publicar</button>
      </div>
    </form>
  );

  const renderHome = () => (
    <div className="bubble-content-grid">
      <main aria-label="Mural do Bubble" className="bubble-feed">
        {renderComposer()}
        <div className="bubble-post-list">{posts.map(renderPost)}</div>
      </main>
      <aside aria-label="Informações do perfil" className="bubble-sidebar">
        <section className="bubble-profile-card">
          <img alt="" className="bubble-profile-avatar" src={bubbleAvatar("ana")} />
          <div className="bubble-profile-name"><strong>{profileName}</strong><small>@anaa_paula93</small></div>
          <button onClick={() => navigate("perfil")} type="button">Ver perfil completo →</button>
        </section>
        <section className="bubble-side-panel"><h2>Aniversariantes</h2><div className="bubble-side-panel-body"><p><strong>Ana Paula</strong> faz aniversário hoje!</p><p>Mande uma mensagem antes que seja tarde!</p><button className="bubble-text-link" onClick={() => navigate("mensagens")} type="button">Enviar mensagem</button></div></section>
        <section className="bubble-side-panel bubble-friend-panel"><h2>Sugestões de Amigos</h2><div className="bubble-side-panel-body">
          {bubbleFriends.slice(0, 4).map((friend) => <div className="bubble-friend" key={friend.id}>
            <img alt="" src={friend.avatar} /><strong>{friend.name}</strong>
            <button onClick={() => setAddedFriends((current) => current.includes(friend.id) ? current : [...current, friend.id])} type="button">{addedFriends.includes(friend.id) ? "Enviado" : "+ Add"}</button>
          </div>)}
        </div></section>
        <section className="bubble-side-panel bubble-community-panel"><h2>Comunidades</h2><div className="bubble-side-panel-body">
          {bubbleCommunityList.slice(0, 5).map((community) => <button className="bubble-community" key={community.id} onClick={() => navigate("comunidades")} type="button">{community.title}</button>)}
        </div></section>
      </aside>
    </div>
  );

  const renderProfile = () => (
    <div className="bubble-page-content bubble-profile-page">
      <header className="bubble-page-banner"><h1>Perfil</h1><p>Seu canto no Bubble: atualizações, fotos e tudo que seus amigos estão acompanhando.</p></header>
      <section className="bubble-profile-cover">
        <div className="bubble-cover-cloud bubble-cover-cloud-one" /><div className="bubble-cover-cloud bubble-cover-cloud-two" />
        <div className="bubble-profile-summary">
          <img alt="Foto de perfil de Ana Paula" src="/System/Doors/sites/bubble/avatar-ana.png" />
          <div className="bubble-profile-copy">
            <h2>{profileName}</h2><p>@anaa_paula93 · São Paulo, SP</p>
            {editingProfile ? (
              <form className="bubble-edit-profile" onSubmit={(event) => { event.preventDefault(); setEditingProfile(false); }}>
                <label>Seu recado<input maxLength={120} onChange={({ currentTarget }) => setProfileAbout(currentTarget.value)} value={profileAbout} /></label>
                <div><button type="submit">Salvar perfil</button><button onClick={() => setEditingProfile(false)} type="button">Cancelar</button></div>
              </form>
            ) : <p className="bubble-profile-about">{profileAbout}</p>}
          </div>
          {!editingProfile && <button className="bubble-primary-button" onClick={() => setEditingProfile(true)} type="button">Editar perfil</button>}
        </div>
      </section>
      <div className="bubble-profile-columns">
        <main className="bubble-profile-timeline">{renderComposer(true)}<div className="bubble-post-list">{profilePosts.map(renderPost)}</div></main>
        <aside className="bubble-profile-details">
          <section className="bubble-side-panel"><h2>Sobre mim</h2><div className="bubble-side-panel-body"><p><strong>mora em</strong><br />São Paulo, SP</p><p><strong>aniversário</strong><br />12 de maio</p><p><strong>no Bubble desde</strong><br />março de 2007</p></div></section>
          <section className="bubble-side-panel"><h2>Amigos</h2><div className="bubble-side-panel-body bubble-profile-friends">{bubbleFriends.slice(0, 6).map((friend) => <button key={friend.id} onClick={() => navigate("amigos")} type="button"><img alt="" src={friend.avatar} /><span>{friend.name}</span></button>)}<button className="bubble-text-link" onClick={() => navigate("amigos")} type="button">ver todos →</button></div></section>
          <section className="bubble-side-panel"><h2>Comunidades</h2><div className="bubble-side-panel-body">{bubbleCommunityList.slice(0, 3).map((community) => <button className="bubble-community" key={community.id} onClick={() => navigate("comunidades")} type="button">{community.title}</button>)}<button className="bubble-text-link" onClick={() => navigate("comunidades")} type="button">ver todas →</button></div></section>
        </aside>
      </div>
    </div>
  );

  const renderFriends = () => {
    const visiblePeople = friendsTab === "Solicitações"
      ? requests.filter((friend) => {
          const needle = friendSearch.trim().toLowerCase() || globalSearch.trim().toLowerCase();
          return !needle || (friend.name + " " + friend.handle).toLowerCase().includes(needle);
        })
      : filteredDirectory;
    return (
      <div className="bubble-page-content">
        <header className="bubble-page-banner"><h1>Amigos</h1><p>Gente que você conhece, gente que você quase conhece e gente que conhece as mesmas pessoas.</p></header>
        <div className="bubble-friends-layout">
          <main className="bubble-friends-main">
            <div className="bubble-friend-toolbar">
              <div className="bubble-friend-tabs">{(["Todos", "Online", "Solicitações"] as const).map((tab) => <button aria-pressed={friendsTab === tab} className={friendsTab === tab ? "is-active" : undefined} key={tab} onClick={() => setFriendsTab(tab)} type="button">{tab} ({tab === "Todos" ? 126 : tab === "Online" ? 4 : requests.length})</button>)}</div>
              <label className="bubble-list-search"><span className="bubble-visually-hidden">Buscar na sua lista</span><input onChange={({ currentTarget }) => setFriendSearch(currentTarget.value)} placeholder="Procure na sua lista..." value={friendSearch} /><span aria-hidden="true">⌕</span></label>
            </div>
            {visiblePeople.length ? <div className="bubble-friend-grid">{visiblePeople.map((friend) => {
              const requested = addedFriends.includes(friend.id);
              const isRequest = friendsTab === "Solicitações";
              return <article className="bubble-friend-card" key={friend.id}>
                <img alt="" className="bubble-friend-photo" src={friend.avatar} />
                <div className="bubble-friend-info"><h2>{friend.name}{friend.online && <i aria-label="Online" className="bubble-online-dot" />}</h2><p>{friend.handle}</p><small>{friend.mutuals} amigos em comum</small></div>
                <button aria-label={"Mais opções para " + friend.name} className="bubble-card-menu" onClick={() => setAddedFriends((current) => current.includes(friend.id) ? current.filter((id) => id !== friend.id) : [...current, friend.id])} type="button">⋮</button>
                {isRequest ? <div className="bubble-request-actions"><button className="bubble-primary-button" onClick={() => {
                  setRequests((current) => current.filter((item) => item.id !== friend.id));
                  setAddedFriends((current) => current.includes(friend.id) ? current : [...current, friend.id]);
                }} type="button">Aceitar</button><button onClick={() => setRequests((current) => current.filter((item) => item.id !== friend.id))} type="button">Recusar</button></div>
                : <span className="bubble-friend-status">{requested ? "Solicitação enviada" : friend.online ? "Online" : "Amigo"}</span>}
              </article>;
            })}</div> : <div className="bubble-empty-state"><h2>Ninguém por aqui</h2><p>Tente outro nome ou escolha uma aba diferente.</p></div>}
          </main>
          <aside className="bubble-friends-aside">
            <section className="bubble-side-panel"><h2>Resumo</h2><div className="bubble-side-panel-body bubble-summary-stats"><p><span>Todos os amigos</span><strong>126</strong></p><p><span>Online agora</span><strong>4</strong></p><p><span>Novos este mês</span><strong>9</strong></p></div></section>
            <section className="bubble-side-panel"><h2>Talvez você conheça</h2><div className="bubble-side-panel-body">{bubbleRequestsInitial.map((friend) => <div className="bubble-suggested-person" key={friend.id}><img alt="" src={friend.avatar} /><div><strong>{friend.name}</strong><small>{friend.mutuals} amigos em comum</small><button className="bubble-primary-button" onClick={() => setAddedFriends((current) => current.includes(friend.id) ? current : [...current, friend.id])} type="button">{addedFriends.includes(friend.id) ? "Enviado" : "+ Amigo"}</button></div></div>)}</div></section>
            <section className="bubble-side-panel"><h2>Listas</h2><div className="bubble-side-panel-body bubble-summary-stats">{friendLists.map((list) => <p key={list.name}><span>{list.name}</span><strong>{list.count}</strong></p>)}{creatingFriendList ? <form className="bubble-inline-create" onSubmit={(event) => { event.preventDefault(); if (!friendListDraft.trim()) return; setFriendLists((current) => [...current, { name: friendListDraft.trim(), count: 0 }]); setFriendListDraft(""); setCreatingFriendList(false); }}><input aria-label="Nome da nova lista" onChange={({ currentTarget }) => setFriendListDraft(currentTarget.value)} placeholder="Nome da lista" value={friendListDraft} /><button className="bubble-primary-button" type="submit">Criar</button></form> : <button className="bubble-primary-button" onClick={() => setCreatingFriendList(true)} type="button">+ Nova lista</button>}</div></section>
          </aside>
        </div>
      </div>
    );
  };

  const visibleCommunities = bubbleCommunityList.filter((community) => {
    const query = globalSearch.trim().toLowerCase();
    return (communityCategory === "Todas" || community.category === communityCategory)
      && (!query || (community.title + " " + community.description + " " + community.category).toLowerCase().includes(query));
  });
  const renderCommunities = () => (
    <div className="bubble-page-content">
      <header className="bubble-page-banner"><h1>Comunidades</h1><p>Entre em grupos, descubra assuntos novos e encontre pessoas que também não sabem a hora de sair da internet.</p></header>
      <section className="bubble-community-feature">
        <div className="bubble-community-feature-art" aria-hidden="true"><span>🐶</span><small>comunidade da semana</small></div>
        <div className="bubble-community-feature-copy"><small>COMUNIDADE DA SEMANA</small><h2>Quero reclamar sobre a vida</h2><p>Uma comunidade feita com o propósito de dissertar sobre a raiva da sua semana e entreter a rapaziada!</p><div><span>2.848 pessoas</span><span>138 tópicos ativos</span></div><button className="bubble-light-button" onClick={() => setJoinedCommunities((current) => current.includes("semana") ? current : [...current, "semana"])} type="button">{joinedCommunities.includes("semana") ? "Você já participa" : "Entrar na comunidade"}</button></div>
      </section>
      <div className="bubble-community-layout">
        <main className="bubble-community-main">
          <div className="bubble-community-toolbar"><strong>Descobrir comunidades</strong><label>Categoria: <select onChange={({ currentTarget }) => setCommunityCategory(currentTarget.value)} value={communityCategory}><option>Todas</option>{[...new Set(bubbleCommunityList.map((item) => item.category))].map((category) => <option key={category}>{category}</option>)}</select></label></div>
          {creatingCommunity && <form className="bubble-create-community" onSubmit={(event) => {
            event.preventDefault();
            if (!communityDraft.trim()) return;
            setCreatedCommunities((current) => [communityDraft.trim(), ...current]);
            setJoinedCommunities((current) => [communityDraft.trim(), ...current]);
            setCommunityDraft("");
            setCreatingCommunity(false);
          }}><label>Nome da comunidade<input onChange={({ currentTarget }) => setCommunityDraft(currentTarget.value)} placeholder="Ex.: Música na garagem" value={communityDraft} /></label><button className="bubble-primary-button" type="submit">Criar comunidade</button><button onClick={() => setCreatingCommunity(false)} type="button">Cancelar</button></form>}
          <div className="bubble-community-list">
            {createdCommunities.map((title) => <article className="bubble-community-card" key={title}><span className="bubble-community-art">✦</span><div><small>Nova comunidade</small><h2>{title}</h2><p>Seu espaço para conversar com pessoas que gostam do mesmo assunto.</p><button className="bubble-primary-button" onClick={() => setJoinedCommunities((current) => [...current, title])} type="button">Entrar na comunidade</button></div></article>)}
            {visibleCommunities.map((community, index) => <article className="bubble-community-card" key={community.id}><span aria-hidden="true" className={"bubble-community-art art-" + index}>{["☕", "✦", "☻", "♥", "⌁", "♫"][index % 6]}</span><div><small>{community.category}</small><h2>{community.title}</h2><p>{community.description}</p><span className="bubble-member-count">{community.members} pessoas</span><button className="bubble-primary-button" onClick={() => setJoinedCommunities((current) => current.includes(community.id) ? current.filter((id) => id !== community.id) : [...current, community.id])} type="button">{joinedCommunities.includes(community.id) ? "Participando · Sair" : "Entrar na comunidade"}</button></div></article>)}
            {!visibleCommunities.length && <div className="bubble-empty-state"><h2>Nenhum grupo encontrado</h2><p>Experimente outra categoria ou busca.</p></div>}
          </div>
        </main>
        <aside className="bubble-community-aside">
          <section className="bubble-side-panel"><h2>Minhas comunidades</h2><div className="bubble-side-panel-body">{bubbleCommunityList.filter((community) => joinedCommunities.includes(community.id)).map((community) => <div className="bubble-my-community" key={community.id}><span aria-hidden="true">✦</span><div><strong>{community.title}</strong><small>{community.members} pessoas</small></div></div>)}{createdCommunities.map((title) => <div className="bubble-my-community" key={title}><span>✦</span><div><strong>{title}</strong><small>1 pessoa</small></div></div>)}</div></section>
          <section className="bubble-side-panel"><h2>Categorias</h2><div className="bubble-category-grid">{["Música", "Arte", "Filmes", "Culinária", "Jogos", "Tecnologia", "Amizades", "Cotidiano"].map((category, index) => <button key={category} onClick={() => setCommunityCategory(category === "Música" || category === "Arte" || category === "Filmes" || category === "Jogos" ? "Todas" : category === "Culinária" ? "Culinária, Bebidas e Vinhos" : category)} type="button">{category}<span>{[488, 308, 114, 692, 308, 18, 93, 216][index]}</span></button>)}</div></section>
          <section className="bubble-create-invite"><h2>Não achou sua turma?</h2><p>Crie um espaço novo e convide gente que entende do assunto.</p><button className="bubble-light-button" onClick={() => setCreatingCommunity(true)} type="button">Começar agora</button></section>
        </aside>
      </div>
    </div>
  );

  const activeChat = conversations.find((conversation) => conversation.id === activeConversation) || conversations[0];
  const visibleConversations = conversations.filter((conversation) => !messageSearch.trim() || conversation.name.toLowerCase().includes(messageSearch.trim().toLowerCase()));
  const sendMessage = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!messageDraft.trim() || !activeChat) return;
    const text = messageDraft.trim();
    setConversations((current) => current.map((conversation) => conversation.id === activeChat.id
      ? { ...conversation, preview: text, stamp: "agora", messages: [...conversation.messages, { text, mine: true, time: "agora" }] }
      : conversation));
    setMessageDraft("");
  };

  const renderMessages = () => (
    <div className="bubble-page-content">
      <header className="bubble-page-banner"><h1>Mensagens</h1><p>Conversas privadas, planos de última hora e links que você vai abrir só depois.</p></header>
      <section className="bubble-messenger">
        <aside className="bubble-inbox">
          <h2>Caixa de entrada</h2>
          <label className="bubble-inbox-search"><span className="bubble-visually-hidden">Buscar conversas</span><input onChange={({ currentTarget }) => setMessageSearch(currentTarget.value)} placeholder="Buscar conversas" value={messageSearch} /><span aria-hidden="true">⌕</span></label>
          <div className="bubble-conversation-list">{visibleConversations.map((conversation) => <button aria-current={activeChat?.id === conversation.id ? "true" : undefined} className={"bubble-conversation" + (activeChat?.id === conversation.id ? " is-active" : "")} key={conversation.id} onClick={() => setActiveConversation(conversation.id)} type="button">
            <img alt="" src={conversation.avatar} /><span className="bubble-conversation-copy"><strong>{conversation.name}{conversation.online && <i aria-label="Online" className="bubble-online-dot" />}</strong><small>{conversation.preview}</small></span><span className="bubble-conversation-stamp">{conversation.unread ? <b>{conversation.unread}</b> : null}{conversation.stamp}</span>
          </button>)}</div>
        </aside>
        <main className="bubble-chat">
          {activeChat ? <>
            <header className="bubble-chat-header"><img alt="" src={activeChat.avatar} /><div><strong>{activeChat.name}</strong><small>{activeChat.online ? "online agora" : "visto recentemente"}</small></div><button className="bubble-light-button" onClick={() => navigate("perfil")} type="button">Ver perfil</button></header>
            <div aria-live="polite" aria-label={"Conversa com " + activeChat.name} className="bubble-chat-history">{activeChat.messages.map((message, index) => <div className={"bubble-chat-message " + (message.mine ? "is-mine" : "is-theirs")} key={activeChat.id + "-" + index}><p>{message.text}</p><small>{message.time}</small></div>)}</div>
            <form className="bubble-chat-composer" onSubmit={sendMessage}><input aria-label="Escreva sua mensagem" onChange={({ currentTarget }) => setMessageDraft(currentTarget.value)} placeholder="Escreva sua mensagem..." value={messageDraft} /><button className="bubble-primary-button" disabled={!messageDraft.trim()} type="submit">Enviar</button></form>
          </> : <div className="bubble-empty-state"><h2>Escolha uma conversa</h2></div>}
        </main>
      </section>
    </div>
  );

  return (
    <section className={loggedIn ? "site-bubble" : "site-bubble is-login"}>
      {!loggedIn ? (
        <>
          <div className="bubble-auth-notice"><strong>Aviso:</strong> o bubble.br não tem vínculo com o Gluugli.</div>
          <div className="bubble-auth-layout">
            <section className="bubble-auth-promo">
              <div className="bubble-logo-window"><img alt="Bubble" src="/System/Doors/sites/bubble-mark.png" /></div>
              <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas.</p>
              <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades.</p>
              <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar.</p>
            </section>
            <form className="bubble-login" onSubmit={(event) => { event.preventDefault(); startSession(); }}>
              <h2>Acesse o orkut.br com a sua conta</h2>
              <label className="bubble-login-field">e-mail:<input autoComplete="off" id="bubble-email" ref={emailInputRef} required type="email" /></label>
              <label className="bubble-login-field">senha:<input autoComplete="off" required type="password" /></label>
              <label className="bubble-save"><input type="checkbox" /><span>Salvar as minhas informações neste computador.</span></label>
              <p className="bubble-public-warning">Não use em computadores públicos</p>
              <button className="login-submit" type="submit">Login</button>
              <button className="bubble-help" onClick={() => emailInputRef.current?.focus()} type="button">Não consegue acessar a sua conta?</button>
              <p className="bubble-register">Ainda não é membro? <button className="bubble-register-link" onClick={() => emailInputRef.current?.focus()} type="button">ENTRAR JÁ</button></p>
            </form>
          </div>
          <footer className="bubble-login-footer">2005 Orkut.br - <u>Sobre o bubble.br</u> - <u>Centro de segurança</u> - <u>Privacidade</u> - <u>Termos</u> - <u>Contato</u> - Desenvolvido por <u>Latência</u></footer>
        </>
      ) : (
        <>
          <header className="bubble-header">
            <button aria-label="Ir para o início do Bubble" className="bubble-wordmark" onClick={() => navigate("inicio")} type="button">bubble</button>
            <nav aria-label="Navegação do Bubble">{bubbleNavigation.map((item) => <button aria-current={page === item.id ? "page" : undefined} className={page === item.id ? "is-active" : undefined} key={item.id} onClick={() => navigate(item.id)} type="button">{item.label}</button>)}</nav>
            <form aria-label="Buscar pessoas e comunidades" className="bubble-top-search" onSubmit={(event) => event.preventDefault()} role="search">
              <input aria-label="Buscar pessoas, comunidades..." onChange={({ currentTarget }) => setGlobalSearch(currentTarget.value)} placeholder="Buscar pessoas, comunidades..." type="search" value={globalSearch} />
              <button aria-label="Pesquisar" type="submit"><img alt="" aria-hidden="true" src="/System/Doors/search.svg" /></button>
            </form>
            <button className="bubble-session-button" onClick={endSession} type="button">Sair</button>
          </header>
          {page === "inicio" && renderHome()}
          {page === "perfil" && renderProfile()}
          {page === "amigos" && renderFriends()}
          {page === "comunidades" && renderCommunities()}
          {page === "mensagens" && renderMessages()}
          <footer className="bubble-footer"><strong>bubble</strong><nav aria-label="Links do Bubble"><button onClick={() => navigate("perfil")} type="button">sobre</button><button onClick={() => navigate("comunidades")} type="button">segurança</button><button onClick={() => navigate("perfil")} type="button">privacidade</button><button onClick={() => navigate("mensagens")} type="button">ajuda</button></nav><small>© Bubble, 2005. Todos os direitos reservados</small></footer>
        </>
      )}
    </section>
  );
};

const wikiTechnologyArticlePath = "/artigo/avanco-da-tecnologia-e-teorias-de-distopia-digital";

const wikiTechnologyArticleColumns = [
  "O GRANDE COLAPSO DIGITAL: UMA PREVISÃO DO FUTURO FEITA EM 2005 Relatório extraoficial sobre o avanço tecnológico, a escravidão eletrônica e o inevitável desaparecimento da realidade como a conhecemos. São Paulo, 17 de outubro de 2005. Classificação: preocupante, porém inevitável. PREFÁCIO: O FUTURO ESTÁ CHEGANDO, E ELE NÃO PEDIU LICENÇA Estamos vivendo uma época de transformações sem precedentes na história da humanidade. O homem, que há pouco mais de um século dependia de cavalos para transportar suas correspondências e precisava se deslocar fisicamente até a casa de um conhecido para discutir assuntos de interesse mútuo, agora possui a capacidade de enviar mensagens instantâneas através de uma rede internacional de computadores. O que antes levaria dias pode ser realizado em questão de minutos, desde que a conexão não caia, o provedor não esteja realizando manutenção e ninguém esteja utilizando o telefone fixo da residência. Parece maravilhoso. E é exatamente isso que deveria nos preocupar. A humanidade possui uma característica histórica bastante curiosa: toda vez que inventa uma ferramenta capaz de facilitar a vida, imediatamente começa a utilizá-la para complicar a própria existência de maneiras que seus inventores jamais poderiam imaginar. A televisão prometeu informação e entretenimento, mas nos deu programas de auditório nos quais adultos competem para descobrir o conteúdo de caixas misteriosas. O telefone permitiu a comunicação a distância, mas também possibilitou que empresas desconhecidas ligassem durante o jantar para oferecer planos de telefonia. O computador, por sua vez, prometeu libertar o ser humano das tarefas repetitivas, mas agora exige atualizações, antivírus, desfragmentação de disco e uma quantidade inexplicável de paciência. E isso é apenas o começo. Em 2005, observamos o nascimento de uma nova era. A internet está se popularizando, os celulares estão ficando cada vez menores e algumas pessoas já conseguem tirar fotografias com aparelhos que cabem no bolso. Estamos testemunhando os primeiros sinais de uma sociedade na qual a tecnologia deixará de ser uma ferramenta utilizada pelo homem e passará a ser uma entidade da qual o homem dependerá para realizar absolutamente qualquer atividade, inclusive aquelas que não exigiam tecnologia anteriormente. Imagine, por exemplo, que em um futuro não muito distante uma pessoa precise consultar um computador para descobrir se está feliz. Parece absurdo? Naturalmente. Mas também parecia absurdo que alguém precisasse de uma senha para acessar um computador instalado dentro da própria casa. O futuro não será necessariamente governado por robôs armados, máquinas gigantescas ou computadores que desenvolvem consciência e decidem exterminar seus criadores. Essas possibilidades são interessantes, evidentemente, mas talvez estejamos subestimando uma ameaça muito mais sofisticada: a possibilidade de que as máquinas simplesmente nos convençam a fazer tudo o que elas querem enquanto acreditamos estar tomando decisões independentes. Não haverá uma guerra declarada entre homens e máquinas. Haverá termos de uso. E nós aceitaremos todos sem ler. CAPÍTULO I — A INTERNET: A MAIOR INVENÇÃO DA HUMANIDADE OU UM CORREDOR SEM SAÍDA? A internet foi apresentada ao público como uma espécie de biblioteca universal, um lugar onde o conhecimento humano estaria disponível para qualquer indivíduo disposto a procurá-lo. Essa ideia, embora nobre, ignora um detalhe fundamental: a humanidade nunca demonstrou grande habilidade para utilizar ferramentas de conhecimento exclusivamente para adquirir conhecimento. As bibliotecas existem há séculos, e ainda assim precisamos lembrar às pessoas que devem devolver os livros. Portanto, é razoável imaginar que a criação de uma biblioteca mundial, acessível por meio de uma tela luminosa, produzirá resultados que oscilarão entre avanços científicos extraordinários e discussões de quarenta páginas sobre a autenticidade de uma fotografia de um cachorro que supostamente prevê Em 2005, a maioria dos usuários ainda precisa esperar que páginas carreguem lentamente, observando uma barra de progresso como quem acompanha a recuperação de um paciente em estado delicado. Essa espera, segundo especialistas que preferiram não se identificar por receio de perder o acesso à internet, pode estar preparando o terreno para uma transformação psicológica profunda. O indivíduo do futuro não suportará esperar. Não suportará esperar uma página, uma resposta, um ônibus, um amigo ou sequer o próprio pensamento. Cada segundo sem estímulo será interpretado como uma falha do universo. O silêncio se tornará um defeito técnico. O tédio será tratado como uma doença que exige intervenção imediata de algum aparelho eletrônico. Prevemos que, dentro de algumas décadas, as pessoas desenvolverão o hábito de verificar constantemente se algo aconteceu, mesmo quando não existe motivo para acreditar que alguma coisa deveria ter acontecido. O indivíduo acordará, verificará a caixa de mensagens, fechará a caixa de mensagens e abrirá novamente a caixa de mensagens, como se a repetição do procedimento pudesse acelerar o tempo ou convencer o destino a produzir alguma novidade. A internet deixará de ser um lugar para onde vamos e se transformará em um ambiente que carregamos conosco. A consequência será monumental: o ser humano jamais estará verdadeiramente sozinho, mas poderá passar longos períodos sem conversar de verdade com ninguém. Chamaremos isso de conectividade. E, para evitar que alguém perceba a contradição, inventaremos uma palavra nova para cada problema antigo. CAPÍTULO II — A REVOLUÇÃO DOS TELEFONES: QUANDO O BOLSO SE TORNARÁ UMA PRISÃO Os telefones celulares estão evoluindo em uma velocidade impressionante. Os modelos atuais já permitem realizar chamadas, enviar mensagens e, em alguns casos, jogar pequenos jogos nos quais uma cobrinha precisa consumir objetos para aumentar de tamanho.",
  "Não devemos desprezar esse avanço. A cobrinha é, possivelmente, a primeira representação comercialmente bem-sucedida da condição humana sob o capitalismo tecnológico: ela passa a existência consumindo coisas, cresce continuamente e acaba ficando tão limitada pelo próprio crescimento que corre o risco de colidir consigo mesma. É uma metáfora brilhante, embora os fabricantes provavelmente aleguem que foi apenas uma coincidência. Prevemos que os celulares continuarão diminuindo de tamanho até que alguém perceba que não existe mais espaço físico para reduzir os componentes. Nesse momento, a indústria tomará uma decisão radical: em vez de diminuir o aparelho, aumentará o ser humano. Não falamos de alterações genéticas, mas de alterações comportamentais. O indivíduo aprenderá a manter o braço permanentemente dobrado em um ângulo adequado para visualizar a tela. O pescoço assumirá uma posição ligeiramente inclinada, conhecida futuramente como postura de acesso à informação. Os olhos desenvolverão a capacidade de distinguir pequenos símbolos luminosos mesmo durante conversas presenciais. O aparelho será utilizado para consultar mapas, fazer pagamentos, tirar fotografias, ouvir música, ler notícias, conversar com amigos e, eventualmente, descobrir a hora. A pergunta que devemos fazer é simples: se um único dispositivo pode realizar todas essas funções, o que acontecerá quando ele parar de funcionar? A resposta é igualmente simples: nada funcionará. O cidadão ficará parado na calçada, incapaz de descobrir o caminho de casa, de pagar um café ou de lembrar o telefone da própria mãe. Se o aparelho cair em uma poça d'água, toda a sua identidade social entrará em processo de falência. É possível que os governos criem centros de recuperação para indivíduos que perderam seus dispositivos. Nesses estabelecimentos, os pacientes serão incentivados a recordar informações básicas, como o próprio endereço, o nome de familiares e a maneira correta de atravessar uma rua sem consultar uma seta azul. Os resultados iniciais serão decepcionantes. Alguns pacientes perguntarão se existe um aplicativo para aprender essas coisas. CAPÍTULO III — AS REDES SOCIAIS E A COMERCIALIZAÇÃO DA EXISTÊNCIA Até o momento, a comunicação humana possui limitações bastante inconvenientes. Uma pessoa pode conversar com outra, mas não consegue informar simultaneamente a todos os conhecidos que está almoçando, caminhando, estudando, ouvindo música ou observando um objeto interessante na rua. As redes sociais prometem resolver essa deficiência histórica. No futuro, cada indivíduo poderá manter uma página pessoal na qual registrará suas atividades, pensamentos, fotografias e opiniões. Amigos, parentes e desconhecidos terão a oportunidade de acompanhar sua rotina em tempo real, sem a necessidade de serem convidados para participar dela. A princípio, essa tecnologia será utilizada para aproximar pessoas. Em seguida, será utilizada para divulgar produtos. Finalmente, será utilizada para transformar a própria personalidade em uma espécie de catálogo comercial permanentemente aberto. O indivíduo não perguntará mais se está aproveitando uma experiência. Perguntará se a experiência merece ser publicada. Um pôr do sol não será considerado completo até que seja fotografado. Uma refeição não terá sido devidamente consumida até que sua imagem seja divulgada. Uma viagem não será plenamente realizada até que alguém consiga demonstrar, por meio de fotografias estrategicamente selecionadas, que esteve em um lugar onde seus seguidores não estavam. O futuro arqueólogo, ao estudar as ruínas da nossa civilização, encontrará milhões de registros de pessoas segurando copos diante de paredes decorativas. Após meses de pesquisa, concluirá que a principal atividade religiosa do século XXI consistia em frequentar estabelecimentos comerciais e documentar a existência de bebidas. O mais preocupante é que essas redes poderão desenvolver mecanismos para medir a aprovação pública de cada indivíduo. Pequenos números indicarão quantas pessoas gostaram de determinada publicação. Outros números revelarão quantas pessoas acompanharão a vida daquele cidadão. Novos números serão inventados para representar a importância social de cada opinião, fotografia ou declaração. A personalidade humana, até então um fenômeno complexo, será reduzida a indicadores de desempenho. Os cidadãos começarão a adaptar suas opiniões, roupas, viagens e até suas refeições à expectativa de aprovação coletiva. A sinceridade será considerada uma estratégia arriscada. A espontaneidade será cuidadosamente planejada. A individualidade será exibida em modelos padronizados. O ser humano passará a competir pela atenção de outros seres humanos, enquanto empresas disputarão o direito de vender produtos a todos eles. E, quando alguém perguntar por que está fazendo isso, receberá como resposta: \"Porque é assim que funciona.\" Essa frase, meus amigos, será o hino nacional da distopia digital. CAPÍTULO IV — O GRANDE OLHO ELETRÔNICO: QUEM ESTÁ OBSERVANDO QUEM? Uma das maiores preocupações deste relatório diz respeito ao armazenamento de informações pessoais. Atualmente, os cidadãos deixam registros em documentos, cadastros comerciais, fichas escolares, contas bancárias e arquivos governamentais. Essas informações estão espalhadas por diferentes instituições, o que torna o processo de vigilância relativamente trabalhoso e, em determinadas circunstâncias, dependente de seres humanos que precisam preencher formulários. A tecnologia poderá eliminar esse inconveniente. Imagine um mundo no qual os computadores consigam reunir informações sobre os hábitos de consumo, os horários, as preferências e os deslocamentos de uma pessoa. Imagine que esses dados possam ser analisados automaticamente para prever o que ela provavelmente fará em seguida. Seria possível antecipar os interesses de um cidadão antes mesmo que ele os manifestasse publicamente.",
];

const wikiTechnologyArticleHeadings = ["O GRANDE COLAPSO DIGITAL: UMA PREVISÃO DO FUTURO FEITA EM 2005","PREFÁCIO: O FUTURO ESTÁ CHEGANDO, E ELE NÃO PEDIU LICENÇA","CAPÍTULO I — A INTERNET: A MAIOR INVENÇÃO DA HUMANIDADE OU UM CORREDOR SEM SAÍDA?","CAPÍTULO II — A REVOLUÇÃO DOS TELEFONES: QUANDO O BOLSO SE TORNARÁ UMA PRISÃO","CAPÍTULO III — AS REDES SOCIAIS E A COMERCIALIZAÇÃO DA EXISTÊNCIA","CAPÍTULO IV — O GRANDE OLHO ELETRÔNICO: QUEM ESTÁ OBSERVANDO QUEM?"];

const splitWikiTechnologyColumn = (
  content: string
): { body: string; heading?: string }[] => {
  const headings = wikiTechnologyArticleHeadings
    .map((heading) => ({ heading, index: content.indexOf(heading) }))
    .filter(({ index }) => index >= 0)
    .sort((first, second) => first.index - second.index);
  const sections: { body: string; heading?: string }[] = [];
  let cursor = 0;

  headings.forEach(({ heading, index }, position) => {
    if (index > cursor) {
      sections.push({ body: content.slice(cursor, index).trim() });
    }

    const bodyStart = index + heading.length;
    const end = headings[position + 1]?.index ?? content.length;
    sections.push({
      body: content.slice(bodyStart, end).trim(),
      heading,
    });
    cursor = end;
  });

  if (cursor < content.length) {
    sections.push({ body: content.slice(cursor).trim() });
  }

  return sections.filter(({ body }) => body);
};

const wikiLanHouseArticlePath = "/artigo/lan-house";
const wikiSociabilityArticlePath = "/artigo/sociabilidade-nas-lan-houses-das-periferias";
const wikiAssets = "/System/Doors/sites/encicloweb/";

const wikiArticles = [
  {
    body: "A EncicloWeb é uma enciclopédia livre, criada para reunir conhecimento, curiosidades e histórias em um só lugar.",
    path: "/",
    title: "Página Principal",
  },
  {
    body: "A internet conectou redes de computadores e transformou a maneira como pessoas pesquisam, conversam e compartilham conhecimento.",
    path: "/artigo/historia-da-internet",
    title: "História da internet",
  },
  {
    body: "LAN House ou casa da rede é um estabelecimento comercial onde, à semelhança de um cibercafé, os usuários podem pagar para utilizar um PC com acesso à Internet e a uma rede local, com o principal fim de acesso à informação rápida pela rede e entretenimento através dos jogos em rede ou online.",
    path: "/artigo/lan-house",
    title: "Lan house",
  },
  {
    body: "Relatório extraoficial sobre o avanço tecnológico, a escravidão eletrônica e o inevitável desaparecimento da realidade como a conhecemos.",
    path: wikiTechnologyArticlePath,
    title: "Avanço da tecnologia e teorias de distopia digital",
  },
  {
    body: "O artigo Sociabilidade nas lan houses das periferias, de Fábio Mariano Borges, procura compreender por que esses espaços atraíam adolescentes e jovens da cidade de São Paulo e qual era sua importância para as relações sociais. As lan houses também eram locais de encontro, lazer, amizade e convivência.",
    path: wikiSociabilityArticlePath,
    title: "Sociabilidade nas lan houses das periferias",
  },
];


const wikiLanHouseSections = [
  {
    "body": "O conceito de LAN house é famoso na Coreia do Sul, conhecido por PC bang (coreano: PC방). Esses estabelecimentos se tornaram particularmente populares a partir de 1998, com o lançamento de jogos como StarCraft. No Brasil, o conceito inicial trazido pela Monkey Paulista se baseou no modelo sul-coreano. A primeira LAN house brasileira foi inaugurada em São Paulo em 1998 e encerrou suas atividades em 2010. A Lan House Connection foi fundada em meados de 2002, em São Miguel Paulista.",
    "heading": "Surgimento"
  },
  {
    "body": "O estabelecimento é um centro de entretenimento, educação e cultura. LAN significa Local Area Network, ou rede local de computadores. Uma LAN house oferece computadores conectados para acesso à internet e a programas em geral, como jogos eletrônicos e soluções de escritório. Normalmente, é cobrada uma taxa proporcional ao tempo de uso. Mais do que uma casa de jogos, uma LAN house bem estruturada oferece acesso democrático à tecnologia, lazer, oportunidades, educação e cultura a pessoas de todas as idades.",
    "heading": "Características"
  },
  {
    "body": "As LAN houses também são uma ferramenta no processo de inclusão digital, conforme dados levantados pelo Comitê Gestor da Internet no Brasil. Há uma tendência para que instalações de baixo custo se tornem parceiras da educação, com investimentos públicos que cheguem diretamente às comunidades. O Projeto Lan-Social, do professor Ernesto Neto, alcançou resultados e vem sendo desenvolvido em diferentes variantes pelo país.",
    "heading": "Inclusão digital"
  },
  {
    "body": "De acordo com o CGI.br, em 2007 as LAN houses foram responsáveis por quase 50% dos acessos à internet no país. Nas regiões Norte e Nordeste, o índice chegou a quase 70%. A maioria dos clientes era do sexo masculino, com predominância das classes C, D e E.",
    "heading": "Estatísticas"
  },
  {
    "body": "Segundo o SINDLANSP, o Brasil tinha mais de 90 mil LAN houses e cybercafés, embora muitas funcionassem sem legalização por falta de legislação adequada. Esses estabelecimentos também eram responsáveis por parte importante do acesso a serviços públicos, bancos e redes sociais. Mesmo quem tinha conexão em casa podia frequentar uma LAN house para usar a impressora ou resolver problemas de conexão.",
    "heading": "Acesso e serviços"
  },
  {
    "body": "A maioria das LAN houses utiliza programas gerenciadores para cadastrar clientes, registrar acessos, controlar vendas, administrar o caixa, gerar relatórios e auxiliar na segurança dos computadores. O sistema costuma ser dividido entre servidor e cliente. Como os computadores são usados pelo público em geral, manter registros das conexões ajuda em auditorias quando necessário.",
    "heading": "Programas para gerenciar LAN houses"
  },
  {
    "body": "O projeto também apresenta pontos de acesso Wi-Fi, encontrados em cafés, restaurantes, hotéis e aeroportos. Como quem controla um hotspot pode acessar o conteúdo dos aparelhos conectados, é importante escolher redes confiáveis. Smartphones também podem compartilhar sua conexão de dados com outros dispositivos.",
    "heading": "Pontos de acesso Wi-Fi"
  }
];

const wikiSociabilitySections = [
  {
    "body": "Com o avanço da tecnologia e da internet, surgiram novas formas de comunicação, interação e relacionamento. O acesso, porém, depende das condições econômicas e sociais. Nas periferias, muitas famílias não possuem computador ou conexão em casa, então as lan houses oferecem uma alternativa acessível, com internet, jogos, redes sociais, música e serviços de informática. Uma pesquisa em bairros periféricos de São Paulo, realizada entre outubro de 2007 e dezembro de 2008, observou que jovens de 14 a 20 anos frequentavam esses espaços para acessar a internet, encontrar amigos, conversar e fortalecer vínculos sociais.",
    "heading": "O surgimento e a importância das lan houses"
  },
  {
    "body": "Em muitas periferias, casas pequenas e compartilhadas dificultam a privacidade dos adolescentes. As lan houses permitiam que passassem um tempo fora de casa e convivessem com pessoas da mesma faixa etária, sem a observação constante de pais, irmãos e vizinhos.",
    "heading": "Moradia, privacidade e liberdade"
  },
  {
    "body": "O autor aborda também a violência urbana e os preconceitos que associam as periferias à pobreza e à criminalidade. Por receio de que os filhos fossem vítimas de violência, alguns pais viam espaços fechados, como as lan houses, como alternativas mais seguras para os encontros. Parte da convivência que acontecia nas ruas passou a ocorrer em estabelecimentos comerciais.",
    "heading": "Segurança e convivência"
  },
  {
    "body": "Os frequentadores costumavam ir em horários específicos para encontrar os mesmos grupos. Pela manhã havia crianças, pré-adolescentes e pessoas mais velhas; à tarde, adolescentes usavam redes sociais, conversavam, jogavam e ouviam música; à noite, predominavam pessoas com mais de 18 anos. Os interesses compartilhados ajudavam a criar identidade e sentimento de pertencimento.",
    "heading": "Rotina e pertencimento"
  },
  {
    "body": "Frequentadores experientes ensinavam iniciantes a usar computadores, acessar sites e superar dificuldades nos jogos. Quem aprendia podia compartilhar conhecimentos com outras pessoas, ganhando reconhecimento no grupo. Essa troca também podia ser desigual: alguns jovens não ajudavam pessoas com quem não tinham afinidade, o que causava exclusão.",
    "heading": "Troca de conhecimentos"
  },
  {
    "body": "Muitos jovens acreditavam que as habilidades digitais adquiridas nas lan houses poderiam ajudar nos estudos e no futuro profissional. Proprietários e atendentes eram vistos como pessoas com conhecimentos especializados, capazes de orientar os frequentadores sobre tecnologia, jogos e informática.",
    "heading": "Aprendizagem e trabalho"
  },
  {
    "body": "Além do acesso à internet, estabelecimentos vendiam alimentos e bebidas, faziam manutenção de computadores e ofereciam outros serviços. Essa diversificação ajudava os negócios e fazia das lan houses espaços de lazer e convivência, para além da tecnologia.",
    "heading": "Serviços e economia local"
  },
  {
    "body": "Fábio Mariano Borges mostra que não é possível compreender a sociabilidade nas lan houses olhando apenas para o uso da internet. Moradia, privacidade, violência, desigualdade e pertencimento influenciavam a experiência. Esses locais ofereciam acesso à tecnologia, amizades, troca de conhecimentos e construção de identidade. O mundo virtual não estava separado do cotidiano presencial.",
    "heading": "Conclusão"
  }
];

type WikiDiscussionComment = {
  author: string;
  avatar: string;
  body: string;
  replies?: WikiDiscussionComment[];
  time?: string;
};

type SubmittedWikiComment = {
  body: string;
  id: string;
};

const wikiDiscussions: Record<string, WikiDiscussionComment[]> = {
  [wikiLanHouseArticlePath]: [
    {
      "author": "Frequentador de 2005",
      "avatar": "encicloweb-lan-house-author.jpg",
      "body": "Na minha rua, a lan house era onde a gente pesquisava para a escola e se encontrava depois da aula. O tempo passava muito rápido diante do computador.",
      "time": "18 de outubro de 2005, 21h34min (UTC)"
    },
    {
      "author": "Dona do balcão",
      "avatar": "encicloweb-kelly-key.jpg",
      "body": "O atendente também ensinava a imprimir arquivos, criar e-mail e salvar documentos. Esse apoio fazia diferença para quem estava começando.",
      "time": "19 de outubro de 2005, 00h06min (UTC)"
    },
    {
      "author": "Jogador de fim de semana",
      "avatar": "encicloweb-anime.jpg",
      "body": "Os campeonatos e as partidas em rede eram o principal motivo para juntar os amigos no mesmo lugar.",
      "time": "20 de novembro de 2005, 12h06min (UTC)"
    }
  ],
  [wikiSociabilityArticlePath]: [
    {
      "author": "cleidedograu",
      "avatar": "encicloweb-anime.jpg",
      "body": "Na minha opinião, as lan houses foram muito importantes para os jovens das periferias. Esses lugares permitiam acessar a internet, jogar e conversar com os amigos. Além disso, ajudavam os jovens a conhecer novas pessoas e fazer amizades. Achei interessante perceber que eles frequentavam esses espaços não apenas pela tecnologia. Isso mostra como a convivência social é importante durante a juventude.",
      "replies": [
        {
          "author": "AnnaAmanaruhina",
          "avatar": "encicloweb-family.jpg",
          "body": "Achei interessante a parte que fala sobre a falta de privacidade nas casas das periferias. Muitas famílias vivem em espaços pequenos e dividem os cômodos com várias pessoas. Por isso, alguns jovens preferiam passar parte do tempo nas lan houses. Nesses lugares, podiam conversar com os amigos e se divertir. Isso mostra como as condições de moradia influenciam a vida dos jovens.",
          "replies": [
            {
              "author": "EuamokellyKey",
              "avatar": "encicloweb-kelly-key.jpg",
              "body": "Na minha opinião, as lan houses também ajudavam os jovens a aprender coisas novas. Eles desenvolviam conhecimentos sobre computadores, jogos e ferramentas da internet. Além disso, compartilhavam informações e ajudavam uns aos outros. Essas habilidades poderiam ser úteis nos estudos e no futuro profissional. Assim, as lan houses também contribuíam para o aprendizado dos frequentadores.",
              "replies": [
                {
                  "author": "samantha",
                  "avatar": "encicloweb-chris-rock.jpg",
                  "body": "O que mais me chamou a atenção foi a importância das lan houses para as amizades. Esses espaços permitiam que os jovens conversassem e compartilhassem experiências. Com o tempo, muitos criavam vínculos e formavam grupos de amigos. Porém, também existiam situações de exclusão entre alguns frequentadores. Isso mostra que as relações sociais podem ter aspectos positivos e negativos.",
                  "time": "26 de novembro de 2005, 12h06min (UTC)"
                }
              ],
              "time": "20 de novembro de 2005, 12h06min (UTC)"
            }
          ],
          "time": "19 de outubro de 2005, 00h06min (UTC)"
        }
      ],
      "time": "18 de outubro de 2005, 21h34min (UTC)"
    }
  ],
  [wikiTechnologyArticlePath]: [
    {
      "author": "teamjacob",
      "avatar": "encicloweb-twilight-avatar.jpg",
      "body": "Li o artigo inteiro e acho q o autor está certo em alguns pontos. A net tá crescendo muito rápido e ninguém sabe oq está acontecendo. Outro dia li que o Guugli consegue achar páginas do mundo inteiro em segundos. Como isso é possível? Tem gente que diz que existe um computador central guarda todas as info da humanidade, provavelmente em algum lugar dos Estados Unidos. N encontrei provas, mas tbm não encontrei provas de que n existe. Sobre a parte dos computadores controlarem nossos pensamentos, não sei se é possível, mas meu Internet Explorer abriu três janelas sozinho ontem e isso me deixou bastante desconfiado.",
      "replies": [
        {
          "author": "Todomundomeodeia",
          "avatar": "encicloweb-family.jpg",
          "body": "Eu entrei procurando informações pro trabalho da escola e acabei lendo o artigo todo. Algmas coisa são engraçadas, mas outras me fizeram pensar um pouco. Todo mundo q eu conheço está começando a usar a internet com mais frequência, principalmente para conversar pelo MSM, entrar no Bubblee, procurar músicas. Parece muito difícil imaginar q isso possa mudar tanto a maneira como as pessoas vivem. Ao mesmo tempo, já vejo gente q fica desesperada quando não consegue entrar no MSN ou qnd perde a conexão bem na hora da conversa aff.",
          "replies": [
            {
              "author": "lukinhaadoracinema",
              "avatar": "encicloweb-supernatural.jpg",
              "body": "Quero informar que este artigo é uma fraude. Meu computador tá ligado á 3 dias e n aconteceu absolutamente nada do que está escrito aqui. A internet continua funcionando, o bubble continua travando e meu pai continua reclamando da conta telefônica. Onde está o colapso? Onde está a revolução? Onde está meu prêmio por ser o único cidadão que realmente testou essa teoria? Além disso, o autor afirma que os computadores podem controlar a sociedade, mas ontem meu PC não conseguiu nem abrir um arquivo do Word sem apresentar um erro fatal. Se essa máquina pretende dominar a humanidade, sugiro que comece aprendendo a reconhecer um disquete. P.S.: Maycon, se você estiver lendo isso, saiba que descobri como alterar o texto da Wikipédia. Vou substituir o artigo inteiro por uma receita de miojo. Não tente me impedir.",
              "replies": [
                {
                  "author": "jotacoru1234",
                  "avatar": "encicloweb-owl.jpg",
                  "body": "ESSE NÃO É O CARA QUE SUBIU NUM POSTE DE TELEFONE PRA TENTAR DESCOBRIR DE ONDE VINHA A INTERNET???? HUAHUAHAUHAUHAUAHUAHUA Meu primo mora perto da casa dele e disse que o sujeito ficou quase uma hora olhando pros fios, com um rádio de pilha na mão, falando que tinha descoberto a conexão principal do Google. Depois tentou convencer o pessoal da rua a desligar os computadores às 23h59 porque, segundo ele, era nesse horário que os americanos atualizavam o sistema de controle mundial. O pior é que ele teria levado um modem de 56k pra testar a teoria. NO POSTE. O MODEM. Não sei se é verdade, mas se for o mesmo loco, agora entendo esse artigo. LOL",
                  "time": "26 de novembro de 2005, 12h06min (UTC)"
                }
              ],
              "time": "20 de novembro de 2005, 12h06min (UTC)"
            }
          ],
          "time": "19 de outubro de 2005, 00h06min (UTC)"
        }
      ],
      "time": "18 de outubro de 2005, 21h34min (UTC)"
    }
  ]
};

const renderWikiComment = (comment: WikiDiscussionComment, depth = 0): ReactNode => (
  <section
    key={`${comment.author}-${comment.time ?? comment.body.slice(0, 32)}`}
    className={depth === 0 ? "wiki-comment" : "wiki-comment wiki-comment-reply"}
    style={depth > 0 ? { marginLeft: depth * 16 } : undefined}
  >
    <img alt="" src={wikiAssets + comment.avatar} />
    <div>
      <strong>{comment.author}</strong>
      {comment.time && <small className="wiki-comment-time">· {comment.time}</small>}
      <p>{comment.body}</p>
      {comment.replies?.map((reply) => renderWikiComment(reply, depth + 1))}
    </div>
  </section>
);

const EncicloWebPage: FC<{ url: string }> = ({ url }) => {
  const browserTabs = useBrowserTabs();
  const pageUrl = new URL(url);
  const query = pageUrl.searchParams.get("q") || "";
  const requestedPath = pageUrl.pathname.replace(/\/+$/, "") || "/";
  const isDiscussion = requestedPath.endsWith("/discussao");
  const articlePath = isDiscussion
    ? requestedPath.replace(/\/discussao$/, "")
    : requestedPath;
  const article = wikiArticles.find(({ path }) => path === articlePath) || wikiArticles[0];
  const isHome = article.path === "/";
  const isLanHouseArticle = article.path === wikiLanHouseArticlePath;
  const isSociabilityArticle = article.path === wikiSociabilityArticlePath;
  const isTechnologyArticle = article.path === wikiTechnologyArticlePath;
  const hasDiscussion = isLanHouseArticle || isSociabilityArticle || isTechnologyArticle;
  const matchingArticles = wikiArticles.filter(({ body, title }) =>
    `${title} ${body}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  const [commentDraft, setCommentDraft] = useState("");
  const [submittedComments, setSubmittedComments] = useState<SubmittedWikiComment[]>([]);
  const search = (value: string): void =>
    browserTabs?.navigate(searchUrl(`${SITE_URLS.encicloweb}buscar`, value));
  const navigate = (path: string): void => browserTabs?.navigate(SITE_URLS.encicloweb + path);
  const renderTabs = (): ReactNode => (
    <nav aria-label="Página da EncicloWeb" className="wiki-page-tabs">
      <button
        aria-current={isDiscussion ? undefined : "page"}
        onClick={() => navigate(article.path.replace(/^\//, ""))}
        type="button"
      >
        Artigo
      </button>
      <button
        aria-current={isDiscussion ? "page" : undefined}
        onClick={() => navigate(`${article.path.replace(/^\//, "")}/discussao`)}
        type="button"
      >
        Discussão
      </button>
    </nav>
  );

  const sidebarAuthor = isLanHouseArticle
    ? {
        description: "É um pesquisador independente dos avanços tecnológicos e de suas possíveis consequências para a sociedade. Tem interesse em teorias da conspiração, comportamento digital e nos termos de uso que ninguém lê.",
        image: "encicloweb-lan-house-author.jpg",
        name: "Japodi Almo’sá",
      }
    : isSociabilityArticle
      ? {
          description: "Sociólogo, pesquisador e professor brasileiro. É mestre e doutor pela PUC-SP e possui formação em Marketing e Comunicação Social. Seus estudos abordam o comportamento do consumidor, a cultura e as relações sociais.",
          image: "encicloweb-fabio-mariano.jpg",
          name: "Fábio Mariano Borges",
        }
      : isTechnologyArticle
        ? {
            description: "É um pesquisador independente dos avanços tecnológicos e de suas possíveis consequências para a sociedade. Tem interesse em teorias da conspiração, comportamento digital e nos termos de uso que ninguém lê.",
            image: "encicloweb-einstein.jpg",
            name: "Japodi Almo’sá",
          }
        : null;

  const wikiNavigationItems = [
    { label: "Página Principal", path: "" },
    { label: "Portal Comunitário", path: wikiSociabilityArticlePath },
    { label: "Eventos atuais", path: wikiLanHouseArticlePath },
    { label: "Mudanças Recentes", path: wikiTechnologyArticlePath },
    { label: "Sobre nós", path: "/artigo/historia-da-internet" },
    { label: "Ajuda", path: "" },
    { label: "Donativos", path: "" },
  ];

  const wikiToolItems = [
    { label: "Avanço da tecnologia e teorias de distopia digital", path: wikiTechnologyArticlePath },
    { label: "O que são LAN houses e para que veio", path: wikiLanHouseArticlePath },
    { label: "Sociabilidade nas lan houses das periferias", path: wikiSociabilityArticlePath },
  ];

  const renderDiscussion = (): ReactNode => {
    const comments = wikiDiscussions[article.path] || [];

    return (
      <article className="wiki-article wiki-discussion-page">
        {renderTabs()}
        <h1>Veja a opinião dos usuários</h1>
        <form
          className="wiki-comment-form"
          onSubmit={(event) => {
            event.preventDefault();
            const message = commentDraft.trim();
            if (!message) return;
            const submittedComment = {
              body: message,
              id: window.crypto.randomUUID(),
            };
            setSubmittedComments((current) => [...current, submittedComment]);
            setCommentDraft("");
          }}
        >
          <label className="wiki-visually-hidden" htmlFor="wiki-comment">Deixe seu comentário</label>
          <textarea
            id="wiki-comment"
            onChange={({ currentTarget }) => setCommentDraft(currentTarget.value)}
            placeholder="Deixe seu comentário..."
            value={commentDraft}
          />
          <button aria-label="Publicar comentário" disabled={!commentDraft.trim()} type="submit">↵</button>
        </form>
        <div className="wiki-comment-list">
          {comments.map((comment) => renderWikiComment(comment))}
          {submittedComments.map(({ body, id }) => (
            <section key={id} className="wiki-comment">
              <span aria-hidden="true" className="wiki-default-avatar">?</span>
              <div><strong>Você</strong><p>{body}</p></div>
            </section>
          ))}
        </div>
      </article>
    );
  };

  const renderArticle = (): ReactNode => (
    <article className={`wiki-article ${isHome ? "wiki-home-page" : "wiki-content-page"}`}>
      {isHome ? (
        <>
          <h1>Bem vindo ao EncicloWeb,</h1>
          <p>
            A enciclopédia livre, criada para reunir todo o conhecimento humano em um único lugar, incluindo informações que ninguém pediu, curiosidades que ninguém precisava saber e discussões que já duram mais do que alguns casamentos.
          </p>
          <p>
            Fundada em 2001, a EncicloWeb permite que qualquer pessoa com acesso à internet contribua para a construção do conhecimento coletivo. Não é necessário diploma, experiência profissional ou sequer saber exatamente do que está falando. Basta ter um navegador, uma conexão razoável e confiança suficiente para corrigir o trabalho de um desconhecido.
          </p>
          <p>
            Aqui, todos podem editar artigos, adicionar informações e corrigir erros. Entretanto, recomendamos cautela: sua contribuição pode ser revertida por um usuário chamado MestreDosEditores93, que não aparece há três anos, mas continua vigiando a página sobre pombos.
          </p>
          <h2>Como funciona?</h2>
          <ul className="wiki-how-to-list">
            <li><strong>Leia:</strong> descubra informações sobre assuntos que você nunca pensou em pesquisar.</li>
            <li><strong>Edite:</strong> compartilhe o que sabe, o que estudou ou o que ouviu de alguém que conhece uma pessoa que trabalha na área.</li>
            <li><strong>Cite fontes:</strong> porque escrever “meu tio me contou” ainda não é considerado uma referência bibliográfica.</li>
            <li><strong>Discuta:</strong> defenda suas alterações até perceber que está há quatro horas debatendo a diferença entre duas palavras.</li>
            <li><strong>Seja livre:</strong> desde que respeite as regras, as fontes, os administradores e as outras 47 regras que você deveria ter lido antes de começar.</li>
          </ul>
          <section className="wiki-founder-note">
            <p><strong>Jimmy Wales</strong> é um empresário de maceio e cofundador da EncicloWeb, criada em 2001 com a proposta de reunir todo o conhecimento humano em um único lugar. Desde então, sua criação permite que especialistas compartilhem descobertas, estudantes façam pesquisas de última hora e desconhecidos discutam durante horas sobre assuntos que mal compreendem. Wales acredita no conhecimento livre, embora provavelmente não imaginasse que isso também significaria confiar a história da humanidade a pessoas com acesso à internet.</p>
            <img alt="Jimmy Wales em uma fotografia" src={`${wikiAssets}encicloweb-jimmy-wales.jpg`} />
          </section>
        </>
      ) : (
        <>
          {hasDiscussion && renderTabs()}
          <h1>{isLanHouseArticle ? "O que são LAN houses e para que veio" : article.title}</h1>
          {isTechnologyArticle ? (
            <>
              <div className="wiki-essay-columns">
                {wikiTechnologyArticleColumns.map((column) => (
                  <div key={column.slice(0, 64)} className="wiki-essay-column">
                    {splitWikiTechnologyColumn(column).map(({ body, heading }) => (
                      <section key={heading || body.slice(0, 32)} className="wiki-essay-section">
                        {heading && <h2>{heading}</h2>}
                        <p>{body}</p>
                      </section>
                    ))}
                  </div>
                ))}
              </div>
              <p className="wiki-disclaimer">Aviso: Este artigo foi elaborado com base nas opiniões do autor. As fontes foram retiradas diretamente da cabeça dele; os dados não foram verificados e as conclusões carecem de rigor científico. Consulte um profissional antes de acreditar em qualquer coisa aqui escrita.</p>
            </>
          ) : isLanHouseArticle || isSociabilityArticle ? (
            <>
              <div className="wiki-essay-columns">
                <div className="wiki-essay-column">
                  <p className="wiki-article-lead">{article.body}</p>
                  {(isLanHouseArticle ? wikiLanHouseSections : wikiSociabilitySections).slice(0, 2).map((section) => (
                    <section key={section.heading} className="wiki-essay-section">
                      <h2>{section.heading}</h2>
                      <p>{section.body}</p>
                    </section>
                  ))}
                </div>
                <div className="wiki-essay-column">
                  <figure className="wiki-article-figure wiki-feature-figure">
                    <img
                      alt={isLanHouseArticle ? "Computadores antigos organizados em uma lan house" : "Lan house representada em retícula"}
                      src={wikiAssets + (isLanHouseArticle ? "encicloweb-old-computers.jpg" : "encicloweb-lan-house-halftone.jpg")}
                    />
                    <figcaption>
                      {isLanHouseArticle ? "Um ponto de acesso coletivo à internet e aos jogos em rede." : "Computadores e frequentadores em uma lan house de periferia."}
                    </figcaption>
                  </figure>
                  {(isLanHouseArticle ? wikiLanHouseSections : wikiSociabilitySections).slice(2).map((section) => (
                    <section key={section.heading} className="wiki-essay-section">
                      <h2>{section.heading}</h2>
                      <p>{section.body}</p>
                    </section>
                  ))}
                </div>
              </div>
              <p className="wiki-disclaimer">Aviso: Este artigo foi elaborado com base nas opiniões do autor. As fontes foram retiradas diretamente da cabeça dele; os dados não foram verificados e as conclusões carecem de rigor científico. Consulte um profissional antes de acreditar em qualquer coisa aqui escrita.</p>
            </>
          ) : (
            <p>{article.body}</p>
          )}
        </>
      )}
    </article>
  );

  return (
    <section className={`site-encicloweb ${isHome ? "wiki-home" : "wiki-interior"}`}>
      {isHome && (
        <header className="wiki-header">
          <div className="wiki-brand">
            <img alt="" src="/System/Doors/sites/encicloweb-mark.svg" />
            <div>
              <strong>EncicloWeb</strong>
              <small>do fato à mentira</small>
            </div>
          </div>
          <SearchField
            key={query}
            initialValue={query}
            label="Pesquisar na EncicloWeb"
            onSearch={search}
          />
        </header>
      )}
      <div className="wiki-layout">
        <aside className="wiki-sidebar">
          {!isHome && (
            <div className="wiki-sidebar-logo">
              <img alt="EncicloWeb" src="/System/Doors/sites/encicloweb-mark.svg" />
            </div>
          )}
          <section className="wiki-sidebar-panel">
            <h3>Navegação</h3>
            <nav aria-label="Navegação EncicloWeb">
              {wikiNavigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path.replace(/^\//, ""))}
                  type="button"
                >
                  · {item.label}
                </button>
              ))}
            </nav>
          </section>
          {!isHome && (
            <section className="wiki-sidebar-panel wiki-search-panel">
              <h3>Buscar</h3>
              <SearchField
                key={query}
                initialValue={query}
                label="Pesquisar na EncicloWeb"
                onSearch={search}
              />
            </section>
          )}
          <section className="wiki-sidebar-panel wiki-tools-panel">
            <h3>{isHome ? "Artigos" : "Ferramentas"}</h3>
            {wikiToolItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path.replace(/^\//, ""))}
                type="button"
              >
                · {item.label}
              </button>
            ))}
          </section>
          {sidebarAuthor && (
            <section className="wiki-sidebar-panel wiki-sidebar-author">
              <h3>Autor do artigo</h3>
              <img alt={sidebarAuthor.name} src={wikiAssets + sidebarAuthor.image} />
              <p>{sidebarAuthor.name}</p>
              <small>{sidebarAuthor.description}</small>
            </section>
          )}
        </aside>
        {query ? (
          <article className="wiki-article wiki-search-results">
            <h1>Resultados para “{query}”</h1>
            {(matchingArticles.length > 0 ? matchingArticles : wikiArticles).map((item) => (
              <p key={item.path}>
                <button onClick={() => navigate(item.path.replace(/^\//, ""))} type="button">
                  {item.title}
                </button>
                <br />
                {item.body}
              </p>
            ))}
          </article>
        ) : isDiscussion && hasDiscussion ? renderDiscussion() : renderArticle()}
      </div>
    </section>
  );
};

const videos = [
  {
    id: "peter-parker",
    image: "/System/Doors/sites/video-spiderman.png",
    title: "Peter Parker chorando pela tia...",
  },
  {
    id: "crianca-revoltada",
    image: "/System/Doors/sites/video-reaction.png",
    title: "Criança revoltada com show da TV...",
  },
  {
    id: "mc-daleste",
    image: "/System/Doors/sites/video-music.png",
    title: "Mc Daleste - São Paulo (Clipe oficial)",
  },
  {
    id: "nissim-ourfali",
    image: "/System/Doors/sites/video-orca.png",
    title: "Nissim Ourfali - Vamos pra Baleia...",
  },
];

const YouSpacePage: FC<{ url: string }> = ({ url }) => {
  const browserTabs = useBrowserTabs();
  const [playing, setPlaying] = useState(false);
  const query = new URL(url).searchParams.get("q") || "";
  const pathParts = new URL(url).pathname.split("/").filter(Boolean);
  const videoId = pathParts[pathParts.length - 1];
  const video = videos.find(({ id }) => id === videoId);
  const visibleVideos = useMemo(
    () =>
      videos.filter(({ title }) =>
        title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ),
    [query]
  );
  const search = (value: string): void =>
    browserTabs?.navigate(searchUrl(`${SITE_URLS.youspace}buscar`, value));
  const navigate = (path: string): void =>
    browserTabs?.navigate(`${SITE_URLS.youspace}${path}`);

  return (
    <section className="site-youspace">
      <header className="you-topbar">
        <nav aria-label="Seções do YouSpace">
          {["Home", "My Videos", "My Favorite", "My Messages", "My Profile"].map((item) => (
            <button key={item} onClick={() => navigate("")} type="button">
              {item}
            </button>
          ))}
        </nav>
        <nav aria-label="Conta">
          {[
            ["Sing Up", "cadastro"],
            ["Log In", "login"],
            ["Help", "ajuda"],
          ].map(([label, path]) => (
            <button key={path} onClick={() => navigate(path)} type="button">
              {label}
            </button>
          ))}
        </nav>
      </header>
      <div className="you-brand-search">
        <img alt="YouSpace" src="/System/Doors/sites/youspace-logo.png" />
        <small>Seu acervo digital de vídeos</small>
        <SearchField
          key={query}
          initialValue={query}
          label="Pesquisar vídeos"
          onSearch={search}
        />
      </div>
      {video ? (
        <section className="you-player">
          <div className="player-screen">
            <img alt={video.title} src={video.image} />
            <button
              aria-label={playing ? "Pausar demonstração" : "Reproduzir demonstração"}
              onClick={() => setPlaying((current) => !current)}
              type="button"
            >
              {playing ? "Ⅱ" : "▶"}
            </button>
          </div>
          <div className="player-controls">
            {playing ? "Reproduzindo demonstração local" : "Vídeo pronto para reprodução"} · {video.title}
          </div>
        </section>
      ) : (
        <>
          <h2 className="you-section-title">
            {query ? `Resultados para “${query}”` : "Vídeos em alta"}
          </h2>
          <div className="you-video-grid">
            {(visibleVideos.length > 0 ? visibleVideos : videos).map((item) => (
              <button
                key={item.id}
                className="you-video-card"
                onClick={() => {
                  setPlaying(false);
                  navigate(`watch/${item.id}`);
                }}
                type="button"
              >
                <img alt="" src={item.image} />
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

const InternalSites: FC<InternalSitesProps> = ({ url }) => {
  const site = getInternalSite(url);
  const siteId: InternalSiteId = site?.id || "gluugli";

  return (
    <StyledInternalSites key={url} $site={siteId}>
      {siteId === "gluugli" && <GluugliPage url={url} />}
      {siteId === "bubble" && <BubblePage url={url} />}
      {siteId === "encicloweb" && <EncicloWebPage url={url} />}
      {siteId === "youspace" && <YouSpacePage url={url} />}
    </StyledInternalSites>
  );
};

export default InternalSites;


