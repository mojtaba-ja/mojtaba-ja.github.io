/* ============================================================
   SITE CONTENT — this is the only file you normally edit.
   Add a publication, a news item, an award: edit the arrays below.
   No build step. Save the file, refresh the browser, done.
   ============================================================ */

const profile = {
  name: "Mojtaba Jafarian Abyaneh",
  title: "PhD Candidate, Transportation Engineering",
  image: "assets/profile.jpg",
  bio: `I am a PhD candidate and Graduate Research Assistant at
        <strong>Florida Atlantic University</strong>, working in the
        <a href="https://www.fau.edu/smart/" target="_blank" rel="noopener">I-SENSE Lab</a>
        with Prof. Jinwoo Jang. I hold an M.Sc. in Civil Engineering from the
        University of New Brunswick and an M.Sc. in Earthquake Engineering from the
        Iran University of Science and Technology.`,
  research: `My research applies deep learning to intelligent transportation systems —
        Transformer-based multi-agent trajectory prediction for pedestrians, vehicles, and
        cyclists from real-world LiDAR data, spatial graph neural networks for mobility flow,
        and urban digital twins for city-scale wind simulation. My work is funded by the
        <strong>NSF</strong> (Center for Smart Streetscapes, EEC-2133516) and the
        <strong>NIH</strong> (R01AG068472).`,
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
   status        -> colored badge: "published" | "review" | "preprint" | "prep"
   slug          -> the permalink, e.g. /pub/sipt-multi-agent/
   abstract      -> VERBATIM published abstract, or null.
                    null means no detail page is generated for this paper.
                    NEVER paraphrase here — paste the real text or leave it null.
   abstractSource-> where the abstract text came from, shown as attribution.   */
const publications = [
  {
    slug: "sipt-multi-agent",
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
    slug: "lidar-transformer-ojits",
    title: "Transformer-Based Trajectory Prediction Using LiDAR Data for Situational Awareness in Complex Urban Environments",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
    venues: ["IEEE Open Journal of Intelligent Transportation Systems, Vol. 7, pp. 16–28 — 2026"],
    status: "published",
    note: "Impact Factor: 6.007",
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
    slug: "bike-sharing-gcn",
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
    title: "What Simplified City Models Miss: Hurricane Pedestrian Wind Hazard from Voxelized Photorealistic Urban Geometry",
    authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
    venues: ["In preparation — 2026"],
    status: "prep",
    links: [],
    // In preparation — nothing published to quote yet.
    abstract: null,
  },
  {
    slug: "modal-residual-gwo",
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
    slug: "unb-vibration-thesis",
    title: "Vibration testing of cracked reinforced concrete beams under sustained load",
    authors: "<strong>M. Jafarian Abyaneh</strong>",
    venues: ["M.Sc. Thesis, University of New Brunswick — 2020"],
    status: "published",
    links: [
      { label: "Scholar", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VOvMEmIAAAAJ&citation_for_view=VOvMEmIAAAAJ:UeHWp8X0CEIC" },
    ],
    // Thesis abstract not retrievable from the UNB repository. Paste your own here.
    abstract: null,
  },
  {
    slug: "model-updating-frames",
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
    title: "A new two-stage method for damage identification in linear-shaped structures via Grey System Theory and optimization algorithm",
    authors: "G. Ghodrati Amiri, A. Zare Hosseinzadeh, <strong>M. Jafarian Abyaneh</strong>",
    venues: ["Journal of Rehabilitation in Civil Engineering, Vol. 3, No. 2, pp. 36–50 — 2015"],
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
];

const news = [
  { date: "2026-05-01", text: `Presented <em>Predicting the Crowd: Spatially-Informed Transformers for Urban Traffic Agents</em> at the <strong>CS3 NSF Renewal Site Visit</strong>, Columbia Engineering Innovation Hub, New York, NY.` },
  { date: "2026-03-01", text: `Presented at the <strong>8th Annual Celebration of Academic Excellence</strong>, FAU College of Engineering and Computer Science.` },
  { date: "2026-02-01", text: `Competed in the <strong>Perfect Pitch Competition</strong> and presented SIPT at the <strong>CS3 Innovation Summit</strong>, Columbia University.` },
  { date: "2026-01-15", text: `Began mentoring 12 undergraduates across two groups in FAU's <strong>Vertically Integrated Projects</strong> program.` },
  { date: "2026-01-10", text: `Presented bike-sharing O–D flow prediction at the <strong>TRB 105th Annual Meeting</strong>, Washington, DC.` },
  { date: "2026-01-05", text: `Awarded the <strong>ASCE Palm Beach Branch Scholarship</strong>.` },
  { date: "2025-12-01", text: `Paper <em>Transformer-Based Trajectory Prediction Using LiDAR Data</em> published in <strong>IEEE OJ-ITS</strong>.` },
  { date: "2024-08-01", text: `Started my PhD at <strong>Florida Atlantic University</strong> in the I-SENSE Lab.` },
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
    role: "Graduate Research &amp; Teaching Assistant",
    org: "University of New Brunswick",
    location: "Fredericton, NB, Canada",
    dates: "Sep. 2018 – Oct. 2020",
    points: [
      "Modeled reinforced concrete beams under sustained and cyclic loading in ABAQUS; conducted accelerometer-based vibration testing.",
      "Taught the Mechanics of Materials Experimental Lab and the Statics Computational Lab.",
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
  { degree: "M.Sc. in Civil Engineering", school: "University of New Brunswick", dates: "2018 – 2020", note: "Thesis: Vibration testing of cracked reinforced concrete beams under sustained load" },
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
  "<strong>NIH</strong> In-Vehicle Sensors to Detect Cognitive Change in Older Drivers, Award No. 1R01AG068472-01 — Graduate Researcher",
  "<strong>FAU</strong> Vertically Integrated Projects: Smart Sensors and AI for Coastal Destination Resilience — Graduate Research Mentor",
];

const mentoring = [
  { name: "Dana K. Smith", detail: "Civil Eng., FAU — voxelization &amp; CFD-ready digital twin pipelines" },
  { name: "Jonathan Lalla", detail: "CS, FAU — voxelization &amp; CFD-ready digital twin pipelines" },
  { name: "Cyrus Khan", detail: "CS, UC Riverside (NSF REU) — GPS-to-behavior-metric pipeline, Fast Map Matching" },
  { name: "Vedant Sundriyal", detail: `CS, Lehman College (NSF REU) — QuASAR: watertight 3D city reconstruction (<a href="https://github.com/Vedant-Sundriyal/quasar-urban-geometry-reconstruction" target="_blank" rel="noopener">GitHub</a>)` },
];

const skills = [
  { group: "Programming &amp; Tools", items: "Python, MATLAB, LaTeX, Typst, Git, Tableau" },
  { group: "AI &amp; Machine Learning", items: "PyTorch, TensorFlow, Keras, Transformers, Spatial GNNs, Computer Vision, LiDAR Processing" },
  { group: "Data Science", items: "Pandas, NumPy, Scikit-learn, ArcGIS, GeoPandas, Statistical Analysis" },
  { group: "Engineering Software", items: "OpenFOAM (HPC), ABAQUS, ParaView, SAP2000, ETABS, Civil 3D, Synchro, AutoCAD" },
];
