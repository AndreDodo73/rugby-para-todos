import type { PhotoId } from "../photos";
import { tx, type Copy } from "./types";

export const source = {
  url: "https://www.rugbyparatodos.org.br/",
  readOn: "2026-11-16",
} as const;

export const brand = {
  name: "Instituto Rugby Para Todos",
  short: "Rugby Para Todos",
  accent: "#F09000",
  ink: "#111111",
} as const;

export const hero = {
  titleA: tx("Começa no rugby.", "It starts with rugby.", "Ça commence au rugby."),
  titleB: tx(
    "Vai além do campo.",
    "It goes beyond the field.",
    "Ça va au-delà du terrain.",
  ),
  lead: tx(
    "O Rugby Para Todos promove cidadania e cria oportunidades por meio do esporte.",
    "Rugby Para Todos promotes citizenship and creates opportunities through sport.",
    "Rugby Para Todos favorise la citoyenneté et crée des opportunités par le sport.",
  ),
  photo: "corrida" as PhotoId,
  alt: tx(
    "Jovem corre em um campo de rugby com a bola oval, de camisa amarela. O rosto aparece por inteiro.",
    "A young player runs across a rugby field with the oval ball, in a yellow jersey. The face is fully in frame.",
    "Un jeune joueur court sur un terrain de rugby avec le ballon ovale, en maillot jaune. Le visage est entièrement dans le cadre.",
  ),
};

export const contacts = {
  generalEmail: "rugbyparatodos@rugbyparatodos.org.br",
  marketingEmail: "marketing@rugbyparatodos.org.br",
  rioEmail: "igor@rugbyparatodos.org.br",
  ombudsmanEmail: "ouvidoria@rugbyparatodos.org.br",
  saoPauloPhones: ["+55 (11) 2371-0843", "+55 (11) 98983-0049"],
  rioPhone: "+55 (21) 97946-4545",
  marketingPhone: "+55 (11) 98983-0049",
};

export const socials = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/rugbyparatodos/" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/rugbyparatodos" },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCAe9PXJkXKLWcQ3cRD8jG_w",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/institutorugbyparatodos/",
  },
  { id: "x", label: "X", href: "https://twitter.com/rugbyparatodos" },
] as const;

const pdf = (file: string) => `https://www.rugbyparatodos.org.br${file}`;

export const pages = {
  home: {
    title: tx(
      "Instituto Rugby Para Todos",
      "Instituto Rugby Para Todos",
      "Instituto Rugby Para Todos",
    ),
    description: hero.lead,
  },
  about: {
    path: "/o-rpt",
    nav: tx("O RPT", "The institute", "L’institut"),
    title: tx("O RPT", "The institute", "L’institut"),
    description: tx(
      "Missão, metodologia e gestão publicadas pelo Instituto Rugby Para Todos.",
      "Mission, method and governance published by Instituto Rugby Para Todos.",
      "Mission, méthode et gouvernance publiées par l’Instituto Rugby Para Todos.",
    ),
  },
  projects: {
    path: "/projetos",
    nav: tx("Projetos", "Projects", "Projets"),
    title: tx("Projetos", "Projects", "Projets"),
    description: tx(
      "Iniciativas em captação publicadas no site do Instituto Rugby Para Todos.",
      "Fundraising initiatives published on the Instituto Rugby Para Todos site.",
      "Initiatives en collecte publiées sur le site de l’Instituto Rugby Para Todos.",
    ),
  },
  stories: {
    path: "/historias",
    nav: tx("Histórias", "Stories", "Récits"),
    title: tx("Histórias", "Stories", "Récits"),
    description: tx(
      "Nomes publicados na seção de histórias do Instituto Rugby Para Todos.",
      "Names published in the stories section of Instituto Rugby Para Todos.",
      "Noms publiés dans la section récits de l’Instituto Rugby Para Todos.",
    ),
  },
  shop: {
    path: "/loja",
    nav: tx("Loja", "Shop", "Boutique"),
    title: tx("Vista essa causa.", "Wear this cause.", "Porter cette cause."),
    description: tx(
      "A loja oficial publicada pelo instituto fica no Mercado Shops. Este site não lista produtos nem preços.",
      "The official shop published by the institute is on Mercado Shops. This site does not list products or prices.",
      "La boutique officielle publiée par l’institut est sur Mercado Shops. Ce site ne liste ni produits ni prix.",
    ),
  },
  support: {
    path: "/apoie",
    nav: tx("Apoie o RPT", "Support RPT", "Soutenir le RPT"),
    title: tx("Formas de apoiar", "Ways to support", "Façons de soutenir"),
    description: tx(
      "Canais de doação, contato para empresas e serviços publicados pelo instituto.",
      "Donation channels, company contact and services published by the institute.",
      "Canaux de don, contact entreprises et services publiés par l’institut.",
    ),
  },
  transparency: {
    path: "/transparencia",
    nav: tx("Transparência", "Transparency", "Transparence"),
    title: tx("Transparência", "Transparency", "Transparence"),
    description: tx(
      "Documentos institucionais publicados pelo Instituto Rugby Para Todos.",
      "Institutional documents published by Instituto Rugby Para Todos.",
      "Documents institutionnels publiés par l’Instituto Rugby Para Todos.",
    ),
  },
  contact: {
    path: "/contato",
    nav: tx("Contato", "Contact", "Contact"),
    title: tx("Contato", "Contact", "Contact"),
    description: tx(
      "E-mails e telefones publicados pelo Instituto Rugby Para Todos.",
      "Emails and phone numbers published by Instituto Rugby Para Todos.",
      "E-mails et téléphones publiés par l’Instituto Rugby Para Todos.",
    ),
  },
  news: {
    path: "/noticias",
    nav: tx("Notícias", "News", "Actualités"),
    title: tx("Notícias", "News", "Actualités"),
    description: tx(
      "Conteúdos ligados na home do site atual do instituto.",
      "Items linked from the current home page of the institute.",
      "Contenus liés depuis l’accueil actuel de l’institut.",
    ),
  },
} as const;

export const about = {
  kicker: tx("O instituto", "The institute", "L’institut"),
  title: tx(
    "Cidadania pela prática do rugby.",
    "Citizenship through rugby.",
    "La citoyenneté par la pratique du rugby.",
  ),
  origin: tx(
    "O site do instituto conta que o Rugby Para Todos nasceu da iniciativa dos amigos Mauricio Draghi e Fabricio Kobashi. Em 2004 eles começaram um trabalho voluntário para ensinar a modalidade a crianças e adolescentes de 6 a 18 anos em Paraisópolis, em São Paulo. O texto descreve uma metodologia própria e apresenta o rugby como meio de desenvolvimento, de preparo para a cidadania e de qualificação para o trabalho, com temas como formação profissional, igualdade de gênero e educação.",
    "The institute’s site says Rugby Para Todos began with friends Mauricio Draghi and Fabricio Kobashi. In 2004 they started voluntary work teaching the game to children and adolescents aged 6 to 18 in Paraisópolis, in São Paulo. The text describes a method of their own and presents rugby as a means of development, preparation for citizenship and preparation for work, including vocational training, gender equality and education.",
    "Le site de l’institut raconte que Rugby Para Todos est né de l’initiative des amis Mauricio Draghi et Fabricio Kobashi. En 2004, ils ont commencé un travail bénévole pour enseigner la pratique à des enfants et des adolescents de 6 à 18 ans à Paraisópolis, à São Paulo. Le texte décrit une méthode propre et présente le rugby comme un moyen de développement, de préparation à la citoyenneté et de qualification pour le travail, avec des thèmes comme la formation professionnelle, l’égalité de genre et l’éducation.",
  ),
  reachNote: tx(
    "A mesma página fala em trabalho multidisciplinar e em atendimento aproximado de 300 pessoas por ano, em São Paulo e no Rio de Janeiro. Não indica o ano dessa conta. O número não entra aqui como indicador confirmado.",
    "The same page mentions multidisciplinary work and about 300 people a year, in São Paulo and Rio de Janeiro. It does not give the year of that figure. The number is not shown here as a confirmed indicator.",
    "La même page parle d’un travail multidisciplinaire et d’environ 300 personnes par an, à São Paulo et à Rio de Janeiro. Elle n’indique pas l’année de ce chiffre. Le nombre n’est pas présenté ici comme un indicateur confirmé.",
  ),
  missionLabel: tx("Missão", "Mission", "Mission"),
  mission: tx(
    "Promover o desenvolvimento da cidadania através da prática dos princípios do Rugby.",
    "To promote the development of citizenship through the practice of the principles of rugby.",
    "Promouvoir le développement de la citoyenneté par la pratique des principes du rugby.",
  ),
  visionLabel: tx("Visão", "Vision", "Vision"),
  vision: tx(
    "Ser um agente efetivo e referência no esporte educacional, implantando a metodologia inovadora e exclusiva, desenvolvida por uma equipe transdisciplinar de profissionais, em diversas cidades do Brasil.",
    "To be an effective agent and a reference in educational sport, taking the innovative and exclusive method, developed by a transdisciplinary team, to several cities in Brazil.",
    "Être un acteur effectif et une référence du sport éducatif, en implantant la méthode innovante et exclusive, développée par une équipe transdisciplinaire, dans plusieurs villes du Brésil.",
  ),
  valuesLabel: tx("Valores publicados", "Published values", "Valeurs publiées"),
  values: [
    "Respeito pelo indivíduo",
    "Cultura de paz",
    "Integração social",
    "Interdisciplinaridade",
    "Excelência",
    "Autossustentabilidade",
    "União",
    "Respeito",
    "Lealdade",
    "Amizade",
    "Disciplina",
  ],
  method: tx(
    "O instituto diz que a metodologia desenvolve competências individuais e sociais, com base nos ODS e nos 5Ps da ONU: Pessoas, Planeta, Prosperidade, Paz e Parcerias. A equipe descrita reúne jogadores e técnicos de rugby, profissional de educação física, pedagogo, psicólogo, fisioterapeuta, nutricionista e assistente social.",
    "The institute says the method develops individual and social skills, based on the SDGs and the UN 5Ps: People, Planet, Prosperity, Peace and Partnerships. The team described includes rugby players and coaches, a physical education professional, a pedagogue, a psychologist, a physiotherapist, a nutritionist and a social worker.",
    "L’institut dit que la méthode développe des compétences individuelles et sociales, à partir des ODD et des 5P de l’ONU : personnes, planète, prospérité, paix et partenariats. L’équipe décrite réunit joueurs et entraîneurs de rugby, un professionnel d’éducation physique, un pédagogue, un psychologue, un physiothérapeute, un nutritionniste et un assistant social.",
  ),
  aim: tx(
    "O texto diz que o trabalho busca apoiar a redução de situações de exclusão social de crianças e adolescentes nos territórios de atuação, com garantia de direitos, plano de ação social e protagonismo dos educandos.",
    "The text says the work seeks to help reduce situations of social exclusion affecting children and adolescents in the territories where it operates, with rights, a social action plan and a leading role for the participants.",
    "Le texte dit que le travail cherche à aider à réduire les situations d’exclusion sociale d’enfants et d’adolescents sur les territoires d’action, avec la garantie des droits, un plan d’action sociale et un rôle de premier plan pour les participants.",
  ),
};

export const pillars: { title: Copy; text: Copy }[] = [
  {
    title: tx("Cidadania", "Citizenship", "Citoyenneté"),
    text: tx(
      "A missão publicada é promover cidadania pela prática dos princípios do rugby.",
      "The published mission is to promote citizenship through the principles of rugby.",
      "La mission publiée est de promouvoir la citoyenneté par les principes du rugby.",
    ),
  },
  {
    title: tx("Metodologia", "Method", "Méthode"),
    text: tx(
      "O instituto descreve uma metodologia própria, ligada aos ODS e aos 5Ps da ONU.",
      "The institute describes its own method, linked to the SDGs and the UN 5Ps.",
      "L’institut décrit une méthode propre, liée aux ODD et aux 5P de l’ONU.",
    ),
  },
  {
    title: tx("Equipe", "Team", "Équipe"),
    text: tx(
      "A página cita rugby, educação física, pedagogia, psicologia, fisioterapia, nutrição e serviço social.",
      "The page cites rugby, physical education, pedagogy, psychology, physiotherapy, nutrition and social work.",
      "La page cite le rugby, l’éducation physique, la pédagogie, la psychologie, la physiothérapie, la nutrition et le service social.",
    ),
  },
  {
    title: tx("Territórios", "Territories", "Territoires"),
    text: tx(
      "Os projetos nomeados na home estão em captação. O texto cita São Paulo e o Rio de Janeiro.",
      "The projects named on the home page are in fundraising. The text cites São Paulo and Rio de Janeiro.",
      "Les projets nommés sur l’accueil sont en collecte. Le texte cite São Paulo et Rio de Janeiro.",
    ),
  },
];

export type Project = {
  slug: string;
  name: string;
  yearLabel: string;
  status: string;
  place: Copy | null;
  photo: PhotoId;
  photoKnown: boolean;
  summary: Copy;
  pdf: string;
  filenameConflict: boolean;
};

const projectIntro = tx(
  "O site convida a conhecer os projetos e diz que eles contribuem com a formação social de crianças e adolescentes. Cada card traz um nome, um ano de contagem e o status “Em captação”. Não há, na home, uma descrição longa por território.",
  "The site invites people to look at the projects and says they contribute to the social education of children and adolescents. Each card shows a name, a year count and the status “Em captação”. The home page does not give a long description per territory.",
  "Le site invite à découvrir les projets et dit qu’ils contribuent à la formation sociale d’enfants et d’adolescents. Chaque fiche indique un nom, un décompte d’années et le statut « Em captação ». L’accueil ne donne pas de longue description par territoire.",
);

export const projectsIntro = projectIntro;

export const projects: Project[] = [
  {
    slug: "paraisopolis",
    name: "Rugby Para Todos Paraisópolis",
    yearLabel: "Ano 20",
    status: "Em captação",
    place: tx("Paraisópolis, São Paulo", "Paraisópolis, São Paulo", "Paraisópolis, São Paulo"),
    photo: "grupo",
    photoKnown: true,
    summary: tx(
      "É o território citado na origem do projeto, em 2004. O card da home está em captação, no ano 20.",
      "This is the territory named in the origin of the project, in 2004. The home-page card is in fundraising, year 20.",
      "C’est le territoire cité à l’origine du projet, en 2004. La fiche de l’accueil est en collecte, année 20.",
    ),
    pdf: pdf(
      "/auxiliares/modulos/conteudo/pdf/Apresentacao-Rpt-Paraisopolis-Ano-20-Captado-Compressed-20260409132008.pdf",
    ),
    filenameConflict: true,
  },
  {
    slug: "esrrio",
    name: "Rugby Para Todos ESRRio",
    yearLabel: "Ano 11",
    status: "Em captação",
    place: tx(
      "Rio de Janeiro, pelo conjunto do site. O card não detalha o bairro.",
      "Rio de Janeiro, from the rest of the site. The card does not name a neighbourhood.",
      "Rio de Janeiro, d’après l’ensemble du site. La fiche ne précise pas le quartier.",
    ),
    photo: "jogo",
    photoKnown: false,
    summary: tx(
      "Card publicado como ESRRio, ano 11, em captação. A apresentação em PDF está no site atual.",
      "Card published as ESRRio, year 11, in fundraising. The PDF presentation is on the current site.",
      "Fiche publiée sous le nom ESRRio, année 11, en collecte. La présentation PDF est sur le site actuel.",
    ),
    pdf: pdf(
      "/auxiliares/modulos/conteudo/pdf/Apresentacao-Esrrio-Ano-11-2025-Compressed-20250919112310.pdf",
    ),
    filenameConflict: false,
  },
  {
    slug: "leoas",
    name: "Rugby Para Todos Leoas",
    yearLabel: "Ano 1",
    status: "Em captação",
    place: null,
    photo: "fila",
    photoKnown: false,
    summary: tx(
      "Card publicado como Leoas, ano 1, em captação. O PDF da home se chama “Jogue como uma leoa”, com 2026 no nome do arquivo.",
      "Card published as Leoas, year 1, in fundraising. The home-page PDF is titled “Jogue como uma leoa”, with 2026 in the file name.",
      "Fiche publiée sous le nom Leoas, année 1, en collecte. Le PDF de l’accueil s’intitule « Jogue como uma leoa », avec 2026 dans le nom du fichier.",
    ),
    pdf: pdf(
      "/auxiliares/modulos/conteudo/pdf/Apresentacao-Jogue-Como-Uma-Leoa-2026-Compressed-20260409130002.pdf",
    ),
    filenameConflict: false,
  },
  {
    slug: "jardim-colombo",
    name: "Rugby Para Todos Jd. Colombo",
    yearLabel: "Ano 1",
    status: "Em captação",
    place: tx(
      "Jardim Colombo. A cidade não está escrita no card.",
      "Jardim Colombo. The city is not written on the card.",
      "Jardim Colombo. La ville n’est pas écrite sur la fiche.",
    ),
    photo: "roda",
    photoKnown: false,
    summary: tx(
      "Card publicado como Jd. Colombo, ano 1, em captação. A apresentação em PDF está no site atual, com 2026 no nome do arquivo.",
      "Card published as Jd. Colombo, year 1, in fundraising. The PDF presentation is on the current site, with 2026 in the file name.",
      "Fiche publiée sous le nom Jd. Colombo, année 1, en collecte. La présentation PDF est sur le site actuel, avec 2026 dans le nom du fichier.",
    ),
    pdf: pdf(
      "/auxiliares/modulos/conteudo/pdf/Apresentacao-Rugby-Para-Todos-Jardim-Colombo-2026-Compressed-20260409131744.pdf",
    ),
    filenameConflict: false,
  },
  {
    slug: "guarulhos",
    name: "Rugby Para Todos Guarulhos",
    yearLabel: "Ano 2",
    status: "Em captação",
    place: tx("Guarulhos", "Guarulhos", "Guarulhos"),
    photo: "portal",
    photoKnown: false,
    summary: tx(
      "Card publicado como Guarulhos, ano 2, em captação. A apresentação em PDF está no site atual.",
      "Card published as Guarulhos, year 2, in fundraising. The PDF presentation is on the current site.",
      "Fiche publiée sous le nom Guarulhos, année 2, en collecte. La présentation PDF est sur le site actuel.",
    ),
    pdf: pdf("/auxiliares/modulos/conteudo/pdf/Rpt-Guarulhos-1-Compressed-20250821104615.pdf"),
    filenameConflict: false,
  },
];

export type Story = {
  slug: string;
  name: string;
  videoId: string | null;
  embedTitle: string | null;
  featured: boolean;
};

export const storiesIntro = tx(
  "A home atual lista estes nomes e abre alguns vídeos. Não publica o texto de um depoimento. Por isso não há frase atribuída a ninguém.",
  "The current home page lists these names and opens some videos. It does not publish the text of a testimony. No sentence is attributed to anyone.",
  "L’accueil actuel liste ces noms et ouvre quelques vidéos. Il ne publie pas le texte d’un témoignage. Aucune phrase n’est attribuée à qui que ce soit.",
);

export const stories: Story[] = [
  {
    slug: "pamela",
    name: "Pamela",
    videoId: "lRp_-ODtjKQ",
    embedTitle: null,
    featured: true,
  },
  { slug: "bia", name: "Bia", videoId: "M6erkM2aRvk", embedTitle: null, featured: false },
  {
    slug: "karol-bedoya",
    name: "Karol Bedoya",
    videoId: "XwsISFzfo0M",
    embedTitle: null,
    featured: false,
  },
  { slug: "lara", name: "Lara", videoId: "ZQFr3BfufTQ", embedTitle: null, featured: false },
  { slug: "leila-silva", name: "Leila Silva", videoId: null, embedTitle: null, featured: false },
  { slug: "valentina", name: "Valentina", videoId: null, embedTitle: null, featured: false },
  {
    slug: "patricio",
    name: "Patrício",
    videoId: "0pHu6i-SpKM",
    embedTitle: "#tbt | Projeto social Rugby para Todos",
    featured: false,
  },
  {
    slug: "robert-tenorio",
    name: "Robert Tenório",
    videoId: null,
    embedTitle: null,
    featured: false,
  },
  { slug: "eshyllen", name: "Eshyllen", videoId: null, embedTitle: null, featured: false },
  { slug: "gilmar", name: "Gilmar", videoId: null, embedTitle: null, featured: false },
];

export const storyPhoto = {
  id: "conversa" as PhotoId,
  alt: tx(
    "Um adulto conversa com um grupo de jovens uniformizadas em um campo de rugby, com casas ao fundo.",
    "An adult talks with a group of young players in uniform on a rugby field, with houses behind them.",
    "Un adulte parle à un groupe de jeunes joueuses en tenue sur un terrain de rugby, avec des maisons derrière elles.",
  ),
};

export type Product = {
  slug: string;
  name: Copy;
  images: string[];
  price: { amount: number; currency: "BRL" } | null;
  sizes: string[];
  availability: "in-stock" | "out-of-stock" | "unknown";
  buyUrl: string | null;
  status: "official" | "draft";
};

export const shop = {
  url: "https://rugbyparatodos.mercadoshops.com.br/",
  platform: "Mercado Shops",
  products: [] as Product[],
  publishedLine: tx(
    "Por meio de doações ou comprando produtos RPT, você pode se juntar a nós e ajudar a transformar as vidas de muitos jovens brasileiros.",
    "Through donations or by buying RPT products, you can join us and help change the lives of many young Brazilians.",
    "Par des dons ou en achetant des produits RPT, vous pouvez nous rejoindre et aider à transformer la vie de nombreux jeunes Brésiliens.",
  ),
  publishedShort: tx(
    "Comprando nossos produtos você também ajuda.",
    "Buying our products also helps.",
    "Acheter nos produits aide aussi.",
  ),
};

export const donations = [
  {
    id: "monthly",
    label: tx("Mensal, no Catarse", "Monthly, on Catarse", "Mensuel, sur Catarse"),
    href: "https://www.catarse.me/orptnaovaiparar",
    amount: null as string | null,
  },
  {
    id: "50",
    label: tx("Doação de R$ 50", "Donation of R$ 50", "Don de 50 BRL"),
    href: "https://www.paypal.com/donate?hosted_button_id=U8AC4EP6G8DRC",
    amount: "R$ 50",
  },
  {
    id: "100",
    label: tx("Doação de R$ 100", "Donation of R$ 100", "Don de 100 BRL"),
    href: "https://www.paypal.com/donate?hosted_button_id=4QUPEKR75EZQ2",
    amount: "R$ 100",
  },
  {
    id: "200",
    label: tx("Doação de R$ 200", "Donation of R$ 200", "Don de 200 BRL"),
    href: "https://www.paypal.com/donate?hosted_button_id=6P3R7T3VZKJ7J",
    amount: "R$ 200",
  },
  {
    id: "other",
    label: tx("Outro valor, no PayPal", "Another amount, on PayPal", "Autre montant, sur PayPal"),
    href: "https://www.paypal.com/donate?hosted_button_id=CPBKD3YKWNQZE",
    amount: null,
  },
  {
    id: "incentive",
    label: tx(
      "Projeto incentivado",
      "Incentivised project",
      "Projet avec incitation fiscale",
    ),
    href: "https://doeseuir.abraceumacausa.com.br/projeto/?projectId=1430",
    amount: null,
  },
];

export const services = [
  {
    slug: "clinica",
    title: tx("Clínica de rugby", "Rugby clinic", "Clinique de rugby"),
    text: tx(
      "O instituto descreve uma clínica para ensinar rugby, valores, regras e jogadas. Podem participar crianças de 6 a 10 anos, adolescentes de 11 a 15, jovens de 16 a 18 e adultos.",
      "The institute describes a clinic to teach rugby, values, rules and plays. Children aged 6 to 10, adolescents aged 11 to 15, young people aged 16 to 18 and adults can take part.",
      "L’institut décrit une clinique pour enseigner le rugby, les valeurs, les règles et les mouvements. Peuvent y participer les enfants de 6 à 10 ans, les adolescents de 11 à 15 ans, les jeunes de 16 à 18 ans et les adultes.",
    ),
    href: null as string | null,
    contact: contacts.generalEmail,
  },
  {
    slug: "experience",
    title: tx(
      "Team building",
      "Team building",
      "Team building",
    ),
    text: tx(
      "O Rugby para Todos Experience é descrito como atividade conduzida por um coach e jogador do projeto, para empresas. O material de apresentação e o contato estão no site atual: marketing@rugbyparatodos.org.br e (11) 98983-0049.",
      "Rugby para Todos Experience is described as an activity led by a coach and player from the project, for companies. The presentation and the contact are on the current site: marketing@rugbyparatodos.org.br and (11) 98983-0049.",
      "Rugby para Todos Experience est décrit comme une activité menée par un coach et un joueur du projet, pour les entreprises. Le support et le contact sont sur le site actuel : marketing@rugbyparatodos.org.br et (11) 98983-0049.",
    ),
    href: "https://drive.google.com/file/d/1XrPItXY_VBBWn0mePutuKODNwkDK8Jaz/view?usp=sharing",
    contact: contacts.marketingEmail,
  },
  {
    slug: "intercambio",
    title: tx("Intercâmbio social", "Social exchange", "Échange social"),
    text: tx(
      "O texto descreve um intercâmbio com clubes de rugby de outros países para as Leoas e os Leões de Paraisópolis, com público de 16 a 25 anos, prioridade para escolas públicas. O documentário indicado se chama #SÓVAI, “Essai du bout du monde”.",
      "The text describes an exchange with rugby clubs in other countries for the Leoas and the Leões of Paraisópolis, for people aged 16 to 25, with priority for public schools. The documentary it points to is called #SÓVAI, “Essai du bout du monde”.",
      "Le texte décrit un échange avec des clubs de rugby d’autres pays pour les Leoas et les Leões de Paraisópolis, pour un public de 16 à 25 ans, en priorité des écoles publiques. Le documentaire indiqué s’appelle #SÓVAI, « Essai du bout du monde ».",
    ),
    href: "https://vimeo.com/356976072",
    contact: contacts.generalEmail,
  },
];

export const extraForms = [
  {
    label: tx("Seja um voluntário", "Volunteer", "Devenir bénévole"),
    href: "https://forms.gle/CagFotpyYbMx99hJ9",
  },
  {
    label: tx("Trabalhe conosco", "Work with us", "Travailler avec nous"),
    href: "https://forms.gle/nH2YQSJrymVttCyr5",
  },
];

export const governance = {
  mandate: tx(
    "Diretoria administrativa com mandato de 4 anos, de 16/04/2024 a 16/04/2028. A assembleia de eleição citada na página foi em 16/04/2024.",
    "Administrative board with a 4-year term, from 16/04/2024 to 16/04/2028. The election meeting cited on the page was on 16/04/2024.",
    "Direction administrative pour un mandat de 4 ans, du 16/04/2024 au 16/04/2028. L’assemblée d’élection citée sur la page a eu lieu le 16/04/2024.",
  ),
  board: [
    { name: "Fabricio Kobashi de Faria", role: "Diretor Presidente" },
    { name: "Mauricio Alexandre Perez Draghi", role: "Diretor Administrativo e Financeiro" },
    { name: "Igor de Oliveira Mello", role: "Diretor de Projetos e Relações Públicas Sociais" },
  ],
  elected: [
    "Xavier Torres Vouga",
    "Sérgio Paulo Livovschi",
    "Wilson Meireles Neto",
    "Felipe Ferri de Barros",
    "Marcello Antonio Fiore",
  ],
  electedNote: tx(
    "Membros eleitos do Conselho de Administração. Marcello Antonio Fiore é citado como presidente do conselho.",
    "Elected members of the Board. Marcello Antonio Fiore is named as chair of the board.",
    "Membres élus du conseil d’administration. Marcello Antonio Fiore est cité comme président du conseil.",
  ),
  born: [
    "Marcello Antonio Fiore",
    "Patrícia de Souza Giuliano Reis de Oliveira",
    "Natasha D’Andrea Mônica Olsen",
    "Rodrigo Scialfa Falcão",
    "Marcia Muller do Olival",
    "Pablo Antônio Perez Draghi",
  ],
  bornNote: tx(
    "Membros natos do Conselho de Administração, como publicados na página.",
    "Born members of the Board, as published on the page.",
    "Membres de droit du conseil d’administration, tels que publiés sur la page.",
  ),
};

export type Doc = {
  title: string;
  type: Copy;
  year: string;
  href: string;
};

export const documents: Doc[] = [
  {
    title: "Estatuto social",
    type: tx("Governança", "Governance", "Gouvernance"),
    year: "2024",
    href: pdf(
      "/auxiliares/modulos/conteudo/pdf/Estatuto-Social-Consolidado-Rpt-Age-02-03-2024-20240926212423.pdf",
    ),
  },
  {
    title: "Ata de eleição",
    type: tx("Governança", "Governance", "Gouvernance"),
    year: "2024",
    href: pdf(
      "/auxiliares/modulos/conteudo/pdf/Ata-De-Eleicao-Diretoria-Age-02-03-2024-20240926212535.pdf",
    ),
  },
  {
    title: "Cartão CNPJ",
    type: tx("Governança", "Governance", "Gouvernance"),
    year: "2025",
    href: pdf("/auxiliares/modulos/conteudo/pdf/Rugby-Para-Todos-Cartao-Cnpj-20250829141702.pdf"),
  },
  {
    title: "Código de ética e conduta",
    type: tx("Governança", "Governance", "Gouvernance"),
    year: "2025",
    href: pdf(
      "/auxiliares/modulos/conteudo/pdf/Codigo-De-Etica-Conduta-Instituto-Rpt-20250829110609.pdf",
    ),
  },
  {
    title: "Política de diversidade, equidade e inclusão",
    type: tx("Governança", "Governance", "Gouvernance"),
    year: "2026",
    href: pdf(
      "/auxiliares/modulos/conteudo/pdf/Politicas-De-Diversidade-Equidade-Inclusao-Irpt-2026-Melhores-Ongs-20260518091020.pdf",
    ),
  },
  ...[
    ["2019", "/auxiliares/modulos/conteudo/pdf/Anuario-Irpt-2019-20210512165421.pdf"],
    ["2020", "/auxiliares/modulos/conteudo/pdf/Anuario-Rpt-2020-20210512165402.pdf"],
    ["2021", "/auxiliares/modulos/conteudo/pdf/Anuario-Instituto-Rpt-2021-20220621154156.pdf"],
    ["2022", "/auxiliares/modulos/conteudo/pdf/Anuario-2022-Versao-Final-20230324150724.pdf"],
    ["2023", "/auxiliares/modulos/conteudo/pdf/Anuario-Rpt-2023-20240712152236.pdf"],
    ["2024", "/auxiliares/modulos/conteudo/pdf/Anuario-Instituto-Rpt-2024-20250829141248.pdf"],
    ["2025", "/auxiliares/modulos/conteudo/pdf/Anuario-Rpt-2025-20260518094730.pdf"],
  ].map(([year, file]) => ({
    title: `Anuário ${year}`,
    type: tx("Relatório", "Report", "Rapport"),
    year,
    href: pdf(file),
  })),
  ...[
    ["2019", "/auxiliares/modulos/conteudo/pdf/Dre-2019-20230817102533.pdf"],
    ["2021", "/auxiliares/modulos/conteudo/pdf/Dre-Ecd-2021-20230817102555.pdf"],
    ["2022", "/auxiliares/modulos/conteudo/pdf/Dre-Ecd-2022-20230817102008.pdf"],
    ["2023", "/auxiliares/modulos/conteudo/pdf/Dre-Ecd-2023-20240722152624.pdf"],
    ["2024", "/auxiliares/modulos/conteudo/pdf/Dre-Ecd-2024-20250821103245.pdf"],
  ].map(([year, file]) => ({
    title: `DRE ${year}`,
    type: tx("Demonstração", "Statement", "État"),
    year,
    href: pdf(file),
  })),
  ...[
    ["2016", "/auxiliares/modulos/conteudo/pdf/Balanco-Patrimonial-2016-1-20210504234034.pdf"],
    ["2017", "/auxiliares/modulos/conteudo/pdf/Balanco-Patrimonial-2017-1-20210504234202.pdf"],
    ["2018", "/auxiliares/modulos/conteudo/pdf/Balanco-Patrimonial-2018-1-20210504234245.pdf"],
    ["2019", "/auxiliares/modulos/conteudo/pdf/Balanco-Patrimonial-2019-20210504234342.pdf"],
    ["2020", "/auxiliares/modulos/conteudo/pdf/Balanco-Patrimonial-2020-20210512181924.pdf"],
    ["2021", "/auxiliares/modulos/conteudo/pdf/Balanco-Patrimonial-Ecd-2021-20221214145257.pdf"],
    ["2022", "/auxiliares/modulos/conteudo/pdf/Balanco-Patrimonial-2022-20230817101529.pdf"],
    ["2023", "/auxiliares/modulos/conteudo/pdf/Balanco-Patrimonial-Ecd-2023-20240722152649.pdf"],
    ["2024", "/auxiliares/modulos/conteudo/pdf/Balanco-Patrimonial-Ecd-2024-20250821102729.pdf"],
  ].map(([year, file]) => ({
    title: `Balanço patrimonial ${year}`,
    type: tx("Demonstração", "Statement", "État"),
    year,
    href: pdf(file),
  })),
];

export const awards: { title: string; href: string | null }[] = [
  {
    title: "Prêmio Solidário Amaro Domingues — 10º Prêmio Sou do Esporte Foco Radical, 2025",
    href: null,
  },
  {
    title: "Prêmio Melhores ONGs 2024 — Instituto Doar, O Mundo que Queremos e Ambev VOA",
    href: "https://www.premiomelhores.org/",
  },
  {
    title: "Prêmio Ouro 2024 — ONG referência do programa do Grupo Foguete, Gerando Falcões",
    href: "https://rugbyparatodos.org.br/conteudo.php?idc=8&idcd=379&tit=Pr%C3%AAmio+OURO+da+Gerando+Falc%C3%B5es",
  },
  {
    title:
      "Prêmio Carolina de Maria de Jesus para Defensores de Direitos Humanos — Fiocruz, pelo projeto Cesta Básica Digital",
    href: null,
  },
  {
    title: "Prêmio Melhores ONGs 2022 — Instituto Doar, O Mundo que Queremos e Ambev VOA",
    href: "https://www.premiomelhores.org/",
  },
  {
    title: "Prêmio Desenvolvimento 2022 — Subprefeitura de Santo Amaro",
    href: "https://www.noticiasdaregiao.com.br/aniversario-de-santo-amaro-comeca-com-o-premio-desenvolvimento/",
  },
  {
    title: "Prêmio Falcão Captação 2021 — Gerando Falcões",
    href: "https://rugbyparatodos.org.br/conteudo.php?idc=8&idcd=187&tit=NL+RPT+Abril+|+Pr%C3%AAmio+Falc%C3%A3o+Capta%C3%A7%C3%A3o+2021",
  },
  {
    title: "Prêmio Esporte e Cidadania 2006 e 2008 — Prefeitura de São Paulo",
    href: null,
  },
  {
    title: "Troféu Brasil Rugby 2013 — melhor projeto social de 2012, Confederação Brasileira de Rugby",
    href: null,
  },
  { title: "São José Polo Awards, 2012", href: null },
  {
    title: "Troféu Brasil Rugby 2017 — Apoiador do Rugby Brasileiro, Confederação Brasileira de Rugby",
    href: "https://brasilrugby.com.br/2018/03/20/melhores-da-temporada-2017-sao-premiados-no-trofeu-brasil-rugby/",
  },
];

export const news = [
  {
    slug: "premio-ouro-gerando-falcoes",
    title: "Prêmio Ouro da Gerando Falcões",
    href: "https://rugbyparatodos.org.br/conteudo.php?idc=8&idcd=379&tit=Pr%C3%AAmio+OURO+da+Gerando+Falc%C3%B5es",
  },
  {
    slug: "premio-falcao-captacao-2021",
    title: "NL RPT Abril — Prêmio Falcão Captação 2021",
    href: "https://rugbyparatodos.org.br/conteudo.php?idc=8&idcd=187&tit=NL+RPT+Abril+|+Pr%C3%AAmio+Falc%C3%A3o+Capta%C3%A7%C3%A3o+2021",
  },
];

export const photoAlts: Record<PhotoId, Copy> = {
  corrida: hero.alt,
  conversa: storyPhoto.alt,
  grupo: tx(
    "Grupo grande reunido em um campo, com uma faixa em que se lê Rugby Para Todos Paraisópolis.",
    "A large group gathered on a field, with a banner that reads Rugby Para Todos Paraisópolis.",
    "Un grand groupe réuni sur un terrain, avec une banderole où l’on lit Rugby Para Todos Paraisópolis.",
  ),
  jogo: tx(
    "Lance de rugby: atletas disputam a bola oval em campo.",
    "A passage of rugby: players contest the oval ball on the field.",
    "Une action de rugby : des joueurs disputent le ballon ovale sur le terrain.",
  ),
  fila: tx(
    "Fotografia de arquivo do instituto, cena de treino.",
    "Archive photograph from the institute, a training scene.",
    "Photographie d’archives de l’institut, une scène d’entraînement.",
  ),
  roda: tx(
    "Fotografia de arquivo do instituto, pessoas reunidas em campo.",
    "Archive photograph from the institute, people gathered on the field.",
    "Photographie d’archives de l’institut, des personnes réunies sur le terrain.",
  ),
  portal: tx(
    "Fotografia de arquivo do instituto, cena de competição.",
    "Archive photograph from the institute, a competition scene.",
    "Photographie d’archives de l’institut, une scène de compétition.",
  ),
  medalhas: tx(
    "Fotografia de arquivo do instituto.",
    "Archive photograph from the institute.",
    "Photographie d’archives de l’institut.",
  ),
  tres: tx(
    "Fotografia de arquivo do instituto.",
    "Archive photograph from the institute.",
    "Photographie d’archives de l’institut.",
  ),
  trofeu: tx(
    "Fotografia de arquivo do instituto.",
    "Archive photograph from the institute.",
    "Photographie d’archives de l’institut.",
  ),
  palco: tx(
    "Fotografia de arquivo do instituto.",
    "Archive photograph from the institute.",
    "Photographie d’archives de l’institut.",
  ),
};
