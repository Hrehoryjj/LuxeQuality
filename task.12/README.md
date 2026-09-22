# Task 12

## Summary

This project is a hands-on comparison of AI-assisted test automation tools. It covers the same
public demo e-commerce site (automationexercise.com) — user registration/login and product
browsing/search — automated three different ways:

- **Cursor + Playwright MCP**
- **Claude Code + Playwright MCP**
- **Cypress cy.prompt** (Cypress's own AI test-writing feature)

The goal is to see how each tool performs at writing and maintaining browser tests from
natural-language instructions, not to build a production test suite for a real product.

## Requirements

- Node.js and npm
- A modern browser (Chrome/Chromium) — installed automatically by the test tools, no manual setup needed
- A Cypress Cloud account — only required to run the Cypress tests, since `cy.prompt` depends on it
- Cursor or Claude Code with MCP access — only needed if you're writing *new* tests, not to run the existing ones

## Installation

```
cd playwright-project && npm install
cd cypress-project && npm install
```

Before running the Cypress tests for the first time, log in to Cypress Cloud once (`npx cypress open` and follow the login prompt) — `cy.prompt` won't run without it.

## How to run tests

```
cd playwright-project && npx playwright test
cd cypress-project && npx cypress run
```

## How to generate reports

- **Playwright:** a report is generated automatically after each run. Open it with:
  ```
  npx playwright show-report
  ```
- **Cypress:** a report is generated automatically after each run at `cypress/reports/html/index.html` — open that file directly in a browser.

## Test Cases

Test cases are tracked outside this repository:

- Google Sheet: https://docs.google.com/spreadsheets/d/1Y4bj_zPMeptBYA5Dk6GXxt1jw1xV2iNJHELHdcxINrU/edit?usp=sharing
- Jira epic: https://gregorymarkkjk.atlassian.net/browse/T3C-48
