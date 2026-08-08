/* ==========================================================================
   NoteHub – Sign Up page script (vanilla JavaScript)
   Features: show/hide password, live password requirements,
   inline validation, loading state, simulated success.
   ========================================================================== */

// --- Element references ---------------------------------------------------
var form = document.getElementById("signupForm");
var submitBtn = document.getElementById("submitBtn");
var btnLabel = submitBtn.querySelector(".btn-label");
var successMsg = document.getElementById("successMsg");

var fields = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirmPassword"),
  terms: document.getElementById("terms"),
};

var isLoading = false;

// --- Show / hide password -------------------------------------------------
var eyeButtons = document.querySelectorAll(".eye");
for (var i = 0; i < eyeButtons.length; i++) {
  eyeButtons[i].addEventListener("click", function () {
    var input = document.getElementById(this.getAttribute("data-target"));
    var hidden = input.type === "password";
    input.type = hidden ? "text" : "password";
    this.setAttribute("aria-label", hidden ? "Hide password" : "Show password");
  });
}

// --- Password requirement rules ------------------------------------------
var rules = {
  length: function (v) {
    return v.length >= 8;
  },
  upper: function (v) {
    return /[A-Z]/.test(v);
  },
  lower: function (v) {
    return /[a-z]/.test(v);
  },
  number: function (v) {
    return /[0-9!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/'`~;]/.test(v);
  },
};

// Update the requirement list live as the user types
function updateRequirements() {
  var value = fields.password.value;
  var items = document.querySelectorAll(".requirements li");
  for (var i = 0; i < items.length; i++) {
    var rule = items[i].getAttribute("data-rule");
    if (rules[rule](value)) {
      items[i].classList.add("ok");
    } else {
      items[i].classList.remove("ok");
    }
  }
}

function passwordIsStrong(value) {
  return (
    rules.length(value) &&
    rules.upper(value) &&
    rules.lower(value) &&
    rules.number(value)
  );
}

fields.password.addEventListener("input", updateRequirements);
updateRequirements();

// --- Inline error helpers -------------------------------------------------
function showError(name, message) {
  var errorEl = document.getElementById(name + "Error");
  errorEl.textContent = message;
  errorEl.classList.add("show");
  if (fields[name].type !== "checkbox") {
    fields[name].classList.add("invalid");
  }
}

function clearError(name) {
  var errorEl = document.getElementById(name + "Error");
  errorEl.textContent = "";
  errorEl.classList.remove("show");
  if (fields[name].type !== "checkbox") {
    fields[name].classList.remove("invalid");
  }
}

// Clear a field's error as soon as the user edits it
Object.keys(fields).forEach(function (name) {
  var eventName = fields[name].type === "checkbox" ? "change" : "input";
  fields[name].addEventListener(eventName, function () {
    clearError(name);
  });
});

// --- Validation ----------------------------------------------------------
function validate() {
  var valid = true;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  if (fields.firstName.value.trim() === "") {
    showError("firstName", "Please enter your first name.");
    valid = false;
  }

  if (fields.lastName.value.trim() === "") {
    showError("lastName", "Please enter your last name.");
    valid = false;
  }

  if (!emailPattern.test(fields.email.value.trim())) {
    showError("email", "Please enter a valid email address.");
    valid = false;
  }

  if (!passwordIsStrong(fields.password.value)) {
    showError("password", "Password does not meet the requirements below.");
    valid = false;
  }

  if (fields.confirmPassword.value === "") {
    showError("confirmPassword", "Please confirm your password.");
    valid = false;
  } else if (fields.confirmPassword.value !== fields.password.value) {
    showError("confirmPassword", "Passwords do not match.");
    valid = false;
  }

  if (!fields.terms.checked) {
    showError("terms", "Please accept the Terms of Service and Privacy Policy.");
    valid = false;
  }

  return valid;
}

// --- Submit: loading state then simulated success ------------------------
form.addEventListener("submit", function (event) {
  event.preventDefault(); // no real backend yet

  if (isLoading) return; // prevent duplicate submissions

  successMsg.classList.remove("show");

  if (!validate()) return;

  isLoading = true;
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  btnLabel.textContent = "Creating account...";

  window.setTimeout(function () {
    isLoading = false;
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    btnLabel.textContent = "Create account";
    successMsg.classList.add("show");
    form.reset();
    updateRequirements();
  }, 1500);
});
