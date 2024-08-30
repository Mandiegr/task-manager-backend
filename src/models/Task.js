const db = require('../config/db');

class Task {
  constructor(title, description, userId, status) {
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.status = status || 'pendente';
  
  }

  static create(newTask) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)`;
      db.run(query, [newTask.title, newTask.description, newTask.userId], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  }

  static findAllByUser(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM tasks WHERE user_id = ?`;
      db.all(query, [userId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM tasks WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  static update(id, updatedTask) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE tasks SET title = ?, description = ? WHERE id = ?`;
      db.run(query, [updatedTask.title, updatedTask.description, id], function(err) {
        if (err) reject(err);
        resolve(this.changes);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM tasks WHERE id = ?`;
      db.run(query, [id], function(err) {
        if (err) reject(err);
        resolve(this.changes);
      });
    });
  }

    static updateStatus(id, status) {
      return new Promise((resolve, reject) => {
        const query = `UPDATE tasks SET status = ? WHERE id = ?`;
        db.run(query, [status, id], function(err) {
          if (err) reject(err);
          resolve(this.changes);
        });
      });
    }

    static findAllByUserAndStatus(userId, status) {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM tasks WHERE user_id = ? AND status = ?`;
        db.all(query, [userId, status], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
    }
    
    

}

module.exports = Task;
