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
    body: "Lan houses foram espaços de acesso coletivo à internet, jogos e comunidades digitais, muito presentes no cotidiano dos anos 2000.",
    path: "/artigo/lan-house",
    title: "Lan house",
  },
  {
    body: "Relatório extraoficial sobre o avanço tecnológico, a escravidão eletrônica e o inevitável desaparecimento da realidade como a conhecemos.",
    path: wikiTechnologyArticlePath,
    title: "Avanço da tecnologia e teorias de distopia digital",
  },
  {
    body: "A convivência em lan houses ajudou a formar comunidades digitais nas periferias, unindo jogos, comunicação e acesso compartilhado à internet.",
    path: wikiSociabilityArticlePath,
    title: "Sociabilidade nas lan houses das periferias",
  },
];


const wikiLanHouseSections = [
  {
    heading: "O espaço de acesso compartilhado",
    body: "Antes de a conexão doméstica se tornar comum, as lan houses ofereciam computadores ligados à internet por hora. O balcão, as fileiras de máquinas e o relógio da sessão faziam parte da rotina de quem precisava pesquisar, conversar, estudar ou jogar.",
  },
  {
    heading: "Uma janela para a rede",
    body: "Para muita gente, a primeira conta de e-mail, a primeira conversa por mensagem instantânea e o primeiro perfil em uma rede social nasceram em um computador de uso coletivo. O acesso acontecia em um lugar físico, mas as possibilidades atravessavam a cidade.",
  },
  {
    heading: "Jogos, amigos e campeonatos",
    body: "As máquinas também viravam pontos de encontro. Grupos combinavam partidas, compartilhavam dicas e organizavam campeonatos locais. O som dos teclados e das partidas criava uma paisagem reconhecível para quem frequentava esses espaços.",
  },
  {
    heading: "Serviços e vida cotidiana",
    body: "Além da diversão, muitas pessoas usavam a lan house para imprimir trabalhos, preencher formulários, consultar serviços e enviar documentos. O atendente frequentemente ajudava quem ainda estava aprendendo a navegar pela internet.",
  },
  {
    heading: "Uma memória da internet brasileira",
    body: "Com a expansão dos celulares e da banda larga, parte das lan houses mudou de função ou encerrou as atividades. Ainda assim, elas permanecem na memória como lugares de aprendizado, convivência e descoberta tecnológica.",
  },
];

const wikiSociabilitySections = [
  {
    heading: "A convivência também era digital",
    body: "A experiência de estar conectado não acontecia apenas diante da tela. Amigos se encontravam no mesmo salão, escolhiam computadores próximos e acompanhavam as partidas e conversas uns dos outros.",
  },
  {
    heading: "A periferia conectada",
    body: "Em bairros onde o computador e a conexão rápida não estavam disponíveis em todas as casas, a lan house funcionava como uma porta de entrada para serviços, informação e comunicação. O espaço compartilhado ampliava o acesso à rede.",
  },
  {
    heading: "Aprender junto",
    body: "Usuários trocavam instruções sobre programas, jogos, e-mail e ferramentas de pesquisa. A ajuda podia vir de um atendente, de um amigo ou de alguém sentado na máquina ao lado.",
  },
  {
    heading: "Jogo como ponto de encontro",
    body: "Partidas em rede criavam vínculos e rivalidades que continuavam fora do jogo. As equipes se organizavam, marcavam horários e celebravam vitórias como parte da vida social do bairro.",
  },
  {
    heading: "Laços que permanecem",
    body: "As lan houses mudaram com a popularização da internet doméstica, mas as lembranças desses espaços mostram que acesso digital também depende de encontros, apoio e participação comunitária.",
  },
];

type WikiDiscussionComment = {
  author: string;
  avatar: string;
  body: string;
  replies?: WikiDiscussionComment[];
};

const wikiDiscussions: Record<string, WikiDiscussionComment[]> = {
  [wikiTechnologyArticlePath]: [
    {
      author: "Albert Einstein",
      avatar: "encicloweb-einstein.jpg",
      body: "A tecnologia facilita tarefas, mas o texto exagera cada consequência para provocar o leitor. Vale separar a sátira das previsões que realmente podem ser verificadas.",
      replies: [
        {
          author: "Leitor da madrugada",
          avatar: "encicloweb-owl.jpg",
          body: "Concordo. A parte do telefone ocupado parece ficção científica para quem só usa celular.",
        },
      ],
    },
    {
      author: "Fã de ficção científica",
      avatar: "encicloweb-supernatural.jpg",
      body: "A comparação com histórias distópicas ajuda a apresentar o tema. Seria bom acrescentar fontes históricas sobre o crescimento do acesso à internet.",
    },
    {
      author: "Charlie",
      avatar: "encicloweb-chaplin.jpg",
      body: "A ideia funciona como humor, desde que o aviso sobre as fontes continue visível para quem chega pela primeira vez.",
    },
    {
      author: "Pesquisadora curiosa",
      avatar: "encicloweb-twilight-avatar.jpg",
      body: "Sugiro incluir uma referência sobre a popularização dos computadores no Brasil para equilibrar as opiniões do autor.",
    },
  ],
  [wikiLanHouseArticlePath]: [
    {
      author: "Frequentador de 2005",
      avatar: "encicloweb-lan-house-author.jpg",
      body: "Na minha rua, a lan house era onde a gente pesquisava para a escola e se encontrava depois da aula. O tempo passava muito rápido diante do computador.",
    },
    {
      author: "Dona do balcão",
      avatar: "encicloweb-kelly-key.jpg",
      body: "O atendente também ensinava a imprimir arquivos, criar e-mail e salvar documentos. Esse apoio fazia diferença para quem estava começando.",
    },
    {
      author: "Jogador de fim de semana",
      avatar: "encicloweb-anime.jpg",
      body: "Os campeonatos e as partidas em rede eram o principal motivo para juntar os amigos no mesmo lugar.",
    },
  ],
  [wikiSociabilityArticlePath]: [
    {
      author: "Fã de jogos em rede",
      avatar: "encicloweb-anime.jpg",
      body: "As partidas em grupo eram um motivo importante para combinar de ir até a lan house. A máquina era individual, mas a experiência era coletiva.",
      replies: [
        {
          author: "Pesquisadora curiosa",
          avatar: "encicloweb-family.jpg",
          body: "Esse relato combina com as memórias de quem frequentava esses espaços nos anos 2000.",
        },
      ],
    },
    {
      author: "Jimmy Wales",
      avatar: "encicloweb-jimmy-wales.jpg",
      body: "O artigo pode ganhar mais fontes orais. Depoimentos de frequentadores e atendentes ajudariam a documentar diferenças entre bairros.",
    },
    {
      author: "Kelly",
      avatar: "encicloweb-kelly-key.jpg",
      body: "Também lembro da ajuda de outras pessoas para criar e-mail e imprimir trabalhos da escola.",
    },
    {
      author: "Leitor do bairro",
      avatar: "encicloweb-chris-rock.jpg",
      body: "Seria interessante registrar como os campeonatos locais ajudavam a aproximar pessoas de idades diferentes.",
    },
  ],
};

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
    (title + " " + body).toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  const [commentDraft, setCommentDraft] = useState("");
  const [submittedComments, setSubmittedComments] = useState<string[]>([]);
  const search = (value: string): void =>
    browserTabs?.navigate(searchUrl(SITE_URLS.encicloweb + "buscar", value));
  const navigate = (path: string): void => browserTabs?.navigate(SITE_URLS.encicloweb + path);
  const legacyHowItWorks = (
    <section className="wiki-legacy-information">
      <h2>Como funciona?</h2>
      <p>
        Leia para descobrir assuntos novos, cite fontes para ajudar outras pessoas e participe das páginas comunitárias. Todo o conteúdo desta demonstração permanece dentro do navegador interno.
      </p>
    </section>
  );

  const renderTabs = () => (
    <nav aria-label="Página da EncicloWeb" className="wiki-page-tabs">
      <button
        aria-current={!isDiscussion ? "page" : undefined}
        onClick={() => navigate(article.path.replace(/^\//, ""))}
        type="button"
      >
        Artigo
      </button>
      <button
        aria-current={isDiscussion ? "page" : undefined}
        onClick={() => navigate(article.path.replace(/^\//, "") + "/discussao")}
        type="button"
      >
        Discussão
      </button>
    </nav>
  );

  const renderAuthor = (author: string, image: string, description: string) => (
    <section className="wiki-author-card">
      <img alt="" src={wikiAssets + image} />
      <div>
        <small className="wiki-author-label">Autor do artigo</small>
        <h2>{author}</h2>
        <p>{description}</p>
      </div>
    </section>
  );

  const renderDiscussion = () => {
    const comments = wikiDiscussions[article.path] || [];
    return (
      <article className="wiki-article wiki-discussion-page">
        {renderTabs()}
        <h1>Veja a opinião dos usuários</h1>
        <p className="wiki-discussion-intro">
          Esta página reúne comentários sobre “{article.title}”. Leia as contribuições e mantenha a conversa respeitosa.
        </p>
        <form
          className="wiki-comment-form"
          onSubmit={(event) => {
            event.preventDefault();
            const message = commentDraft.trim();
            if (!message) return;
            setSubmittedComments((current) => [...current, message]);
            setCommentDraft("");
          }}
        >
          <label htmlFor="wiki-comment">Adicionar um comentário</label>
          <textarea
            id="wiki-comment"
            onChange={({ currentTarget }) => setCommentDraft(currentTarget.value)}
            placeholder="Compartilhe sua opinião..."
            value={commentDraft}
          />
          <button disabled={!commentDraft.trim()} type="submit">Publicar comentário</button>
        </form>
        <div className="wiki-comment-list">
          {comments.map((comment, index) => (
            <section className="wiki-comment" key={comment.author + index}>
              <img alt="" src={wikiAssets + comment.avatar} />
              <div>
                <strong>{comment.author}</strong>
                <p>{comment.body}</p>
                {comment.replies?.map((reply, replyIndex) => (
                  <section className="wiki-comment wiki-comment-reply" key={reply.author + replyIndex}>
                    <img alt="" src={wikiAssets + reply.avatar} />
                    <div>
                      <strong>{reply.author}</strong>
                      <p>{reply.body}</p>
                    </div>
                  </section>
                ))}
              </div>
            </section>
          ))}
          {submittedComments.map((comment, index) => (
            <section className="wiki-comment" key={"submitted-" + index}>
              <span aria-hidden="true" className="wiki-default-avatar">?</span>
              <div><strong>Você</strong><p>{comment}</p></div>
            </section>
          ))}
        </div>
        {isTechnologyArticle &&
          renderAuthor(
            "Albert Einstein",
            "encicloweb-einstein.jpg",
            "Leitor e colaborador da EncicloWeb. O perfil acompanha as discussões sobre tecnologia e cultura digital."
          )}
        {isSociabilityArticle &&
          renderAuthor(
            "Fábio Mariano",
            "encicloweb-fabio-mariano.jpg",
            "Pesquisador das culturas juvenis e das relações construídas em espaços de acesso compartilhado."
          )}
      </article>
    );
  };

  const renderArticle = () => (
    <article className="wiki-article">
      {hasDiscussion && renderTabs()}
      <div className="wiki-article-heading">
        <div>
          <div className="wiki-breadcrumb">EncicloWeb / Artigos / {article.title}</div>
          <h1>{isHome ? "Bem vindo ao EncicloWeb," : isLanHouseArticle ? "O que são LAN houses e para que veio" : article.title}</h1>
        </div>
      </div>

      {isTechnologyArticle ? (
        <>
          <div className="wiki-essay-columns">
            {wikiTechnologyArticleColumns.map((column, columnIndex) => (
              <div className="wiki-essay-column" key={columnIndex}>
                {columnIndex === 0 && (
                  <figure className="wiki-article-figure">
                    <img alt="Albert Einstein em uma fotografia em preto e branco" src={wikiAssets + "encicloweb-einstein.jpg"} />
                    <figcaption>Retrato do colaborador da página</figcaption>
                  </figure>
                )}
                {splitWikiTechnologyColumn(column).map(({ body, heading }) => (
                  <section className="wiki-essay-section" key={heading || body.slice(0, 32)}>
                    {heading && <h2>{heading}</h2>}
                    <p>{body}</p>
                  </section>
                ))}
              </div>
            ))}
          </div>
          {renderAuthor(
            "Japodi Almo’sá",
            "encicloweb-einstein.jpg",
            "É um pesquisador independente dos avanços tecnológicos e de suas possíveis consequências para a sociedade. “ Tenho interesse especial em teorias da conspiração, comportamento digital e no fato de que ninguém parece ler os termos de uso de absolutamente nada” diz autor."
          )}
          <p className="wiki-disclaimer">Aviso: Este artigo foi elaborado com base em nas opinões do autor. As fontes foram retiradas diretamente da cabeça dele, os dados não foram verificados e as conclusões carecem de qualquer rigor científico. Consulte um profissional antes de acreditar em qualquer coisa aqui escrita.</p>
        </>
      ) : isLanHouseArticle || isSociabilityArticle ? (
        <>
          <p className="wiki-article-lead">{article.body}</p>
          <figure className="wiki-article-figure wiki-feature-figure">
            <img
              alt={isLanHouseArticle ? "Computadores organizados em uma antiga lan house" : "Salão de lan house ilustrado em estilo de retícula"}
              src={wikiAssets + (isLanHouseArticle ? "encicloweb-old-computers.jpg" : "encicloweb-lan-house-halftone.jpg")}
            />
            <figcaption>
              {isLanHouseArticle ? "Computadores em um espaço de acesso compartilhado." : "Uma representação de lan house e seus computadores."}
            </figcaption>
          </figure>
          <div className="wiki-essay-columns">
            {(isLanHouseArticle ? wikiLanHouseSections : wikiSociabilitySections).map((section, index) => (
              <section className="wiki-essay-section" key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                {index === 1 && (
                  <figure className="wiki-article-figure wiki-inline-figure">
                    <img
                      alt={isLanHouseArticle ? "Computadores em uma lan house" : "Atendimento em uma lan house"}
                      src={wikiAssets + (isLanHouseArticle ? "encicloweb-lan-house-author.jpg" : "encicloweb-lan-house-halftone.jpg")}
                    />
                  </figure>
                )}
              </section>
            ))}
          </div>
          {isLanHouseArticle
            ? renderAuthor(
                "Justin Timberlake",
                "encicloweb-lan-house-author.jpg",
                "Colaborador da EncicloWeb e frequentador de lan houses durante a expansão dos jogos em rede."
              )
            : renderAuthor(
                "Fábio Mariano",
                "encicloweb-fabio-mariano.jpg",
                "Pesquisador das culturas juvenis e das relações construídas em espaços de acesso compartilhado."
              )}
          {isLanHouseArticle && (
            <section className="wiki-legacy-information">
              <p>Fundada em 2001, a EncicloWeb permite que qualquer pessoa com acesso ao navegador contribua para a construção do conhecimento coletivo. Não é necessário diploma, experiência profissional ou sequer saber exatamente do que está falando. Basta pesquisar, ler e compartilhar o que aprendeu.</p>
              <p>Aqui, todos podem adicionar informações e corrigir erros. Recomendamos cautela: sua contribuição pode ser revertida por alguém que continua vigiando a página sobre pombos.</p>
              {legacyHowItWorks}
            </section>
          )}
        </>
      ) : (
        <>
          <p>
            {isHome
              ? "A enciclopédia livre, criada para reunir todo o conhecimento humano em um único lugar, incluindo informações que ninguém pediu, curiosidades que ninguém precisava saber e discussões que já duram mais do que alguns casamentos."
              : article.body}
          </p>
          <p>
            Fundada em 2001, a EncicloWeb permite que qualquer pessoa com acesso ao navegador contribua para a construção do conhecimento coletivo. Não é necessário diploma, experiência profissional ou sequer saber exatamente do que está falando. Basta pesquisar, ler e compartilhar o que aprendeu.
          </p>
          <p>
            Aqui, todos podem adicionar informações e corrigir erros. Recomendamos cautela: sua contribuição pode ser revertida por alguém que continua vigiando a página sobre pombos.
          </p>
          {legacyHowItWorks}
          {isHome && (
            <>
              <ul className="wiki-how-to-list">
                <li><strong>Leia:</strong> descubra informações sobre assuntos que você nunca pensou em pesquisar.</li>
                <li><strong>Edite:</strong> compartilhe o que sabe, o que estudou ou o que ouviu de alguém que conhece uma pessoa que trabalha na área.</li>
                <li><strong>Cite fontes:</strong> porque escrever “meu tio me contou” ainda não é considerado uma referência bibliográfica.</li>
                <li><strong>Discuta:</strong> defenda suas alterações até perceber que está há quatro horas debatendo a diferença entre duas palavras.</li>
                <li><strong>Seja livre:</strong> desde que respeite as regras, as fontes, os administradores e as outras 47 regras que você deveria ter lido antes de começar.</li>
              </ul>
              <section className="wiki-founder-note">
                <img alt="" src={wikiAssets + "encicloweb-jimmy-wales.jpg"} />
                <p><strong>Jimmy Wales</strong> Jimmy Wales é um empresário de maceio e cofundador da EncicloWeb, criada em 2001 com a proposta de reunir todo o conhecimento humano em um único lugar. Desde então, sua criação permite que especialistas compartilhem descobertas, estudantes façam pesquisas de última hora e desconhecidos discutam durante horas sobre assuntos que mal compreendem. Wales acredita no conhecimento livre, embora provavelmente não imaginasse que isso também significaria confiar a história da humanidade a pessoas com acesso à internet.</p>
              </section>
            </>
          )}
        </>
      )}
    </article>
  );

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
          <nav aria-label="Navegação EncicloWeb">
            {(query ? matchingArticles : wikiArticles).map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path.replace(/^\//, ""))}
                type="button"
              >
                · {item.title}
              </button>
            ))}
          </nav>
          <h3>Ferramentas</h3>
          <button onClick={() => navigate("")} type="button">· Artigos influentes</button>
          <button onClick={() => navigate("buscar?q=novidades")} type="button">· Novidades</button>
          <button onClick={() => navigate("artigo/lan-house")} type="button">· Página aleatória</button>
          {(isLanHouseArticle || isSociabilityArticle || isTechnologyArticle) && (
            <section className="wiki-sidebar-author">
              <h3>Autor</h3>
              <img
                alt=""
                src={wikiAssets + (isLanHouseArticle ? "encicloweb-lan-house-author.jpg" : isSociabilityArticle ? "encicloweb-fabio-mariano.jpg" : "encicloweb-einstein.jpg")}
              />
              <p>{isLanHouseArticle ? "Justin Timberlake" : isSociabilityArticle ? "Fábio Mariano" : "Japodi Almo’sá"}</p>
              <small>Perfil do colaborador</small>
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
