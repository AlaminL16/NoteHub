/* NoteHub – search results page (mock filtering with JavaScript) */

document.addEventListener("DOMContentLoaded", function () {
  var input = qs("#query");
  var list = qs("#resultList");
  var title = qs("#resultsTitle");
  var sort = qs("#sort");

  // read ?q= from the URL
  var params = new URLSearchParams(window.location.search);
  input.value = params.get("q") || "";

  function checkedValues(group) {
    return qsa('input[data-filter="' + group + '"]:checked').map(function (box) {
      return box.value;
    });
  }

  function matchesSubject(note, subjects) {
    if (!subjects.length) {
      return true;
    }
    var known = ["Python", "Programming", "Computer Science"];
    if (subjects.indexOf("Others") !== -1 && known.indexOf(note.category) === -1) {
      return true;
    }
    return subjects.indexOf(note.category) !== -1;
  }

  function render() {
    var text = input.value.trim().toLowerCase();
    var subjects = checkedValues("subject");
    var levels = checkedValues("level");
    var files = checkedValues("file");

    var results = NOTES.filter(function (note) {
      var haystack = (note.title + " " + note.description + " " + note.tags.join(" ") + " " + note.category).toLowerCase();
      if (text && haystack.indexOf(text) === -1) {
        return false;
      }
      if (!matchesSubject(note, subjects)) {
        return false;
      }
      if (levels.length && levels.indexOf(note.difficulty) === -1) {
        return false;
      }
      if (files.length && files.indexOf(note.fileType) === -1) {
        return false;
      }
      return true;
    });

    if (sort.value === "newest") {
      results.sort(function (a, b) {
        return a.date < b.date ? 1 : -1;
      });
    } else if (sort.value === "downloads") {
      results.sort(function (a, b) {
        return b.downloads - a.downloads;
      });
    } else if (sort.value === "rating") {
      results.sort(function (a, b) {
        return b.rating - a.rating;
      });
    }

    title.textContent = text
      ? results.length + ' results for "' + input.value.trim() + '"'
      : results.length + " notes available";

    list.innerHTML = results.length
      ? results.map(resultCardHtml).join("")
      : '<div class="empty-state"><h3>No notes found</h3><p class="muted">Try a different search or clear the filters.</p></div>';
  }

  qs("#searchForm").addEventListener("submit", function (event) {
    event.preventDefault();
    render();
  });

  input.addEventListener("input", render);
  sort.addEventListener("change", render);
  qsa("input[data-filter]").forEach(function (box) {
    box.addEventListener("change", render);
  });

  qs("#clearFilters").addEventListener("click", function () {
    qsa("input[data-filter]").forEach(function (box) {
      box.checked = false;
    });
    render();
    showToast("Filters cleared");
  });

  render();
});
