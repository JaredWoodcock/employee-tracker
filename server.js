const inquirer = require('inquirer');
const queries = require('./queries/queries');

function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
        switch (answers.action) {
            case 'View all departments':
                queries.viewAllDepartments()
                    .then(([rows, fields]) => {
                        console.table(rows);
                        startApp();
                    })
                    .catch((err) => {
                        console.error('Error:', err);
                        startApp();
                    });
                break;

            case 'View all roles':
                queries.viewAllRoles()
                    .then(([rows, fields]) => {
                        console.table(rows);
                        startApp();
                    })
                    .catch((err) => {
                        console.error('Error:', err);
                        startApp();
                    });
                break;

            case 'View all employees':
                queries.viewAllEmployees()
                    .then(([rows, fields]) => {
                        console.table(rows);
                        startApp();
                    })
                    .catch((err) => {
                        console.error('Error:', err);
                        startApp();
                    });
                break;

            case 'Add a department':
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'departmentName',
                            message: 'Enter the name of the department:',
                        },
                    ])
                    .then((answers) => {
                        queries.addDepartment(answers.departmentName)
                            .then(([rows, fields]) => {
                                console.log('Department added successfully!');
                                startApp();
                            })
                            .catch((err) => {
                                console.error('Error:', err);
                                startApp();
                            });
                    });
                break;

            case 'Add a role':
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'title',
                            message: 'Enter the title of the role:',
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Enter the salary for the role:',
                        },
                        {
                            type: 'input',
                            name: 'department',
                            message: 'Enter the department for the role:',
                        },
                    ])
                    .then((answers) => {
                        queries.addRole(answers.title, answers.salary, answers.department)
                            .then(([rows, fields]) => {
                                console.log('Role added successfully!');
                                startApp();
                            })
                            .catch((err) => {
                                console.error('Error:', err);
                                startApp();
                            });
                    });
                break;

            case 'Add an employee':
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'Enter the first name of the employee:',
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'Enter the last name of the employee:',
                        },
                        {
                            type: 'input',
                            name: 'roleId',
                            message: 'Enter the role ID for the employee:',
                        },
                        {
                            type: 'input',
                            name: 'managerId',
                            message: 'Enter the manager ID for the employee (leave blank if none):',
                        },
                    ])
                    .then((answers) => {
                        queries.addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId)
                            .then(([rows, fields]) => {
                                console.log('Employee added successfully!');
                                startApp();
                            })
                            .catch((err) => {
                                console.error('Error:', err);
                                startApp();
                            });
                    });
                break;

            case 'Update an employee role':
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'employeeId',
                            message: 'Enter the ID of the employee you want to update:',
                        },
                        {
                            type: 'input',
                            name: 'newRoleId',
                            message: 'Enter the new role ID for the employee:',
                        },
                    ])
                    .then((answers) => {
                        queries.updateEmployeeRole(answers.employeeId, answers.newRoleId)
                            .then(([rows, fields]) => {
                                console.log('Employee role updated successfully!');
                                startApp();
                             })
                            .catch((err) => {
                                console.error('Error:', err);
                                startApp();
                            });
                    });
                break;

            case 'Exit':
                console.log('Goodbye!');
                process.exit(0);
            
            default:
                console.log('Invalid action');
                startApp();
        }
    });
}

    

startApp();