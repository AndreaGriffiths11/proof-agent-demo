// vulnerable-auth.js
// VULNERABLE: Insecure authentication patterns for demonstration

const crypto = require('crypto');

class VulnerableAuth {
  constructor() {
    this.users = new Map();
  }
  
  // VULNERABILITY: Storing passwords in plain text
  registerUser(username, password) {
    if (this.users.has(username)) {
      throw new Error("User already exists");
    }
    
    // CRITICAL: Password stored without hashing
    this.users.set(username, {
      password: password,  // Should use bcrypt or similar
      createdAt: new Date()
    });
    
    return { success: true, username };
  }
  
  // VULNERABILITY: Timing attack susceptible comparison
  login(username, password) {
    const user = this.users.get(username);
    
    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }
    
    // VULNERABILITY: Direct string comparison (timing attack)
    if (user.password === password) {
      return { success: true, token: this.generateToken(username) };
    }
    
    return { success: false, error: "Invalid credentials" };
  }
  
  // VULNERABILITY: Weak token generation
  generateToken(username) {
    // INSECURE: Predictable token based on timestamp
    const timestamp = Date.now();
    return crypto.createHash('md5')
      .update(username + timestamp)
      .digest('hex');
  }
  
  // VULNERABILITY: No rate limiting, brute force possible
  validatePassword(password) {
    // WEAK: Minimal password requirements
    return password.length >= 6;
  }
}

module.exports = VulnerableAuth;
