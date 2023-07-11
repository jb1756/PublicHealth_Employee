const inquirer = require('inquirer');
const connection = require("./config/connection");
const { query } = require('express');


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
  const query = `SELECT * FROM departments`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table('departments', res);
        mainMenu();
    });
  }

function viewRoles() {
    const query = 
    `SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table('roles', res);
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
      console.table('employees', res);
      mainMenu();
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
          console.log('Public Health Department added successfully!');
          mainMenu();
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
              console.log('Public Health Role added successfully!');
              mainMenu();
            }
          );
        });
    });
}

function addEmployee() {
    connection.query('SELECT * FROM roles', (err, roles) => {
      if (err) throw err;
  
      connection.query('SELECT * FROM employees', (err, employees) => {
        if (err) throw err;
  
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'first_name',
              message: "Enter the employee's first name:",
            },
            {
              type: 'input',
              name: 'last_name',
              message: "Enter the employee's last name:",
            },
            {
              type: 'list',
              name: 'role',
              message: "Select the employee's role:",
              choices: roles.map((role) => role.title),
            },
            {
              type: 'list',
              name: 'manager',
              message: "Select the employee's manager:",
              choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
            },
          ])
          .then((answer) => {
            const role = roles.find((r) => r.title === answer.role);
            const manager = employees.find(
              (employee) => `${employee.first_name} ${employee.last_name}` === answer.manager
            );
  
            connection.query(
              'INSERT INTO employees SET ?',
              { first_name: answer.first_name, last_name: answer.last_name, role_id: role.id, manager_id: manager.id },
              (err) => {
                if (err) throw err;
                console.log('PH Employee added successfully!');
                mainMenu();
              }
            );
          });
      });
    });
}

function updateEmployeeRole() {
    connection.query('SELECT * FROM employees', (err, employees) => {
      if (err) throw err;
  
      connection.query('SELECT * FROM roles', (err, roles) => {
        if (err) throw err;
  
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employee',
              message: 'Select the employee to update:',
              choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
            },
            {
              type: 'list',
              name: 'role',
              message: 'Select the new role:',
              choices: roles.map((role) => role.title),
            },
          ])
          .then((answer) => {
            const employee = employees.find(
              (employee) => `${employee.first_name} ${employee.last_name}` === answer.employee
            );
            const role = roles.find((role) => role.title === answer.role);
  
            connection.query(
              'UPDATE employees SET ? WHERE ?',
              [{ role_id: role.id }, { id: employee.id }],
              (err) => {
                if (err) throw err;
                console.log('Public Health Employee role updated successfully!');
                mainMenu();
              }
            );
          });
      });
    });
}
  
  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
    mainMenu(); // Start the menu
  });