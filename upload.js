/* NoteHub – upload page (multi-step, no real upload) */

document.addEventListener("DOMContentLoaded", function () {
  var ALLOWED = ["pdf", "docx", "ppt", "pptx", "jpg", "jpeg", "png"];
  var MAX_MB = 50;
  var chosenFile = null;

  var dropzone = qs("#dropzone");
  var fileInput = qs("#fileInput");
  var fileError = qs("#fileError");

  function showStep(step) {
    [1, 2, 3].forEach(function (number) {
      qs("#step" + number).hidden = number !== step;
      qs('[data-step="' + number + '"]').classList.toggle("active", number === step);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* --- Step 1: file selection --------------------------------------- */
  function handleFile(file) {
    var extension = file.name.split(".").pop().toLowerCase();
    if (ALLOWED.indexOf(extension) === -1) {
      fileError.textContent = "Unsupported file type. Use PDF, DOCX, PPT, JPG or PNG.";
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      fileError.textContent = "File is too large. Maximum size is " + MAX_MB + "MB.";
      return;
    }
    fileError.textContent = "";
    chosenFile = file;
    qs("#fileName").textContent = file.name;
    qs("#fileSize").textContent = (file.size / 1024 / 1024).toFixed(2) + " MB";
    qs("#fileChip").classList.add("show");
  }

  qs("#chooseBtn").addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    if (fileInput.files && fileInput.files[0]) {
      handleFile(fileInput.files[0]);
    }
  });

  ["dragenter", "dragover"].forEach(function (type) {
    dropzone.addEventListener(type, function (event) {
      event.preventDefault();
      dropzone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach(function (type) {
    dropzone.addEventListener(type, function (event) {
      event.preventDefault();
      dropzone.classList.remove("dragover");
    });
  });

  dropzone.addEventListener("drop", function (event) {
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFile(event.dataTransfer.files[0]);
    }
  });

  /* --- Step 2: details validation ----------------------------------- */
  function validateDetails() {
    var ok = true;

    if (!qs("#title").value.trim()) {
      qs("#titleError").textContent = "Title is required.";
      ok = false;
    } else {
      qs("#titleError").textContent = "";
    }

    if (!qs("#subject").value) {
      qs("#subjectError").textContent = "Choose a subject.";
      ok = false;
    } else {
      qs("#subjectError").textContent = "";
    }

    if (qs("#description").value.trim().length < 10) {
      qs("#descriptionError").textContent = "Write at least 10 characters.";
      ok = false;
    } else {
      qs("#descriptionError").textContent = "";
    }

    return ok;
  }

  /* --- Navigation --------------------------------------------------- */
  qsa("[data-next]").forEach(function (button) {
    button.addEventListener("click", function () {
      var next = Number(button.getAttribute("data-next"));
      if (next === 2 && !chosenFile) {
        fileError.textContent = "Please choose a file first.";
        return;
      }
      if (next === 3) {
        if (!validateDetails()) {
          return;
        }
        qs("#pvFile").textContent = chosenFile ? chosenFile.name : "—";
        qs("#pvTitle").textContent = qs("#title").value.trim();
        qs("#pvSubject").textContent = qs("#subject").value;
        qs("#pvDifficulty").textContent = qs("#difficulty").value;
        qs("#pvDescription").textContent = qs("#description").value.trim();
        qs("#pvTags").textContent = qs("#tags").value.trim() || "—";
      }
      showStep(next);
    });
  });

  qsa("[data-back]").forEach(function (button) {
    button.addEventListener("click", function () {
      showStep(Number(button.getAttribute("data-back")));
    });
  });

  /* --- Publish (simulated) ------------------------------------------ */
  qs("#publishBtn").addEventListener("click", function () {
    var button = qs("#publishBtn");
    var spinner = qs("#publishSpinner");
    button.disabled = true;
    spinner.hidden = false;

    window.setTimeout(function () {
      spinner.hidden = true;
      button.disabled = false;
      qs("#publishSuccess").hidden = false;
      showToast("Note published (demo)");
    }, 1300);
  });
});
