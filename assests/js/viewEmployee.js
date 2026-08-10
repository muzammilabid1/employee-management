import { deleteEmployee } from "./storage.js";

const displayEmployeeDetails = (employee) => {
    const container = document.querySelector(".container");
    container.innerHTML = `<header>
    <div>
            <h1>employee details</h1>
          </div>
          <div class="btns">
          <button class="edit-btn">
          <i class="fa-solid fa-pen-to-square"></i>
              edit
            </button>
            <button class="dlt-btn">
            <i class="fa-solid fa-trash"></i>
            delete
            </button>
          </div>
        </header>
        <main>
        <div class="main-info">
        <div class="profile">
        <figure>
        <img src="${employee.imgUrl}" alt="" />
        </figure>
              <p>${employee.firstName} ${employee.lastName}</p>
              <p class="status">${employee.status}</p>
              <p>${employee.jobTitle}</p>
              <p class="department">${employee.department}</p>
              </div>
            <div class="personal-info">
              <h2>personal information</h2>
              <div class="id">
              <p>employee id</p>
              <p>${employee.employeeId}</p>
              </div>
              <div class="name">
                <p>full name</p>
                <p>${employee.firstName}${employee.lastName}</p>
              </div>
              <div class="email">
              <p>email</p>
              <p>${employee.email}</p>
              </div>
              <div class="phone">
              <p>phone</p>
                <p>${employee.phoneNum}</p>
                </div>
              <div class="cnic">
                <p>cnic</p>
                <p>${employee.cnicNum}</p>
                </div>
                <div class="dob">
                <p>date of birth</p>
                <p>${employee.dob}</p>
                </div>
              <div class="gander">
              <p>gender</p>
              <p>${employee.gender}</p>
              </div>
            </div>
            <div class="professional-info">
            <h2>professional information</h2>
            <div class="job-title">
            <p>job title</p>
                <p>${employee.jobTitle}</p>
                </div>
              <div class="department">
              <p>${employee.department}</p>
              <p>it</p>
              </div>
              <div class="employee-tyoe">
              <p>employee type</p>
              <p>${employee.empType}</p>
              </div>
              <div class="joining-date">
              <p>joining date</p>
                <p>${employee.joiningDate}</p>
              </div>
              <div class="salary">
              <p>salary</p>
                <p>pkr ${employee.salary}</p>
                </div>
                <div class="status">
                <p>status</p>
                <p>${employee.status}</p>
              </div>
            </div>
            </div>
          <div class="additional-info">
          <div class="address">
              <p>address</p>
              <p>${employee.address}</p>
            </div>
            <div class="emergency-cont">
              <p>emergency contact</p>
              <div class="emergencyinfo">
                <div>
                  <p>name</p>
                  <p>${employee.emergencyContName}</p>
                  </div>
                  <div>
                  <p>phone</p>
                  <p>${employee.emergencyContNum}</p>
                  </div>
              </div>
            </div>
            </div>
        </main>`
}
const employee = JSON.parse(localStorage.getItem("cardToView"));
displayEmployeeDetails(employee);

const editBtn = document.querySelector(".edit-btn");
editBtn.addEventListener("click",() => {
    localStorage.setItem("cardToEdit",JSON.stringify(employee));
    window.location.href = "editcontact.html";
    localStorage.removeItem("cardToView")
})

const deleteBtn = document.querySelector(".dlt-btn");
deleteBtn.addEventListener("click",() => {
  deleteEmployee(employee.employeeId);
  window.location.href = "employees.html";
})