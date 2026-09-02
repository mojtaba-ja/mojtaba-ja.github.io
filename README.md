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

Paste at the top of the `publications` list in `assets/data.js`:

```js
{
  slug: "short-name",                    // the URL: /pub/short-name/
  title: "Full Paper Title",
  authors: "<strong>M. Jafarian Abyaneh</strong>, J. Jang",
  venues: ["Journal Name — 2026"],
  status: "published",                   // published | review | preprint | prep
  links: [{ label: "DOI", url: "https://doi.org/..." }],
  abstract: `Paste the real published abstract here, or leave it null.`,
},
```

`abstract: null` means no detail page is generated for that paper.

## Add a news item

```js
{ date: "2026-10-01", text: `Passed my <strong>qualifying exam</strong>.` },
```

Sorts newest-first on its own.

## New CV or resume PDF

```powershell
Copy-Item "..\cv-typst\cv-typst.pdf" "assets\cv.pdf" -Force
Copy-Item "..\resume-typst\resume-typst_AVTech.pdf" "assets\resume.pdf" -Force
```

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
