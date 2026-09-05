# mojtaba-ja.github.io

My personal academic website. Plain HTML — nothing to install.

**Live:** https://mojtaba-ja.github.io

---

## To change anything

Edit **`assets/data.js`**. That is the only file with content in it.

Then:

```powershell
node build.js
git add -A
git commit -m "what changed" ; git push
```

Live in about a minute.

---

## Add a paper

Paste into the `publications` list in `assets/data.js`, at the top of its own
group:

```js
{
  slug: "short-name",                    // the URL: /pub/short-name/
  group: "peer-reviewed",                // peer-reviewed | working
  title: "Full Paper Title",
  authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
  venues: ["Journal Name — 2026"],
  status: "published",                   // published | review | preprint | prep
  links: [{ label: "DOI", url: "https://doi.org/..." }],
  abstract: `Paste the real published abstract here, or leave it null.`,
},
```

`abstract: null` means no detail page is generated for that paper.

### How papers are grouped

The site mirrors the CV's sections instead of showing one flat list. `group`
picks the section; `pubSections` names them and sets their order:

| `group` | Section on the page |
|---|---|
| `peer-reviewed` | Publications — journal articles and the thesis |
| `working` | Working Papers & Under Review — under review, preprints, in prep |

Entries render in the order you write them, so keep each group
reverse-chronological, exactly as the CV lists them. A group with nothing in it
prints no heading at all.

## Add a talk or poster

Talks live in their own `presentations` list, kept out of the paper list:

```js
{
  type: "conference",                    // conference | workshop
  title: "Talk Title",
  authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
  venue: "Meeting Name, City, ST",
  date: "Jan. 2026",
  note: "Poster presentation",
},
```

`talkSections` names those two sections the same way `pubSections` does.

## Page order and the jump nav

`homeSections()` in `build.js` is the whole page: one line per section, in the
order they appear. The row of jump links under the photo is generated from that
same list, so a section can never be missing from the nav, and an empty section
(no data) prints neither a heading nor a link. To move a section, move its line;
to rename it, change the title there; the anchor (`#working-papers`) follows the
short nav label automatically.

## Add a news item

```js
{ date: "2026-10-01", text: `Passed my <strong>qualifying exam</strong>.` },
```

Sorts newest-first on its own.

## New CV or resume PDF

Edit the `.typ` file, then from `G:\My Drive\CV and Resume`:

```
bash publish.sh
```

Or double-click **PUBLISH.cmd**. It recompiles whatever changed, copies the PDFs
into the site, rebuilds, and pushes every repo that changed. Safe to run any time —
if nothing changed, it does nothing.

Give it a commit message and every repo it pushes uses that message instead of the
dated default:

```
bash publish.sh "Group papers the way the CV does"
```

| Flag | Effect |
|---|---|
| `"message"` or `-m "message"` | commit message for this run (default: `Update site (date)`) |
| `--dry` | show what it would do, change nothing |
| `--check` | also test every link (slower, needs network) |

To switch which resume the site serves, edit `SITE_RESUME` at the top of
`publish.sh`.

---

## Other commands

| Command | What it does |
|---|---|
| `python -m http.server 8765` | Preview at localhost:8765 before pushing |
| `node check-links.js` | Test every link on the site |
| `node submit-indexnow.js` | Tell Bing and Yandex about new pages |

---

## Notes

- Repo is public because GitHub Pages only serves public repos on the free plan.
- `index.html`, everything in `pub/`, `sitemap.xml` and `robots.txt` are generated.
  Don't hand-edit them; `node build.js` overwrites them.
- Dark mode is the default. The button top-right switches to light.
