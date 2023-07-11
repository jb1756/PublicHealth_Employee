const { connection } = require('../connection');

const Employee = {
    getAllEmployees: () => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM employees', (err, employees) => {
          if (err) {
            reject(err);
          } else {
            resolve(employees);
          }
        });
      });
    },
  
    addEmployee: (employee) => {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO employees SET ?', employee, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
  
    updateEmployeeRole: (employeeId, roleId) => {
      return new Promise((resolve, reject) => {
        connection.query(
          'UPDATE employees SET role_id = ? WHERE id = ?',
          [roleId, employeeId],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }
  };
  
  module.exports = Employee;