const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require("./config/connection");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
  // Call the function to start your application logic here
});

// Function to start your application logic
function Mainmenu() {
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

// Call the function to start your application
startApp();