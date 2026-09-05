/* ============================================================
   BUILD SCRIPT  —  run:  node build.js

   Reads assets/data.js and writes real, static HTML files:
     index.html               the homepage
     pub/<slug>/index.html    one indexable page per publication
     sitemap.xml              the list of URLs for Google

   Why this exists: search engines and link previewers (LinkedIn, X,
   Slack) do not reliably run JavaScript. Pre-rendering means your
   name and your papers are in the HTML itself, so they get indexed.

   You edit assets/data.js, then run `node build.js`, then push.
   ============================================================ */

const fs = require("fs");
const path = require("path");

/* ---- CHANGE THIS if you buy a custom domain --------------- */
const SITE_URL = "https://mojtaba-ja.github.io";
/* e.g. "https://mojtabajafarian.com"  — no trailing slash     */

const ORCID = "https://orcid.org/0009-0006-0556-5520"; // paste your ORCID URL once you have one, e.g. "https://orcid.org/0000-0002-..."

/* ---- Search engine site verification ----------------------
   Google Search Console → Add property → URL prefix → HTML tag.
   It shows: <meta name="google-site-verification" content="XXXX" />
   Paste ONLY the XXXX part below, rebuild, push, then click Verify.
   Bing Webmaster Tools works the same way (or just import from Google). */
const GOOGLE_SITE_VERIFICATION = "B2QqojRW1LKfEUjStZuc9L0hT_cprjbRgYsFQrWjpzM";
const BING_SITE_VERIFICATION = "AF2042ABB00E720DFEB8D8479C84F0A4";

/* ---- Cache busting ----------------------------------------
   Browsers cache CSS and JS hard. Without this, editing style.css and
   pushing leaves visitors — and you — looking at the old design until the
   cache expires. Appending a hash of the file's own contents means the URL
   changes only when the file changes, so updates appear immediately and
   unchanged files stay cached. */
const crypto = require("crypto");
const assetHash = (rel) => {
  try {
    const buf = fs.readFileSync(path.join(__dirname, rel));
    return crypto.createHash("sha1").update(buf).digest("hex").slice(0, 8);
  } catch {
    return "0";
  }
};
const CSS_V = assetHash("assets/style.css");
const JS_V = assetHash("assets/site.js");

/* ---- Load data.js as the single source of truth ----------- */
const src = fs.readFileSync(path.join(__dirname, "assets", "data.js"), "utf8");
const load = new Function(
  src +
    "\nreturn {profile,links,interests,publications,pubSections,presentations,talkSections," +
    "research,code,news,experience,teaching,education,awards,funding,mentoring," +
    "affiliations,skills};"
);
const D = load();

/* ---- Helpers ---------------------------------------------- */
const stripTags = (s) => String(s).replace(/<[^>]*>/g, "");
// JSON-LD holds plain text, not HTML — turn &amp; back into & etc.
const unescapeHtml = (s) =>
  String(s)
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—")
    .replace(/&middot;/g, "·")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const collapse = (s) => unescapeHtml(stripTags(s)).replace(/\s+/g, " ").trim();
const attr = (s) =>
  collapse(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const BADGE_LABEL = {
  published: "Published",
  review: "Under Review",
  preprint: "Preprint",
  prep: "In Prep",
};

const badge = (status) =>
  status && BADGE_LABEL[status]
    ? `<span class="badge badge-${status}">${BADGE_LABEL[status]}</span>`
    : "";

const fmtDate = (iso) => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};

const paragraphs = (text) =>
  String(text)
    .split(/\n\s*\n/)
    .map((p) => p.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .map((p) => `<p>${p}</p>`)
    .join("");

/* ---- Section renderers ------------------------------------ */
function masthead(base) {
  const linkHtml = D.links
    .map((l, i) => {
      const isFile = l.url.startsWith("assets/");
      const url = isFile ? base + l.url : l.url;
      const external = !l.url.startsWith("mailto:") && !isFile;
      const attrs = external ? ` target="_blank" rel="noopener noreferrer"` : "";
      const sep = i < D.links.length - 1 ? `<span class="sep"> &middot; </span>` : "";
      return `<a href="${url}"${attrs}>${l.name}</a>${sep}`;
    })
    .join("");

  return `
    <header class="masthead">
      <img class="avatar" src="${base}${D.profile.image}" alt="${attr(D.profile.name)}" width="240" height="360">
      <div class="identity">
        <h1>${D.profile.name}</h1>
        <div class="subtitle">${D.profile.title}${
          D.profile.location ? ` <span class="sep">&middot;</span> ${D.profile.location}` : ""
        }</div>
        <p>${D.profile.bio}</p>
        <p>${D.profile.research}</p>
        <div class="linkrow">${linkHtml}</div>
      </div>
    </header>`;
}

/* Each renderer below returns only what goes INSIDE a section. The section
   wrapper, its id and its <h2> are added once, in homeSections(), so the jump
   nav and the page can never drift apart. */
const interests = () =>
  `<div class="tags">${D.interests.map((i) => `<span class="tag">${i}</span>`).join("")}</div>`;

/* A paper gets its own page only when it has a real abstract to show. */
const hasPage = (p) => Boolean(p.abstract && String(p.abstract).trim());

function pubItem(p, base) {
  const href = `${base}pub/${p.slug}/`;
  const parts = (p.links || []).map(
    (l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`
  );
  if (hasPage(p)) parts.push(`<a href="${href}">Abstract</a>`);

  // Only link the title somewhere real: our page, else the first external link.
  const titleHtml = hasPage(p)
    ? `<a href="${href}">${p.title}</a>`
    : p.links && p.links.length
    ? `<a href="${p.links[0].url}" target="_blank" rel="noopener noreferrer">${p.title}</a>`
    : p.title;

  const note = p.note ? ` <span class="muted">(${p.note})</span>` : "";
  const linkLine = parts.length
    ? `<div class="pub-links">${parts.join(`<span class="sep"> &middot; </span>`)}</div>`
    : "";

  return `
        <li>
          <div class="pub-title">${titleHtml}${badge(p.status)}</div>
          <div class="pub-authors">${p.authors}</div>
          <div class="pub-venue">${p.venues.join(" &middot; ")}${note}</div>
          ${linkLine}
        </li>`;
}

/* One list per group, in the order pubSections gives them, so the page reads
   the way the CV does instead of as one undifferentiated pile. */
const pubList = (key, base) => {
  const items = D.publications.filter((p) => p.group === key);
  return items.length ? `<ul class="pubs">${items.map((p) => pubItem(p, base)).join("")}</ul>` : "";
};

/* Talks and posters. Same shape as the papers, minus links and badges —
   these are events, not artifacts anyone can download. */
const talkList = (key) => {
  const items = D.presentations.filter((t) => t.type === key);
  if (!items.length) return "";
  const li = items
    .map(
      (t) => `
        <li>
          <div class="pub-title">${t.title}</div>
          <div class="pub-authors">${t.authors}</div>
          <div class="pub-venue">${t.venue} &middot; ${t.date}${
            t.note ? ` <span class="muted">(${t.note})</span>` : ""
          }</div>
        </li>`
    )
    .join("");
  return `<ul class="pubs">${li}</ul>`;
};

const news = () => {
  const items = [...D.news]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(
      (n) =>
        `<li><span class="when">${fmtDate(n.date)}</span><span class="what">${n.text}</span></li>`
    )
    .join("");
  return `<ul class="news">${items}</ul>`;
};

/* Dated role blocks — Experience and Teaching are the same shape. */
const roles = (items) =>
  items
    .map(
      (e) => `
      <div class="entry">
        <div class="entry-head">
          <span class="entry-role">${e.role}</span>
          <span class="entry-when">${e.dates}</span>
        </div>
        <div class="entry-org">${e.org} &middot; ${e.location}</div>
        <ul>${e.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>`
    )
    .join("");

const experience = () => roles(D.experience);
const teaching = () => roles(D.teaching);

const education = () =>
  D.education
    .map(
      (e) => `
      <div class="entry">
        <div class="entry-head">
          <span class="entry-role">${e.degree}</span>
          <span class="entry-when">${e.dates}</span>
        </div>
        <div class="entry-org">${e.school}${e.note ? " &middot; " + e.note : ""}</div>
      </div>`
    )
    .join("");

/* Mentees grouped under the program that funds them, so a reader can tell the
   NSF REU students from the VIP teams at a glance. */
const mentoring = () =>
  D.mentoring
    .map(
      (g) => `
      <div class="entry">
        <div class="entry-head">
          <span class="entry-role">${g.program}</span>
          <span class="entry-when">${g.dates}</span>
        </div>
        <ul>${g.entries
          .map((m) => `<li><strong>${m.name}</strong> &mdash; ${m.detail}</li>`)
          .join("")}</ul>
      </div>`
    )
    .join("");

const list = (arr) => `<ul>${arr.map((x) => `<li>${x}</li>`).join("")}</ul>`;

const skills = () =>
  D.skills
    .map(
      (s) =>
        `<div class="skill-row"><span class="skill-group">${s.group}:</span> ${s.items}</div>`
    )
    .join("");

/* Section ids come from the nav label, so the URL of an anchor reads the way
   the link does: #working-papers, not #working. */
const slugId = (label) =>
  collapse(label).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* Selected research. Each entry is a figure (when the work is public), a short
   plain-language paragraph, and links. Entries with neither figure nor stats
   still read correctly — the figure block is simply absent. */
const researchLinks = (r, base) =>
  (r.links || []).length
    ? `<div class="pub-links">${r.links
        .map((l) => {
          const internal = !/^https?:/.test(l.url);
          const href = internal ? base + l.url : l.url;
          const attrs = internal ? "" : ` target="_blank" rel="noopener noreferrer"`;
          return `<a href="${href}"${attrs}>${l.label}</a>`;
        })
        .join(`<span class="sep"> &middot; </span>`)}</div>`
    : "";

/* Three headline numbers, for the project that has results but no public figure.
   Plain text in the page's own ink — a number is not a series, so it gets no
   colour of its own. */
const statRow = (stats) =>
  `<div class="stats">${stats
    .map(
      (t) =>
        `<div class="stat"><div class="stat-value">${t.value}</div><div class="stat-label">${t.label}</div></div>`
    )
    .join("")}</div>`;

const researchList = (base) =>
  D.research
    .map((r) => {
      const fig = r.image
        ? `<figure class="fig">
          <img src="${base}${r.image.src}" alt="${attr(r.image.alt)}" width="${r.image.width}" height="${r.image.height}" loading="lazy" decoding="async">
          <figcaption>${r.image.caption}</figcaption>
        </figure>`
        : "";
      return `
      <article class="project">
        <h3>${r.title}${badge(r.status)}</h3>
        ${fig}
        <p>${collapse(r.body)}</p>
        ${r.stats ? statRow(r.stats) : ""}
        ${researchLinks(r, base)}
      </article>`;
    })
    .join("");

/* Public repositories. Kept terse: a name, what it is, what it is written in. */
const codeList = () =>
  `<ul class="repos">${D.code
    .map(
      (c) => `
        <li>
          <div class="pub-title"><a href="${c.url}" target="_blank" rel="noopener noreferrer">${c.name}</a></div>
          <div class="pub-authors">${c.detail}</div>
          <div class="pub-venue">${c.lang}</div>
        </li>`
    )
    .join("")}</ul>`;

/* ---- The page, as one ordered list of sections -------------
   Ordered for a stranger arriving from a search, not for a CV reader: what is
   he doing now (News), what does the work look like (Selected Research, with
   figures), what has it produced (Publications, Code), and only then who he is
   (Education, Experience) and the supporting record. Talks sit below Experience
   on purpose — one TRB paper and six posters should not outrank the papers.
   `short` is the label used in the jump nav. */
function homeSections(base) {
  const out = [];
  const add = (id, title, inner, short) => {
    if (inner) out.push({ id, title, inner, short: short || title });
  };

  add("news", "News", news());
  add("interests", "Research Interests", interests(), "Interests");
  add("research", "Selected Research", researchList(base), "Research");
  D.pubSections.forEach((g) => add(slugId(g.short), g.title, pubList(g.key, base), g.short));
  add("code", "Code", codeList());
  add("education", "Education", education());
  add("experience", "Experience", experience());
  add("teaching", "Teaching", teaching());
  D.talkSections.forEach((g) => add(slugId(g.short), g.title, talkList(g.key), g.short));
  add("funding", "Research Funding", list(D.funding), "Funding");
  add("mentoring", "Mentoring", mentoring());
  add("awards", "Awards", list(D.awards));
  add("affiliations", "Professional Affiliations", list(D.affiliations), "Affiliations");
  add("skills", "Technical Skills", skills(), "Skills");

  return out;
}

/* One row of jump links. The page is long enough now that landing on it with
   no map is a worse experience than the extra row costs. */
const sectionNav = (sections) =>
  `<nav class="sectionnav" aria-label="Sections">${sections
    .map((x) => `<a href="#${x.id}">${x.short}</a>`)
    .join(`<span class="sep"> &middot; </span>`)}</nav>`;

const sectionHtml = (x) =>
  `<section id="${x.id}"><h2>${x.title}</h2>${x.inner}</section>`;

const footer = () =>
  `<footer>&copy; ${new Date().getFullYear()} ${D.profile.name}. Built with plain HTML, CSS, and JavaScript.</footer>`;

/* ---- Structured data: tells Google you are a person -------- */
function personJsonLd() {
  // De-duplicated: ORCID appears both in the links row and in the constant.
  const sameAs = [
    ...new Set([...D.links.filter((l) => /^https?:/.test(l.url)).map((l) => l.url), ORCID]),
  ].filter(Boolean);

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: D.profile.name,
      alternateName: ["Mojtaba Jafarian", "M. Jafarian Abyaneh"],
      url: SITE_URL + "/",
      image: SITE_URL + "/" + D.profile.image,
      jobTitle: D.profile.title,
      ...(D.profile.location
        ? { homeLocation: { "@type": "Place", name: D.profile.location } }
        : {}),
      description: collapse(D.profile.bio),
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Florida Atlantic University",
        url: "https://www.fau.edu/",
      },
      // Past institutions only, de-duplicated — the current one is `affiliation`.
      alumniOf: [...new Set(D.education.map((e) => e.school))]
        .filter((s) => s !== "Florida Atlantic University")
        .map((name) => ({ "@type": "CollegeOrUniversity", name })),
      knowsAbout: D.interests.map(collapse),
      sameAs,
    },
    null,
    2
  );
}

function articleJsonLd(p) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: collapse(p.title),
      author: collapse(p.authors)
        .split(",")
        .map((a) => ({ "@type": "Person", name: a.trim() })),
      publisher: collapse(p.venues[0]),
      abstract: collapse(p.abstract).slice(0, 500),
      url: `${SITE_URL}/pub/${p.slug}/`,
      ...(p.links && p.links[0] ? { sameAs: p.links[0].url } : {}),
    },
    null,
    2
  );
}

/* ---- Page shell ------------------------------------------- */
function page({ title, description, canonical, body, base, jsonLd, ogType }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${attr(title)}</title>
    <meta name="description" content="${attr(description)}" />
    <meta name="author" content="${attr(D.profile.name)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
${
  GOOGLE_SITE_VERIFICATION
    ? `    <meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />\n`
    : ""
}${
      BING_SITE_VERIFICATION
        ? `    <meta name="msvalidate.01" content="${BING_SITE_VERIFICATION}" />\n`
        : ""
    }

    <meta property="og:type" content="${ogType || "website"}" />
    <meta property="og:site_name" content="${attr(D.profile.name)}" />
    <meta property="og:title" content="${attr(title)}" />
    <meta property="og:description" content="${attr(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${SITE_URL}/${D.profile.image}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${attr(title)}" />
    <meta name="twitter:description" content="${attr(description)}" />
    <meta name="twitter:image" content="${SITE_URL}/${D.profile.image}" />

    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚦</text></svg>" />
    <link rel="stylesheet" href="${base}assets/style.css?v=${CSS_V}" />

    <script type="application/ld+json">
${jsonLd}
    </script>

    <script>
      // Apply the saved theme before first paint, so the page never flashes.
      (function () {
        try {
          var t = localStorage.getItem("theme");
          if (t === "light" || t === "dark")
            document.documentElement.setAttribute("data-theme", t);
        } catch (e) {}
      })();
    </script>
  </head>

  <body>
    <button id="theme-toggle" type="button">
      <span class="when-dark">&#9728;&#65038; Light Mode</span>
      <span class="when-light">&#9789; Dark Mode</span>
    </button>
    <main class="container">
${body}
    </main>
    <script src="${base}assets/site.js?v=${JS_V}"></script>
  </body>
</html>
`;
}

/* ---- Write the homepage ----------------------------------- */
const homeDescription = collapse(D.profile.bio).slice(0, 300);

fs.writeFileSync(
  path.join(__dirname, "index.html"),
  page({
    title: `${D.profile.name} — ${D.profile.title}`,
    description: homeDescription,
    canonical: SITE_URL + "/",
    base: "",
    jsonLd: personJsonLd(),
    body: (() => {
      const sections = homeSections("");
      return [masthead(""), sectionNav(sections), ...sections.map(sectionHtml), footer()].join(
        "\n"
      );
    })(),
  })
);

/* ---- Write one page per publication ----------------------- */
const pubDir = path.join(__dirname, "pub");
fs.rmSync(pubDir, { recursive: true, force: true });

const paged = D.publications.filter(hasPage);

paged.forEach((p) => {
  const dir = path.join(pubDir, p.slug);
  fs.mkdirSync(dir, { recursive: true });

  const base = "../../";
  const linkHtml = (p.links || [])
    .map(
      (l) =>
        `<p><a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} &rarr;</a></p>`
    )
    .join("");

  const body = `
    <article class="paper">
      <p class="paper-back"><a href="${base}">&larr; ${D.profile.name}</a></p>
      <h1>${p.title}${badge(p.status)}</h1>
      <div class="pub-authors">${p.authors}</div>
      <div class="pub-venue" style="margin-bottom:.75rem">${p.venues.join(" &middot; ")}${
    p.note ? ` <span class="muted">(${p.note})</span>` : ""
  }</div>
      ${linkHtml}
      <h2>Abstract</h2>
      <div class="abstract">${paragraphs(p.abstract)}</div>
      ${
        p.abstractSource
          ? `<p class="abstract-source muted">Abstract as published in <a href="${p.abstractSource.url}" target="_blank" rel="noopener noreferrer">${p.abstractSource.label}</a>.</p>`
          : ""
      }
      ${footer()}
    </article>`;

  fs.writeFileSync(
    path.join(dir, "index.html"),
    page({
      title: `${collapse(p.title)} — ${D.profile.name}`,
      description: collapse(p.abstract).slice(0, 300),
      canonical: `${SITE_URL}/pub/${p.slug}/`,
      base,
      jsonLd: articleJsonLd(p),
      ogType: "article",
      body,
    })
  );
});

/* ---- sitemap.xml + robots.txt ------------------------------ */
const today = new Date().toISOString().slice(0, 10);
const urls = [`${SITE_URL}/`].concat(
  paged.map((p) => `${SITE_URL}/pub/${p.slug}/`)
);

fs.writeFileSync(
  path.join(__dirname, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u, i) =>
      `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${
        i === 0 ? "1.0" : "0.8"
      }</priority>\n  </url>`
  )
  .join("\n")}
</urlset>
`
);

fs.writeFileSync(
  path.join(__dirname, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
);

console.log(`Built for ${SITE_URL}`);
console.log(`  index.html`);
console.log(`  pub/<slug>/index.html   x${paged.length} of ${D.publications.length} (only papers with a real abstract)`);
console.log(`  sitemap.xml             ${urls.length} URLs`);
console.log(`  robots.txt`);
