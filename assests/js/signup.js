import { value } from "./utils.js";
import { saveCompanies, getCompanies, saveCurrentUser } from "./storage.js";


const showPassEye = document.querySelector(".password-toggle");
showPassEye?.addEventListener("click", () => {
    const passInp = document.querySelector("#password");
    if (passInp.type === "password") {
        passInp.type = "text";
    } else {
        passInp.type = "password";
    }
})

const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const compName = value(document.querySelector("#company-name"));
    const adminName = value(document.querySelector("#admin-name"));
    const email = value(document.querySelector("#email"));
    const password = value(document.querySelector("#password"));
    const confirmPassword = value(document.querySelector("#confirm-password"));

    const emailExists = getCompanies().some(company => company.email === email);
    if (emailExists) {
        alert("This email is already registered. Please use another email.");
        return;
    }
    if (confirmPassword !== password ) {
        alert("Passwords do not match. Please try again.")
        return;
    }

    const company = { id: crypto.randomUUID(), compName, adminName, email, password, confirmPassword };
    console.log(company);

    saveCompanies(company);
    saveCurrentUser(company.id);
    window.location.href = "dashboard.html"
})
