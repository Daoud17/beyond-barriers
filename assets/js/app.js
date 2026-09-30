/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("active");

        menuToggle.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        document.body.style.overflow = isOpen ? "hidden" : "";

    });


    /* Close menu when clicking a navigation link */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            document.body.style.overflow = "";

        });

    });


    /* Close mobile menu if screen becomes desktop size */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 820) {

            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            document.body.style.overflow = "";

        }

    });

}


/* =========================
   CONTACT SUBJECT FROM URL
========================= */

const subjectInput = document.getElementById("subject");

if (subjectInput) {

    const urlParameters = new URLSearchParams(window.location.search);

    const subjectFromURL = urlParameters.get("subject");

    if (subjectFromURL) {
        subjectInput.value = subjectFromURL;
    }

}


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("formSuccessMessage");

if (contactForm && successMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* Get Form Fields */

        const fullName = document.getElementById("fullName");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        let formValid = true;


        /* =========================
           REMOVE PREVIOUS ERRORS
        ========================= */

        const formFields = [
            fullName,
            phone,
            email,
            subject,
            message
        ];

        formFields.forEach(field => {

            if (field) {
                field.classList.remove("invalid");
            }

        });


        /* =========================
           FULL NAME
        ========================= */

        if (!fullName || fullName.value.trim().length < 2) {

            if (fullName) {
                fullName.classList.add("invalid");
            }

            formValid = false;
        }


        /* =========================
           LEBANESE PHONE NUMBER
        ========================= */

        if (phone) {

            const cleanedPhone = phone.value.replace(/[\s\-()]/g, "");

            /*
                Accepted examples:

                03 685 440
                03685440
                +961 3 685 440
                +9613685440

                70 123 456
                +961 70 123 456

                71, 76, 78, 79, 81
            */

            const lebanesePhonePattern =
                /^(?:\+961|00961|961|0)?(?:3|70|71|76|78|79|81)\d{6}$/;

            if (!lebanesePhonePattern.test(cleanedPhone)) {

                phone.classList.add("invalid");

                formValid = false;
            }

        } else {

            formValid = false;

        }


        /* =========================
           EMAIL
        ========================= */

        if (email) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.value.trim())) {

                email.classList.add("invalid");

                formValid = false;
            }

        } else {

            formValid = false;

        }


        /* =========================
           SUBJECT
        ========================= */

        if (!subject || subject.value.trim().length < 2) {

            if (subject) {
                subject.classList.add("invalid");
            }

            formValid = false;
        }


        /* =========================
           MESSAGE
        ========================= */

        if (!message || message.value.trim().length < 5) {

            if (message) {
                message.classList.add("invalid");
            }

            formValid = false;
        }


        /* =========================
           STOP IF FORM IS INVALID
        ========================= */

        if (!formValid) {

            successMessage.classList.remove("show");

            return;
        }


        /* =========================
           SUCCESS
        ========================= */

        successMessage.classList.add("show");

        contactForm.reset();


        /* Scroll to success message */

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });

}