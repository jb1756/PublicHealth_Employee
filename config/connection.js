const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'your_password',
  database: 'your_database',
},
 console.log(`Connected to the PH_employee database`)
);

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
  // Call the function to start your application logic here
});