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
// Same whitespace tidy-up, but for text that goes straight into the page and is
// allowed to carry its own <strong>/<em>. collapse() is for plain-text slots
// (JSON-LD, meta tags) and would strip that emphasis out.
const tidy = (s) => String(s).replace(/\s+/g, " ").trim();
const attr = (s) =>
  collapse(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const BADGE_LABEL = {
  published: "Published",
  review: "Under Review",
  revision: "In Revision",
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

/* Link icons, inline so the page still has zero external requests. Keyed by the
   link's own name in data.js — a link with no matching icon just renders its
   label, so adding a link never breaks the row. Icons are decorative: the label
   is always there beside them, which is what keeps the row readable for anyone
   who does not recognise a given mark (Scholar and ORCID especially). */
const ICONS = {
  Email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>`,
  Scholar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M6 11.5V17c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-5.5"/></svg>`,
  GitHub: `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`,
  LinkedIn: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.98h4.56V24H.22V8.98Zm7.9 0h4.37v2.05h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7V24h-4.56v-7.38c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.83 1.92-2.83 3.9V24H8.12V8.98Z"/></svg>`,
  CV: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/></svg>`,
};

/* ---- Section renderers ------------------------------------ */
function masthead(base) {
  const linkHtml = D.links
    .map((l, i) => {
      const absolute = /^https?:/.test(l.url);
      const mail = l.url.startsWith("mailto:");
      const file = /\.(pdf|docx?)$/i.test(l.url);
      // Anything not absolute and not mail is ours, so it takes the page's base.
      const url = absolute || mail ? l.url : base + l.url;
      // A PDF opens in its own tab: clicking it should never cost someone the
      // page they were reading, and a browser's PDF viewer replacing the site
      // is exactly that.
      const attrs =
        absolute || file ? ` target="_blank" rel="noopener noreferrer"` : "";
      // No spaces inside the separator: .linkrow is a flex row, so its gap sets
      // the spacing on BOTH sides of each dot. Literal spaces here would add to
      // one side only and the rhythm would come out lopsided.
      const sep = i < D.links.length - 1 ? `<span class="sep">&middot;</span>` : "";
      return `<a href="${url}"${attrs}>${ICONS[l.name] || ""}${l.name}</a>${sep}`;
    })
    .join("");

  return `
    <header class="masthead">
      <img class="avatar" src="${base}${D.profile.image}" alt="${attr(D.profile.name)}" width="250" height="375">
      <div class="identity">
        <h1>${D.profile.name}</h1>
        <div class="subtitle">${D.profile.title}${
          D.profile.location ? ` <span class="sep">&middot;</span> ${D.profile.location}` : ""
        }</div>
        <p>${D.profile.bio}</p>
        ${D.profile.research ? `<p>${D.profile.research}</p>` : ""}
        ${
          (D.profile.researchPoints || []).length
            ? `<div class="lede-title">${D.profile.researchTitle || "Current research"}</div>
        <ul class="lede-points">${D.profile.researchPoints
                .map((p) => `<li>${p}</li>`)
                .join("")}</ul>`
            : ""
        }
        <div class="linkrow">${linkHtml}</div>
      </div>
    </header>`;
}

/* Each renderer below returns only what goes INSIDE a section. The section
   wrapper, its id and its <h2> are added once, in homeSections(), so the jump
   nav and the page can never drift apart. */
const interests = () =>
  `<div class="tags">${D.interests.map((i) => `<span class="tag">${i}</span>`).join("")}</div>`;

/* Papers link out — DOI, IEEE Xplore, SSRN, Scholar. We used to mirror each
   abstract on a local /pub/<slug>/ page; that duplicated text the publisher
   already hosts at a canonical URL, which is the definition of thin content,
   and it asked a reader to take a detour to a copy instead of going to the
   source. The abstracts stay in data.js as a record; nothing renders them. */

function pubItem(p, base) {
  const parts = (p.links || []).map(
    (l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`
  );
  // Link the title to the paper itself, when there is somewhere to send them.
  const titleHtml =
    p.links && p.links.length
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
  return items.length ? `<ol class="pubs">${items.map((p) => pubItem(p, base)).join("")}</ol>` : "";
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
  return `<ol class="pubs">${li}</ol>`;
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

/* Dated role blocks — Experience and Teaching are the same shape.
   compact: heading line only. The homepage wants the trajectory at a glance;
   the CV page wants the bullets. */
const roles = (items, compact) =>
  items
    .map(
      (e) => `
      <div class="entry">
        <div class="entry-head">
          <span class="entry-role">${e.role}</span>
          <span class="entry-when">${e.dates}</span>
        </div>
        <div class="entry-org">${e.org} &middot; ${e.location}</div>
        ${compact ? "" : `<ul>${e.points.map((p) => `<li>${p}</li>`).join("")}</ul>`}
      </div>`
    )
    .join("");

const experience = (compact) => roles(D.experience, compact);
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
        <ul class="roster">${g.entries
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
    .filter((r) => !r.hidden)
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
        <p class="hook">${tidy(r.hook)}</p>
        <ul class="points">${(r.points || [])
          .map((p) => `<li>${tidy(p)}</li>`)
          .join("")}</ul>
        ${r.stats ? statRow(r.stats) : ""}
        ${fig}
        ${researchLinks(r, base)}
      </article>`;
    })
    .join("");

/* Public repositories. One may carry a demo and lead the section; the rest stay
   terse — a name, what it is, what it is written in. */
const featuredTool = (f, base) => {
  const v = f.video;
  return `
      <article class="tool">
        <h3>${f.title}</h3>
        <p class="hook">${tidy(f.hook)}</p>
        ${f.note ? `<div class="tool-note">${tidy(f.note)}</div>` : ""}
        <div class="pub-venue">${f.meta}</div>
        <figure class="fig">
          <video class="demo" src="${base}${v.src}" poster="${base}${v.poster}"
            width="${v.width}" height="${v.height}" aria-label="${attr(v.alt)}"
            autoplay muted loop playsinline preload="metadata"></video>
        </figure>
        <div class="pub-links">${f.links
          .map(
            (l) =>
              `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`
          )
          .join(`<span class="sep"> &middot; </span>`)}</div>
      </article>`;
};

const codeList = (base) => {
  const lead = D.code.filter((c) => c.featured);
  const rest = D.code.filter((c) => !c.featured);
  return (
    lead.map((c) => featuredTool(c.featured, base)).join("") +
    `<ul class="repos">${rest
      .map(
        (c) => `
        <li>
          <div class="pub-title"><a href="${c.url}" target="_blank" rel="noopener noreferrer">${c.name}</a></div>
          <div class="pub-authors">${c.detail}</div>
          <div class="pub-venue">${c.lang}</div>
        </li>`
      )
      .join("")}</ul>`
  );
};

/* ---- The page, as one ordered list of sections -------------
   Ordered for a stranger arriving from a search, not for a CV reader: what is
   he doing now (News), what does the work look like (Selected Research, with
   figures), what has it produced (Publications, Code), and only then who he is
   (Education, Experience) and the supporting record. Talks sit below Experience
   on purpose — one TRB paper and six posters should not outrank the papers.
   `short` is the label used in the jump nav. */
function collect(fn) {
  const out = [];
  fn((id, title, inner, short) => {
    if (inner) out.push({ id, title, inner, short: short || title });
  });
  return out;
}

/* THE HOME PAGE IS THE CV.
   There is no second web copy of it. A visitor who wants the record reads this
   page; a recruiter who wants a file clicks CV (PDF) in the masthead and gets
   the file. Two web pages holding the same content was one page too many, and
   it split the search ranking between them.

   Order: what he studies, what is new, what he has published, what he has
   said, where he has worked, what he was given, who he taught, what he can
   use. It is the CV's own order, which is the order a reader of an academic
   page already expects — the only thing gained by inventing a new one is that
   nobody can find anything.

   The work with pictures in it is NOT here. Figures and 27-second animations
   below a biography make a page that scrolls forever and buries the record
   under decoration; they live on /projects/, which is linked from the nav and
   from the foot of this page, and which has room to grow as projects are
   added. */
const homeSections = (base) =>
  collect((add) => {
    add("interests", "Research Interests", interests(), "Interests");
    add("news", "News", news());
    D.pubSections.forEach((g) => add(slugId(g.short), g.title, pubList(g.key, base), g.short));
    D.talkSections.forEach((g) => add(slugId(g.short), g.title, talkList(g.key), g.short));
    add("experience", "Experience", experience(false));
    add("teaching", "Teaching", teaching());
    add("education", "Education", education());
    add("funding", "Research Funding", list(D.funding), "Funding");
    add("mentoring", "Mentoring", mentoring());
    add("awards", "Awards", list(D.awards));
    // Affiliations are on the CV (PDF), not here — see the note in data.js.
    // To restore: add("affiliations", "Professional Affiliations",
    //                 list(D.affiliations), "Affiliations");
    add("skills", "Technical Skills", skills(), "Skills");
  });

/* The projects page: everything that earns its space by being looked at.
   One page rather than one page per project — with four entries a per-project
   page would be four near-empty pages, and this way a reader scrolls through
   the whole body of work instead of navigating it. */
const projectSections = (base) =>
  collect((add) => {
    add("research", "Selected Research", researchList(base), "Research");
    add("code", "Code", codeList(base));
  });

/* One row of jump links. The page is long enough now that landing on it with
   no map is a worse experience than the extra row costs. */
const sectionNav = (sections, extra) =>
  `<nav class="sectionnav" aria-label="Sections">${[
    ...sections.map((x) => `<a href="#${x.id}">${x.short}</a>`),
    ...(extra || []),
  ].join(`<span class="sep"> &middot; </span>`)}</nav>`;

const sectionHtml = (x) =>
  `<section id="${x.id}"><h2>${x.title}</h2>${x.inner}</section>`;

const footer = () =>
  `<footer>&copy; ${new Date().getFullYear()} ${D.profile.name}</footer>`;

/* ---- Structured data: tells Google you are a person -------- */
function personJsonLd() {
  // ORCID is not in the visible link row — almost nobody clicks it — but it
  // still belongs here: this is how a search engine ties your name to your
  // publication record. Machines read sameAs; people read the link row.
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
      const cta = `
    <p class="cta"><a href="projects/">Projects &mdash; selected research and
      open-source tools &rarr;</a></p>`;
      return [
        masthead(""),
        sectionNav(sections, ['<a class="navcv" href="projects/">Projects &rarr;</a>']),
        ...sections.map(sectionHtml),
        cta,
        footer(),
      ].join("\n");
    })(),
  })
);

/* ---- Write the projects page -------------------------------
   The work with pictures in it. Kept off the home page so the record stays
   readable, and given its own URL so it can grow without pushing anything
   down. */
const projectsDir = path.join(__dirname, "projects");
fs.mkdirSync(projectsDir, { recursive: true });

fs.writeFileSync(
  path.join(projectsDir, "index.html"),
  page({
    title: `Projects — ${D.profile.name}`,
    description: `Research projects and open-source tools by ${D.profile.name}: trajectory prediction from LiDAR, bike-share demand forecasting, urban wind simulation, and an interactive structural analysis solver.`,
    canonical: SITE_URL + "/projects/",
    base: "../",
    jsonLd: personJsonLd(),
    body: (() => {
      const sections = projectSections("../");
      const head = `
    <header class="pagehead">
      <p class="paper-back"><a href="../">&larr; ${D.profile.name}</a></p>
      <h1>Projects</h1>
      <p class="muted">Deep learning for transportation, urban wind simulation,
        and open-source engineering tools.</p>
    </header>`;
      return [head, sectionNav(sections), ...sections.map(sectionHtml), footer()].join("\n");
    })(),
  })
);

/* ---- /cv/ keeps working, as a redirect ---------------------
   The page that used to live here is now the home page. Anyone holding the old
   link — in an application, an email, a search result — still lands somewhere
   correct instead of on a 404. noindex so the two URLs never compete. */
const cvDir = path.join(__dirname, "cv");
fs.mkdirSync(cvDir, { recursive: true });
fs.writeFileSync(
  path.join(cvDir, "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CV — ${D.profile.name}</title>
    <link rel="canonical" href="${SITE_URL}/" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${SITE_URL}/" />
  </head>
  <body>
    <p>The CV is on the <a href="${SITE_URL}/">home page</a>, and as a
      <a href="${SITE_URL}/assets/cv.pdf">PDF</a>.</p>
  </body>
</html>
`
);

/* ---- sitemap.xml + robots.txt ------------------------------ */
const today = new Date().toISOString().slice(0, 10);
const urls = [`${SITE_URL}/`, `${SITE_URL}/projects/`];

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
console.log(`  projects/index.html`);
console.log(`  cv/index.html        (redirect to /)`);
console.log(`  sitemap.xml             ${urls.length} URLs`);
console.log(`  robots.txt`);
