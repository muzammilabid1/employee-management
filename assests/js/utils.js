import { getEmployees, getCurrentUser } from "./storage.js";
const allEmployees = getEmployees();
const currCompanyId = getCurrentUser();
const currCompanyEmployees = allEmployees.filter(employee => employee.companyId === currCompanyId);
export const generatedId = () => {
    const date = Date.now().toString().slice(-6);
    const random = Math.floor(100 + Math.random() * 900);
    return `EMP-${date}${random}`
}

export const value = (inp) => {
    return inp.value.toLowerCase().trim().replaceAll(/\s+/g, " ");
}

export const getElemBySelector = (selector) => {
    return document.querySelector(selector);
}

export const search = (inp) => {
    const query = inp.trim().toLowerCase();

    return currCompanyEmployees.filter(employee =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.phoneNum.includes(query) ||
        employee.employeeId.toLowerCase().includes(query)
    );
};