// sql-query-builder.js
// VULNERABLE: SQL injection vulnerabilities for demonstration

class SQLQueryBuilder {
  constructor(db) {
    this.db = db;
  }
  
  // VULNERABILITY: SQL Injection via string concatenation
  searchUsers(query) {
    const sql = "SELECT * FROM users WHERE name LIKE '%" + query + "%'";
    return this.db.query(sql);
  }
  
  // VULNERABILITY: SQL Injection via template literal
  getUserById(id) {
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    return this.db.query(sql);
  }
  
  // VULNERABILITY: SQL Injection in UPDATE statement
  updateUser(id, name, email) {
    const sql = "UPDATE users SET name = '" + name + "', email = '" + email + "' WHERE id = " + id;
    return this.db.query(sql);
  }
  
  // VULNERABILITY: SQL Injection in DELETE statement
  deleteUser(id) {
    const sql = `DELETE FROM users WHERE id = ${id}`;
    return this.db.query(sql);
  }
  
  // CORRECT: Parameterized query (for comparison)
  getUserByIdSafe(id) {
    const sql = "SELECT * FROM users WHERE id = $1";
    return this.db.query(sql, [id]);
  }
}

module.exports = SQLQueryBuilder;
