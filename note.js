/* NoteHub – note details page */

var PDF_PAGES = [
  "For Loop in Python\n\n- Used to iterate over a sequence\n  (list, tuple, string, range)\n\n- Syntax:\n    for item in sequence:\n        body\n\n- Example:\n    for i in range(1, 6):\n        print(i)",
  "While Loop in Python\n\n- Repeats while a condition is True\n\n- Syntax:\n    while condition:\n        body\n\n- Example:\n    count = 0\n    while count < 5:\n        print(count)\n        count += 1",
  "Nested Loops & Control\n\n- A loop inside another loop\n\n- break  -> exit the loop\n- continue -> skip to next round\n\n- Example:\n    for i in range(3):\n        for j in range(3):\n            print(i, j)",
];

document.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);
  var note = getNoteById(params.get("id")) || NOTES[1];

  // Header
  document.title = note.title + " | NoteHub";
  qs("#noteTitle").textContent = note.title;
  qs("#noteDesc").textContent = note.description;
  qs("#authorName").textContent = note.author;
  qs("#authorAvatar").textContent = initials(note.author);
  qs("#noteStats").textContent =
    "★ " + note.rating + " · " + formatCount(note.views) + " views · " + formatCount(note.downloads) + " downloads";
  qs("#noteTags").innerHTML = note.tags
    .concat([note.difficulty])
    .map(function (tag) {
      return '<span class="tag">' + tag + "</span>";
    })
    .join("");

  // Save / bookmark buttons (two of them stay in sync)
  var saveTop = qs("#saveTop");
  var saveBtn = qs("#saveBtn");
  saveTop.innerHTML = ICONS.bookmark;

  function paintSaved() {
    var saved = isBookmarked(note.id);
    saveTop.setAttribute("aria-pressed", saved ? "true" : "false");
    saveBtn.setAttribute("aria-pressed", saved ? "true" : "false");
    saveBtn.textContent = saved ? "Saved" : "Save";
  }
  paintSaved();

  function onSaveClick() {
    var saved = toggleBookmark(note.id);
    paintSaved();
    showToast(saved ? "Saved to bookmarks" : "Removed from bookmarks");
  }
  saveTop.addEventListener("click", onSaveClick);
  saveBtn.addEventListener("click", onSaveClick);

  // Follow button
  var followBtn = qs("#followBtn");
  followBtn.addEventListener("click", function () {
    var following = followBtn.getAttribute("aria-pressed") === "true";
    followBtn.setAttribute("aria-pressed", following ? "false" : "true");
    followBtn.textContent = following ? "Follow" : "Following";
    followBtn.classList.toggle("is-active", !following);
  });

  // Mock PDF preview with pages
  var pageIndex = 0;
  var pdfPage = qs("#pdfPage");
  var pageLabel = qs("#pageLabel");

  function paintPage() {
    pdfPage.innerHTML = "<pre>" + PDF_PAGES[pageIndex] + "</pre>";
    pageLabel.textContent = "Page " + (pageIndex + 1) + " / " + PDF_PAGES.length;
  }
  paintPage();

  qs("#prevPage").addEventListener("click", function () {
    pageIndex = (pageIndex - 1 + PDF_PAGES.length) % PDF_PAGES.length;
    paintPage();
  });
  qs("#nextPage").addEventListener("click", function () {
    pageIndex = (pageIndex + 1) % PDF_PAGES.length;
    paintPage();
  });

  // Download is simulated
  qs("#downloadBtn").addEventListener("click", function () {
    showToast("Download started (demo only)");
  });

  // Tabs
  var tabs = qsa(".tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (other) {
        other.setAttribute("aria-selected", "false");
        qs("#" + other.getAttribute("aria-controls")).hidden = true;
      });
      tab.setAttribute("aria-selected", "true");
      qs("#" + tab.getAttribute("aria-controls")).hidden = false;
    });
  });

  // Star rating UI
  var stars = qsa(".star-btn");
  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      var value = Number(star.getAttribute("data-star"));
      stars.forEach(function (other, index) {
        other.classList.toggle("on", index < value);
      });
      showToast("Thanks for rating " + value + " stars!");
    });
  });

  // Comment form
  qs("#commentForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var text = qs("#commentText").value.trim();
    if (!text) {
      showToast("Write something first");
      return;
    }
    var comment = document.createElement("div");
    comment.className = "comment";
    comment.innerHTML =
      '<span class="avatar" aria-hidden="true">AA</span><div><p><strong>You</strong></p><p class="muted"></p></div>';
    qs("p.muted", comment).textContent = text;
    qs("#commentForm").before(comment);
    qs("#commentText").value = "";
    showToast("Comment posted");
  });

  // Related notes
  var related = NOTES.filter(function (item) {
    return item.id !== note.id && item.category === note.category;
  }).slice(0, 3);
  if (!related.length) {
    related = NOTES.slice(0, 3);
  }
  qs("#relatedList").innerHTML = related
    .map(function (item) {
      return (
        '<p style="margin-bottom:12px"><a class="note-title" href="/note.html?id=' + item.id + '">' +
        item.title +
        '</a><br><span class="muted small">' + item.author + " · ★ " + item.rating + "</span></p>"
      );
    })
    .join("");
});
