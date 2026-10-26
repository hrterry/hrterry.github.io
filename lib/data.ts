// Site content. Edit this file to update the homepage, publications, news, open source and CV.

export const profile = {
  name: "Haoran (Haron) Xu",
  short: "Haron Xu",
  role: "Undergraduate Researcher",
  affiliation: "Sichuan University",
  program: "Biomedical Engineering · Medical Information Engineering · Class of 2027",
  email: "xhr2023@stu.scu.edu.cn",
  github: "https://github.com/hrterry",
  photo: "/assets/img/photo.webp",
  tagline: "Generative models for scientific discovery.",
  intro:
    "I build generative models that respect the structure of biology — from spatial omics and computational pathology to RNA and protein design.",
  bio: [
    "I am an undergraduate researcher at Sichuan University, working on generative models for scientific discovery. My research spans biological sequence design, spatial omics, and computational pathology.",
    "I am particularly interested in structured generation, multimodal representation learning, and post-training scientific foundation models with verifiable biological feedback.",
  ],
  mentors: [
    { name: "Prof. Xiao Han", place: "Sichuan University", url: "https://scholar.google.com/citations?user=XGVV3gEAAAAJ" },
    { name: "Prof. Rex Ying", place: "Yale University", url: "https://www.cs.yale.edu/homes/ying-rex/" },
  ],
  question:
    "How should scientific structure and biological constraints shape generative objectives, what cross-modal information do these objectives encode, and how can pretrained models be adapted through feedback and verification?",
};

export type Interest = { key: string; title: string; blurb: string; media?: string; frames?: string[] };
export const interests: Interest[] = [
  { key: "generative", title: "Generative Models", blurb: "Flow matching and diffusion, with the geometry of the data built into the dynamics.", media: "/assets/img/research-interests/generative-models/denoising-5s.gif" },
  { key: "omics", title: "Spatial Omics", blurb: "Predicting and integrating spatially resolved molecular measurements across tissue.", media: "/assets/img/research-interests/spatial-omics/gene-denoising.gif" },
  {
    key: "pathology", title: "Computational Pathology", blurb: "Reading molecular state from routine histology with pathology foundation models.",
    frames: [
      "/assets/img/research-interests/pathology/tenx111-h-and-e.webp",
      "/assets/img/research-interests/pathology/genbio-pathfm.webp",
      "/assets/img/research-interests/pathology/gigapath.webp",
      "/assets/img/research-interests/pathology/uni.webp",
    ],
  },
  { key: "rna", title: "RNA Design", blurb: "Post-training and verifier-guided search that turn RNA foundation models into exact designers." },
  { key: "protein", title: "Protein Generation", blurb: "Generating protein backbones and sequences under structural constraints.", media: "/assets/img/research-interests/protein-generation/rfdiffusion-denoising.gif" },
];

export type Pub = {
  key: string; title: string; short: string; venue: string; year: number; authors?: string; summary: string;
  links: { label: string; href: string }[]; figures?: { src: string; caption: string }[]; label: string;
};
export const publications: Pub[] = [
  {
    key: "neurips26", short: "Flow matching for prediction", label: "Generative representation learning",
    title: "When Does Flow Matching Help Deterministic Multimodal Prediction?",
    venue: "NeurIPS", year: 2026,
    summary: "Why a generative objective can improve deterministic prediction from histology, and when a simpler regression objective is enough — studied through controlled interventions, representation analysis and information-routing diagnostics.",
    links: [{ label: "Poster", href: "https://neurips.cc/virtual/2026/loc/sydney/poster/150617" }],
  },
  {
    key: "bioflow", short: "BioFlow", label: "Generative biology",
    title: "BioFlow: A Biologically Valid Support-Preserving Flow for Histology-Conditioned Spatial Transcriptomics Prediction",
    venue: "MICCAI", year: 2026, authors: "Haoran Xu, Yang Liu, Wei Yuan, Xiao Han*",
    summary: "A support-preserving flow-matching framework that predicts spatial gene expression from histology while keeping every generated value biologically valid, improving spatial correlation, training stability and efficiency.",
    links: [{ label: "Code", href: "https://github.com/hrterry/BioFLow" }, { label: "Project page", href: "https://hrterry.github.io/BioFLow/" }],
    figures: [
      { src: "/assets/img/publications/bioflow/architecture.png", caption: "Architecture & support-preserving flow" },
      { src: "/assets/img/publications/bioflow/trajectories.png", caption: "Generative trajectory comparison" },
      { src: "/assets/img/publications/bioflow/gene-expression.png", caption: "Spatial gene-expression prediction" },
      { src: "/assets/img/publications/bioflow/efficiency.png", caption: "Performance & efficiency" },
    ],
  },
  {
    key: "spamv", short: "SpaMV", label: "Spatial multi-omics",
    title: "Interpretable spatial multi-omics data integration and dimensionality reduction with SpaMV",
    venue: "Nature Communications", year: 2026, authors: "Yang Liu, Kexin Ma, Haoran Xu, et al.",
    summary: "An interpretable multi-view framework that separates the biology shared across spatial omics modalities from what is specific to each, enabling spatial-domain discovery and multi-omics topic modelling.",
    links: [{ label: "Paper", href: "https://www.nature.com/articles/s41467-026-74718-1" }, { label: "Code", href: "https://github.com/ericcombiolab/SpaMV" }],
    figures: [
      { src: "/assets/img/publications/spamv/overview.webp", caption: "SpaMV overview" },
      { src: "/assets/img/publications/spamv/simulation.webp", caption: "Simulation benchmark" },
      { src: "/assets/img/publications/spamv/transcriptome-proteome.webp", caption: "Transcriptome × proteome" },
      { src: "/assets/img/publications/spamv/transcriptome-epigenome.webp", caption: "Transcriptome × epigenome" },
      { src: "/assets/img/publications/spamv/transcriptome-metabolome.webp", caption: "Transcriptome × metabolome" },
      { src: "/assets/img/publications/spamv/breast-cancer.webp", caption: "Breast cancer case study" },
    ],
  },
];

export type Repo = { name: string; repo: string; tagline: string; description: string; role: "Lead" | "Collaborator"; lang: string; license: string; homepage?: string; stars: number; accent: string; tags: string[] };
export const repos: Repo[] = [
  {
    name: "Zmind+", repo: "hrterry/zmind-plus", role: "Lead", lang: "In design", license: "MIT", stars: 0, accent: "var(--accent)",
    tagline: "The open-source interface for supervising agent research.",
    description: "Turns sprawling agent sessions into a live, inspectable map of questions, hypotheses, critiques, experiments, evidence and decisions. Local-first and provider-neutral.",
    tags: ["agents", "research", "local-first"],
  },
  {
    name: "Zmind", repo: "RZX00/zmind", role: "Collaborator", lang: "TypeScript", license: "Apache-2.0", stars: 2, homepage: "https://zmind.site", accent: "var(--amber)",
    tagline: "An AI visual thinking studio.",
    description: "Infinite collaborative canvases where agents read and write alongside people: real-time sync, native and MCP tool stacks, web, desktop and mobile clients.",
    tags: ["canvas", "agents", "real-time"],
  },
  {
    name: "Zotero Paper Coach", repo: "RZX00/zotero-paper-coach", role: "Collaborator", lang: "Python", license: "MIT", stars: 21, accent: "var(--rose)",
    tagline: "Mentor-style highlights and margin notes, written into your PDFs.",
    description: "An agent skill that reads a paper for a chosen goal, highlights claims, evidence and limitations, and writes margin notes you can read directly in Zotero.",
    tags: ["agent skill", "papers", "zotero"],
  },
];

export type News = { date: string; html: string };
export const news: News[] = [
  { date: "2026-09-25", html: 'My paper <a href="https://neurips.cc/virtual/2026/loc/sydney/poster/150617"><b>When Does Flow Matching Help Deterministic Multimodal Prediction?</b></a> was accepted to <b>NeurIPS 2026</b>.' },
  { date: "2026-09-14", html: 'New personal essay: <a href="/blog/2026/on-the-eve-of-an-intelligence-explosion/"><b>On the Eve of an Intelligence Explosion</b></a>.' },
  { date: "2026-09-10", html: 'New research essay: <a href="/blog/2026/domain-specific-model-design-as-search/"><b>Domain-Specific Model Design as a Search Problem</b></a>.' },
  { date: "2026-06-13", html: "<b>BioFlow</b> was accepted to <b>MICCAI 2026</b>." },
  { date: "2026-05-12", html: "<b>SpaMV</b> was published in <i>Nature Communications</i>." },
];
