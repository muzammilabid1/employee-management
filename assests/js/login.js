import { getCompanies, saveCurrentUser } from "./storage.js";
import { value } from "./utils.js";

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit",(e) => {
    e.preventDefault();
    const email = value(document.querySelector("#email"));
    const password = value(document.querySelector("#password"));

    const currCompany = getCompanies().find(company => company.email === email && company.password === password);
 
    if(!currCompany){
        alert("Invalid email or password. Please check your credentials and try again");
        return;
    }
    saveCurrentUser(currCompany.id);
    window.location.href = "dashboard.html";
})