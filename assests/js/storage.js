const getCompanies = () => {
    return JSON.parse(localStorage.getItem("companies")) || [];
};

const saveCompanies = (company) => {
    const companies = getCompanies();
    companies.push(company);
    localStorage.setItem("companies", JSON.stringify(companies));
};

const getEmployees = () => {
    return JSON.parse(localStorage.getItem("employees")) || [];
};

const saveEmployees = (employee) => {
    const employees = getEmployees();
    employees.push(employee)
    localStorage.setItem("employees", JSON.stringify(employees));
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};


const saveCurrentUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
};

const removeCurrentUser = () => {
    localStorage.removeItem("currentUser");
};

const updateEmployee = (updatedEmployee) => {
    const employees = getEmployees();

    const employeeIndex = employees.findIndex(
        employee => employee.employeeId === updatedEmployee.employeeId
    );

    if (employeeIndex === -1) {
        return;
    }

    employees[employeeIndex] = updatedEmployee;

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );
};

const deleteEmployee = (employeeId) => {
    const employees = getEmployees();

    const updatedEmployees = employees.filter(
        employee => employee.employeeId !== employeeId
    );

    localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
    );
};

// export
export {
    getCompanies,
    saveCompanies,
    getEmployees,
    saveEmployees,
    getCurrentUser,
    saveCurrentUser,
    removeCurrentUser,
    updateEmployee,
    deleteEmployee
};