/* NoteHub – home page rendering */

document.addEventListener("DOMContentLoaded", function () {
  // Categories
  var categoryGrid = qs("#categoryGrid");
  categoryGrid.innerHTML = CATEGORIES.map(function (category) {
    return (
      '<a class="category-card" href="search.html?q=' + encodeURIComponent(category.name) + '">' +
      '<span class="cat-icon" aria-hidden="true">' + (ICONS[category.icon] || ICONS.star) + "</span>" +
      "<strong>" + category.name + "</strong>" +
      "<span>" + category.notes + "</span>" +
      "</a>"
    );
  }).join("");

  // Popular notes (highest rated first)
  var popular = NOTES.slice()
    .sort(function (a, b) {
      return b.rating - a.rating;
    })
    .slice(0, 4);
  qs("#popularNotes").innerHTML = popular.map(noteCardHtml).join("");

  // Recently uploaded (newest first)
  var recent = NOTES.slice()
    .sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 5);
  qs("#recentList").innerHTML = recent
    .map(function (note) {
      return (
        '<div class="recent-item"><div>' +
        '<a class="note-title" href="note.html?id=' + note.id + '">' + note.title + "</a>" +
        '<p class="note-author">' + note.author + " &middot; " + note.date + "</p>" +
        "</div>" +
        metaHtml(note) +
        "</div>"
      );
    })
    .join("");

  // Top contributors
  qs("#contributorList").innerHTML = CONTRIBUTORS.map(function (person) {
    return (
      '<div class="contributor">' +
      '<span class="avatar" aria-hidden="true">' + initials(person.name) + "</span>" +
      '<div class="info"><strong>' + person.name + "</strong>" +
      "<span>" + person.notes + " notes &middot; " + person.downloads + " downloads</span></div>" +
      "</div>"
    );
  }).join("");

  // Hero search sends the user to the search page
  qs("#heroSearch").addEventListener("submit", function (event) {
    event.preventDefault();
    var value = qs("#heroQuery").value.trim();
    window.location.href = "search.html?q=" + encodeURIComponent(value);
  });
});
