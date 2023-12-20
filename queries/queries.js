const connection = require('../connection/connection');

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
  
function addDepartment(departmentName) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    return connection.promise().query(query, [departmentName]);
}

function addRole(title, salary, departmentId) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    return connection.promise().query(query, [title, salary, departmentId]);
}

function addEmployee(firstName, lastName, roleId, managerId) {
    const managerIdValue = managerId === '' ? null : managerId;
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    return connection.promise().query(query, [firstName, lastName, roleId, managerIdValue]);
}

function updateEmployeeRole(employeeId, newRoleId) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    return connection.promise().query(query, [newRoleId, employeeId]);
}


module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};