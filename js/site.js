/* ==========================================================================
   Krancos — script du site
   Source unique pour la navigation, le pied de page et les icônes, afin de
   n'avoir aucun balisage dupliqué entre les pages HTML.
   Les chemins sont relatifs : le site fonctionne aussi dans un sous-dossier
   (ex. GitHub Pages sur user.github.io/website/).
   ========================================================================== */

(function () {
  "use strict";

  var CONTACT_EMAIL = "kiyan@krancos.fr";

  /* Source de vérité unique pour le logo : nav, pied de page et favicon
     lisent tous cette constante. Pour changer de logo, une seule ligne. */
  var LOGO = "assets/logo/logo_1.png";

  /* ---------------------------------------------------------------- Icônes */

  var s = function (path, extra) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="' +
      (extra && extra.w ? extra.w : 1.7) +
      '" stroke-linecap="round" stroke-linejoin="round" ' +
      'width="' +
      (extra && extra.size ? extra.size : 22) +
      '" height="' +
      (extra && extra.size ? extra.size : 22) +
      '" aria-hidden="true">' +
      path +
      "</svg>"
    );
  };

  var ICONS = {
    scan: s(
      '<path d="M3 8V5a2 2 0 0 1 2-2h3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/>' +
        '<path d="M21 16v3a2 2 0 0 1-2 2h-3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/>' +
        '<path d="M3 12h18"/>',
    ),
    layers: s('<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>'),
    brain: s(
      '<path d="M12 5a3 3 0 0 0-6 0 3 3 0 0 0-1.5 5.6A3 3 0 0 0 6 16a3 3 0 0 0 6 0Z"/>' +
        '<path d="M12 5a3 3 0 0 1 6 0 3 3 0 0 1 1.5 5.6A3 3 0 0 1 18 16a3 3 0 0 1-6 0Z"/>' +
        '<path d="M12 5v14"/>',
    ),
    report: s(
      '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/>' +
        '<path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    ),
    shield: s(
      '<path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6Z"/>' +
        '<path d="m9 12 2 2 4-4"/>',
    ),
    clock: s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 1.9"/>'),
    users: s(
      '<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>' +
        '<circle cx="9" cy="7" r="3.2"/><path d="M22 20v-2a4 4 0 0 0-3-3.8"/>' +
        '<path d="M16 3.7a4 4 0 0 1 0 6.6"/>',
    ),
    store: s(
      '<path d="M4 9V6l1.5-3h13L20 6v3"/>' +
        '<path d="M4 9a2.5 2.5 0 0 0 4 1.9A2.5 2.5 0 0 0 12 10.9a2.5 2.5 0 0 0 4 0A2.5 2.5 0 0 0 20 9"/>' +
        '<path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
    ),
    sparkle: s(
      '<path d="M12 3.5 13.8 9 19 10.8 13.8 12.6 12 18l-1.8-5.4L5 10.8 10.2 9Z"/>' +
        '<path d="M18.5 16.5 19 18l1.5.5L19 19l-.5 1.5L18 19l-1.5-.5L18 18Z"/>',
    ),
    lock: s('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
    stethoscope: s(
      '<path d="M5 3v5a4 4 0 0 0 8 0V3"/><path d="M5 3H3.5M13 3h1.5"/>' +
        '<path d="M9 12v2.5a5 5 0 0 0 10 0V13"/><circle cx="19" cy="11" r="2"/>',
    ),
    // Parcours de l'équipe : formation, expérience, fonction.
    cap: s(
      '<path d="M2.5 8.6 12 4.2l9.5 4.4L12 13Z"/>' +
        '<path d="M6.4 10.7V15c0 1.5 2.5 2.8 5.6 2.8s5.6-1.3 5.6-2.8v-4.3"/>' +
        '<path d="M21.5 8.8v5.1"/>',
      { size: 16 },
    ),
    briefcase: s(
      '<rect x="3" y="7.6" width="18" height="12" rx="2.2"/>' +
        '<path d="M9 7.6V6.2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.4"/>' +
        '<path d="M3 12.6h18"/>',
      { size: 16 },
    ),
    badge: s(
      '<circle cx="12" cy="9.2" r="3.9"/><path d="M5.8 20.4a6.2 6.2 0 0 1 12.4 0"/>',
      { size: 16 },
    ),
    check: s('<path d="m5 12.5 4.5 4.5L19 7"/>', { size: 14, w: 2.4 }),
    arrow: s('<path d="M5 12h13"/><path d="m12.5 5.5 6.5 6.5-6.5 6.5"/>', {
      size: 17,
      w: 2,
    }),
    pin: s(
      '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/>' +
        '<circle cx="12" cy="10" r="2.6"/>',
      { size: 17 },
    ),
    mail: s('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>', {
      size: 17,
    }),
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">' +
      '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.4 8.75 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.05-3.32-2.05 0-2.36 1.58-2.36 3.21V21h-4V9Z"/></svg>',
    x:
      '<svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">' +
      '<path d="M17.2 3h3.3l-7.2 8.2L21.8 21h-6.6l-5.2-6.6L4.1 21H.8l7.7-8.8L.5 3h6.8l4.7 6.1L17.2 3Zm-1.2 16h1.8L7.9 4.8H6L16 19Z"/></svg>',
  };

  /** Remplace <i data-icon="nom"></i> par le SVG correspondant. */
  function renderIcons(root) {
    var nodes = (root || document).querySelectorAll("[data-icon]");
    for (var i = 0; i < nodes.length; i++) {
      var name = nodes[i].getAttribute("data-icon");
      if (ICONS[name]) nodes[i].outerHTML = ICONS[name];
    }
  }

  /* ------------------------------------------------------------ Navigation */

  var NAV_LINKS = [
    { href: "index.html#solution", label: "La solution" },
    { href: "index.html#fonctionnement", label: "Comment ça marche" },
    { href: "index.html#technologie", label: "Technologie" },
    { href: "index.html#pharmacies", label: "Pharmacies" },
    { href: "equipe.html", label: "Équipe" },
    { href: "contact.html", label: "Contact" },
  ];

  /** Nom du fichier courant, "index.html" par défaut. */
  function currentPage() {
    var file = window.location.pathname.split("/").pop();
    return file === "" ? "index.html" : file;
  }

  function buildNav() {
    var here = currentPage();
    var items = NAV_LINKS.map(function (link) {
      var target = link.href.split("#")[0];
      // Actif seulement pour les pages dédiées, pas pour les ancres.
      var isActive =
        target === here && link.href.indexOf("#") === -1
          ? ' aria-current="page"'
          : "";
      return (
        '<li><a class="nav__link" href="' +
        link.href +
        '"' +
        isActive +
        ">" +
        link.label +
        "</a></li>"
      );
    }).join("");

    return (
      '<header class="nav">' +
      '<div class="shell nav__inner">' +
      '<a class="nav__brand" href="index.html" aria-label="Krancos, accueil">' +
      '<img class="nav__logo" src="' + LOGO + '" alt="" width="34" height="34">' +
      "Krancos</a>" +
      '<button class="nav__toggle" type="button" aria-expanded="false" ' +
      'aria-controls="nav-links" aria-label="Ouvrir le menu">' +
      '<span class="nav__toggleBar"></span>' +
      '<span class="nav__toggleBar"></span>' +
      '<span class="nav__toggleBar"></span>' +
      "</button>" +
      '<ul class="nav__links" id="nav-links" data-open="false">' +
      items +
      '<li><a class="btn btn--primary nav__cta" href="contact.html?sujet=demo">' +
      "Demander une démo</a></li>" +
      "</ul></div></header>"
    );
  }

  function wireNav() {
    var toggle = document.querySelector(".nav__toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", !open ? "Fermer le menu" : "Ouvrir le menu");
      links.setAttribute("data-open", String(!open));
    });

    // Referme le menu après un clic sur une ancre de la même page.
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        links.setAttribute("data-open", "false");
      }
    });
  }

  /* ----------------------------------------------------------- Pied de page */

  function buildFooter() {
    return (
      '<footer class="footer"><div class="shell">' +
      '<div class="footer__grid">' +
      // Colonne marque
      "<div>" +
      '<div class="footer__brand">' +
      '<img class="nav__logo" src="' + LOGO + '" alt="" width="34" height="34">' +
      "Krancos</div>" +
      '<p class="footer__blurb">Le dépistage précoce du cancer de la peau, ' +
      "rendu accessible dans chaque pharmacie de quartier.</p>" +
      "</div>" +
      // Produit
      "<div><p class=\"footer__colTitle\">Produit</p><ul class=\"footer__list\">" +
      '<li><a href="index.html#solution">La solution</a></li>' +
      '<li><a href="index.html#fonctionnement">Comment ça marche</a></li>' +
      '<li><a href="index.html#technologie">Technologie</a></li>' +
      "</ul></div>" +
      // Société
      "<div><p class=\"footer__colTitle\">Société</p><ul class=\"footer__list\">" +
      '<li><a href="equipe.html">Équipe</a></li>' +
      '<li><a href="contact.html">Contact</a></li>' +
      '<li><a href="index.html#pharmacies">Pour les pharmacies</a></li>' +
      "</ul></div>" +
      // Contact
      "<div><p class=\"footer__colTitle\">Nous écrire</p><ul class=\"footer__list\">" +
      '<li><a href="mailto:' +
      CONTACT_EMAIL +
      '">' +
      CONTACT_EMAIL +
      "</a></li>" +
      '<li class="muted">Paris, France</li></ul>' +
      '<div class="socials">' +
      '<a href="https://www.linkedin.com/company/krancos" aria-label="LinkedIn"><i data-icon="linkedin"></i></a>' +
      '<a href="mailto:' +
      CONTACT_EMAIL +
      '" aria-label="E-mail"><i data-icon="mail"></i></a>' +
      "</div></div>" +
      "</div>" +
      // Bas de page
      '<div class="footer__bottom">' +
      "<p>© " +
      new Date().getFullYear() +
      " Krancos </p>" +
      '<ul class="footer__legal">' +
      '<li><a href="mentions-legales.html">Mentions légales</a></li>' +
      '<li><a href="confidentialite.html">Politique de confidentialité</a></li>' +
      '<li><a href="contact.html">Contact</a></li>' +
      "</ul></div>" +
      "</div></footer>"
    );
  }

  /** Pose le favicon à partir de LOGO, pour ne pas répéter le chemin
      dans le <head> de chaque page. */
  function setFavicon() {
    var link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = LOGO;
  }

  /* -------------------------------------------------------------- Démarrage */

  function init() {
    var navSlot = document.getElementById("site-nav");
    var footerSlot = document.getElementById("site-footer");

    if (navSlot) navSlot.outerHTML = buildNav();
    if (footerSlot) footerSlot.outerHTML = buildFooter();

    setFavicon();
    renderIcons(document);
    wireNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
