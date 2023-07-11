const { connection } = require('../connection');

const Role = {
    getAllRoles: () => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM roles', (err, roles) => {
          if (err) {
            reject(err);
          } else {
            resolve(roles);
          }
        });
      });
    },
  
    addRole: (role) => {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO roles SET ?', role, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }
  };
  
  module.exports = Role;