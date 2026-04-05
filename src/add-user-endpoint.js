// add-user-endpoint.js
// NEW FEATURE: Add user registration endpoint
// VULNERABLE: Combines multiple security issues

const express = require('express');
const SQLQueryBuilder = require('./sql-query-builder');
const VulnerableAuth = require('./vulnerable-auth');

const app = express();
app.use(express.json());

const db = /* assume database connection */;
const queryBuilder = new SQLQueryBuilder(db);
const auth = new VulnerableAuth();

// VULNERABILITY: No input validation
app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;
  
  // VULNERABILITY: Weak password validation
  if (!auth.validatePassword(password)) {
    return res.status(400).json({ error: "Password too weak" });
  }
  
  try {
    // VULNERABILITY: SQL injection in registration
    const user = await queryBuilder.updateUser(
      'new',
      username,
      email
    );
    
    // VULNERABILITY: Plain-text password storage
    auth.registerUser(username, password);
    
    res.json({ success: true, user });
  } catch (error) {
    // VULNERABILITY: Exposes internal error details
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

module.exports = app;
