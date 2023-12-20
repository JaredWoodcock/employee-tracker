// Importing the database connection
const connection = require('../connection/connection');

// Function to view all departments and formatting for column headers
function viewAllDepartments() {
    const query = `
        SELECT
            department.id AS \`Department ID\`,
            department.name AS \`Department Name\`
        FROM 
            department
    `;
    return connection.promise().query(query);
}

// Function to view all roles and formatting for column headers
function viewAllRoles() {
    const query = `
        SELECT
            role.id AS \`Role ID\`,
            role.title AS \`Title\`,
            role.salary AS \`Salary\`,
            department.name AS \`Department Name\`
        FROM
            role
        INNER JOIN
            department ON role.department_id = department.id
    `;
    return connection.promise().query(query);
}

// Function to view all employees and formatting for column headers
function viewAllEmployees() {
    const query = `
        SELECT
            employee.id AS \`Employee ID\`,
            employee.first_name AS \`First Name\`,
            employee.last_name AS \`Last Name\`,
            role.title AS \`Role Name\`,
            department.name AS \`Department\`,
            role.salary AS \`Salary\`,
            employee.manager_id AS \`Manager ID\`
        FROM
            employee
        INNER JOIN
            role ON employee.role_id = role.id
        INNER JOIN
            department ON role.department_id = department.id
    `;
    return connection.promise().query(query);
}

// Function to add a new department
function addDepartment(departmentName) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    return connection.promise().query(query, [departmentName]);
}

// Function to add a new role
function addRole(title, salary, departmentId) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    return connection.promise().query(query, [title, salary, departmentId]);
}

// Function to add a new employee
function addEmployee(firstName, lastName, roleId, managerId) {
    const managerIdValue = managerId === '' ? null : managerId;
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    return connection.promise().query(query, [firstName, lastName, roleId, managerIdValue]);
}

// Function to update an employee's role
function updateEmployeeRole(employeeId, newRoleId) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    return connection.promise().query(query, [newRoleId, employeeId]);
}

// Exporting all functions
module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};