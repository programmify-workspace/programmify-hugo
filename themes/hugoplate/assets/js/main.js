// main script
(function () {
  "use strict";

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.closest('.nav-item').classList.toggle("active");
    });
  });

  // Testimonial Slider
  // ----------------------------------------
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
})();



// Get the modal
const modal = document.getElementById('myModal');

// Get the close button
const closeBtn = document.getElementsByClassName("close")[0];

// Get the form
const form = document.getElementById("waitlistForm");

// When the user clicks the button, open the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on the close button, close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Form validation
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const emailError = document.getElementById('emailError');
  const emailSuccess = document.getElementById('emailSuccess');

  const formInput = event.target;
  const formData = new FormData(formInput);

  const emailInput = formData.get('email');
  const email = emailInput.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    emailError.classList.remove('hidden');
    emailSuccess.classList.add('hidden')
  } else {
    emailError.classList.add('hidden');
    // Perform action when email is valid (e.g., submit form)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Email was not sent!");
        }
        emailSuccess.classList.remove('hidden');
        clearEmailValue()
    })
      .catch((error) => alert(error.message));
      // modal.style.display = "none";
  }
});


const clearEmailValue = () => {
  let emailInput = document.getElementById("email")
  emailInput.value = ""
}
