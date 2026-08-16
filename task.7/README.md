# Telnyx.com — E2E Test Suite (WebdriverIO)

## Summary

End-to-end browser test suite for [telnyx.com](https://telnyx.com), built with WebdriverIO and TypeScript. The suite covers 20 test cases across home page, header navigation, pricing, footer, and the contact form, following the Page Object Model (POM): each page's selectors and actions live in `test/pageobjects/`, while test files in `test/specs/` only call those methods and assert on results — no raw selectors inside spec files.

If you're not a tester: this project is a set of scripts that open telnyx.com in a real Chrome browser and click through it the way a user would — checking that the logo links home, the footer links aren't broken, the contact form accepts input, and so on. Running it locally or in CI tells you, in a couple of minutes, whether something on the site changed in a way that broke a core interaction.

## Tech stack

- **WebdriverIO** `^9.30.1` (`@wdio/cli`, `@wdio/local-runner`, `@wdio/mocha-framework`)
- **TypeScript** `^7.0.2`
- **Mocha** (test framework, via `@wdio/mocha-framework`)
- **Allure** (`@wdio/allure-reporter` + `allure-commandline`) for HTML test reports
- **@faker-js/faker** for random test data generation
- Node.js `v22.23.2` (tested version; any Node 18+ should work)

## Requirements

- Node.js 18 or newer
- npm 10 or newer
- Google Chrome installed locally (CI runners already have it)
- Git

## Install

```bash
git clone <repository-url>
cd task.7
npm install
```

`npm install` reads `.npmrc` (`legacy-peer-deps=true`), which is required — some WebdriverIO peer dependency ranges conflict under npm's default strict resolver.

## Run tests

```bash
npm run wdio
```

This runs all specs in `test/specs/**/*.ts` against telnyx.com in headless Chrome (`--headless=new`, 1920×1080 window), using the config in `wdio.conf.ts`. `baseUrl` in that config is set to `https://telnyx.com`, so specs navigate with relative paths (`/pricing`, `/contact-us`, etc.).

To run a single spec file:
```bash
npx wdio run ./wdio.conf.ts --spec test/specs/pricing.e2e.ts
```

## Generate the Allure report

Test runs write raw results to `allure-results/`. To turn that into a browsable HTML report:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

The first command builds the report folder, the second serves it locally and opens it in your default browser.

## CI/CD (GitHub Actions)

`.github/workflows/tests.yml` runs on every push and pull request:

1. Checks out the repo, sets up Node 22
2. Runs `npm install` inside `task.7/`
3. Runs `npm run wdio` (headless Chrome)
4. Generates the Allure report
5. Publishes the report to the `gh-pages` branch via `peaceiris/actions-gh-pages`

Once GitHub Pages is enabled for the repo (**Settings → Pages → Source: `gh-pages` branch**), the latest report is viewable at `https://<username>.github.io/<repo>/` without downloading anything — useful for checking a run's result from a phone or a machine that doesn't have the project cloned.

## Project structure

```
task.7/
├── test/
│   ├── pageobjects/     — one class per page/section; selectors are private,
│   │                        only action/assertion methods are exposed
│   ├── specs/            — test files, grouped by area (home, navigation,
│   │                        pricing, footer, contact-us)
│   └── utils/             — random data generation (randomData.ts)
├── wdio.conf.ts           — WebdriverIO config (Chrome, headless, Allure reporter)
├── tsconfig.json          — TypeScript config
├── .npmrc                 — legacy-peer-deps=true (required for install)
└── package.json
```

## Known limitations

- Currently configured for Chrome only. Firefox and Edge configs are planned but not yet implemented.
- Not implemented yet: Docker image for local/CI execution.
- The LEGAL footer links test (TC-12) accepts both `200` and `403` responses — Telnyx's server occasionally returns `403` to automated `fetch()` requests (bot protection), which is not a real broken-link condition.