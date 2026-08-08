/* NoteHub – login page validation (mock, no backend) */

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("loginForm");
  var email = document.getElementById("password") && document.getElementById("email");
  var password = document.getElementById("password");
  var submitBtn = document.getElementById("submitBtn");
  var successMsg = document.getElementById("successMsg");

  // Password show / hide
  document.querySelectorAll(".eye").forEach(function (button) {
    button.addEventListener("click", function () {
      var input = document.getElementById(button.getAttribute("data-target"));
      var hidden = input.type === "password";
      input.type = hidden ? "text" : "password";
      button.setAttribute("aria-label", hidden ? "Hide password" : "Show password");
      button.classList.toggle("on", hidden);
    });
  });

  function setError(input, id, message) {
    document.getElementById(id).textContent = message;
    input.classList.toggle("invalid", Boolean(message));
  }

  function validate() {
    var ok = true;

    if (!email.value.trim()) {
      setError(email, "emailError", "Email address is required.");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      setError(email, "emailError", "Enter a valid email address.");
      ok = false;
    } else {
      setError(email, "emailError", "");
    }

    if (!password.value) {
      setError(password, "passwordError", "Password is required.");
      ok = false;
    } else if (password.value.length < 8) {
      setError(password, "passwordError", "Password must be at least 8 characters.");
      ok = false;
    } else {
      setError(password, "passwordError", "");
    }

    return ok;
  }

  [email, password].forEach(function (input) {
    input.addEventListener("blur", validate);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    window.setTimeout(function () {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      successMsg.classList.add("show");

      try {
        localStorage.setItem("notehub_logged_in", "true");
        localStorage.setItem("notehub_email", email.value.trim());
      } catch (error) {
        /* ignore in demo */
      }

      window.setTimeout(function () {
        window.location.href = "home.html";
      }, 900);
    }, 1200);
  });

  document.getElementById("googleBtn").addEventListener("click", function () {
    successMsg.textContent = "Google login is not available in this demo.";
    successMsg.classList.add("show");
  });
});
