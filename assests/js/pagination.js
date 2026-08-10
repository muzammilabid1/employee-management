
import { getEmployees, getCurrentUser } from "./storage.js";

const allEmployees = getEmployees();
const currCompany = getCurrentUser();

const currCompanyEmployees = allEmployees.filter(
    employee => employee.companyId === currCompany
);
let currentEmployees = currCompanyEmployees;
let currentPage = 1;
const employeesPerPage = 5;

const getEmployeesForCurrentPage = employees => {
    const startIndex = (currentPage - 1) * employeesPerPage;
    const endIndex = startIndex + employeesPerPage;

    return employees.slice(startIndex, endIndex);
};

export const getCurrentPageEmployees = employees => {
    return getEmployeesForCurrentPage(employees);
};

const getTotalPages = employees => {
    return Math.ceil(employees.length / employeesPerPage);
};

const pagination = document.querySelector(".pagination");

const previousBtn = pagination.querySelector("button:first-child");
const nextBtn = pagination.querySelector("button:last-child");

const pageNumbers = document.querySelector(".page-numbers");


const renderPageNumbers = (employees) => {
    const totalPages = getTotalPages(employees);
    pageNumbers.innerHTML = "";
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");

        button.innerText = i;

        pageNumbers.append(button);
    }
};
renderPageNumbers(currCompanyEmployees);

const updateActivePage = () => {
    const buttons = pageNumbers.querySelectorAll("button");

    buttons.forEach(button => {
        button.classList.remove("active-page");
    });

    const activeButton = pageNumbers.querySelector(
        `button:nth-child(${currentPage})`
    );

    if (!activeButton) return;

    activeButton.classList.add("active-page");
};

/* ===========================
Initial Render
=========================== */

updateActivePage();

pageNumbers.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;
    
    currentPage = Number(e.target.innerText);
    
    updateActivePage();
    updatePaginationButtons(currentEmployees);
    notifyPageChange();
});
const updatePaginationButtons = (employees) => {
    const totalPages = getTotalPages(employees);

    if (totalPages === 0) {
        previousBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    previousBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
};
const notifyPageChange = () => {
    document.dispatchEvent(
        new CustomEvent("paginationChange", {
            detail: currentEmployees
        })
    );
};
previousBtn.addEventListener("click", () => {
    if (currentPage === 1) return;
    
    currentPage--;
    
    updateActivePage();
    updatePaginationButtons(currentEmployees);
    notifyPageChange();
});

nextBtn.addEventListener("click", () => {
    const totalPages = getTotalPages(currentEmployees);
    
    if (currentPage === totalPages) return;

    currentPage++;

    updateActivePage();
    updatePaginationButtons(currentEmployees);
    notifyPageChange();
}); 
const updatePagination = (employees) => {
    const totalPages = getTotalPages(employees);

  if (currentPage > totalPages) {
      currentPage = totalPages || 1;
  }
  
  renderPageNumbers(employees);
  updateActivePage();
  updatePaginationButtons(employees);
};

export const setCurrentEmployees = (employees) => {
    currentEmployees = employees;
    currentPage = 1;
    
    updatePagination(currentEmployees);
    notifyPageChange();
};

export const getPaginationInfo = (employees) => {
    const startIndex = (currentPage - 1) * employeesPerPage;

    const endIndex = Math.min(
        startIndex + employeesPerPage,
        employees.length
    );

    return {
        startIndex: startIndex + 1,
        endIndex
    };
};
