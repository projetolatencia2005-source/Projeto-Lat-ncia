import { useMemo, useState } from "react";
import type { FormEvent } from "react";
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

const bubbleConversations = [
  {
    id: "01",
    name: "Malu Souza",
    handle: "@malu.souza",
    image: "/System/Doors/sites/bubble/malu-souza.png",
    preview: "feliz aniversario!!!",
    time: "11:39",
    unread: 0,
    messages: [
      { text: "boa noiteee!!", time: "19:08", side: "received", day: "Antes" },
      { text: "você ainda vai naquele encontro de sábado?", time: "14:28", side: "received", day: "Ontem" },
      { text: "vou sim! só tava esperando confirmarem o horário", time: "14:29", side: "sent", day: "Ontem" },
      { text: "confirmaram agora. começa às oito e a gente se encontra na entrada", time: "14:30", side: "received", day: "Ontem" },
      { text: "pode crer. posso levar aquela câmera pequena também!", time: "14:33", side: "sent", day: "Ontem" },
      { text: "fechado! eu levo os CDS", time: "14:30", side: "received", day: "Ontem" },
      { text: "Feliz aniversario!!!", time: "11:39", side: "sent", day: "Hoje" },
    ],
  },
  {
    id: "02",
    name: "Larissa Oda",
    handle: "@oda.larissa",
    image: "/System/Doors/sites/bubble/larissa-oda.png",
    preview: "NÃO ACREDITO AMGGGG",
    time: "10:34",
    unread: 0,
    messages: [
      { text: "boa noite ai mano", time: "19:08", side: "received", day: "Antes" },
      { text: "manoooooooo tu não sabe !!", time: "10:20", side: "received", day: "Hoje" },
      { text: "oque fala ai", time: "10:22", side: "sent", day: "Hoje" },
      { text: "Eu finalmente achei o novo DVD da sandy e junior para vender lá na bar do gato", time: "10:26", side: "received", day: "Hoje" },
      { text: "Eu já sabia e comprei um para mim e para você", time: "10:34", side: "sent", day: "Hoje" },
      { text: "NÃO ACREDITO AMGGGG", time: "10:34", side: "received", day: "Hoje" },
    ],
  },
  {
    id: "03",
    name: "Jorge Roberto",
    handle: "@jorgeroberto",
    image: "/System/Doors/sites/bubble/jorge-roberto.png",
    preview: "Aquela conexão foi mágica",
    time: "ontem",
    unread: 0,
    messages: [
      { text: "ana acabei de voltar do encontro com a Stella", time: "20:02", side: "received", day: "Ontem" },
      { text: "Eai como foi ??", time: "20:10", side: "sent", day: "Ontem" },
      { text: "Foi muito bom ela é perfeita e eu achei ela tão fofa e engraçada, acho que to apaixonado", time: "20:12", side: "received", day: "Ontem" },
      { text: "Pelo amor de Deus que melação, credoo", time: "20:15", side: "sent", day: "Ontem" },
      { text: "Aquela conexão foi mágica", time: "20:18", side: "received", day: "Ontem" },
    ],
  },
  {
    id: "04",
    name: "Barbara Guedes",
    handle: "@barbara.guedes",
    image: "/System/Doors/sites/bubble/barbara-guedes.png",
    preview: "não mas isso foi muito injusto",
    time: "ontem",
    unread: 0,
    messages: [
      { text: "oi eu saí mais cedo da lan houses ontem", time: "17:02", side: "received", day: "Ontem" },
      { text: "você ??? por que ??", time: "17:06", side: "sent", day: "Ontem" },
      { text: "Ba você vai estar na sua casa no dia 17", time: "17:10", side: "received", day: "Ontem" },
      { text: "Meu pai ta falando que eu to gastando muito dinheiro na lan house", time: "17:16", side: "received", day: "Ontem" },
      { text: "não mas isso foi muito injusto", time: "17:21", side: "sent", day: "Ontem" },
      { text: "aquele velho", time: "17:22", side: "received", day: "Ontem" },
    ],
  },
  {
    id: "05",
    name: "Rui Mendonça",
    handle: "@rui.mendonca",
    image: "/System/Doors/sites/bubble/rui-mendonca.png",
    preview: "eaí gatinha 0_-",
    time: "sexta-feira",
    unread: 8,
    messages: [
      { text: "oi eu saí mais cedo da lan houses ontem", time: "18:10", side: "received", day: "Sexta-feira" },
      { text: "oi, tudo bem ? rs", time: "18:18", side: "received", day: "Sexta-feira" },
      { text: "oi, linda, vamos sair por favor", time: "18:34", side: "received", day: "Sexta-feira" },
      { text: "olá gata, te achei mó bonita, me responde para a gente marcar de ir na praça", time: "18:51", side: "received", day: "Sexta-feira" },
      { text: "nossa não vai me responder mesmo, sabia que vc não prestava", time: "19:03", side: "received", day: "Sexta-feira" },
      { text: "eaí gatinha 0_-", time: "19:08", side: "received", day: "Sexta-feira" },
      { text: "eu sou um cara legal confia", time: "19:12", side: "received", day: "Sexta-feira" },
    ],
  },
];

const BubbleMessages: FC<{
  activeId: string;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}> = ({ activeId, onLogout, onNavigate }) => {
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState("");
  const [messagesByContact, setMessagesByContact] = useState<Record<string, (typeof bubbleConversations)[number]["messages"]>>({});
  const contact = bubbleConversations.find(({ id }) => id === activeId) || bubbleConversations[0];
  const messages = messagesByContact[contact.id] || contact.messages;
  const visibleContacts = bubbleConversations.filter(({ name, preview }) =>
    `${name} ${preview}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  const sendMessage = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!draft.trim() && !attachment) return;
    const now = new Date();
    const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const nextMessage = {
      day: "Hoje",
      side: "sent",
      text: draft.trim() || `📎 ${attachment}`,
      time,
    };
    setMessagesByContact((current) => ({
      ...current,
      [contact.id]: [...(current[contact.id] || contact.messages), nextMessage],
    }));
    setDraft("");
    setAttachment("");
  };

  return (
    <section className="site-bubble">
      <header className="bubble-header">
        <button aria-label="Ir para a página inicial do Bubble" className="bubble-wordmark" onClick={() => onNavigate("inicio")} type="button">
          <img alt="Bubble" src="/System/Doors/sites/bubble/wordmark.png" />
        </button>
        <nav aria-label="Navegação do Bubble">
          {[
            ["inicio", "Início", "inicio.png"],
            ["perfil", "Perfil", "perfil.png"],
            ["amigos", "Amigos", "amigos.png"],
            ["comunidades", "Comunidades", "comunidades.png"],
            ["mensagens/01", "Mensagens", "mensagens.png"],
          ].map(([path, label, icon]) => (
            <button
              aria-current={path.startsWith("mensagens") ? "page" : undefined}
              key={path}
              className={path.startsWith("mensagens") ? "is-active" : ""}
              onClick={() => onNavigate(path)}
              type="button"
            >
              <img alt="" src={`/System/Doors/sites/bubble/${icon}`} />
              {label}
            </button>
          ))}
        </nav>
        <SearchField label="Buscar pessoas e comunidades" onSearch={(query) => onNavigate(`busca?q=${encodeURIComponent(query)}`)} />
        <button className="bubble-logout" onClick={onLogout} type="button">Sair</button>
      </header>
      <div className="bubble-published-page-content">
        <header className="bubble-published-page-banner">
          <h1>Mensagens</h1>
          <p>Conversas privadas, planos de última hora e links que você vai abrir só depois.</p>
        </header>
        <section aria-label="Conversas do Bubble" className="bubble-published-messenger">
          <aside className="bubble-published-inbox">
            <h2>Caixa de entrada</h2>
            <form aria-label="Buscar conversas" className="bubble-published-inbox-search" onSubmit={(event) => event.preventDefault()}>
              <input aria-label="Buscar conversas" onChange={({ currentTarget }) => setSearch(currentTarget.value)} placeholder="Buscar conversas" value={search} />
              <button aria-label="Buscar conversas" type="submit"><img alt="" src="/System/Doors/sites/bubble/search.svg" /></button>
            </form>
            <div className="bubble-published-contact-list">
              {visibleContacts.map((item) => (
                <button
                  key={item.id}
                  aria-current={contact.id === item.id ? "true" : undefined}
                  className={`bubble-published-contact${contact.id === item.id ? " is-active" : ""}`}
                  onClick={() => onNavigate(`mensagens/${item.id}`)}
                  type="button"
                >
                  <img alt="" src={item.image} />
                  <span className="bubble-published-contact-copy">
                    <strong>{item.name}<i aria-label="Online agora" /></strong>
                    <small>{item.preview}</small>
                  </span>
                  <span className="bubble-published-contact-stamp">
                    {item.unread > 0 && <b>{item.unread}</b>}
                    {item.time}
                  </span>
                </button>
              ))}
              {visibleContacts.length === 0 && <p className="bubble-published-empty-inbox">Nenhuma conversa encontrada.</p>}
            </div>
          </aside>
          <main aria-label={`Conversa com ${contact.name}`} className="bubble-published-chat">
            <header className="bubble-published-chat-header">
              <img alt="" src={contact.image} />
              <div><strong>{contact.name}</strong><small>online agora</small></div>
              <button onClick={() => onNavigate("perfil")} type="button">Ver perfil</button>
            </header>
            <div aria-live="polite" className="bubble-published-chat-history">
              {messages.map((message, index) => (
                <div
                  key={`${contact.id}-${message.day}-${message.time}-${message.text}`}
                  className="bubble-published-message-fragment"
                >
                  {index === 0 || messages[index - 1].day !== message.day ? (
                    <div className="bubble-published-chat-day"><span>{message.day}</span></div>
                  ) : null}
                  <article className={`bubble-published-message is-${message.side}`}>
                    {message.side === "received" && <img alt="" src={contact.image} />}
                    <div><p>{message.text}</p><time>{message.time}</time></div>
                  </article>
                </div>
              ))}
            </div>
            <form className="bubble-published-composer" onSubmit={sendMessage}>
              <textarea aria-label="Escreva sua mensagem" onChange={({ currentTarget }) => setDraft(currentTarget.value)} placeholder="Escreva sua mensagem..." value={draft} />
              <div>
                <label aria-label="Anexar arquivo" title={attachment || "Anexar arquivo"}>
                  <img alt="" src="/System/Doors/sites/bubble/link.svg" />
                  <input aria-label="Anexar arquivo à mensagem" onChange={({ currentTarget }) => setAttachment(currentTarget.files?.[0]?.name || "")} type="file" />
                </label>
                <button className="bubble-published-send" disabled={!draft.trim() && !attachment} type="submit">Enviar</button>
              </div>
            </form>
          </main>
        </section>
      </div>
      <footer className="bubble-footer bubble-published-footer">
        <strong>bubble</strong>
        <nav aria-label="Links do Bubble">
          <button onClick={() => onNavigate("perfil")} type="button">sobre</button>
          <button onClick={() => onNavigate("comunidades")} type="button">segurança</button>
          <button onClick={() => onNavigate("perfil")} type="button">privacidade</button>
          <button onClick={() => onNavigate("mensagens/01")} type="button">ajuda</button>
        </nav>
        <small>© Bubble, 2005. Todos os direitos reservados</small>
      </footer>
    </section>
  );
};

const BubblePage: FC<{ url: string }> = ({ url }) => {
  const browserTabs = useBrowserTabs();
  const pathname = new URL(url).pathname;
  const [loggedIn, setLoggedIn] = useState(pathname !== "/");
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    {
      author: "Marina Costa",
      message: "Alguém lembra das comunidades que a gente passava horas lendo? 💗",
      time: "há 12 minutos",
    },
    {
      author: "Rafael Lima",
      message: "Compartilhei algumas fotos da lan house. Que saudade de 2005!",
      time: "há 1 hora",
    },
  ]);

  const navigate = (path: string): void =>
    browserTabs?.navigate(SITE_URLS.bubble + path);

  if (loggedIn && pathname.startsWith("/mensagens")) {
    const activeId = pathname.split("/").filter(Boolean)[1] || "01";
    return (
      <BubbleMessages
        activeId={activeId}
        onLogout={() => {
          setLoggedIn(false);
          navigate("");
        }}
        onNavigate={navigate}
      />
    );
  }

  if (loggedIn) {
    return (
      <section className="site-bubble">
        <header className="bubble-header">
          <button aria-label="Ir para a página inicial do Bubble" className="bubble-wordmark" onClick={() => navigate("inicio")} type="button">
            <img alt="Bubble" src="/System/Doors/sites/bubble-mark.png" />
          </button>
          <nav aria-label="Navegação do Bubble">
            {[
              ["inicio", "Início", "inicio.png"],
              ["perfil", "Perfil", "perfil.png"],
              ["amigos", "Amigos", "amigos.png"],
              ["comunidades", "Comunidades", "comunidades.png"],
              ["mensagens/01", "Mensagens", "mensagens.png"],
            ].map(([path, label, icon]) => (
              <button key={path} onClick={() => navigate(path)} type="button">
                <img alt="" src={"/System/Doors/sites/bubble/" + icon} />
                {label}
              </button>
            ))}
          </nav>
          <SearchField label="Buscar pessoas e comunidades" onSearch={(query) => navigate("busca?q=" + encodeURIComponent(query))} />
          <button className="bubble-logout" onClick={() => { setLoggedIn(false); navigate(""); }} type="button">Sair</button>
        </header>
        <div className="bubble-page-heading bubble-home-heading">
          <h1>Início</h1>
          <p>O que seus amigos estão compartilhando.</p>
        </div>
        <div className="bubble-feed-layout">
          <aside className="bubble-profile">
            <div className="bubble-logo-window">
              <img alt="Bubble" src="/System/Doors/sites/bubble-mark.png" />
            </div>
            <h3>Olá, visitante!</h3>
            <p>Seu perfil local</p>
            <button className="bubble-action" onClick={() => undefined} type="button">
              Editar perfil
            </button>
            <p>Amigos: 24</p>
            <p>Comunidades: 8</p>
          </aside>
          <section aria-label="Atualizações dos amigos">
            <div className="bubble-post bubble-composer">
              <h3>O que você está pensando?</h3>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!postText.trim()) return;
                  setPosts((current) => [
                    { author: "Você", message: postText.trim(), time: "agora" },
                    ...current,
                  ]);
                  setPostText("");
                }}
              >
                <textarea
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
            {posts.map((post, index) => (
              <article className="bubble-post" key={`${post.author}-${index}`}>
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
    <section className="site-bubble site-bubble-login">
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
  { id: "eles-sabem", image: "/System/Doors/sites/youspace/verdade.png", title: "A verdade que eles não te contam, mas nós vamso te...", author: "eles.sabem", views: "10,1 mil visualizações", duration: "11:42", category: "Comédia" },
  { id: "ensaio-banda", image: "/System/Doors/sites/youspace/banda.png", title: "ensaio de banda de garagem (deu tudo errado)", author: "mari.mp3", views: "3,4 mil visualizações", duration: "4:38", category: "Música" },
  { id: "skate-amigos", image: "/System/Doors/sites/youspace/skate.png", title: "um dia inteiro andando de skate com meus amigos", author: "guizera1993", views: "900 visualizações", duration: "6:09", category: "Esportes" },
  { id: "role-centro", image: "/System/Doors/sites/youspace/role-centro.png", title: "rolê no centro gravando com uma câmera velha", author: "nat.videos", views: "610 visualizações", duration: "3:04", category: "Vlogs" },
  { id: "cachorro-chinelo", image: "/System/Doors/sites/youspace/cachorro.png", title: "meu cachorro tentando pegar o chinelo", author: "tiaguinho.x", views: "2,1 mil visualizações", duration: "0:47", category: "Comédia" },
  { id: "festa-junina", image: "/System/Doors/sites/youspace/festa-junina.png", title: "festa junina da escola, minha mãe filmou", author: "dudu_rj", views: "880 visualizações", duration: "8:31", category: "Vlogs" },
  { id: "webcam-avo", image: "/System/Doors/sites/youspace/webcam.png", title: "minha avó descobrindo a webcam kkkkk", author: "lu.fernandes", views: "4,2 mil visualizações", duration: "2:15", category: "Comédia" },
  { id: "bicicleta", image: "/System/Doors/sites/youspace/bicicleta.png", title: "a primeira vez que eu andei de bicicleta sem rodinha!!", author: "gabi.santos", views: "1,1 mil visualizações", duration: "1:56", category: "Vlogs" },
  { id: "irmao-chuveiro", image: "/System/Doors/sites/youspace/chuveiro.png", title: "meu irmão cantando no chuveiro (não me mata natan)", author: "tati_oliveira", views: "4,8 mil visualizações", duration: "1:23", category: "Música" },
];

const popularVideoSearches = ["videoclipes", "skate", "vlog", "engraçado", "games", "amigos", "tutorial", "escola"];

const YouSpacePage: FC<{ url: string }> = ({ url }) => {
  const browserTabs = useBrowserTabs();
  const [playing, setPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showMoreNotice, setShowMoreNotice] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const query = new URL(url).searchParams.get("q") || "";
  const pathParts = new URL(url).pathname.split("/").filter(Boolean);
  const videoId = pathParts[pathParts.length - 1];
  const video = videos.find(({ id }) => id === videoId);
  const visibleVideos = useMemo(
    () =>
      videos.filter(({ title }) =>
        title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ).filter(({ category }) =>
        activeCategory === "Todos" || category === activeCategory
      ),
    [query, activeCategory]
  );
  const search = (value: string): void =>
    browserTabs?.navigate(searchUrl(SITE_URLS.youspace + "buscar", value));
  const navigate = (path: string): void =>
    browserTabs?.navigate(SITE_URLS.youspace + path);

  return (
    <section className="site-youspace">
      <header className="you-topbar">
        <button aria-label="Página inicial do YouSpace" className="you-home-link" onClick={() => navigate("")} type="button">
          <img alt="YouSpace" src="/System/Doors/sites/youspace-logo.png" />
        </button>
        <SearchField key={query} initialValue={query} label="Pesquisar vídeos" onSearch={search} />
        <div className="you-profile-control">
          <button aria-label="Abrir perfil do YouSpace" className="you-profile-button" onClick={() => setProfileOpen((open) => !open)} type="button"><span aria-hidden="true">●</span></button>
          {profileOpen && <div className="you-profile-menu"><strong>Meu YouSpace</strong><button onClick={() => { setProfileOpen(false); navigate("perfil"); }} type="button">Ver perfil</button></div>}
        </div>
      </header>
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
          <div className="player-controls"><strong>{video.title}</strong><span>por {video.author} · {video.views}</span><span>{playing ? "Reproduzindo prévia" : "Prévia pausada"}</span></div>
        </section>
      ) : (
        <div className="you-page-layout">
          <main className="you-main">
            <div className="you-section-heading">
              <div><span>HOJE</span><h1>{query ? "Resultados para “" + query + "”" : "Vídeos em alta"}</h1></div>
              <p>{visibleVideos.length === videos.length ? "13 vídeos encontrados" : visibleVideos.length + " vídeos encontrados"}</p>
            </div>
            <nav aria-label="Filtrar vídeos por categoria" className="you-category-list">
              {["Todos", "Música", "Vlogs", "Esportes", "Comédia", "Tecnologia"].map((category) => (
                <button aria-pressed={activeCategory === category} className={activeCategory === category ? "is-selected" : ""} key={category} onClick={() => { setActiveCategory(category); setShowMoreNotice(false); }} type="button">{category}</button>
              ))}
            </nav>
            <div className="you-video-grid">
              {visibleVideos.map((item) => (
                <article className="you-video-card" key={item.id}>
                  <button aria-label={"Assistir: " + item.title} className="you-video-thumbnail" onClick={() => { setPlaying(false); navigate("watch/" + item.id); }} type="button"><img alt="" src={item.image} /><span>{item.duration}</span></button>
                  <button className="you-video-title" onClick={() => { setPlaying(false); navigate("watch/" + item.id); }} type="button">{item.title}</button>
                  <p>por <button onClick={() => navigate("perfil/" + item.author)} type="button">{item.author}</button> · {item.views}</p>
                </article>
              ))}
              {visibleVideos.length === 0 && <p className="you-empty-results">Nenhum vídeo encontrado.</p>}
            </div>
            <button className="you-load-more" onClick={() => setShowMoreNotice(true)} type="button">Carregar mais vídeos</button>
            {showMoreNotice && <p aria-live="polite" className="you-load-message">13 vídeos encontrados. Os 9 vídeos desta prévia estão carregados.</p>}
          </main>
          <aside className="you-sidebar">
            <section className="you-sidebar-welcome"><h2>Bem-vindo ao YouSpace!</h2><p>Seu acervo digital de vídeos.</p></section>
            <section className="you-sidebar-panel">
              <h2>Mais assistidos hoje</h2>
              <ol>{[videos[0], videos[4], videos[8], videos[6], videos[1]].map((item, index) => (
                <li key={item.id}><span>{index + 1}</span><button onClick={() => navigate("watch/" + item.id)} type="button">{item.title}</button></li>
              ))}</ol>
            </section>
            <section className="you-sidebar-panel you-popular-panel">
              <h2>Buscas populares</h2>
              <div>{popularVideoSearches.map((tag) => <button key={tag} onClick={() => { setActiveCategory("Todos"); search(tag); }} type="button">{tag}</button>)}</div>
            </section>
          </aside>
        </div>
      )}
      <footer className="you-footer">
        <img alt="YouSpace" src="/System/Doors/sites/youspace-logo.png" />
        <nav aria-label="Informações do YouSpace">{["sobre", "segurança", "privacidade", "ajuda"].map((item) => <button key={item} type="button">{item}</button>)}</nav>
        <small>© YouSpace, 2007. Todos os direitos reservados</small>
      </footer>
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
