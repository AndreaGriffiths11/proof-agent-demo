// database-utils.js
// VULNERABLE: Database utilities with multiple security issues

const { Pool } = require('pg');

class DatabaseUtils {
  constructor() {
    // VULNERABILITY: Hardcoded database credentials
    this.pool = new Pool({
      user: 'admin',
      host: 'localhost',
      database: 'production_db',
      password: 'SuperSecretDBPassword123!',  // CRITICAL: Hardcoded password
      port: 5432,
    });
  }
  
  // VULNERABILITY: SQL injection via template literal
  async getUsersByRole(role) {
    const query = `SELECT * FROM users WHERE role = '${role}'`;
    return await this.pool.query(query);
  }
  
  // VULNERABILITY: No input validation
  async createUser(username, email, role) {
    // VULNERABILITY: SQL injection via concatenation
    const query = "INSERT INTO users (username, email, role) VALUES ('" +
      username + "', '" + email + "', '" + role + "')";
    
    return await this.pool.query(query);
  }
  
  // VULNERABILITY: Exposes sensitive user data
  async getAllUsers() {
    // Returns passwords, API keys, etc.
    const query = 'SELECT * FROM users';
    return await this.pool.query(query);
  }
}

module.exports = DatabaseUtils;
