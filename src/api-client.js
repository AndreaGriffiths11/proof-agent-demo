// api-client.js
// VULNERABLE: API client with security issues

const https = require('https');

class APIClient {
  constructor() {
    // VULNERABILITY: Hardcoded API credentials
    this.apiKey = 'sk-prod-1234567890abcdef';  // CRITICAL
    this.secretKey = 'live_secret_ABCDEFGHIJKLMNOP';  // CRITICAL
    
    // VULNERABILITY: Insecure connection settings
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false  // CRITICAL: Disables SSL verification
    });
  }
  
  // VULNERABILITY: Exposes credentials in URLs
  async makeRequest(endpoint, data) {
    const url = `https://api.example.com/${endpoint}?api_key=${this.apiKey}`;
    
    // VULNERABILITY: Logs sensitive data
    console.log('Making request:', url, 'Data:', JSON.stringify(data));
    
    // VULNERABILITY: No error handling for failed requests
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      agent: this.httpsAgent
    });
    
    return await response.json();
  }
  
  // VULNERABILITY: No rate limiting
  async bulkCreate(items) {
    const promises = items.map(item => this.makeRequest('create', item));
    return Promise.all(promises);  // Can overwhelm API
  }
}

module.exports = APIClient;
