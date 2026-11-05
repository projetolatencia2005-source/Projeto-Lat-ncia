import { useMemo, useState } from "react";
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

const BubblePage: FC<{ url: string }> = ({ url }) => {
  const browserTabs = useBrowserTabs();
  const [loggedIn, setLoggedIn] = useState(new URL(url).pathname.startsWith("/inicio"));
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    {
      author: "Marina Costa",
      id: "post-marina-costa",
      message: "Alguém lembra das comunidades que a gente passava horas lendo? 💗",
      time: "há 12 minutos",
    },
    {
      author: "Rafael Lima",
      id: "post-rafael-lima",
      message: "Compartilhei algumas fotos da lan house. Que saudade de 2005!",
      time: "há 1 hora",
    },
  ]);

  if (loggedIn) {
    return (
      <section className="site-bubble">
        <header className="bubble-header">
          <strong>Bubble</strong>
          <nav aria-label="Navegação do Bubble">
            {["Início", "Amigos", "Comunidades", "Recados"].map((item) => (
              <button key={item} type="button" disabled>
                {item}
              </button>
            ))}
          </nav>
          <button onClick={() => setLoggedIn(false)} type="button">
            Sair
          </button>
        </header>
        <div className="bubble-feed-layout">
          <aside className="bubble-profile">
            <div className="bubble-logo-window">
              <img alt="Bubble" src="/System/Doors/sites/bubble-mark.png" />
            </div>
            <h3>Olá, visitante!</h3>
            <p>Seu perfil local</p>
            <button className="bubble-action" type="button" disabled>
              Editar perfil
            </button>
            <p>Amigos: 24</p>
            <p>Comunidades: 8</p>
          </aside>
          <section aria-label="Atualizações dos amigos">
            <div className="bubble-post">
              <h3>O que você está pensando?</h3>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!postText.trim()) return;
                  setPosts((current) => [
                    {
                      author: "Você",
                      id: `post-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                      message: postText.trim(),
                      time: "agora",
                    },
                    ...current,
                  ]);
                  setPostText("");
                }}
              >
                <input
                  aria-label="Escreva um recado"
                  onChange={({ currentTarget }) => setPostText(currentTarget.value)}
                  placeholder="Escreva um recado para seus amigos"
                  value={postText}
                />
                <button className="bubble-action" type="submit">
                  Publicar recado
                </button>
              </form>
            </div>
            {posts.map((post) => (
              <article key={post.id} className="bubble-post">
                <h3>{post.author}</h3>
                <p>{post.message}</p>
                <small>{post.time}</small>
              </article>
            ))}
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className="site-bubble">
      <div className="bubble-notice">
        <strong>Aviso:</strong> o Bubble é uma rede social interna da Lan House Latência.
      </div>
      <div className="bubble-login-layout">
        <section className="bubble-welcome">
          <div className="bubble-logo-window">
            <img alt="Bubble" src="/System/Doors/sites/bubble-mark.png" />
          </div>
          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens.
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através das comunidades.
          </p>
          <p>
            <strong>Compartilhe</strong> vídeos, fotos e paixões em um só lugar.
          </p>
        </section>
        <form
          className="bubble-login"
          onSubmit={(event) => {
            event.preventDefault();
            setLoggedIn(true);
            browserTabs?.navigate(`${SITE_URLS.bubble}inicio`);
          }}
        >
          <h2>Acesse sua conta</h2>
          <label>
            e-mail:
            <input autoComplete="off" type="email" />
          </label>
          <label>
            senha:
            <input autoComplete="off" type="password" />
          </label>
          <label className="bubble-save">
            <input type="checkbox" />
            Salvar minhas informações neste computador.
          </label>
          <button className="login-submit" type="submit">
            Login
          </button>
          <button className="pink-link" onClick={() => setLoggedIn(true)} type="button">
            Entrar já
          </button>
        </form>
      </div>
      <footer className="bubble-footer">
        2005 Bubble.br · Sobre · Segurança · Privacidade · Termos · Contato
      </footer>
    </section>
  );
};

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
    body: "Lan houses foram espaços de acesso coletivo à internet, jogos e comunidades digitais, muito presentes no cotidiano dos anos 2000.",
    path: "/artigo/lan-house",
    title: "Lan house",
  },
];

const EncicloWebPage: FC<{ url: string }> = ({ url }) => {
  const browserTabs = useBrowserTabs();
  const query = new URL(url).searchParams.get("q") || "";
  const slug = new URL(url).pathname;
  const article = wikiArticles.find(({ path }) => path === slug) || wikiArticles[0];
  const matchingArticles = wikiArticles.filter(({ body, title }) =>
    `${title} ${body}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  const search = (value: string): void =>
    browserTabs?.navigate(searchUrl(`${SITE_URLS.encicloweb}buscar`, value));

  return (
    <section className="site-encicloweb">
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
      <div className="wiki-layout">
        <aside className="wiki-sidebar">
          <h3>Navegação</h3>
          {(query ? matchingArticles : wikiArticles).map((item) => (
            <button
              key={item.path}
              onClick={() => browserTabs?.navigate(`${SITE_URLS.encicloweb}${item.path.replace(/^\//, "")}`)}
              type="button"
            >
              · {item.title}
            </button>
          ))}
          <h3>Ferramentas</h3>
          <button onClick={() => browserTabs?.navigate(SITE_URLS.encicloweb)} type="button">
            · Artigos influentes
          </button>
          <button onClick={() => browserTabs?.navigate(`${SITE_URLS.encicloweb}buscar?q=novidades`)} type="button">
            · Novidades
          </button>
          <button onClick={() => browserTabs?.navigate(`${SITE_URLS.encicloweb}artigo/lan-house`)} type="button">
            · Página aleatória
          </button>
        </aside>
        <article className="wiki-article">
          {query ? (
            <>
              <h1>Resultados para “{query}”</h1>
              {(matchingArticles.length > 0 ? matchingArticles : wikiArticles).map((item) => (
                <p key={item.path}>
                  <button
                    onClick={() => browserTabs?.navigate(`${SITE_URLS.encicloweb}${item.path.replace(/^\//, "")}`)}
                    type="button"
                  >
                    {item.title}
                  </button>
                  <br />
                  {item.body}
                </p>
              ))}
            </>
          ) : (
            <>
              <h1>{article.path === "/" ? "Bem vindo ao EncicloWeb," : article.title}</h1>
              <p>
                {article.path === "/"
                  ? "A enciclopédia livre, criada para reunir todo o conhecimento humano em um único lugar, incluindo informações que ninguém pediu, curiosidades que ninguém precisava saber e discussões que já duram mais do que alguns casamentos."
                  : article.body}
              </p>
              <p>
                Fundada em 2001, a EncicloWeb permite que qualquer pessoa com acesso ao navegador contribua para a construção do conhecimento coletivo. Não é necessário diploma, experiência profissional ou sequer saber exatamente do que está falando. Basta pesquisar, ler e compartilhar o que aprendeu.
              </p>
              <p>
                Aqui, todos podem adicionar informações e corrigir erros. Recomendamos cautela: sua contribuição pode ser revertida por alguém que continua vigiando a página sobre pombos.
              </p>
              <h2>Como funciona?</h2>
              <p>
                Leia para descobrir assuntos novos, cite fontes para ajudar outras pessoas e participe das páginas comunitárias. Todo o conteúdo desta demonstração permanece dentro do navegador interno.
              </p>
            </>
          )}
        </article>
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
