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
function startApp() {
  // TODO: Implement your application logic here
}

// Call the function to start your application
startApp();