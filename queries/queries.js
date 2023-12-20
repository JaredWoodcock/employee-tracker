const connection = require('../connection/connection');

function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    return connection.promise().query(query);
}

function viewAllRoles() {
    const query = 'SELECT * FROM role';
    return connection.promise().query(query);
}

function viewAllEmployees() {
    const query = 'SELECT * FROM employee';
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
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    return connection.promise().query(query, [firstName, lastName, roleId, managerId]);
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