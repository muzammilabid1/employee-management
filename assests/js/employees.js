import { deleteEmployee, getCurrentUser, getEmployees } from "./storage.js";
import { getElemBySelector, search, value } from "./utils.js";
import { setCurrentEmployees, getCurrentPageEmployees, getPaginationInfo } from "./pagination.js";

const tableWrapper = document.querySelector(".table-wrapper");
const tableBody = document.querySelector(".table-body");
export const displayEmployee = (employee) => {
  const tableRow = document.createElement("tr");
  tableRow.classList.add("table-row");
  tableRow.dataset.employeeId = employee.employeeId;
  tableRow.innerHTML = `
                      <td>${employee.employeeId}</td>

                      <td>
                        <div class="employee">
                          <figure class="employee-image">
                            <img src="${employee.imgUrl}" alt="Employee" />
                          </figure>

                          <div class="employee-content">
                            <h3>${employee.firstName} ${employee.lastName}</h3>

                            <p>${employee.email}</p>
                          </div>
                        </div>
                      </td>

                      <td>${employee.jobTitle}</td>

                      <td>
                        <span class="department">${employee.department} </span>
                      </td>

                      <td>
                        <span class="status ${employee.status}">${employee.status}</span>
                      </td>

                      <td>
                        <div class="employee-actions">
                          <button class="view-btn">
                            <i class="fa-solid fa-eye"></i>
                          </button>

                          <button class="edit-btn">
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>

                          <button class="delete-btn">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>`;
  tableBody.append(tableRow);
}
const renderEmployees = employees => {
  const currentPageEmployees = getCurrentPageEmployees(employees);

  tableBody.innerHTML = "";

  currentPageEmployees.forEach(employee => {
    displayEmployee(employee);
  });
};
document.addEventListener("paginationChange", e => {
  renderEmployees(e.detail);
  updatePaginationText(e.detail);
});
const allEmployees = getEmployees();
const currCompany = getCurrentUser();
const currCompanyEmployees = allEmployees.filter(employee => employee.companyId === currCompany);
renderEmployees(currCompanyEmployees);
const emptyState = document.querySelector(".employees-empty");


tableBody.addEventListener("click", (e) => {

  if (e.target.closest(".view-btn")) {
    const tableRow = e.target.closest(".table-row");
    const employeeId = tableRow.dataset.employeeId;
    const allEmployees = getEmployees();
    const currCompanyId = getCurrentUser();
    const currCompanyEmployees = allEmployees.filter(employee => employee.companyId === currCompanyId);
    const currCard = currCompanyEmployees.find(employee => employee.employeeId === employeeId);
    localStorage.setItem("cardToView", JSON.stringify(currCard));
    window.location.href = "view.html";
  }

  if (e.target.closest(".edit-btn")) {
    const tableRow = e.target.closest(".table-row");
    const employeeId = tableRow.dataset.employeeId;
    const allEmployees = getEmployees();
    const currCompanyId = getCurrentUser();
    const currCompanyEmployees = allEmployees.filter(employee => employee.companyId === currCompanyId);
    const currCard = currCompanyEmployees.find(employee => employee.employeeId === employeeId);
    localStorage.setItem("cardToEdit", JSON.stringify(currCard));
    window.location.href = "editcontact.html";
  }

  if (e.target.closest(".delete-btn")) {
    const tableRow = e.target.closest(".table-row");
    const employeeId = tableRow.dataset.employeeId;
    const shouldDelete = confirm("Are you sure you want to delete this employee?");
    if (!shouldDelete) return;
    deleteEmployee(employeeId);
    tableRow.remove();
    const remainingEmployees = getEmployees().filter(
      employee => employee.companyId === currCompany
    );

    if (remainingEmployees.length === 0) {
      emptyState.style.display = "flex";
    }
  }
})

const updatePaginationText = (employees) => {
  const paginationText = document.querySelector(".pagination-para");
  const { startIndex, endIndex } = getPaginationInfo(employees);

  paginationText.innerText =
    `Showing ${startIndex} to ${endIndex} of ${employees.length} employees`;
};

const filterBtn = document.querySelector(".filter-btn");
if (filterBtn) {
  filterBtn?.addEventListener("click", () => {
    const inp = value(getElemBySelector("#search"));
    const searchEmpty = document.querySelector(".search-empty");

    const searchedEmployees = search(inp, currCompanyEmployees);

    const pagination = document.querySelector(".employees-footer");
    if (inp === "") {
      searchEmpty.style.display = "none";
      pagination.style.display = "block"

      setCurrentEmployees(currCompanyEmployees);

      return;
    }

    if (searchedEmployees.length === 0) {
      searchEmpty.style.display = "flex";
      pagination.style.display = "none";
      tableBody.innerHTML = "";
      return;
    }

    searchEmpty.style.display = "none";

    setCurrentEmployees(searchedEmployees);
  });
}
const searchInput = document.querySelector("#search");

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    filterBtn.click();
  }
});
