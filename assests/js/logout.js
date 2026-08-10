import { removeCurrentUser } from "./storage.js";

export const logout = () => {
    const logoutBtn = document.querySelector(".logout-btn");
    if (!logoutBtn) return;
        logoutBtn.addEventListener("click", () => {
            removeCurrentUser();
            window.location.href = "index.html";
        })
}