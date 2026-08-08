/* ==========================================================================
   NoteHub – global JavaScript
   Contains: mock data, localStorage helpers, shared UI (navbar, footer,
   bottom nav, dropdowns, toast) and reusable card builders.
   Loaded on every page BEFORE the page specific script.
   ========================================================================== */

/* 1. Mock data ---------------------------------------------------------- */
var NOTES = [
  {
    id: 1,
    title: "Python Basics Notes",
    description: "Complete beginner notes: variables, data types and functions.",
    author: "Alamin Ali",
    category: "Python",
    tags: ["Python", "Beginner"],
    difficulty: "Beginner",
    rating: 4.8,
    views: 1200,
    downloads: 340,
    fileType: "PDF",
    date: "2026-05-05",
    bookmarked: false,
  },
  {
    id: 2,
    title: "Python Loops Complete Notes",
    description: "For loops, while loops, nested loops and more.",
    author: "Alamin Ali",
    category: "Python",
    tags: ["Python", "Loops", "Programming"],
    difficulty: "Beginner",
    rating: 4.8,
    views: 1200,
    downloads: 340,
    fileType: "PDF",
    date: "2026-05-04",
    bookmarked: false,
  },
  {
    id: 3,
    title: "Data Structures in C",
    description: "Handwritten class notes on arrays, stacks, queues and trees.",
    author: "Riya Sharma",
    category: "Computer Science",
    tags: ["C", "DSA"],
    difficulty: "Intermediate",
    rating: 4.7,
    views: 980,
    downloads: 210,
    fileType: "PDF",
    date: "2026-04-28",
    bookmarked: false,
  },
  {
    id: 4,
    title: "HTML & CSS Notes",
    description: "Web development basics with practical examples.",
    author: "Sahil Khan",
    category: "Web Development",
    tags: ["Web Dev", "Beginner"],
    difficulty: "Beginner",
    rating: 4.9,
    views: 2300,
    downloads: 560,
    fileType: "DOCX",
    date: "2026-04-22",
    bookmarked: false,
  },
  {
    id: 5,
    title: "JavaScript Fundamentals",
    description: "Variables, functions, DOM and events explained simply.",
    author: "Neha Gupta",
    category: "Web Development",
    tags: ["JavaScript", "Web Dev"],
    difficulty: "Beginner",
    rating: 4.6,
    views: 1500,
    downloads: 390,
    fileType: "PDF",
    date: "2026-04-18",
    bookmarked: false,
  },
  {
    id: 6,
    title: "Physics - Mechanics",
    description: "Class 11 complete notes with solved numericals.",
    author: "Mohit Verma",
    category: "Science",
    tags: ["Physics", "Class 11"],
    difficulty: "Intermediate",
    rating: 4.6,
    views: 1100,
    downloads: 300,
    fileType: "PDF",
    date: "2026-04-11",
    bookmarked: false,
  },
  {
    id: 7,
    title: "DBMS Complete Notes",
    description: "ER models, normalization and SQL queries in one place.",
    author: "Priya Nair",
    category: "Computer Science",
    tags: ["DBMS", "SQL"],
    difficulty: "Intermediate",
    rating: 4.5,
    views: 870,
    downloads: 240,
    fileType: "PPT",
    date: "2026-04-02",
    bookmarked: false,
  },
  {
    id: 8,
    title: "Computer Networks",
    description: "OSI model, TCP/IP and routing basics summarised.",
    author: "Dev Patel",
    category: "Computer Science",
    tags: ["Networks", "Advanced"],
    difficulty: "Advanced",
    rating: 4.4,
    views: 760,
    downloads: 180,
    fileType: "PDF",
    date: "2026-03-27",
    bookmarked: false,
  },
  {
    id: 9,
    title: "Mathematics Calculus",
    description: "Limits, derivatives and integration with examples.",
    author: "Ananya Roy",
    category: "Mathematics",
    tags: ["Maths", "Calculus"],
    difficulty: "Intermediate",
    rating: 4.7,
    views: 1400,
    downloads: 410,
    fileType: "PDF",
    date: "2026-03-19",
    bookmarked: false,
  },
  {
    id: 10,
    title: "Web Development Basics",
    description: "How the web works, hosting, and your first website.",
    author: "Sahil Khan",
    category: "Web Development",
    tags: ["Web Dev", "Beginner"],
    difficulty: "Beginner",
    rating: 4.3,
    views: 640,
    downloads: 150,
    fileType: "DOCX",
    date: "2026-03-10",
    bookmarked: false,
  },
  {
    id: 11,
    title: "C Programming Notes",
    description: "Pointers, arrays and file handling explained clearly.",
    author: "Riya Sharma",
    category: "Programming",
    tags: ["C", "Programming"],
    difficulty: "Beginner",
    rating: 4.5,
    views: 990,
    downloads: 260,
    fileType: "PDF",
    date: "2026-03-01",
    bookmarked: false,
  },
  {
    id: 12,
    title: "Data Science Introduction",
    description: "Numpy, pandas and the data analysis workflow.",
    author: "Ankit Singh",
    category: "Data Science",
    tags: ["Data Science", "Python"],
    difficulty: "Intermediate",
    rating: 4.8,
    views: 1750,
    downloads: 480,
    fileType: "PPT",
    date: "2026-02-24",
    bookmarked: false,
  },
];

var CATEGORIES = [
  { name: "Programming", notes: "12.9K Notes", icon: "code" },
  { name: "Web Development", notes: "8.2K Notes", icon: "browser" },
  { name: "Mathematics", notes: "6.7K Notes", icon: "chart" },
  { name: "Science", notes: "5.3K Notes", icon: "atom" },
  { name: "Design", notes: "3.7K Notes", icon: "pen" },
  { name: "Business", notes: "2.8K Notes", icon: "bag" },
  { name: "Skills", notes: "4.0K Notes", icon: "star" },
  { name: "More", notes: "Explore more", icon: "dots" },
];

var CONTRIBUTORS = [
  { name: "Alamin Ali", notes: 264, downloads: "3.2K" },
  { name: "Riya Sharma", notes: 180, downloads: "2.4K" },
  { name: "Sahil Khan", notes: 142, downloads: "1.9K" },
  { name: "Ananya Roy", notes: 121, downloads: "1.5K" },
];

/* 2. Small helpers ------------------------------------------------------ */
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function qsa(selector, scope) {
  return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
}

function formatCount(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(".0", "") + "K";
  }
  return String(number);
}

function initials(name) {
  return name
    .split(" ")
    .map(function (part) {
      return part.charAt(0);
    })
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function showToast(message) {
  var existing = qs(".toast");
  if (existing) {
    existing.remove();
  }
  var el = document.createElement("div");
  el.className = "toast";
  el.setAttribute("role", "status");
  el.textContent = message;
  document.body.appendChild(el);
  window.setTimeout(function () {
    el.remove();
  }, 2600);
}

/* 3. localStorage state ------------------------------------------------- */
var Store = {
  read: function (key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  },
  write: function (key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      /* storage may be unavailable – ignore in this demo */
    }
  },
};

function getBookmarks() {
  return Store.read("notehub_bookmarks", []);
}

function isBookmarked(id) {
  return getBookmarks().indexOf(id) !== -1;
}

function toggleBookmark(id) {
  var list = getBookmarks();
  var index = list.indexOf(id);
  if (index === -1) {
    list.push(id);
  } else {
    list.splice(index, 1);
  }
  Store.write("notehub_bookmarks", list);
  return index === -1;
}

function getNoteById(id) {
  for (var i = 0; i < NOTES.length; i++) {
    if (NOTES[i].id === Number(id)) {
      return NOTES[i];
    }
  }
  return null;
}

/* 4. Reusable icons ----------------------------------------------------- */
var ICONS = {
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  bookmark:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
  bell:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 15V10a6 6 0 10-12 0v5l-2 3h16z"/><path d="M10 21h4"/></svg>',
  upload:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 20h16"/></svg>',
  home:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/></svg>',
  user:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
  menu:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  code:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 8l-4 4 4 4"/><path d="M15 8l4 4-4 4"/></svg>',
  browser:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>',
  chart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 19V9"/><path d="M12 19V5"/><path d="M19 19v-7"/></svg>',
  atom:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 3c5 4 6 12 0 18-6-6-5-14 0-18z"/></svg>',
  pen:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20l4-1 10-10-3-3L5 16z"/></svg>',
  bag:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>',
  star:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4l2.4 5 5.6.7-4 3.9 1 5.4-5-2.7-5 2.7 1-5.4-4-3.9 5.6-.7z"/></svg>',
  dots:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/></svg>',
};

/* 5. Shared navbar / footer / bottom nav -------------------------------- */
function navbarHtml(active) {
  function link(href, label) {
    var cls = active === label.toLowerCase() ? ' class="active"' : "";
    return '<li><a href="' + href + '"' + cls + ">" + label + "</a></li>";
  }

  return (
    '<nav class="navbar"><div class="container navbar-inner">' +
    '<a class="brand" href="/home.html"><span class="brand-mark" aria-hidden="true">N</span> NoteHub</a>' +
    '<ul class="nav-links">' +
    link("/home.html", "Explore") +
    link("/search.html", "Categories") +
    link("/profile.html", "Top Users") +
    link("/home.html#about", "About") +
    "</ul>" +
    '<div class="nav-right">' +
    '<a class="btn btn-primary btn-sm" href="/upload.html">' + ICONS.upload + " Upload</a>" +
    '<button class="icon-btn nav-toggle" type="button" id="navToggle" aria-label="Open menu" aria-expanded="false">' +
    ICONS.menu +
    "</button>" +
    '<div class="dropdown">' +
    '<button class="icon-btn" type="button" id="bellBtn" aria-label="Notifications" aria-expanded="false">' +
    ICONS.bell +
    "</button>" +
    '<div class="dropdown-panel" id="bellPanel">' +
    '<p><strong>Notifications</strong></p>' +
    "<p class=\"small muted\">Riya Sharma uploaded new DSA notes.</p>" +
    "<p class=\"small muted\">Your note reached 1K views.</p>" +
    "</div></div>" +
    '<div class="dropdown">' +
    '<button class="avatar" type="button" id="avatarBtn" aria-label="Your account" aria-expanded="false">AA</button>' +
    '<div class="dropdown-panel" id="avatarPanel">' +
    '<a href="profile.html">My profile</a>' +
    '<a href="bookmarks.html">Bookmarks</a>' +
    '<a href="upload.html">Upload notes</a>' +
    '<a href="settings.html">Settings</a>' +
    '<a href="login.html">Log out</a>' +
    "</div></div>" +
    "</div></div>" +
    '<div class="mobile-menu" id="mobileMenu">' +
    '<a href="home.html">Explore</a>' +
    '<a href="search.html">Categories</a>' +
    '<a href="profile.html">Top Users</a>' +
    '<a href="bookmarks.html">Bookmarks</a>' +
    '<a href="settings.html">Settings</a>' +
    '<a href="login.html">Log in</a>' +
    "</div></nav>"
  );
}

function footerHtml() {
  function column(title, items) {
    var links = items
      .map(function (item) {
        return '<li><a href="' + item[1] + '">' + item[0] + "</a></li>";
      })
      .join("");
    return "<div><h4>" + title + "</h4><ul>" + links + "</ul></div>";
  }

  return (
    '<footer class="footer" id="about"><div class="container">' +
    '<div class="footer-grid"><div>' +
    '<a class="brand" href="home.html"><span class="brand-mark" aria-hidden="true">N</span> NoteHub</a>' +
    '<p class="footer-about">A platform to discover, share and grow together.</p>' +
    '<div class="socials">' +
    '<a href="#" aria-label="NoteHub on Facebook">' + ICONS.user + "</a>" +
    '<a href="#" aria-label="NoteHub on X">' + ICONS.star + "</a>" +
    '<a href="#" aria-label="NoteHub on Instagram">' + ICONS.browser + "</a>" +
    '<a href="#" aria-label="NoteHub on LinkedIn">' + ICONS.code + "</a>" +
    "</div></div>" +
    column("Explore", [
      ["Notes", "search.html"],
      ["Categories", "search.html"],
      ["Top Users", "profile.html"],
    ]) +
    column("Support", [
      ["Help Center", "#"],
      ["Contact", "#"],
      ["Report Content", "#"],
    ]) +
    column("Company", [
      ["About", "#about"],
      ["Terms", "#"],
      ["Privacy", "#"],
    ]) +
    "</div>" +
    '<p class="footer-bottom">&copy; 2026 NoteHub. All rights reserved.</p>' +
    "</div></footer>"
  );
}

function bottomNavHtml(active) {
  var items = [
    ["Home", "home.html", ICONS.home],
    ["Search", "search.html", ICONS.search],
    ["Upload", "upload.html", ICONS.upload],
    ["Saved", "bookmarks.html", ICONS.bookmark],
    ["Profile", "profile.html", ICONS.user],
  ];
  var links = items
    .map(function (item) {
      var cls = active === item[0].toLowerCase() ? ' class="active"' : "";
      return "<li><a href=" + '"' + item[1] + '"' + cls + ">" + item[2] + "<span>" + item[0] + "</span></a></li>";
    })
    .join("");
  return '<nav class="bottom-nav" aria-label="Mobile navigation"><ul>' + links + "</ul></nav>";
}

/* 6. Reusable card builders -------------------------------------------- */
function fileIconHtml(fileType) {
  var extra = fileType === "DOCX" ? " doc" : fileType === "PPT" ? " ppt" : "";
  return '<span class="file-icon' + extra + '" aria-hidden="true">' + fileType + "</span>";
}

function metaHtml(note) {
  return (
    '<div class="meta-row">' +
    '<span><span class="star" aria-hidden="true">★</span> ' + note.rating + "</span>" +
    "<span>" + formatCount(note.views) + " views</span>" +
    "<span>" + formatCount(note.downloads) + " downloads</span>" +
    "</div>"
  );
}

function bookmarkButtonHtml(note) {
  return (
    '<button class="bookmark-btn" type="button" data-bookmark="' + note.id + '" ' +
    'aria-pressed="' + (isBookmarked(note.id) ? "true" : "false") + '" ' +
    'aria-label="Save ' + note.title + '">' + ICONS.bookmark + "</button>"
  );
}

function tagsHtml(note) {
  var tags = note.tags
    .map(function (tag) {
      return '<span class="tag">' + tag + "</span>";
    })
    .join("");
  var level =
    note.tags.indexOf(note.difficulty) === -1
      ? '<span class="tag tag-muted">' + note.difficulty + "</span>"
      : "";
  return '<div class="tag-row">' + tags + level + "</div>";
}

/* Grid style card used on home, bookmarks and profile pages */
function noteCardHtml(note) {
  return (
    '<article class="note-card">' +
    bookmarkButtonHtml(note) +
    fileIconHtml(note.fileType) +
    '<a class="note-title" href="note.html?id=' + note.id + '">' + note.title + "</a>" +
    '<p class="note-desc">' + note.description + "</p>" +
    '<p class="note-author">' + note.author + " &middot; " + note.category + "</p>" +
    tagsHtml(note) +
    metaHtml(note) +
    "</article>"
  );
}

/* Horizontal card used on the search results page */
function resultCardHtml(note) {
  return (
    '<article class="result-card">' +
    fileIconHtml(note.fileType) +
    "<div>" +
    '<a class="note-title" href="/note.html?id=' + note.id + '">' + note.title + "</a>" +
    '<p class="note-desc">' + note.description + "</p>" +
    '<p class="note-author">' + note.author + "</p>" +
    tagsHtml(note) +
    metaHtml(note) +
    "</div>" +
    bookmarkButtonHtml(note) +
    "</article>"
  );
}

/* 7. Wire up shared behaviour ------------------------------------------ */
function mountChrome() {
  var page = document.body.getAttribute("data-page") || "";

  var navSlot = qs("#site-nav");
  if (navSlot) {
    navSlot.innerHTML = navbarHtml(page === "home" ? "explore" : page);
  }

  var footerSlot = qs("#site-footer");
  if (footerSlot) {
    footerSlot.innerHTML = footerHtml();
  }

  var bottomSlot = qs("#site-bottom-nav");
  if (bottomSlot) {
    bottomSlot.innerHTML = bottomNavHtml(page);
  }

  // mobile menu
  var toggle = qs("#navToggle");
  var mobileMenu = qs("#mobileMenu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // dropdowns
  function bindDropdown(buttonId, panelId) {
    var button = qs("#" + buttonId);
    var panel = qs("#" + panelId);
    if (!button || !panel) {
      return;
    }
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      qsa(".dropdown-panel").forEach(function (other) {
        if (other !== panel) {
          other.classList.remove("open");
        }
      });
      var open = panel.classList.toggle("open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  bindDropdown("bellBtn", "bellPanel");
  bindDropdown("avatarBtn", "avatarPanel");

  document.addEventListener("click", function () {
    qsa(".dropdown-panel").forEach(function (panel) {
      panel.classList.remove("open");
    });
  });
}

/* Bookmark buttons work on every page (event delegation) */
document.addEventListener("click", function (event) {
  var button = event.target.closest ? event.target.closest("[data-bookmark]") : null;
  if (!button) {
    return;
  }
  var id = Number(button.getAttribute("data-bookmark"));
  var saved = toggleBookmark(id);
  button.setAttribute("aria-pressed", saved ? "true" : "false");
  showToast(saved ? "Saved to bookmarks" : "Removed from bookmarks");
  document.dispatchEvent(new CustomEvent("notehub:bookmarks-changed"));
});

document.addEventListener("DOMContentLoaded", mountChrome);
