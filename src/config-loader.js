// config-loader.js
// VULNERABLE: Hardcoded secrets for demonstration

class ConfigLoader {
  constructor() {
    // CRITICAL VULNERABILITY: Hardcoded password
    this.adminPassword = "SuperSecret123!";
    
    // CRITICAL VULNERABILITY: Hardcoded API key
    this.apiKey = "sk-1234567890abcdef-PRODUCTION-KEY";
    
    this.databaseUrl = process.env.DATABASE_URL || "postgresql://localhost/mydb";
  }
  
  getAdminCredentials() {
    return {
      username: "admin",
      password: this.adminPassword  // Never hardcode passwords!
    };
  }
  
  getApiKey() {
    // VULNERABILITY: Production API key in source code
    return this.apiKey;
  }
  
  getDatabaseConfig() {
    return {
      url: this.databaseUrl,
      // VULNERABILITY: Hardcoded database password
      password: "db_password_123"
    };
  }
}

module.exports = ConfigLoader;
