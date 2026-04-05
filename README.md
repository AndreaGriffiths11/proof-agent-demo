# proof-agent-demo

**Live demonstration of [proof-agent](https://github.com/AndreaGriffiths11/proof-agent) catching real security vulnerabilities.**

This repo contains intentionally vulnerable code to show how adversarial verification works.

---

## What's Here

**Vulnerable code examples:**
- `src/sql-query-builder.js` — SQL injection in 3 functions
- `src/config-loader.js` — Hardcoded secrets (password, API key)
- `src/vulnerable-auth.js` — Plain-text passwords, weak validation

**Proof Agent workflow:**
- `.github/workflows/proof-agent.yml` — Automatic verification on PRs

---

## How to See It in Action

1. **Fork this repo**
2. **Make a PR** with any changes to `src/`
3. **Watch proof-agent catch the vulnerabilities** and post a comment

Or check the existing demo PR: https://github.com/AndreaGriffiths11/proof-agent-demo/pull/1

---

## Example Verdict

```
VERDICT: FAIL

Security Issues Found:

1. SQL Injection (HIGH SEVERITY)
   - File: src/sql-query-builder.js
   - Line: 15
   - Issue: User input directly concatenated into SQL query
   - Exploitable: Yes (tested with `1 OR 1=1`)

2. Hardcoded Credentials (CRITICAL)
   - File: src/config-loader.js
   - Line: 8
   - Secret: Password "SuperSecret123!"

3. Hardcoded API Key (CRITICAL)
   - File: src/config-loader.js
   - Line: 12
   - Secret: API key "sk-1234567890abcdef-PRODUCTION-KEY"

Recommendation: BLOCK MERGE. Fix all critical issues before deployment.
```

---

## Try It Yourself

**Add proof-agent to your repo:**

```yaml
# .github/workflows/proof-agent.yml
name: Proof Agent

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write
  models: read

jobs:
  verify:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - uses: AndreaGriffiths11/proof-agent@v1.0.2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          base-ref: origin/main
          block-on-fail: true
          post-comment: true
```

**Zero setup. No API keys. No external services.**

Uses GitHub Models API (free tier) with the built-in `GITHUB_TOKEN`.

---

## Links

- **Proof Agent repo:** https://github.com/AndreaGriffiths11/proof-agent
- **GitHub Marketplace:** https://github.com/marketplace/actions/proof-agent-verify
- **Blog post:** (coming soon)

---

⚠️ **WARNING:** This code is intentionally vulnerable for demonstration purposes. Do NOT use it in production.
