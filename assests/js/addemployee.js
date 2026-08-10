import { getCurrentUser, getEmployees, saveEmployees } from "./storage.js";
import { generatedId, value } from "./utils.js";

const allEmployees = getEmployees();
const currCompanyId = getCurrentUser();
const currCompanyEmployees = allEmployees.filter(employee => employee.companyId === currCompanyId);

const getFormData = () => {
    const employeeForm = document.querySelector(".employee-form");

    employeeForm.addEventListener("submit", (e) => {
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
        if (allEmployees.some(employee => employee.cnicNum === cnicNum)) {
            alert("This CNIC is already registered in the system.");
            return;
        }

        if (currCompanyEmployees.some(employee => employee.email === email)) {
            alert("This email is already registered for an employee in your company.");
            return;
        }

        if (currCompanyEmployees.some(employee => employee.phoneNum === phoneNum)) {
            alert("This phone number is already registered for an employee in your company.");
            return;
        }
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
                const employee = { companyId: currCompanyId, employeeId: generatedId(), firstName, lastName, email, imgUrl: reader.result, phoneNum, cnicNum, dob, gender, jobTitle, department, empType, joiningDate, salary, address, emergencyContName, emergencyContNum, status, }
                saveEmployees(employee);
                window.location.href = "employees.html"
            }
            reader.readAsDataURL(file);
        } else {
            alert("please upload a image!");
            return;
        }
    });
}
getFormData();

const picInput = document.querySelector("#picture");
const picText = document.querySelector(".pic-text");

picInput.addEventListener("change", () => {
    const file = picInput.files[0];

    if (file) {
        picText.innerText = "Picture selected";
    } else {
        picText.innerText = "Upload a picture";
    }
});