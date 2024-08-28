const db = require('../config/db');

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static create(newUser) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
      db.run(query, [newUser.email, newUser.password], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = ?`;
      db.get(query, [email], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
}

module.exports = User;
