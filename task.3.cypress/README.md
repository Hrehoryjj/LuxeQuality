# Task 3 — Cypress E2E Tests for Telnyx

## Summary
E2E test automation framework for https://telnyx.com built with Cypress and TypeScript using Page Object Model pattern.

## Requirements
- Node.js >= 18
- npm >= 9

## Installation
cd task.3.cypress
npm install

## Running Tests
# Headless mode
npm run test:headless

# Headed mode
npm run test:headed

## Creating Report
npm run test
Report will be generated in cypress/reports folder after test run.

## Test Cases
- TC-01: Home Page Loads Successfully
- TC-02: Logo Click Redirects to Home Page
- TC-03: Navigation Menu Dropdown Appears on Click
- TC-04: Navigation Submenu Link Redirects to Correct Page
- TC-05: Pricing Page Displays Valid Price Values
- TC-06: AI Chat Returns Non-Empty Response
- TC-07: Contact Us Submit Button Is Clickable
- TC-08: API Validation of Footer COMPANY Section Internal Links
- TC-09: API Validation of Footer LEGAL Section Internal Links
- TC-10: API Validation of Footer COMPARE Section Internal Links