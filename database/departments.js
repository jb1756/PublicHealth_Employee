const { connection } = require('../connection');

const Department = {
  getAllDepartments: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM departments', (err, departments) => {
        if (err) {
          reject(err);
        } else {
          resolve(departments);
        }
      });
    });
  },

  addDepartment: (department) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO departments SET ?', department, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};

module.exports = Department;