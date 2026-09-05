/* ============================================================
   SITE CONTENT — this is the only file you normally edit.
   Add a publication, a news item, an award: edit the arrays below.
   No build step. Save the file, refresh the browser, done.
   ============================================================ */

const profile = {
  name: "Mojtaba Jafarian Abyaneh",
  title: "PhD Candidate, Transportation Engineering",
  // Shown beside the title and handed to search engines. Someone reading a
  // search result wants to know where you are before almost anything else.
  location: "Boca Raton, Florida",
  image: "assets/profile.jpg",
  bio: `I am a PhD candidate and Graduate Research Assistant at
        <strong>Florida Atlantic University</strong>, working in the
        <a href="https://www.fau.edu/smart/" target="_blank" rel="noopener">I-SENSE Lab</a>
        with Dr. Jinwoo Jang.`,
  research: `My research applies deep learning to intelligent transportation systems:
        Transformer-based multi-agent trajectory prediction from real-world LiDAR data,
        spatial graph neural networks for mobility flow, and urban digital twins for
        city-scale wind simulation. Funded by the <strong>NSF</strong> and the
        <strong>NIH</strong>.`,
};

const links = [
  { name: "Email",    url: "mailto:mjafarianaby2023@fau.edu" },
  { name: "Scholar",  url: "https://scholar.google.com/citations?user=VOvMEmIAAAAJ&hl=en" },
  { name: "ORCID",    url: "https://orcid.org/0009-0006-0556-5520" },
  { name: "GitHub",   url: "https://github.com/mojtaba-ja" },
  { name: "LinkedIn", url: "https://linkedin.com/in/mojjafarian" },
  { name: "CV",       url: "assets/cv.pdf" },
  { name: "Resume",   url: "assets/resume.pdf" },
];

const interests = [
  "Deep Learning for Intelligent Transportation Systems",
  "Multi-Agent Trajectory Prediction",
  "Spatial Graph Neural Networks",
  "Computer Vision &amp; LiDAR Processing",
  "Urban Transportation Safety Modeling",
  "Urban Digital Twins &amp; CFD Simulation",
  "Spatiotemporal Flow Prediction",
];

/* Publications.
   group         -> which section the entry appears under, keyed to pubSections
                    below. Mirrors the CV: peer-reviewed archival work first,
                    then anything not yet through review.
   status        -> colored badge: "published" | "review" | "preprint" | "prep"
   slug          -> the permalink, e.g. /pub/sipt-multi-agent/
   abstract      -> VERBATIM published abstract, or null.
                    null means no detail page is generated for this paper.
                    NEVER paraphrase here — paste the real text or leave it null.
   abstractSource-> where the abstract text came from, shown as attribution.

   Order matters: entries render in the order written, so keep each group
   reverse-chronological, exactly as the CV lists them.                      */
const publications = [
  {
    slug: "lidar-transformer-ojits",
    group: "peer-reviewed",
    title: "Transformer-Based Trajectory Prediction Using LiDAR Data for Situational Awareness in Complex Urban Environments",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
    // YEAR: 2026 is correct here — do not "fix" it to 2025.
    // IEEE's official BibTeX gives year={2026} (the Volume 7 issue year), which
    // is what appears in reference lists when people cite this paper.
    // Google Scholar shows 2025/12/3 because it always uses the date an article
    // first went online. Both are right; they measure different things.
    // Do NOT edit the year in your Scholar profile to match — Scholar disables
    // automatic citation updates for any article you manually edit.
    venues: ["IEEE Open Journal of Intelligent Transportation Systems, Vol. 7, pp. 16–28 — 2026"],
    status: "published",
    // The journal's impact factor deliberately does NOT appear here. On a CV it
    // is normal; on a personal site it reads as selling, and the people who
    // matter already know the venue.
    links: [
      { label: "DOI", url: "https://doi.org/10.1109/OJITS.2025.3640002" },
      { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/document/11277286/" },
      { label: "Scholar", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VOvMEmIAAAAJ&citation_for_view=VOvMEmIAAAAJ:Tyk-4Ss8FVUC" },
    ],
    // Verbatim published abstract. Open access (CC BY).
    abstract: `With the rise of intelligent systems in urban transportation, the ability to predict
      agent behavior in real time has gained increasing research attention. Accurate trajectory
      prediction plays an important role in improving safety and decision-making in self-driving
      vehicles and smart city infrastructure. This study focuses on LiDAR-sensor-based trajectory
      prediction of agents at a hyperlocal level using a Transformer architecture. A large-scale
      dataset was collected using an Ouster OS1 LiDAR sensor at a busy urban intersection in West
      Palm Beach, Florida. This experiment captured more than 12,390 real-world trajectories which
      include vehicles, pedestrians, and bicycles.

      After obtaining experimental results from the sensor, the proposed framework first performs
      object detection to extract agent trajectories from LiDAR point-cloud data. Afterwards, data
      curation was performed to filter out the reflections of pedestrians and vehicles on the glass
      storefronts, or they were almost stationary. In the next stage, a Transformer model is
      developed to learn and predict spatial-temporal patterns of agent trajectories.

      By performing a hyperparameter tuning, the Transformer model was able to achieve a 15.24%
      improvement in the average displacement error in comparison with the traditional LSTM method.
      Results are visualized to display predicted and ground-truth paths on a geo-referenced map.
      With a higher convergence rate compared to the LSTM approach, the proposed results showed the
      effectiveness of attention-based models in complex multi-agent urban environments.`,
    abstractSource: {
      label: "IEEE Open Journal of Intelligent Transportation Systems",
      url: "https://doi.org/10.1109/OJITS.2025.3640002",
    },
  },
  {
    slug: "modal-residual-gwo",
    group: "peer-reviewed",
    title: "Baseline updating method for structural damage identification using modal residual force and grey wolf optimization",
    authors: "A. Zare Hosseinzadeh, G. Ghodrati Amiri, <strong>M. Jafarian Abyaneh</strong>, A. Ghadimi Hamzehkolaei",
    venues: ["Engineering Optimization, Vol. 52, No. 4 — 2020"],
    status: "published",
    links: [
      { label: "DOI", url: "https://doi.org/10.1080/0305215X.2019.1593400" },
      { label: "Scholar", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VOvMEmIAAAAJ&citation_for_view=VOvMEmIAAAAJ:u-x6o8ySG0sC" },
    ],
    // Verbatim published abstract.
    abstract: `This article presents two effective optimization-based model-updating approaches for
      structural damage identification using the modal residual force (MRF) concept. The first
      objective function employs a direct data-fitting procedure to inspect the amount of approaching
      between entries of the calculated MRF vectors for the monitored and analytical models of the
      structure. The second objective function uses the modal assurance criterion as a geometric
      tracing criterion to evaluate the amount of accordance between two vectors.

      The proposed objective functions are solved with a novel metaheuristic optimization technique,
      the grey wolf optimization algorithm. Four numerical examples are studied to demonstrate the
      efficiency of the proposed methods. Moreover, studies are conducted not only to assess the
      robustness of the methods in more realistic circumstances, but also to justify the necessity of
      using these techniques. Based on the obtained results, the second objective function is more
      sensitive to structural damage than the first objective function.`,
    abstractSource: {
      label: "Engineering Optimization",
      url: "https://doi.org/10.1080/0305215X.2019.1593400",
    },
  },
  {
    slug: "model-updating-frames",
    group: "peer-reviewed",
    title: "Model Updating-Based Approach for Damage Prognosis in Frames via Modal Residual Force",
    authors: "G. Ghodrati Amiri, <strong>M. Jafarian Abyaneh</strong>, A. Zare Hosseinzadeh",
    venues: ["Int. J. of Civil, Environmental, Structural, Construction and Architectural Engineering, Vol. 10, No. 8 — 2016"],
    status: "published",
    links: [
      { label: "DOI", url: "https://doi.org/10.5281/zenodo.1125800" },
      { label: "Scholar", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VOvMEmIAAAAJ&citation_for_view=VOvMEmIAAAAJ:u5HHmVD_uO8C" },
    ],
    // Verbatim published abstract.
    abstract: `This paper presents an effective model updating strategy for damage localization and
      quantification in frames by defining damage detection problem as an optimization issue. A
      generalized version of the Modal Residual Force (MRF) is employed for presenting a new
      damage-sensitive cost function. Then, Grey Wolf Optimization (GWO) algorithm is utilized for
      solving suggested inverse problem and the global extremums are reported as damage detection
      results.

      The applicability of the presented method is investigated by studying different damage patterns
      on the benchmark problem of the IASC-ASCE, as well as a planar shear frame structure. The
      obtained results emphasize good performance of the method not only in free-noise cases, but
      also when the input data are contaminated with different levels of noises.`,
    abstractSource: {
      label: "Zenodo",
      url: "https://doi.org/10.5281/zenodo.1125800",
    },
  },
  {
    slug: "grey-system-two-stage",
    group: "peer-reviewed",
    title: "A new two-stage method for damage identification in linear-shaped structures via Grey System Theory and optimization algorithm",
    authors: "G. Ghodrati Amiri, A. Zare Hosseinzadeh, <strong>M. Jafarian Abyaneh</strong>",
    venues: ["Journal of Rehabilitation in Civil Engineering, Vol. 3, No. 2, pp. 45–58 — 2015"],
    status: "published",
    // The DOI (10.22075/jrce.2016.369) still resolves to the journal's own
    // server, which is offline. DOAJ hosts a stable open-access record instead.
    links: [
      { label: "DOAJ", url: "https://doaj.org/article/7dff699120cd4ba3ba2336eb9725b1a9" },
      { label: "Scholar", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VOvMEmIAAAAJ&citation_for_view=VOvMEmIAAAAJ:d1gkVwhDpl0C" },
    ],
    // Verbatim published abstract. Open access (DOAJ).
    abstract: `The main objective of this paper is concentrated on presenting a new two-stage method for
      damage localization and quantification in the linear-shaped structures. A linear-shaped
      structure is defined as a structure in which all elements are arranged only on a straight line.

      At the first stage, by employing Grey System Theory (GST) and diagonal members of the
      Generalized Flexibility Matrix (GFM), a new damage index is suggested for damage localization
      using only the first several modes' data. It is followed by the second stage which is devoted to
      damage quantification in the damaged elements by proposing an optimization-based procedure to
      formulate fault prognosis problem as an inverse problem, and it is solved by the Pattern Search
      Algorithm (PSA) to reach the optimal solution.

      The applicability of the presented method is demonstrated by studying different damage patterns
      on three numerical examples of linear-shaped structures. In addition, the stability of the
      presented method in the presence of random noises is evaluated. The obtained results reveal good
      and acceptable performance of the proposed method for detecting damage in linear-shaped
      structures.`,
    abstractSource: {
      label: "Journal of Rehabilitation in Civil Engineering (via DOAJ)",
      url: "https://doaj.org/article/7dff699120cd4ba3ba2336eb9725b1a9",
    },
  },
  {
    slug: "sipt-multi-agent",
    group: "working",
    title: "Spatial Interaction Pooling Transformer (SIPT) for Multi-Agent Trajectory Prediction in Urban Streetscapes",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang, A. W. Smyth, M. K. Turkcan",
    venues: ["IEEE Transactions on Intelligent Transportation Systems — 2026"],
    status: "review",
    links: [],
    // Under review — no public abstract exists yet. Paste your manuscript's own
    // abstract here (in backticks) once you're comfortable sharing it, and a page
    // will be generated automatically on the next `node build.js`.
    abstract: null,
  },
  {
    slug: "bike-sharing-gcn",
    group: "working",
    title: "Spatial Graph Convolutional Network for Predicting Bike-Sharing Origin–Destination Spatiotemporal Flows",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang, E. I. Kaisar",
    venues: ["SSRN Working Paper No. 5801889 — 2025"],
    status: "preprint",
    links: [
      { label: "SSRN", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5801889" },
      { label: "DOI", url: "https://doi.org/10.2139/ssrn.5801889" },
      { label: "Scholar", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VOvMEmIAAAAJ&citation_for_view=VOvMEmIAAAAJ:IjCSPb-OGe4C" },
    ],
    // SSRN blocks automated retrieval, so the abstract could not be verified.
    // Copy it from your own SSRN listing and paste it here.
    abstract: null,
  },
  {
    slug: "hurricane-wind-voxel",
    group: "working",
    title: "What Simplified City Models Miss: Hurricane Pedestrian Wind Hazard from Voxelized Photorealistic Urban Geometry",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
    venues: ["In preparation — 2026"],
    status: "prep",
    links: [],
    // In preparation — nothing published to quote yet.
    abstract: null,
  },
];

/* The publication sections, in the order they appear on the page.
   Same split, same names as the CV. */
const pubSections = [
  { key: "peer-reviewed", title: "Publications", short: "Publications" },
  { key: "working", title: "Working Papers &amp; Under Review", short: "Working Papers" },
];

/* Talks and posters — kept apart from the publication list, as in the CV.
   type -> which section it belongs to, keyed to talkSections below.         */
const presentations = [
  {
    type: "conference",
    title: "Spatial Graph Convolutional Network for Predicting Bike-Sharing Origin–Destination Spatiotemporal Flows",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang, E. I. Kaisar",
    venue: "105th Transportation Research Board (TRB) Annual Meeting, Washington, DC",
    date: "Jan. 2026",
    note: "Poster presentation",
  },
  {
    type: "workshop",
    title: "Predicting the Crowd: Spatially-Informed Transformers for Urban Traffic Agents",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
    venue: "CS3 NSF Renewal Site Visit, Columbia Engineering Innovation Hub — CS3 HQ, New York, NY",
    date: "May 2026",
    note: "Poster presentation",
  },
  {
    type: "workshop",
    title: "Voxelized High-Fidelity 3D Models for City-scale Wind Simulations",
    authors: "D. K. Smith, <strong>M. Jafarian Abyaneh</strong>, J. Jang",
    venue: "CS3 NSF Renewal Site Visit, Columbia Engineering Innovation Hub — CS3 HQ, New York, NY",
    date: "May 2026",
    note: "Poster presentation",
  },
  {
    type: "workshop",
    title: "Context-Aware Deep Learning for Predicting Pedestrian and Vehicle Movement Patterns in Urban Traffic Scenarios",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
    venue: "8th Annual Celebration of Academic Excellence, College of Engineering and Computer Science, Florida Atlantic University, Boca Raton, FL",
    date: "Mar. 2026",
    note: "Poster presentation",
  },
  {
    type: "workshop",
    title: "Testing the Accuracy of Urban 3D Models With Airflow Simulations",
    authors: "D. K. Smith, <strong>M. Jafarian Abyaneh</strong>, J. Jang",
    venue: "Florida Undergraduate Research Conference (FURC), University of North Florida, Jacksonville, FL",
    date: "Mar. 2026",
    note: "Poster presentation",
  },
  {
    type: "workshop",
    title: "Spatial Interaction Pooling Transformer (SIPT) for Multi-Agent Trajectory Prediction",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
    venue: "CS3 Innovation Summit, Columbia University, New York, NY",
    date: "Feb. 2026",
    note: "Perfect Pitch Competition, 90-second research talk &amp; poster presentation",
  },
  {
    type: "workshop",
    title: "Automated Voxelization Pipeline for High-Fidelity Urban Digital Twins",
    authors: "D. K. Smith, J. Lalla, <strong>M. Jafarian Abyaneh</strong>, J. Jang",
    venue: "CS3 Innovation Summit, Columbia University, New York, NY",
    date: "Feb. 2026",
    note: "Poster presentation",
  },
];

const talkSections = [
  { key: "conference", title: "Conference Presentations", short: "Conference" },
  { key: "workshop", title: "Workshop Presentations", short: "Workshop" },
];

/* News is for things that are not already listed elsewhere on the page, or that
   a reader would want dated. Poster sessions live under Presentations; repeating
   them here only pushed the papers further down the page. */
const news = [
  { date: "2026-02-01", text: `Competed in the <strong>Perfect Pitch Competition</strong> and presented SIPT at the <strong>CS3 Innovation Summit</strong>, Columbia University.` },
  { date: "2026-01-15", text: `Began mentoring 12 undergraduates across two groups in FAU's <strong>Vertically Integrated Projects</strong> program.` },
  { date: "2026-01-10", text: `Presented bike-sharing O–D flow prediction at the <strong>TRB 105th Annual Meeting</strong>, Washington, DC.` },
  { date: "2026-01-05", text: `Awarded the <strong>ASCE Palm Beach Branch Scholarship</strong>.` },
  { date: "2025-12-01", text: `Paper <em>Transformer-Based Trajectory Prediction Using LiDAR Data</em> published in <strong>IEEE OJ-ITS</strong>.` },
  { date: "2024-08-01", text: `Started my PhD at <strong>Florida Atlantic University</strong> in the I-SENSE Lab.` },
];

/* ---- Selected research -------------------------------------------------
   The part of the page a stranger actually looks at. One entry per line of
   work, in plain language, with a picture where there is one to show.

   RULE FOR FIGURES: a figure goes here only if the paper it comes from is
   already public — published open access, or posted as a preprint. Nothing
   from a manuscript under review or in preparation, however good it looks.
   When one of those becomes public, add its `image` block and rebuild.       */
const research = [
  {
    id: "lidar-transformer",
    title: "Predicting where people and cars go next, from raw LiDAR",
    status: "published",
    body: `A Transformer trained on 12,390+ real trajectories — vehicles, pedestrians and
      cyclists — recorded with an Ouster OS1 LiDAR at a busy intersection in West Palm Beach.
      It forecasts each agent's next positions 15.24% more accurately than an LSTM baseline
      and converges faster. The whole pipeline runs from point cloud to geo-referenced
      prediction: object detection, curation of reflections and near-stationary tracks,
      then the sequence model.`,
    image: {
      src: "assets/img/lidar-trajectory-prediction.jpg",
      width: 1200,
      height: 618,
      alt: "Aerial map of Clematis Street, West Palm Beach, with a pedestrian's observed path, the ground-truth continuation, and the Transformer and LSTM predicted paths drawn as coloured tracks.",
      caption: `Observed path, ground truth, and Transformer vs. LSTM predictions for one
        pedestrian outside the Mandel Public Library. Figure from the paper, published open
        access in <em>IEEE OJ-ITS</em> (CC BY).`,
    },
    links: [
      { label: "Paper", url: "https://doi.org/10.1109/OJITS.2025.3640002" },
      { label: "Code", url: "https://github.com/mojtaba-ja/transformer-eth-wpbl" },
      { label: "Abstract", url: "pub/lidar-transformer-ojits/" },
    ],
  },
  {
    id: "sipt",
    title: "SIPT: giving a Transformer a sense of the crowd",
    status: "review",
    body: `Multi-agent prediction has to model how road users react to one another, not just
      where each of them has been. SIPT pools the neighbours inside a learned spatial radius
      before attention, so every forecast is conditioned on the crowd immediately around that
      agent. Evaluated on 64,000+ trajectories from the COSMOS instrumented intersection in
      New York.`,
    // Under review at IEEE T-ITS — no figures until the paper is public.
    stats: [
      { value: "0.76 m", label: "Average displacement error" },
      { value: "26.2%", label: "Better than Social LSTM" },
      { value: "64,000+", label: "Trajectories evaluated" },
    ],
    links: [],
  },
  {
    id: "bike-od",
    title: "Forecasting bike-share demand a year ahead",
    status: "preprint",
    body: `Cyclist risk concentrates where riding concentrates, but the exposure estimates that
      would justify protective infrastructure usually arrive after the fact. This work predicts
      station-to-station demand a year out with a spatial graph convolutional network, using
      only public data — trip records, census, OpenStreetMap — so an agency without a data
      budget can run it. Because predicted flow approximates exposure, the forecasts point to
      the corridors and hours where protection would do the most good.`,
    image: {
      src: "assets/img/bikeshare-od-flows.jpg",
      width: 1200,
      height: 854,
      alt: "Map of Jersey City and Hoboken with curved lines between bike-share stations, thickness and colour showing the strength of morning-peak origin–destination flows.",
      caption: `Morning-peak origin–destination flows across the Jersey City Citi Bike network,
        with stations coloured by land-use zone.`,
    },
    links: [
      { label: "SSRN preprint", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5801889" },
    ],
  },
  {
    id: "urban-wind",
    title: "How much building detail does a hurricane wind map need?",
    status: "prep",
    body: `City-scale pedestrian wind studies mostly use flat-topped OpenStreetMap blocks, because
      that is the geometry that is easy to get. We built a pipeline that turns Google's
      photogrammetric 3D city tiles — geometrically rich, but riddled with the holes and overlaps
      typical of automated reconstruction — into watertight solids a CFD solver can use, then ran
      both geometries over the same Miami high-rise corridor under Category 5 forcing. The simple
      model concentrates fast air into sharp corner jets that the detailed geometry spreads out;
      how much that changes the hazard map depends on the inflow profile you pair it with.`,
    links: [
      { label: "FluidX3D guide", url: "https://github.com/mojtaba-ja/fluidx3d-wind-simulation-guide" },
    ],
  },
];

/* Public repositories worth a stranger's click. */
const code = [
  {
    name: "transformer-eth-wpbl",
    url: "https://github.com/mojtaba-ja/transformer-eth-wpbl",
    lang: "Python",
    detail: "PyTorch framework comparing LSTM and Transformer models for multi-agent trajectory prediction on LiDAR data and the ETH/UCY benchmarks — the code behind the IEEE OJ-ITS paper.",
  },
  {
    name: "fluidx3d-wind-simulation-guide",
    url: "https://github.com/mojtaba-ja/fluidx3d-wind-simulation-guide",
    lang: "Typst",
    detail: "A practical guide to running FluidX3D lattice-Boltzmann wind simulations over urban geometry.",
  },
  {
    name: "beam-segmentation-dataset-pipeline",
    url: "https://github.com/mojtaba-ja/beam-segmentation-dataset-pipeline",
    lang: "Python",
    detail: "Computer-vision pipeline that turns structural beam experiment photos into annotated ML datasets — calibration, segmentation export, perspective correction.",
  },
  {
    name: "interactive-2d-beam-solver",
    url: "https://github.com/mojtaba-ja/interactive-2d-beam-solver",
    lang: "JavaScript",
    detail: "Shear, moment and deflection diagrams for beams, in one dependency-free HTML file.",
  },
];

const experience = [
  {
    role: "Doctoral Research Assistant",
    org: "Florida Atlantic University — I-SENSE Lab",
    location: "Boca Raton, FL",
    dates: "Aug. 2024 – Present",
    points: [
      "Developed <strong>SIPT</strong> for multi-agent trajectory prediction: ADE 0.76 m, 26.2% better than Social LSTM on 64,000+ COSMOS trajectories.",
      "Built a Transformer model for LiDAR-based trajectory prediction with 15.24%/13.88% ADE gains over LSTM, published in <em>IEEE OJ-ITS</em>.",
      "Manage the NIH longitudinal dataset (R01AG068472): multi-sensor data and cognitive assessments from 750 older drivers across 12 waves over 3 years.",
      "Run OpenFOAM CFD simulations on HPC for hurricane wind-load analysis of downtown Miami, assessing pedestrian comfort and street-level wind conditions.",
    ],
  },
  {
    role: "Graduate Research Mentor",
    org: "Vertically Integrated Projects (VIP) Program, FAU",
    location: "Boca Raton, FL",
    dates: "Jan. 2026 – Present",
    points: [
      "Oversee 12 undergraduates across two groups (Environment &amp; Sustainability; Safety &amp; Security) on AI-driven smart sensor applications for coastal resilience.",
    ],
  },
  {
    role: "Data Analyst",
    org: "Freelance",
    location: "Fredericton, NB, Canada",
    dates: "Nov. 2022 – Jul. 2024",
    points: [
      "Analyzed import/export data for trade compliance and logistics optimization; built import-volume forecasting models and Tableau dashboards for small and medium-sized businesses.",
    ],
  },
  {
    role: "Graduate Research Assistant",
    org: "University of New Brunswick",
    location: "Fredericton, NB, Canada",
    dates: "Sep. 2018 – Oct. 2020",
    points: [
      "Modeled reinforced concrete beams under sustained and cyclic loading in ABAQUS (concrete damage plasticity); conducted accelerometer-based vibration testing.",
      "Evaluated long-term deflection, natural frequencies and mode shapes against ACI 318-19 and CSA A23.3 effective moment of inertia formulations.",
    ],
  },
  {
    role: "Graduate Research Assistant",
    org: "Iran University of Science and Technology",
    location: "Tehran, Iran",
    dates: "Sep. 2014 – Apr. 2017",
    points: [
      "Investigated structural health monitoring and damage detection via optimization-based algorithms (grey wolf optimization, genetic algorithm) for civil infrastructure assessment.",
    ],
  },
];

const education = [
  { degree: "Ph.D. in Transportation and Environmental Engineering", school: "Florida Atlantic University", dates: "2024 – Present", note: "GPA 4.0/4.0 · Advisor: Dr. Jinwoo Jang" },
  { degree: "M.Sc. in Civil Engineering", school: "University of New Brunswick", dates: "2018 – 2020", note: `Thesis: <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VOvMEmIAAAAJ&citation_for_view=VOvMEmIAAAAJ:UeHWp8X0CEIC" target="_blank" rel="noopener">Vibration testing of cracked reinforced concrete beams under sustained load</a>` },
  { degree: "M.Sc. in Civil/Earthquake Engineering", school: "Iran University of Science and Technology", dates: "2014 – 2017", note: "Thesis: Structural damage detection via finite element model updating" },
  { degree: "B.Sc. in Civil Engineering", school: "Iran University of Science and Technology", dates: "2010 – 2014", note: "" },
];

const awards = [
  "ASCE Palm Beach Branch Scholarship (2026) — $1,000 competitive award",
  "Esterbauer Civil Engineering Graduate Award, University of New Brunswick (2018–2020)",
  "New Brunswick Innovation Foundation (NBIF) Graduate Award (2018–2019)",
];

const funding = [
  "<strong>NSF</strong> Engineering Research Center for Smart Streetscapes (CS3), Award No. EEC-2133516 — Graduate Researcher",
  "<strong>NIH</strong> In-Vehicle Sensors to Detect Cognitive Change in Older Drivers, Award No. R01AG068472 — Graduate Researcher",
  "<strong>FAU</strong> Vertically Integrated Projects: Smart Sensors and AI for Coastal Destination Resilience — Graduate Research Mentor",
];

/* Undergraduates I mentor, grouped by the program that funds the work —
   the same split the CV uses. For the VIP teams the "name" is the team and the
   detail is its roster, which keeps eleven students to two readable lines. */
const mentoring = [
  {
    program: "NSF CS3 (EEC-2133516) — Digital Twins for Smart Streetscapes, FAU",
    dates: "Jan. 2026 – Present",
    entries: [
      { name: "Dana K. Smith", detail: "Civil Eng., FAU — voxelization &amp; CFD-ready digital twin pipelines" },
      { name: "Jonathan Lalla", detail: "CS, FAU — voxelization &amp; CFD-ready digital twin pipelines" },
      { name: "Cyrus Khan", detail: "CS, UC Riverside (NSF REU) — GPS-to-behavior-metric pipeline, Fast Map Matching" },
      { name: "Vedant Sundriyal", detail: `CS, Lehman College (NSF REU) — QuASAR: watertight 3D city reconstruction (<a href="https://github.com/Vedant-Sundriyal/quasar-urban-geometry-reconstruction" target="_blank" rel="noopener">GitHub</a>)` },
    ],
  },
  {
    program: "FAU VIP Program — Smart Sensors and AI for Coastal Destination Resilience",
    dates: "Jan. 2026 – Present",
    entries: [
      { name: "Environment &amp; Sustainability", detail: "Dana K. Smith, Iris York, Felicia Phan, James Kane, Dana Urbano Prieto, Sammie Chamberlain (FAU)" },
      { name: "Safety &amp; Security", detail: "Jonathan Lalla, Mykyta Garkusha, Mohammed Mered, Howard Lowe, Nicolette Madrazo (FAU)" },
    ],
  },
];

/* Teaching gets its own section rather than a bullet inside Experience: for a
   faculty reader it is a category they look for, and it is invisible when it is
   folded into a research role's job title. */
const teaching = [
  {
    role: "Graduate Teaching Assistant",
    org: "University of New Brunswick",
    location: "Fredericton, NB, Canada",
    dates: "Jan. 2019 – Apr. 2020",
    points: [
      "<strong>Mechanics of Materials Experimental Lab</strong> (Jan.–Apr. 2019; Sep.–Dec. 2019) — ran lab sections on tensile, compression and torsion testing; responsible for lab safety and for the quality of the data students collected.",
      "<strong>Statics Computational Lab</strong> (Jan.–Apr. 2020) — taught computational methods for force analysis, moment calculation and structural equilibrium.",
    ],
  },
];

/* Kept short on purpose. Membership is a small signal, but it is the expected
   one on the licensure track, and ASCE is where the Palm Beach Branch
   scholarship came from. */
const affiliations = [
  "Institute of Electrical and Electronics Engineers (IEEE), Member",
  "American Society of Civil Engineers (ASCE), Member",
];

const skills = [
  { group: "Programming &amp; Tools", items: "Python, MATLAB, LaTeX, Typst, Git, Tableau" },
  { group: "AI &amp; Machine Learning", items: "PyTorch, TensorFlow, Keras, Transformers, Spatial GNNs, Computer Vision, LiDAR Processing" },
  { group: "Data Science", items: "Pandas, NumPy, Scikit-learn, ArcGIS, GeoPandas, Statistical Analysis" },
  { group: "Engineering Software", items: "OpenFOAM (HPC), ABAQUS, ParaView, SAP2000, ETABS, Civil 3D, Synchro, AutoCAD" },
];
