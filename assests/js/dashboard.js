import { getEmployees, getCurrentUser, deleteEmployee } from "./storage.js";
import { getElemBySelector, search, value } from "./utils.js";

const employees = document.querySelector(".employees");
const allEmployees = getEmployees();
const currCompanyId = getCurrentUser();
const currCompanyEmployees = allEmployees.filter(employee => employee.companyId === currCompanyId);
const emptyState = document.querySelector(".employees-empty");
if (currCompanyEmployees.length === 0) {
  emptyState.style.display = "flex";
}
const recentEmployees = currCompanyEmployees.slice(-4).reverse();
let index = 500;
const displayRecentEmployee = (employee) => {
  const employees = document.querySelector(".employees");
  const article = document.createElement("article");

  article.classList.add("employees-card");

  article.setAttribute("data-aos", "zoom-in");
  article.setAttribute("data-aos-delay", `${index}`);
  article.dataset.employeeId = employee.employeeId;
  article.innerHTML = `<figure>
                    <img src="${employee.imgUrl}" alt="" />
                  </figure>
                  <p>${employee.firstName} ${employee.lastName}</p>
                  <p>${employee.jobTitle}</p>
                  <p>${employee.department}</p>
                  <div>
                    <i class="fa-solid fa-envelope"></i>
                    <p>${employee.email}</p>
                  </div>
                  <div>
                    <i class="fa-solid fa-phone"></i>
                    <p>${employee.phoneNum}</p>
                  </div>
                  <div class="btns">
                    <button class="view">view</button>
                    <button class="edit">edit</button>
                    <button class="delete">delete</button>
                  </div>`
  employees.append(article);
  index += 100;
}
recentEmployees.forEach(employee => displayRecentEmployee(employee));

employees?.addEventListener("click", (e) => {

  if (e.target.closest(".view")) {
    const employeeCard = e.target.closest(".employees-card");
    const employeeId = employeeCard.dataset.employeeId;
    const currCard = currCompanyEmployees.find(employee => employee.employeeId === employeeId);
    localStorage.setItem("cardToView", JSON.stringify(currCard));
    window.location.href = "view.html";
  }
  if (e.target.closest(".edit")) {
    const employeeCard = e.target.closest(".employees-card");
    const employeeId = employeeCard.dataset.employeeId;
    const currCard = currCompanyEmployees.find(employee => employee.employeeId === employeeId);
    localStorage.setItem("cardToEdit", JSON.stringify(currCard));
    window.location.href = "editcontact.html";
  }

  if (e.target.closest(".delete")) {
    const employeeCard = e.target.closest(".employees-card");
    const employeeId = employeeCard.dataset.employeeId;
    deleteEmployee(employeeId);
    employeeCard.remove();
    const remainingEmployees = getEmployees().filter(employee => employee.employeeId === currCompanyId);
    if (remainingEmployees.length === 0) {
      emptyState.style.display = "flex";
    }
  }
});

const totalEmployee = document.querySelector(".total-employee");
const totalEmployee2 = document.querySelector(".total");
if (totalEmployee) {
  totalEmployee.innerText = currCompanyEmployees.length;
  totalEmployee2.innerText = `+${currCompanyEmployees.length} This Month`;
}

const activeEmployeeText = document.querySelector(".active-employee");
const activeEmployeeText2 = document.querySelector(".active");
if (activeEmployeeText) {
  const activeEmployees = currCompanyEmployees.filter(employee => employee.status === "active");
  activeEmployeeText.innerText = activeEmployees.length;
  activeEmployeeText2.innerText = `+${activeEmployees.length} This Month`;
}

const inActiveEmployeeText = document.querySelector(".inactive-employee");
const inActiveEmployeeText2 = document.querySelector(".inactive");
if (inActiveEmployeeText) {
  const inActiveEmployees = currCompanyEmployees.filter(employee => employee.status === "inactive");
  inActiveEmployeeText.innerText = inActiveEmployees.length;
  inActiveEmployeeText2.innerText = `+${inActiveEmployees.length} This Month`
}

const departmentText = document.querySelector(".department-employee");
const departmentText2 = document.querySelector(".department");
if (departmentText) {
  const departmentEmployees = currCompanyEmployees;
  departmentText.innerText = departmentEmployees.length;
  departmentText2.innerText = `+${departmentEmployees.length} This Month`
}

const searchInp = getElemBySelector("#search");
searchInp?.addEventListener("input", (e) => {
  employees.innerHTML = ""
  const filteredEmployee = search(value(searchInp));
  if (filteredEmployee.length === 0) {
    employees.innerHTML = `
        <div class="search-empty">
            <i class="fa-solid fa-user-slash"></i>
            <h3>No employees found</h3>
            <p>We couldn't find any employees matching your search.</p>
        </div>
    `;
  } else {
    console.log(filteredEmployee);

    filteredEmployee.forEach(employee => {
      displayRecentEmployee(employee);
    })
  }
})
