const inquirer = require('inquirer');
const connection = require("./config/connection");


// Function to start your application logic
function mainMenu() {
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
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewDepartments();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'View all employees':
            viewEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            connection.end(); // Close the database connection
            return;
        }
      });
  }

mainMenu();

function viewDepartments() {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table('Departments', res);
        mainMenu();
    });
  }

function viewRoles() {
    connection.query(
        'SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id',
        (err, res) => {
        if (err) throw err;
        console.table('Roles', res);
        mainMenu();
        }
    );
}

function viewEmployees() {
    const query = `
      SELECT 
        employees.id,
        employees.first_name,
        employees.last_name,
        roles.title,
        departments.name AS department,
        roles.salary,
        CONCAT(managers.first_name, ' ', managers.last_name) AS manager
      FROM 
        employees
      LEFT JOIN 
        roles ON employees.role_id = roles.id
      LEFT JOIN 
        departments ON roles.department_id = departments.id
      LEFT JOIN 
        employees managers ON employees.manager_id = managers.id`;
  
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table('Employees', res);
      menu();
    });
}

function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'department',
          message: "Enter the department's name:",
        },
      ])
      .then((answer) => {
        connection.query('INSERT INTO departments SET ?', { name: answer.department }, (err) => {
          if (err) throw err;
          console.log('Department added successfully!');
          menu();
        });
      });
}

function addRole() {
    connection.query('SELECT * FROM departments', (err, departments) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: "Enter the role's title:",
          },
          {
            type: 'input',
            name: 'salary',
            message: "Enter the role's salary:",
          },
          {
            type: 'list',
            name: 'department',
            message: "Select the role's department:",
            choices: departments.map((department) => department.name),
          },
        ])
        .then((answer) => {
          const department = departments.find((dept) => dept.name === answer.department);
          connection.query(
            'INSERT INTO roles SET ?',
            { title: answer.title, salary: answer.salary, department_id: department.id },
            (err) => {
              if (err) throw err;
              console.log('Role added successfully!');
              menu();
            }
          );
        });
    });
}