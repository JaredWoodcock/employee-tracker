// Importing inquirer and the queries
const inquirer = require('inquirer');
const queries = require('./queries/queries');

// Function to start the application
function startApp() {
// Prompts the user with the below list of actions to choose from
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
        // Switch statement to handle different user choices
        switch (answers.action) {
            case 'View all departments':
                // Query and show all departments
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
                // Query and view all roles
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
                // Query and view all employees
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
                // Prompts the user to enter a new department name and adds it to the database
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
                // Prompts the user to enter a new role title, salary, and department id and adds it to the database
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
                            message: 'Enter the salary for the role (include decimals):',
                        },
                        {
                            type: 'input',
                            name: 'department',
                            message: 'Enter the department ID for the role:',
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
                // Prompts the user to enter a first and last name, role id to asign them to, and their manager id and adds it to the database
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
                // Prompts for the employee id that the user wants to update, then asks for the new role id and updates the database
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
                // Exits the application
                console.log('Goodbye!');
                process.exit(0);
            
            default:
                // Handles invalid actions
                console.log('Invalid action');
                startApp();
        }
    });
}

    
// Starts the application
startApp();