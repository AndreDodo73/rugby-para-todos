import {
  fundraisingProjects,
  institutional,
  runningProjects,
  shopProducts,
  storyPeople,
  type SiteLanguage,
} from "./institutional";

export type TextField = {
  key: string;
  section: string;
  label: string;
  multiline?: boolean;
  defaults: Record<SiteLanguage, string>;
};

export type MediaField = {
  key: string;
  section: string;
  label: string;
  defaultUrl: string;
  alt?: string;
  /** Defaults to image. Use video for hero clip uploads in admin. */
  kind?: "image" | "video";
};

const copyDefaults = {
  pt: {
    donate: "Doe agora",
    impactEyebrow: "O campo é só o começo",
    impactTitle: "De Paraisópolis para o mundo.",
    impactBody:
      "Há mais de duas décadas, o Rugby Para Todos amplia as oportunidades de jovens dentro e fora de campo. Quem deu os primeiros passes no projeto hoje estuda, trabalha ou compete no Brasil e em diversos outros países. Alguns desses atletas chegaram aos Jogos Olímpicos.",
    storiesEyebrow: "Vidas em movimento",
    storiesTitle: "O resultado\ntem nome, rosto\ne futuro.",
    storiesBody:
      "Por trás de cada número existe uma trajetória que começou na comunidade e ganhou o mundo.",
    projectsEyebrow: "Onde atuamos",
    projectsTitle: "Projetos em captação e execução",
    projectsBody:
      "Os projetos do Instituto RPT contribuem para o desenvolvimento social de crianças e adolescentes em comunidades vulneráveis pelo Brasil. Escolha um projeto e torne-se parceiro pessoa física ou jurídica.",
    communityEyebrow: "Desde 2004",
    communityTitle: "Uma comunidade inteira joga junto.",
    communityBody:
      "Nascemos da inquietude de quem acreditava no esporte como ferramenta de desenvolvimento humano. Hoje, uma equipe multidisciplinar acompanha jovens e famílias para que cada conquista continue muito além das quatro linhas.",
    communityCta: "Conheça o Instituto",
    sponsorTitle: "Quem acredita, transforma junto.",
    sponsorBody: "Patrocinadores e apoiadores que entram em campo com o Instituto RPT.",
    footerNote: "Esporte, educação e oportunidades desde 2004.",
  },
  en: {
    donate: "Donate now",
    impactEyebrow: "The field is just the beginning",
    impactTitle: "From Paraisópolis to the world.",
    impactBody:
      "For more than two decades, Rugby Para Todos has expanded opportunities for young people on and off the field. Those who took their first passes in the project now study, work or compete in Brazil and in many other countries. Some of these athletes have reached the Olympic Games.",
    storiesEyebrow: "Lives in motion",
    storiesTitle: "Impact has\na name, a face\nand a future.",
    storiesBody:
      "Behind each number is a journey that began in the community and reached the world.",
    projectsEyebrow: "Where we work",
    projectsTitle: "Projects in fundraising and delivery",
    projectsBody:
      "Instituto RPT projects support the social development of children and adolescents in vulnerable communities across Brazil. Choose a project and become a partner as an individual or organization.",
    communityEyebrow: "Since 2004",
    communityTitle: "An entire community plays together.",
    communityBody:
      "We were born from the belief that sport can drive human development. Today, a multidisciplinary team supports young people and families so every achievement continues far beyond the field.",
    communityCta: "Meet the Institute",
    sponsorTitle: "Those who believe, transform with us.",
    sponsorBody: "Sponsors and supporters who take the field with Instituto RPT.",
    footerNote: "Sport, education and opportunity since 2004.",
  },
  fr: {
    donate: "Faire un don",
    impactEyebrow: "Le terrain n'est que le début",
    impactTitle: "De Paraisópolis au monde.",
    impactBody:
      "Depuis plus de vingt ans, Rugby Para Todos élargit les opportunités des jeunes sur le terrain et en dehors. Ceux qui ont donné leurs premiers passes dans le projet étudient, travaillent ou concourent aujourd’hui au Brésil et dans de nombreux autres pays. Certains de ces athlètes sont allés jusqu’aux Jeux olympiques.",
    storiesEyebrow: "Des vies en mouvement",
    storiesTitle: "L’impact a\nun nom, un visage\net un avenir.",
    storiesBody:
      "Derrière chaque chiffre se trouve un parcours né dans la communauté et ouvert sur le monde.",
    projectsEyebrow: "Nos actions",
    projectsTitle: "Projets en collecte et en exécution",
    projectsBody:
      "Les projets de l’Instituto RPT contribuent au développement social d’enfants et d’adolescents dans des communautés vulnérables au Brésil. Choisissez un projet et devenez partenaire, en tant que personne physique ou morale.",
    communityEyebrow: "Depuis 2004",
    communityTitle: "Toute une communauté joue ensemble.",
    communityBody:
      "Nous sommes nés de la conviction que le sport favorise le développement humain. Aujourd'hui, une équipe pluridisciplinaire accompagne les jeunes et leurs familles bien au-delà du terrain.",
    communityCta: "Découvrir l'Institut",
    sponsorTitle: "Ceux qui y croient transforment avec nous.",
    sponsorBody: "Sponsors et partenaires qui entrent sur le terrain avec l'Instituto RPT.",
    footerNote: "Sport, éducation et opportunités depuis 2004.",
  },
} as const;

const heroDefaults = {
  pt: {
    start: "Começa no Rugby.",
    beyond: "Vai muito além do campo.",
    description: "Promovemos cidadania, e criamos oportunidades por meio do esporte.",
    action: "Faça parte dessa transformação",
    scroll: "Deslize para conhecer o RPT",
  },
  en: {
    start: "It starts with Rugby.",
    beyond: "It goes far beyond the field.",
    description: "We promote citizenship and create opportunities through sport.",
    action: "Be part of this transformation",
    scroll: "Swipe to meet RPT",
  },
  fr: {
    start: "Tout commence avec le Rugby.",
    beyond: "Bien au-delà du terrain.",
    description: "Nous favorisons la citoyenneté et créons des opportunités grâce au sport.",
    action: "Participez à cette transformation",
    scroll: "Glissez pour découvrir le RPT",
  },
} as const;

function storySlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function field(
  key: string,
  section: string,
  label: string,
  defaults: Record<SiteLanguage, string>,
  multiline = true,
): TextField {
  return { key, section, label, defaults, multiline };
}

export const TEXT_FIELDS: TextField[] = [
  field("hero.start", "Hero", "Título 1", {
    pt: heroDefaults.pt.start,
    en: heroDefaults.en.start,
    fr: heroDefaults.fr.start,
  }, false),
  field("hero.beyond", "Hero", "Título 2", {
    pt: heroDefaults.pt.beyond,
    en: heroDefaults.en.beyond,
    fr: heroDefaults.fr.beyond,
  }, false),
  field("hero.description", "Hero", "Texto de apoio", {
    pt: heroDefaults.pt.description,
    en: heroDefaults.en.description,
    fr: heroDefaults.fr.description,
  }),
  field("hero.action", "Hero", "Botão principal", {
    pt: heroDefaults.pt.action,
    en: heroDefaults.en.action,
    fr: heroDefaults.fr.action,
  }, false),
  field("hero.scroll", "Hero", "Texto de rolagem", {
    pt: heroDefaults.pt.scroll,
    en: heroDefaults.en.scroll,
    fr: heroDefaults.fr.scroll,
  }, false),
  field("nav.donate", "Menu", "Botão Doe agora", {
    pt: copyDefaults.pt.donate,
    en: copyDefaults.en.donate,
    fr: copyDefaults.fr.donate,
  }, false),
  field("impact.eyebrow", "Impacto", "Chapéu", {
    pt: copyDefaults.pt.impactEyebrow,
    en: copyDefaults.en.impactEyebrow,
    fr: copyDefaults.fr.impactEyebrow,
  }, false),
  field("impact.title", "Impacto", "Título", {
    pt: copyDefaults.pt.impactTitle,
    en: copyDefaults.en.impactTitle,
    fr: copyDefaults.fr.impactTitle,
  }, false),
  field("impact.body", "Impacto", "Texto", {
    pt: copyDefaults.pt.impactBody,
    en: copyDefaults.en.impactBody,
    fr: copyDefaults.fr.impactBody,
  }),
  field("stories.eyebrow", "Histórias", "Chapéu", {
    pt: copyDefaults.pt.storiesEyebrow,
    en: copyDefaults.en.storiesEyebrow,
    fr: copyDefaults.fr.storiesEyebrow,
  }, false),
  field("stories.title", "Histórias", "Título (use Enter para quebrar linha)", {
    pt: copyDefaults.pt.storiesTitle,
    en: copyDefaults.en.storiesTitle,
    fr: copyDefaults.fr.storiesTitle,
  }),
  field("stories.body", "Histórias", "Texto", {
    pt: copyDefaults.pt.storiesBody,
    en: copyDefaults.en.storiesBody,
    fr: copyDefaults.fr.storiesBody,
  }),
  field("projects.eyebrow", "Projetos", "Chapéu", {
    pt: copyDefaults.pt.projectsEyebrow,
    en: copyDefaults.en.projectsEyebrow,
    fr: copyDefaults.fr.projectsEyebrow,
  }, false),
  field("projects.title", "Projetos", "Título", {
    pt: copyDefaults.pt.projectsTitle,
    en: copyDefaults.en.projectsTitle,
    fr: copyDefaults.fr.projectsTitle,
  }, false),
  field("projects.body", "Projetos", "Texto", {
    pt: copyDefaults.pt.projectsBody,
    en: copyDefaults.en.projectsBody,
    fr: copyDefaults.fr.projectsBody,
  }),
  field("community.eyebrow", "Comunidade", "Chapéu", {
    pt: copyDefaults.pt.communityEyebrow,
    en: copyDefaults.en.communityEyebrow,
    fr: copyDefaults.fr.communityEyebrow,
  }, false),
  field("community.title", "Comunidade", "Título", {
    pt: copyDefaults.pt.communityTitle,
    en: copyDefaults.en.communityTitle,
    fr: copyDefaults.fr.communityTitle,
  }, false),
  field("community.body", "Comunidade", "Texto", {
    pt: copyDefaults.pt.communityBody,
    en: copyDefaults.en.communityBody,
    fr: copyDefaults.fr.communityBody,
  }),
  field("community.cta", "Comunidade", "Botão", {
    pt: copyDefaults.pt.communityCta,
    en: copyDefaults.en.communityCta,
    fr: copyDefaults.fr.communityCta,
  }, false),
  field("partners.title", "Parceiros", "Título", {
    pt: copyDefaults.pt.sponsorTitle,
    en: copyDefaults.en.sponsorTitle,
    fr: copyDefaults.fr.sponsorTitle,
  }, false),
  field("partners.body", "Parceiros", "Texto", {
    pt: copyDefaults.pt.sponsorBody,
    en: copyDefaults.en.sponsorBody,
    fr: copyDefaults.fr.sponsorBody,
  }),
  field("footer.note", "Rodapé", "Frase do rodapé", {
    pt: copyDefaults.pt.footerNote,
    en: copyDefaults.en.footerNote,
    fr: copyDefaults.fr.footerNote,
  }),
  field("shop.sectionTitle", "Loja", "Título da loja", {
    pt: institutional.pt.shopSectionTitle,
    en: institutional.en.shopSectionTitle,
    fr: institutional.fr.shopSectionTitle,
  }, false),
  field("shop.sectionBody", "Loja", "Texto da loja", {
    pt: institutional.pt.shopSectionBody,
    en: institutional.en.shopSectionBody,
    fr: institutional.fr.shopSectionBody,
  }),
  field("method.title", "Metodologia", "Título", {
    pt: institutional.pt.methodTitle,
    en: institutional.en.methodTitle,
    fr: institutional.fr.methodTitle,
  }, false),
  field("method.body", "Metodologia", "Texto", {
    pt: institutional.pt.methodBody,
    en: institutional.en.methodBody,
    fr: institutional.fr.methodBody,
  }),
  field("service.title", "Serviços", "Título", {
    pt: institutional.pt.serviceTitle,
    en: institutional.en.serviceTitle,
    fr: institutional.fr.serviceTitle,
  }, false),
  field("service.body", "Serviços", "Texto", {
    pt: institutional.pt.serviceBody,
    en: institutional.en.serviceBody,
    fr: institutional.fr.serviceBody,
  }),
  field("support.title", "Doação", "Título", {
    pt: institutional.pt.supportTitle,
    en: institutional.en.supportTitle,
    fr: institutional.fr.supportTitle,
  }, false),
  field("support.body", "Doação", "Texto", {
    pt: institutional.pt.supportBody,
    en: institutional.en.supportBody,
    fr: institutional.fr.supportBody,
  }),
  field("governance.title", "Transparência", "Título", {
    pt: institutional.pt.governanceTitle,
    en: institutional.en.governanceTitle,
    fr: institutional.fr.governanceTitle,
  }, false),
  field("governance.body", "Transparência", "Texto", {
    pt: institutional.pt.governanceBody,
    en: institutional.en.governanceBody,
    fr: institutional.fr.governanceBody,
  }),
  ...storyPeople.flatMap((person) => {
    const slug = storySlug(person.name);
    const fields: TextField[] = [
      field(`story.${slug}.name`, "Histórias — pessoas", `Nome — ${person.name}`, {
        pt: person.name,
        en: person.name,
        fr: person.name,
      }, false),
      field(`story.${slug}.bio`, "Histórias — pessoas", `Bio — ${person.name}`, {
        pt: person.bio.pt,
        en: person.bio.en,
        fr: person.bio.fr,
      }),
    ];
    if (person.quote) {
      fields.splice(
        1,
        0,
        field(`story.${slug}.quote`, "Histórias — pessoas", `Citação — ${person.name}`, {
          pt: person.quote.pt,
          en: person.quote.en,
          fr: person.quote.fr,
        }),
      );
    }
    return fields;
  }),
  ...shopProducts.flatMap((product) => [
    field(`shop.product.${product.id}.name`, "Loja — produtos", `Nome — ${product.name.pt}`, {
      pt: product.name.pt,
      en: product.name.en,
      fr: product.name.fr,
    }, false),
    field(`shop.product.${product.id}.blurb`, "Loja — produtos", `Descrição — ${product.name.pt}`, {
      pt: product.blurb.pt,
      en: product.blurb.en,
      fr: product.blurb.fr,
    }),
  ]),
];

export const MEDIA_FIELDS: MediaField[] = [
  {
    key: "hero.video",
    section: "Hero",
    label: "Vídeo principal (scroll)",
    defaultUrl: "/media/hero-boy-tossing.mp4",
    alt: "Vídeo principal do hero",
    kind: "video",
  },
  {
    key: "hero.poster",
    section: "Hero",
    label: "Imagem de capa do vídeo (poster)",
    defaultUrl: "/media/hero-boy-tossing-poster.jpg",
    alt: "Poster do vídeo principal",
  },
  {
    key: "impact.image",
    section: "Impacto",
    label: "Foto da seção Impacto",
    defaultUrl: "/assets/paraisopolis-mundo.jpg",
    alt: "Atletas do Rugby Para Todos com medalhas e troféus em Paraisópolis",
  },
  {
    key: "community.image",
    section: "Comunidade",
    label: "Foto de fundo da comunidade",
    defaultUrl: "/assets/community-fullbleed.jpg",
    alt: "Comunidade Rugby Para Todos",
  },
  {
    key: "footer.logoColor",
    section: "Rodapé",
    label: "Logo colorida do rodapé",
    defaultUrl: "/assets/footer-logo-color.svg",
    alt: "Instituto Rugby Para Todos",
  },
  {
    key: "footer.logoMono",
    section: "Rodapé",
    label: "Monograma do rodapé",
    defaultUrl: "/assets/footer-logo-mono.svg",
    alt: "Monograma RPT",
  },
  ...storyPeople.map((person) => ({
    key: `story.${storySlug(person.name)}.image`,
    section: "Histórias — fotos",
    label: `Foto — ${person.name}`,
    defaultUrl: `/assets/${person.image}`,
    alt: person.name,
  })),
  ...fundraisingProjects.map((project) => ({
    key: `fundraising.${storySlug(project.place)}.image`,
    section: "Projetos — captação",
    label: `Foto — ${project.place}`,
    defaultUrl: `/assets/${project.image}`,
    alt: project.place,
  })),
  ...runningProjects.map((project) => ({
    key: `running.${storySlug(project.title)}.image`,
    section: "Projetos — execução",
    label: `Foto — ${project.title}`,
    defaultUrl: `/assets/${project.image}`,
    alt: project.title,
  })),
  ...shopProducts.map((product) => ({
    key: `shop.${product.id}.image`,
    section: "Loja — fotos",
    label: `Foto — ${product.name.pt}`,
    defaultUrl: `/assets/${product.image}`,
    alt: product.name.pt,
  })),
];

export function storyPersonSlug(name: string) {
  return storySlug(name);
}

export function mediaUrl(media: Record<string, string>, key: string, fallback: string) {
  return media[key] || fallback;
}

export function textValue(
  texts: Record<string, string>,
  key: string,
  fallback: string,
) {
  const value = texts[key];
  return value == null || value === "" ? fallback : value;
}
