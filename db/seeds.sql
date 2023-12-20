INSERT INTO department (id, name) VALUES
(1, 'Management'),
(2, 'Sales'),
(3, 'Engineering'),
(4, 'Finance'),
(5, 'HR');


INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'CEO', 300000.00, 1),
(2, 'Sales Manager', 75000.00, 2),
(3, 'Engineering Director', 150000.00, 3),
(4, 'Software engineer', 80000.00, 3),
(5, 'Financial Manager', 200000.00, 4),
(6, 'HR Manager', 75000.00, 5);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Big', 'Boss', 1, NULL),
(2, 'John', 'Doe', 2, 1),
(3, 'Chris', 'Engine', 3, 1),
(4, 'Jane', 'Doe', 4, 3),
(5, 'LeBron', 'James', 5, 1),
(6, 'Albert', 'Pujols', 6, 1);