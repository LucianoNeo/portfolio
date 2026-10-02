const translations = {
  pt: {
    navProjects: "Projetos",
    navAbout: "Sobre",
    navContact: "Contato",
    talk: "Entrar em contato",
    heroEyebrow: "LUCIANO DOS SANTOS BUENO · CURITIBA, BRASIL",
    heroLine1: "Desenvolvedor",
    heroLine2: "Back-end C# / .NET",
    heroDesc:
      "APIs, persistência de dados e integrações. Minha experiência full stack conecta o back-end ao produto; meu foco atual é aprofundar a engenharia com C# e .NET.",
    explore: "Conhecer projetos",
    chapter: "FOCO ATUAL",
    location: "APIs · DADOS · INTEGRAÇÕES",
    role: "Engenheiro de Software",
    playerProfile: "PERFIL DO DESENVOLVEDOR",
    className: "CLASSE",
    profileLabel: "Perfil de Luciano",
    avatarAlt: "Foto de Luciano dos Santos Bueno",
    selectedWork: "PROJETOS / MISSÕES PRINCIPAIS",
    questLog: "Código com contexto",
    projectsIntro:
      "Conheça o problema, as decisões técnicas e as evidências de cada projeto. Os novos laboratórios .NET têm código, testes e instruções para execução local.",
    filterFeatured: "Destaques",
    filterAll: "Todos",
    filterBackend: "Back-end .NET",
    filterApps: "Full stack",
    filterLabel: "Filtrar projetos",
    code: "Código",
    live: "Demonstração",
    details: "Estudo de caso",
    projectsCount: (n) => `${n} ${n === 1 ? "projeto" : "projetos"}`,
    moreProjects: "Outros trabalhos e exercícios:",
    allGithub: "Explorar meu GitHub",
    creativeEyebrow: "SIDE QUESTS",
    creativeTitle: "Jogos & experimentos",
    creativeIntro:
      "Projetos que exploram interfaces, ferramentas e meu interesse por jogos de RPG eletrônico.",
    aboutEyebrow: "TRAJETÓRIA & DIREÇÃO",
    aboutTitle: "Back-end como base.\nProduto como destino",
    aboutText:
      "Meu foco atual é C# e .NET, APIs REST e integração de dados. A trajetória em desenvolvimento full stack, suporte técnico e DevOps amplia minha visão sobre o ciclo de uma aplicação.",
    aboutText2:
      "Também construo com Node.js, Python, React, Next.js, TypeScript e React Native. Docker, Kubernetes e AWS fazem parte dos meus estudos e da minha prática em infraestrutura.",
    experienceHeading: "Experiência",
    experienceScope: "Desenvolvimento de aplicações web com Vue.js, Nuxt, C# e .NET.",
    educationHeading: "Formação",
    educationCourse: "Redes de Computadores",
    educationSchool: "FAE Centro Universitário · São José dos Pinhais",
    linkedinProfile: "Experiência e formação no LinkedIn",
    loadout: "TECNOLOGIAS & PRÁTICA",
    apisData: "APIs & dados",
    cloudDevops: "Cloud & DevOps · estudos",
    frontMobile: "Front-end & mobile",
    basedIn: "BASE: CURITIBA, BRASIL",
    nextQuest: "PRÓXIMA MISSÃO / CONTATO",
    contactTitle: "Vamos conversar sobre back-end?",
    contactText:
      "Para oportunidades em desenvolvimento C# / .NET, meu código e estudos de caso estão disponíveis acima. Entre em contato por e-mail ou pelo LinkedIn.",
    emailMe: "Enviar e-mail",
    resume: "Resumo profissional",
    footerMade: "Código, produto e algumas side quests.",
    evidenceTitle: "Evidências no código",
    evidence1: "Autorização & dados",
    evidence1text:
      "Isolamento entre organizações e regras de acesso no NeoTasks .NET.",
    evidence2: "Concorrência & idempotência",
    evidence2text:
      "Reserva da última vaga e repetição segura de requisições no Raid Booking.",
    evidence3: "Integrações & recuperação",
    evidence3text:
      "Assinatura HMAC, deduplicação e tentativas no Webhook Inbox.",
    problem: "Problema",
    contribution: "Implementação & escopo",
    decisions: "Decisões técnicas",
    proof: "Evidências verificáveis",
    limits: "Limitações & próximos passos",
    close: "Fechar estudo de caso",
    lab: "Laboratório .NET · execução local",
    archive: "Estudo anterior · .NET 6",
    product: "Aplicação web",
    creative: "Projeto criativo",
    labNote:
      "Os laboratórios são projetos de demonstração. Sua documentação descreve o escopo implementado e as evoluções necessárias para uso em produção.",
  },
  en: {
    navProjects: "Projects",
    navAbout: "About",
    navContact: "Contact",
    talk: "Get in touch",
    heroEyebrow: "LUCIANO DOS SANTOS BUENO · CURITIBA, BRAZIL",
    heroLine1: "Back-end developer",
    heroLine2: "C# / .NET",
    heroDesc:
      "APIs, data persistence and integrations. My full stack background connects the back end to the product; my current focus is deepening my C# and .NET engineering skills.",
    explore: "Explore projects",
    chapter: "CURRENT FOCUS",
    location: "APIs · DATA · INTEGRATIONS",
    role: "Software Engineer",
    playerProfile: "DEVELOPER PROFILE",
    className: "CLASS",
    profileLabel: "Luciano profile",
    avatarAlt: "Portrait of Luciano dos Santos Bueno",
    selectedWork: "PROJECTS / MAIN QUESTS",
    questLog: "Code with context",
    projectsIntro:
      "Explore the problem, technical decisions and evidence behind each project. The new .NET labs include source code, tests and local setup instructions.",
    filterFeatured: "Featured",
    filterAll: "All",
    filterBackend: ".NET back end",
    filterApps: "Full stack",
    filterLabel: "Filter projects",
    code: "Source code",
    live: "Live demo",
    details: "Case study",
    projectsCount: (n) => `${n} ${n === 1 ? "project" : "projects"}`,
    moreProjects: "More work and exercises:",
    allGithub: "Explore my GitHub",
    creativeEyebrow: "SIDE QUESTS",
    creativeTitle: "Games & experiments",
    creativeIntro:
      "Projects exploring interfaces, tooling and my interest in electronic RPGs.",
    aboutEyebrow: "BACKGROUND & DIRECTION",
    aboutTitle: "Back end at the core.\nProduct as the goal",
    aboutText:
      "My current focus is C# and .NET, REST APIs and data integration. My background in full stack development, technical support and DevOps broadens my understanding of the application lifecycle.",
    aboutText2:
      "I also build with Node.js, Python, React, Next.js, TypeScript and React Native. Docker, Kubernetes and AWS are part of my infrastructure studies and practice.",
    experienceHeading: "Experience",
    experienceScope: "Web application development with Vue.js, Nuxt, C# and .NET.",
    educationHeading: "Education",
    educationCourse: "Computer Networks",
    educationSchool: "FAE Centro Universitário · São José dos Pinhais",
    linkedinProfile: "Experience and education on LinkedIn",
    loadout: "TECHNOLOGIES & PRACTICE",
    apisData: "APIs & data",
    cloudDevops: "Cloud & DevOps · studies",
    frontMobile: "Front end & mobile",
    basedIn: "BASED IN CURITIBA, BRAZIL",
    nextQuest: "NEXT QUEST / CONTACT",
    contactTitle: "Let’s talk about back-end engineering",
    contactText:
      "For C# / .NET development opportunities, my code and case studies are available above. Contact me by email or on LinkedIn.",
    emailMe: "Send an email",
    resume: "Professional summary",
    footerMade: "Code, product and a few side quests.",
    evidenceTitle: "Evidence in the code",
    evidence1: "Authorization & data",
    evidence1text: "Organization isolation and access rules in NeoTasks .NET.",
    evidence2: "Concurrency & idempotency",
    evidence2text: "Last-seat booking and safe request replay in Raid Booking.",
    evidence3: "Integrations & recovery",
    evidence3text:
      "HMAC signatures, deduplication and retries in Webhook Inbox.",
    problem: "Problem",
    contribution: "Implementation & scope",
    decisions: "Technical decisions",
    proof: "Verifiable evidence",
    limits: "Limitations & next steps",
    close: "Close case study",
    lab: ".NET lab · runs locally",
    archive: "Earlier study · .NET 6",
    product: "Web application",
    creative: "Creative project",
    labNote:
      "These labs are demonstration projects. Their documentation describes the implemented scope and the remaining work before production use.",
  },
};
const repo = "https://github.com/LucianoNeo/portfolio/tree/main/projects/";
const projects = [
  {
    id: "neotasks-dotnet",
    name: "NeoTasks .NET",
    category: "backend",
    featured: true,
    status: "lab",
    image: "assets/neotasks-dotnet.svg",
    tech: ["C#", ".NET 10", "EF Core", "SQLite", "JWT", "xUnit"],
    code: repo + "neotasks-dotnet",
    pt: "API para organizações, projetos, tarefas e horas. Autorização por papel, isolamento de dados e controle de versão nas atualizações.",
    en: "An API for organizations, projects, tasks and time tracking. Role authorization, data isolation and version checks on updates.",
    study: {
      pt: [
        "Organizar tarefas e apontamentos de horas mantendo os dados de cada organização separados.",
        "Nova API de demonstração inspirada no domínio do NeoTasks. Cadastro de organização, login JWT, membros, projetos, tarefas e apontamentos. Ainda não substitui o back-end da demonstração React existente.",
        "Tenant obtido do token validado, filtros por organização e chaves compostas no banco. Papel Owner para criar projetos e membros. Versão de tarefa como token de concorrência. SQLite facilita a execução local.",
        "Testes HTTP com banco SQLite real: acesso entre organizações recusado, restrições de papel, horas inválidas, versão desatualizada e autenticação.",
        "Sem recuperação de senha, confirmação de e-mail, refresh token ou integração com a interface antiga. Usa EnsureCreated no laboratório; migrações versionadas e proteção contra abuso são próximos passos.",
      ],
      en: [
        "Organize tasks and time entries while keeping each organization’s data separate.",
        "A new demonstration API inspired by NeoTasks. Organization signup, JWT login, members, projects, tasks and time entries. It does not yet replace the back end of the existing React demo.",
        "Tenant identity comes from the validated token, with organization filters and composite database keys. Owner role controls project and member creation. Task version is a concurrency token. SQLite simplifies local setup.",
        "HTTP tests with a real SQLite database cover cross-organization access denial, role restrictions, invalid time entries, stale versions and authentication.",
        "No password recovery, email verification, refresh tokens or integration with the old UI. The lab uses EnsureCreated; versioned migrations and abuse protection are next steps.",
      ],
    },
  },
  {
    id: "raid-booking",
    name: "Raid Booking API",
    category: "backend",
    featured: true,
    status: "lab",
    image: "assets/raid-booking.svg",
    tech: ["C#", ".NET 10", "EF Core", "Transactions", "xUnit"],
    code: repo + "raid-booking",
    pt: "Inscrições em raids com vagas limitadas. Transações, idempotência e credenciais por jogador protegem reservas e cancelamentos.",
    en: "Limited-capacity raid registration. Transactions, idempotency and player credentials protect bookings and cancellations.",
    study: {
      pt: [
        "Impedir que inscrições simultâneas ultrapassem a capacidade de uma raid, incluindo repetições após falhas de rede.",
        "API de demonstração com criação administrativa de raids, credenciais anônimas de jogador, reserva e cancelamento. Nenhuma integração com os servidores de Pokémon GO.",
        "Atualização condicional do contador e reserva na mesma transação. Restrições no banco preservam capacidade e inscrição única. Idempotency-Key permite repetir uma reserva com o mesmo resultado.",
        "Teste concorrente: 20 jogadores disputam uma vaga; uma reserva é criada e 19 recebem conflito. Outros testes verificam repetição, cancelamento e recusa do acesso de outro jogador.",
        "SQLite serializa escritores: adequado para demonstrar correção, sem alegação de escala. Sem recuperação de credencial, notificações ou integração Redis. Próximo passo: PostgreSQL e ensaio de carga reproduzível.",
      ],
      en: [
        "Prevent concurrent registrations from exceeding raid capacity, including retries after network failures.",
        "A demonstration API with admin raid creation, anonymous player credentials, booking and cancellation. No integration with Pokémon GO servers.",
        "A conditional seat-counter update and reservation commit in the same transaction. Database constraints enforce capacity and unique active registration. Idempotency-Key supports safe replay.",
        "Concurrency test: 20 players compete for one seat; one booking is created and 19 receive conflicts. Other tests cover replay, cancellation and another player’s denied access.",
        "SQLite serializes writers: useful for demonstrating correctness, without a scalability claim. No credential recovery, notifications or Redis integration. Next: PostgreSQL and a reproducible load test.",
      ],
    },
  },
  {
    id: "webhook-inbox",
    name: "Webhook Inbox",
    category: "backend",
    featured: true,
    status: "lab",
    image: "assets/webhook-inbox.svg",
    tech: ["C#", ".NET 10", "HMAC", "Worker", "SQLite", "xUnit"],
    code: repo + "webhook-inbox",
    pt: "Recepção persistente de eventos assinados, deduplicação e worker com tentativas e fila de falhas. Efeito local e confirmação na mesma transação.",
    en: "Persistent signed-event intake, deduplication and a worker with retries and dead letters. Local effect and acknowledgement share a transaction.",
    study: {
      pt: [
        "Receber eventos repetidos com segurança e recuperar o processamento após falhas, mantendo uma trilha verificável.",
        "Inbox HTTP com assinatura HMAC sobre timestamp, ID e corpo. Worker processa eventos points.awarded em um registro local de efeitos. Consulta administrativa de status.",
        "Janela de cinco minutos para assinatura; mesmo ID com conteúdo diferente gera conflito. Evento e efeito são confirmados na mesma transação. Três tentativas com espera progressiva antes de DeadLetter.",
        "Testes cobrem dez entregas simultâneas do mesmo evento com um efeito persistido, assinatura inválida/expirada, conflito de conteúdo e recuperação com relógio controlado.",
        "A garantia transacional vale para efeitos no mesmo banco. Chamadas externas exigiriam outbox e idempotência no destino. Sem painel, redrive administrativo ou fila distribuída; payload points.awarded não depende da ordem.",
      ],
      en: [
        "Safely accept duplicate events and recover processing after failures, with a verifiable record.",
        "HTTP inbox with HMAC over timestamp, ID and body. A worker processes points.awarded into a local effects ledger. Administrative status endpoint.",
        "Five-minute signature window; reusing an ID with different content causes conflict. Event and effect commit in one transaction. Three attempts with progressive delay before DeadLetter.",
        "Tests cover ten simultaneous deliveries producing one persisted effect, invalid/expired signatures, payload conflicts and controlled-clock recovery.",
        "The transactional guarantee covers effects in the same database. External calls would require an outbox and destination idempotency. No dashboard, admin redrive or distributed queue; points.awarded is order-independent.",
      ],
    },
  },
  {
    id: "neotasks",
    name: "NeoTasks",
    category: "apps",
    featured: true,
    status: "product",
    image: "assets/neotasks.png",
    tech: ["React", "Fastify", "Prisma", "PostgreSQL"],
    code: "https://github.com/LucianoNeo/ingacode-test-frontend",
    codeExtra: "https://github.com/LucianoNeo/ingacode-test-backend",
    live: "https://neotasks.vercel.app/",
    pt: "Aplicação full stack de projetos, tarefas e apontamento de horas, criada como desafio técnico, com autenticação e API própria.",
    en: "A full stack project, task and time-tracking app built as a technical challenge, with authentication and its own API.",
    study: {
      pt: [
        "Organizar projetos, tarefas e horas em uma interface integrada ao back-end.",
        "Desafio técnico com interface React e API Fastify documentadas em repositórios separados.",
        "Prisma organiza a persistência PostgreSQL; a separação cliente/API permite evoluir cada camada.",
        "Demonstração web, código do cliente e código da API disponíveis nos links. O README registra o contexto do desafio.",
        "Projeto anterior à nova API .NET. A demonstração continua usando sua stack original; métricas de produção não foram documentadas.",
      ],
      en: [
        "Organize projects, tasks and hours in an interface connected to a back end.",
        "A technical challenge with a React interface and Fastify API documented in separate repositories.",
        "Prisma handles PostgreSQL persistence; separating client and API allows independent evolution.",
        "Web demo, client source and API source are linked. The README records the challenge context.",
        "Predates the new .NET API. The demo continues using its original stack; production metrics have not been documented.",
      ],
    },
  },
  {
    id: "creche",
    name: "Creche Cad",
    category: "backend",
    status: "archive",
    image: "assets/creche-api.svg",
    tech: ["C#", ".NET 6", "EF Core", "SQLite"],
    code: "https://github.com/LucianoNeo/creche_cad_backend_csharp",
    pt: "Estudo de gestão escolar com API em camadas para alunos, professores, turmas e documentos, integrado a uma interface Nuxt.",
    en: "A school management study with a layered API for students, teachers, classes and documents, connected to a Nuxt interface.",
  },
  {
    id: "redis",
    name: "Redis Rate Limiting",
    category: "backend",
    status: "lab",
    image: "assets/rate-limit.svg",
    tech: ["C#", ".NET 8", "Redis", "SQL Server"],
    code: "https://github.com/LucianoNeo/RedisRateLimiting",
    pt: "Prova de conceito de rate limiting com Redis em API .NET. Integra biblioteca de terceiros; o escopo é a integração e o experimento.",
    en: "Redis rate-limiting proof of concept in a .NET API. Integrates a third-party library; scope is integration and experimentation.",
  },
  {
    id: "filmes",
    name: "Filmes API",
    category: "backend",
    status: "archive",
    image: "assets/filmes-api.svg",
    tech: ["C#", ".NET 6", "EF Core", "MySQL"],
    code: "https://github.com/LucianoNeo/API-dotNET6",
    pt: "Estudo de API REST de filmes, cinemas e sessões com controllers, DTOs, mapeamento e persistência em MySQL.",
    en: "A REST API study for movies, cinemas and sessions with controllers, DTOs, mapping and MySQL persistence.",
  },
  {
    id: "neoscan",
    name: "NeoScan Raids",
    category: "apps",
    status: "product",
    image: "assets/neoscan.png",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    code: "https://github.com/LucianoNeo/neoscan-raids",
    live: "https://neoscan-raids.vercel.app/",
    pt: "Plataforma web para encontrar raids, filtrar eventos e marcar partidas com outros jogadores.",
    en: "A web platform to find raids, filter events and schedule sessions with other players.",
  },
  {
    id: "sleep",
    name: "Pokémon Sleep Companion",
    category: "apps",
    status: "product",
    image: "assets/sleep.png",
    imageClass: "image-tall",
    tech: ["Nuxt.js", "Vuetify", "i18n", "JavaScript"],
    code: "https://github.com/LucianoNeo/pokemon-sleep-companion",
    live: "https://pokemon-sleep-companion.vercel.app/",
    pt: "Guia multilíngue de Pokémon, ingredientes, receitas e itens para consultas rápidas durante o jogo.",
    en: "A multilingual guide to Pokémon, ingredients, recipes and items for quick in-game reference.",
  },
  {
    id: "pogo",
    name: "Pokémon GO 2D",
    category: "games",
    status: "creative",
    image: "assets/pogo2d.jpg",
    imageClass: "image-tall",
    tech: ["React", "Tailwind CSS", "Context API", "Web Audio API"],
    code: "https://github.com/LucianoNeo/pogo2d",
    live: "https://pokemongo2d.vercel.app/",
    pt: "Experiência jogável em 2D com exploração, captura, inventário e interface para desktop e celular.",
    en: "A playable 2D experience with exploration, catching, inventory and desktop and mobile interfaces.",
  },
  {
    id: "hgss",
    name: "HGSS Visual Overhaul",
    category: "games",
    status: "creative",
    image: "assets/hgss.png",
    tech: ["Lua", "Python", "Sprites", "Asset pipeline"],
    code: "https://github.com/LucianoNeo/gen1recomp-mods",
    pt: "Pacote de mods visuais com sprites, animações e ferramentas para o Gen1Recomp. Créditos e origem dos assets no repositório.",
    en: "A visual mod pack with sprites, animations and Gen1Recomp tooling. Asset origins and credits are documented in the repository.",
  },
];
let currentLang = "pt";
try {
  currentLang =
    localStorage.getItem("luciano-portfolio-lang") === "en" ? "en" : "pt";
} catch {}
let currentFilter = "featured";
const escapeHtml = (v) =>
  String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const dialog = document.getElementById("case-dialog");
let activeProject = null;
function card(p) {
  const t = translations[currentLang];
  return `<article class="project-card"><div class="project-image ${p.imageClass || ""}"><img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" width="960" height="540"></div><div class="project-body"><span class="project-number">${t[p.status]}</span><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p[currentLang])}</p><div class="tech-list">${p.tech.map((x) => `<span>${escapeHtml(x)}</span>`).join("")}</div><div class="project-links">${p.study ? `<button type="button" data-case="${p.id}">${t.details} ↗</button>` : ""}<a href="${p.code}" target="_blank" rel="noopener noreferrer">${t.code} ↗</a>${p.codeExtra ? `<a href="${p.codeExtra}" target="_blank" rel="noopener noreferrer">API ↗</a>` : ""}${p.live ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer">${t.live} ↗</a>` : ""}</div></div></article>`;
}
function renderStudy(p) {
  const t = translations[currentLang],
    keys = ["problem", "contribution", "decisions", "proof", "limits"];
  document.getElementById("case-content").innerHTML =
    `<p class="eyebrow">${t[p.status]}</p><h2 id="case-title">${escapeHtml(p.name)}</h2><div class="tech-list">${p.tech.map((x) => `<span>${escapeHtml(x)}</span>`).join("")}</div>${keys.map((key, i) => `<section><h3>${t[key]}</h3><p>${escapeHtml(p.study[currentLang][i])}</p></section>`).join("")}<a class="button button-outline" href="${p.code}" target="_blank" rel="noopener noreferrer">${t.code} ↗</a>`;
}
function render() {
  const t = translations[currentLang];
  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";
  document.title =
    currentLang === "pt"
      ? "Luciano Neo — Desenvolvedor Back-end C# / .NET"
      : "Luciano Neo — C# / .NET Back-end Developer";
  document.querySelector('meta[name="description"]').content =
    currentLang === "pt"
      ? "Luciano dos Santos Bueno: desenvolvimento back-end C# e .NET, APIs, dados e integrações. Código, estudos de caso e projetos full stack."
      : "Luciano dos Santos Bueno: C# and .NET back-end development, APIs, data and integrations. Source code, case studies and full stack projects.";
  document
    .querySelectorAll("[data-i18n]")
    .forEach((el) => (el.textContent = t[el.dataset.i18n]));
  document
    .querySelector(".hero-visual")
    .setAttribute("aria-label", t.profileLabel);
  document.querySelector(".portrait img").alt = t.avatarAlt;
  document.querySelector(".filters").setAttribute("aria-label", t.filterLabel);
  const lang = document.getElementById("lang-toggle");
  lang.textContent = currentLang === "pt" ? "EN ↗" : "PT ↗";
  lang.setAttribute(
    "aria-label",
    currentLang === "pt" ? "Switch to English" : "Mudar para português",
  );
  document.querySelectorAll(".filter").forEach((b) => {
    const active = b.dataset.filter === currentFilter;
    b.classList.toggle("active", active);
    b.setAttribute("aria-pressed", String(active));
  });
  const visible = projects.filter(
    (p) =>
      p.category !== "games" &&
      (currentFilter === "all" ||
        (currentFilter === "featured"
          ? p.featured
          : p.category === currentFilter)),
  );
  document.getElementById("project-count").textContent = t.projectsCount(
    visible.length,
  );
  document.getElementById("project-grid").innerHTML = visible
    .map(card)
    .join("");
  document.getElementById("creative-grid").innerHTML = projects
    .filter((p) => p.category === "games")
    .map(card)
    .join("");
  document
    .querySelectorAll("[data-resume]")
    .forEach((a) => (a.href = `resume.html?lang=${currentLang}`));
  document.getElementById("case-close").textContent = t.close + " ×";
  if (activeProject) renderStudy(activeProject);
}
function openCase(id) {
  const p = projects.find((x) => x.id === id && x.study);
  if (!p) return;
  activeProject = p;
  renderStudy(p);
  if (!dialog.open) dialog.showModal();
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-case]");
  if (b) {
    history.replaceState(null, "", `#case-${b.dataset.case}`);
    openCase(b.dataset.case);
  }
});
document
  .getElementById("case-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  activeProject = null;
  if (location.hash.startsWith("#case-"))
    history.replaceState(null, "", "#projects");
});
window.addEventListener("hashchange", () => {
  if (location.hash.startsWith("#case-")) openCase(location.hash.slice(6));
});
document.querySelectorAll(".filter").forEach((b) =>
  b.addEventListener("click", () => {
    currentFilter = b.dataset.filter;
    render();
  }),
);
document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  try {
    localStorage.setItem("luciano-portfolio-lang", currentLang);
  } catch {}
  render();
});
document.getElementById("year").textContent = new Date().getFullYear();
render();
if (location.hash.startsWith("#case-")) openCase(location.hash.slice(6));
