/* ============================================================
   The only JavaScript this site needs: the theme toggle.

   All page content is real HTML, so the site works fully with
   JavaScript off — which is how search engines see it.

   Dark is the default. Clicking switches to light and the choice
   is remembered. The button's visible text is handled by CSS, so
   it is already correct before this file runs; this only wires up
   the click and keeps the screen-reader label in sync.
   ============================================================ */

(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function current() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function label() {
    btn.setAttribute(
      "aria-label",
      current() === "light" ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  btn.addEventListener("click", function () {
    var next = current() === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* private browsing — the toggle still works for this visit */
    }
    label();
  });

  label();
})();
