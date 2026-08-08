/* NoteHub – profile page */

document.addEventListener("DOMContentLoaded", function () {
  qs("#bookmarkCount").textContent = String(getBookmarks().length);

  // Notes uploaded by this user (mock data)
  var myNotes = NOTES.filter(function (note) {
    return note.author === "Alamin Ali";
  }).concat(NOTES.slice(4, 7));

  qs("#myNotes").innerHTML = myNotes
    .map(function (note) {
      return (
        '<article class="note-card">' +
        fileIconHtml(note.fileType) +
        '<a class="note-title" href="/note.html?id=' + note.id + '">' + note.title + "</a>" +
        '<p class="note-desc">' + note.description + "</p>" +
        metaHtml(note) +
        '<div class="my-note-actions">' +
        '<button class="btn btn-secondary btn-sm" type="button" data-edit="' + note.id + '">Edit</button>' +
        '<button class="btn btn-secondary btn-sm" type="button" data-delete="' + note.id + '">Delete</button>' +
        "</div></article>"
      );
    })
    .join("");

  qs("#myNotes").addEventListener("click", function (event) {
    var edit = event.target.closest("[data-edit]");
    var remove = event.target.closest("[data-delete]");
    if (edit) {
      showToast("Editing is not available in this demo");
    }
    if (remove) {
      remove.closest(".note-card").remove();
      showToast("Note deleted (demo)");
    }
  });

  qs("#followList").innerHTML = CONTRIBUTORS.map(function (person) {
    return (
      '<div class="contributor">' +
      '<span class="avatar" aria-hidden="true">' + initials(person.name) + "</span>" +
      '<div class="info"><strong>' + person.name + "</strong>" +
      "<span>" + person.notes + " notes &middot; " + person.downloads + " downloads</span></div>" +
      "</div>"
    );
  }).join("");
});
