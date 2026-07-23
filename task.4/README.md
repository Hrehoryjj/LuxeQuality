# Task 4 — Cypress + Cucumber: telnyx.com

## About this repo folder
Automated UI test suite for the public site [telnyx.com](https://telnyx.com),
built with Cypress and Cucumber (Gherkin — human-readable Given/When/Then
scenarios) using the Page Object Model. Covers the homepage, header navigation,
pricing data, the Contact Us form, and footer link validation. No sign up or
log in flow is exercised anywhere in this suite.

## Requirements
- Node.js 18+
- npm
- Google Chrome (for local runs)

## How to get the code
```bash
git clone <repository URL>
cd <repository-name>/task.4
```

## Install
```bash
npm install
```

## Run the tests
Interactive (see the browser step by step):
```bash
npm run cy:open
```
Headless, all tests:
```bash
npm test
```

## Generate the report
```bash
npm run report
```
Open `cypress/reports/html/index.html` in a browser. It includes a pass/fail
summary chart and screenshots for any failed steps.

## CI
Every push or Pull Request that touches this folder triggers GitHub Actions
automatically. The generated HTML report is published to GitHub Pages after
a merge to `main`.