import { getElemBySelector, value} from "./utils.js";
import { getEmployees, getCurrentUser, updateEmployee } from "./storage.js";

const allEmployees = getEmployees();
const currCompanyId = getCurrentUser();
const currCompanyEmployees = allEmployees.filter(employee => employee.companyId === currCompanyId);

const getEmployeeToEdit = () => {
    return JSON.parse(localStorage.getItem("cardToEdit"));
};
const populateEmployeeForm = () => {
    const employee = getEmployeeToEdit();
    // console.log(employee);

    getElemBySelector("#employee-id").value = employee.employeeId;
    getElemBySelector("#first-name").value = employee.firstName;
    getElemBySelector("#last-name").value = employee.lastName;
    getElemBySelector("#email").value = employee.email;
    getElemBySelector("#phone").value = employee.phoneNum;
    getElemBySelector("#cnic").value = employee.cnicNum;
    getElemBySelector("#dob").value = employee.dob;
    getElemBySelector("#gender").value = employee.gender;
    getElemBySelector("#job-title").value = employee.jobTitle;
    getElemBySelector("#department").value = employee.department;
    getElemBySelector("#employment-type").value = employee.empType;
    getElemBySelector("#joining-date").value = employee.joiningDate;
    getElemBySelector("#salary").value = employee.salary;
    getElemBySelector("#address").value = employee.address;
    getElemBySelector("#emergency-contact").value = employee.emergencyContName;
    getElemBySelector("#emergency-phone").value = employee.emergencyContNum;
    getElemBySelector("#status").value = employee.status;


}
populateEmployeeForm();
const picInput = document.querySelector("#picture");
const picText = document.querySelector(".pic-text");

picInput.addEventListener("change", () => {
    const file = picInput.files[0];

    if (file) {
        picText.innerText = "Picture changed";
    } else {
        picText.innerText = "Upload a picture";
    }
});
const toUpdateEmployee = () => {
    const cardId = getEmployeeToEdit();
    const employeeEditId = cardId.employeeId;
    const employeeToUpdate = currCompanyEmployees.find(employee => employee.employeeId === employeeEditId);

    const editForm = document.querySelector(".edit-form");
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const firstName = value(document.querySelector("#first-name"));
        const lastName = value(document.querySelector("#last-name"));
        const email = document.querySelector("#email").value.trim();
        const phoneNum = value(document.querySelector("#phone"));
        const cnicNum = value(document.querySelector("#cnic"));
        const dob = value(document.querySelector("#dob"));
        const gender = value(document.querySelector("#gender"));
        const jobTitle = value(document.querySelector("#job-title"));
        const department = value(document.querySelector("#department"));
        const empType = value(document.querySelector("#employment-type"));
        const joiningDate = value(document.querySelector("#joining-date"));
        const salary = value(document.querySelector("#salary"));
        const address = value(document.querySelector("#address"));
        const emergencyContName = value(document.querySelector("#emergency-contact"));
        const emergencyContNum = value(document.querySelector("#emergency-phone"));
        const status = value(document.querySelector("#status"));
        const picInput = document.querySelector("#picture");
        const file = picInput.files[0];
        const reader = new FileReader();
        if (
            allEmployees.some(
                employee =>
                    employee.cnicNum === cnicNum &&
                    employee.employeeId !== employeeEditId
            )
        ) {
            alert("This CNIC is already registered in the system.");
            return;
        }
        if (
            currCompanyEmployees.some(
                employee =>
                    employee.email === email &&
                    employee.employeeId !== employeeEditId
            )
        ) {
            alert("This email is already registered for an employee in your company.");
            return;
        }
        if (
            currCompanyEmployees.some(
                employee =>
                    employee.phoneNum === phoneNum &&
                    employee.employeeId !== employeeEditId
            )
        ) {
            alert("This phone number is already registered for an employee in your company.");
            return;
        }
        employeeToUpdate.firstName = firstName;
        employeeToUpdate.lastName = lastName;
        employeeToUpdate.email = email;
        employeeToUpdate.phoneNum = phoneNum;
        employeeToUpdate.cnicNum = cnicNum;
        employeeToUpdate.dob = dob;
        employeeToUpdate.gender = gender;
        employeeToUpdate.jobTitle = jobTitle;
        employeeToUpdate.department = department;
        employeeToUpdate.empType = empType;
        employeeToUpdate.joiningDate = joiningDate;
        employeeToUpdate.salary = salary;
        employeeToUpdate.address = address;
        employeeToUpdate.emergencyContName = emergencyContName;
        employeeToUpdate.emergencyContNum = emergencyContNum;
        employeeToUpdate.status = status;
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload an image.");
                return;
            }
            if (file.size > 200000) {
                alert("Image must be less than 200KB");
                return;
            }
            reader.onload = function () {
                employeeToUpdate.imgUrl = reader.result;
                updateEmployee(employeeToUpdate);
                window.location.href = "employees.html"
            }
            reader.readAsDataURL(file);
        } else {
            const imageUrl = cardId.imgUrl;
            employeeToUpdate.imgUrl = imageUrl;
            updateEmployee(employeeToUpdate)
            window.location.href = "employees.html"
        }
    })
};
toUpdateEmployee();