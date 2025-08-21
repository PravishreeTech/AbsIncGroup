// alert('Heello Wolrd!');

function getValue(id) {
    const el = document.getElementById(id);
    return (el && el.value) ? el.value.trim() : "";
}

document.addEventListener("DOMContentLoaded", () => {
    const fonts = ["cursive", "sans-serif", "serif", "monospace"];
    let captchaValue = "";

    // Generate random captcha string
    function generateCaptcha() {
        let value = btoa(Math.random() * 1000000000);
        value = value.substr(0, 5 + Math.floor(Math.random() * 5));
        captchaValue = value;
    }

    // Display captcha characters with random rotation and font
    function setCaptcha() {
        let html = captchaValue
            .split("")
            .map((char) => {
                const rotate = -20 + Math.floor(Math.random() * 30);
                const font = Math.floor(Math.random() * fonts.length);
                return `<span style="transform:rotate(${rotate}deg); font-family:${fonts[font]};">${char}</span>`;
            })
            .join("");
        document.querySelector(".contact-form .captcha .preview").innerHTML = html;
    }

    // Initialize captcha on load + refresh
    function initCaptcha() {
        document
            .querySelector(".contact-form .captcha .captcha-refresh")
            .addEventListener("click", (e) => {
                e.preventDefault();
                generateCaptcha();
                setCaptcha();
                document.querySelector(".captcha-input").value = "";
            });
        generateCaptcha();
        setCaptcha();
    }
    initCaptcha();

    // ✅ Initialize EmailJS
    emailjs.init("YnXDg-Fl9ECD1bWm3");

    // ✅ Submit form (Captcha + EmailJS together)
    document.querySelector("#contactForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const inputCaptchaValue = document.querySelector(".contact-form .captcha-input").value;

        if (inputCaptchaValue === captchaValue) {
            // ✅ Captcha valid → send email
            const firstname = getValue("firstname");
            const lastname = getValue("lastname");
            const email = getValue("email");
            const company = getValue("company");
            const contact = getValue("contact");
            const subject = getValue("subject");
            const message = getValue("message");

            // const firstname = document.getElementById("firstname").value.trim();
            // const lastname = document.getElementById("lastname").value.trim();
            // const email = document.getElementById("email").value.trim();
            // const company = document.getElementById("company").value.trim();
            // const contact = document.getElementById("contact").value.trim();
            // const subject = document.getElementById("subject").value.trim();
            // const message = document.getElementById("message").value.trim();

            // Combine first and last name into fullname
            // const fullname = firstname + " " + lastname;

            const params = {
                from_firstname: firstname,
                from_lastname: lastname,
                // from_fullname: fullname,
                from_email: email,
                from_company: company,
                from_contact: contact,
                from_subject: subject,
                message: message,
            };

            console.log(params);

            emailjs
                .send("service_xoi6ahq", "template_3i9pf1e", params)
                .then(function () {
                    swal("Success!", "Your message has been sent.", "success");
                    document.getElementById("contactForm").reset();
                    generateCaptcha();
                    setCaptcha();
                })
                .catch(function (error) {
                    swal("Oops!", "Failed to send email. Try again.", "error");
                    console.error("EmailJS error:", error);
                });

        } else {
            // ❌ Wrong captcha
            swal("Oops!", "Invalid Captcha. Try again.", "error");
        }
    });
});