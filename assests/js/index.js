import { loadComponents } from "./layout.js";
import { logout } from "./logout.js";
import { getCompanies, getCurrentUser, getEmployees } from "./storage.js";

const init = async () => {
  try {
    await loadComponents("sidebar", "./partials/side-bar.html");

    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector(".close-btn");

    menuBtn.addEventListener("click", () => {
      sidebar.classList.add("show");
      menuBtn.classList.add("hide");

      document.body.classList.add("sidebar-open");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
      menuBtn.classList.remove("hide");
      
      document.body.classList.remove("sidebar-open");
    });
    logout();

    const currCompanyId = getCurrentUser()
    const currCompany = getCompanies().find(company => company.id === currCompanyId);
    const adminName = document.querySelector(".admin-name");
    if (adminName && currCompany) {
      adminName.innerText = currCompany.adminName;
    }
  } catch (err) {
    console.error(err);
  }
};

init();

if (window.location.pathname.endsWith("dashboard.html")) {
  const btn = document.querySelector(".viewall-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "employees.html";
    });
  }
}

if (window.location.pathname.endsWith("addcontact.html")) {
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }
}

if (window.location.pathname.endsWith("editcontact.html")) {
  const backBtn = document.querySelector(".back-btn");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "employees.html";
    });
  }
}
