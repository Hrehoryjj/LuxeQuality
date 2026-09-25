# Prompts

## Cursor + Playwright MCP

### Prompt

> Implement the Playwright test cases below for https://automationexercise.com, following
> .cursor/rules/testing.mcd exactly — locators derived only via the Playwright MCP server, page
> objects created before specs, everything confined to tests/cursor/. TC-05 Verify Subscription in
> home page (scroll to footer, verify "SUBSCRIPTION", enter email, click arrow button, verify
> success message) and TC-06 Remove Products From Cart (add products to cart, open cart page,
> remove one product via its "X" button, verify it's gone).

### Locators (verified via curl against live HTML + `cart.js`)

- Footer subscription heading: `#footer h2` (text "Subscription", CSS-uppercased on screen)
- Email input: `#susbscribe_email` — genuine typo in the site's own id ("susbscribe")
- Submit button: `#subscribe`
- Success message: `#success-subscribe .alert-success`, hidden until a successful subscribe
- Cart nav link: `#header a[href="/view_cart"]` — **must be scoped to `#header`**; an unscoped
  `a[href="/view_cart"]` also matches the "View Cart" link inside the add-to-cart confirmation
  modal (`#cartModal`), which stays in the DOM even when hidden, causing a Playwright strict-mode
  violation
- Add to cart: `.add-to-cart[data-product-id]`, confirmed via `cart.js`:
  `$('.add-to-cart').on('click', ...)`
- Modal dismiss ("Continue Shopping"): `.close-modal`
- Cart row: `#product-<id>`, confirmed via `cart.js`'s delete handler:
  `document.getElementById('product-' + product).remove()`
- Remove/"X" button: `.cart_quantity_delete[data-product-id]`, confirmed via `cart.js`:
  `$('.cart_quantity_delete').on('click', ...)`

### Finding: a cookie-consent overlay blocks clicks

Google's "Funding Choices" consent dialog (`div.fc-consent-root`, `div.fc-dialog-overlay`)
intercepted pointer events on the Add to Cart buttons on first run, causing both specs to fail
with pointer-event-interception errors. Fixed the same way TC-01/TC-02 handled their ad overlay:
an auto-use fixture (`tests/cursor/fixtures/test.ts`) that routes and aborts requests to
`fundingchoicesmessages.google.com` (plus the same ad hosts already blocked in the
`tests/claude-code/` fixture) before navigation, so the dialog never renders.

### Result

`npx playwright test tests/cursor` — 2 passed, run twice in a row to confirm repeatability (no
leftover cart/subscription state between runs).

### Finding: the rules file was silently ignored

The prompt above points at `.cursor/rules/testing.mcd` — but Cursor only loads rule files with the
`.mdc` extension. `.mcd` is not a format Cursor recognizes, so this rules file was most likely
never loaded for the run that produced `tests/cursor/`, despite the prompt naming it explicitly.

Evidence, from the code that came out of that run:

- The page objects use raw CSS/id locators — `#footer h2`, `#susbscribe_email`,
  `.add-to-cart[data-product-id]` — although rule 4 requires locator discovery through Playwright
  MCP and rule 7 requires preferring role/label/placeholder/test-id locators.
- The "Locators" section above says they were "verified via curl against live HTML + `cart.js`",
  although rule 4 says locator discovery must be performed via playwright-mcp, not curl.

Lesson: a rules file silently not loading is not a loud failure — the agent just falls back to its
own judgment and produces code that looks plausible but violates the rules nobody checked were
active. Before trusting an agent's output against a rules file, ask the agent to quote a specific
rule back before it starts (see Appendix A in the setup prompt) — if it can't, the rules aren't
loaded.

Decision: `tests/cursor/` was deliberately **not** regenerated after the fix. TC-05 and TC-06
above are kept exactly as they were produced under the broken `.mcd` rules file, so they remain
the evidence for this finding — CSS/id locators, curl-based verification, and all. Only the
non-functional file issues around them (rules file extension, missing trailing newlines in
`.cursor/mcp.json` / `testing.mdc`) were fixed; the tests themselves still pass unchanged
(`npx playwright test tests/cursor` — 2 passed).

## Claude Code + Playwright MCP

### Prompt

> Implement two Playwright test cases for automationexercise.com per the rules in CLAUDE.md (this
> project's root). Follow it exactly: locators discovered only via the Playwright MCP server, POM files
> before specs, everything confined to `tests/claude-code/`. Set up `playwright.config.ts` (baseURL,
> testDir, testMatch limited to specs, HTML reporter, trace on first retry) and `tsconfig.json` (ES2022,
> bundler resolution, strict). Implement TC-01 Register User (register + verify + delete account) and
> TC-02 Login User with correct email/password (login with the seeded `test@te.si` / `Test1234!` account),
> using MCP to derive every locator, building page objects first, then specs with `expect(...)`
> assertions, then running `npx playwright test` until green.

### MCP-derived findings

- **Ad overlay blocks clicks.** A Google AdSense vignette (`iframe[id^=aswift]` inside
  `ins.adsbygoogle`) intercepts pointer events on `Signup` and `Continue` buttons. Fixed with an
  auto-use Playwright fixture (`tests/claude-code/fixtures/test.ts`) that routes and aborts requests to
  the ad-serving hosts before any navigation, so the overlay never loads.
- **Broken label wiring.** `<label for="city">Zipcode *</label>` — the "Zipcode" label actually points at
  the City input. `getByLabel('Zipcode')`/`getByLabel('City')` are unreliable for that field.
- **Duplicate placeholder text.** `/login` renders two "Email Address" textboxes (login form + signup
  form), so an unscoped `getByPlaceholder('Email Address')` is ambiguous.
- **Headings are uppercased by CSS only** — DOM text is `Enter Account Information`,
  `Account Created!`, `Account Deleted!`; assertions use case-insensitive regexes rather than the
  all-caps text a screenshot shows.
- **Every form field exposes a stable `data-qa` attribute** (e.g. `signup-name`, `login-email`,
  `create-account`, `account-created`, `continue-button`). Configured
  `testIdAttribute: 'data-qa'` in `playwright.config.ts` and used `getByTestId(...)` for all form
  fields/buttons in the page objects; role/heading/link locators cover everything else (nav links,
  headings, checkboxes/radios).
- Locators for `Account Created!`, `Account Deleted!`, and `Continue` (`data-qa="account-created"`,
  `"account-deleted"`, `"continue-button"`) were confirmed by driving a real signup → delete cycle
  through MCP before writing the page objects.

### Deviation from the written spec

TC-02 as written ends with **Delete Account**, but the only seeded credentials
(`test@te.si` / `Test1234!`) are shared/fixed, so deleting that account on the first run would break
every subsequent run. Per user direction, TC-02 was originally implemented as **login-only** against
the seeded account: "Login to your account" heading, log in, assert "Logged in as ..." — no delete
step.

That still left a weak oracle (the assertion would pass even if the wrong account logged in) and a
dependency on a shared account on a public site anyone can delete. Fixed in Phase 2: TC-02 now uses
a `registeredUser` fixture (`tests/claude-code/fixtures/test.ts`) that creates a throwaway user
through the site's own `POST /api/createAccount` before the test and deletes it through
`DELETE /api/deleteAccount` after, via a small helper (`tests/claude-code/api/userApi.ts`). Both
endpoints were confirmed with `curl` first: HTTP 200 with a JSON body carrying `responseCode`
(`201` create / `200` delete) and a `message`, asserted with `expect(...)` so a broken fixture fails
loudly instead of silently. The spec then asserts `Logged in as <exact generated name>`, not just
that some "Logged in as" text is visible — confirmed against the live "Logged in as <b>Name</b>"
markup via MCP first. `existingUserCredentials` was removed from `testData/userData.ts` since
nothing uses it anymore. TC-01 is unaffected — it already registered and deleted its own account.

### Result

`npx playwright test tests/claude-code` — 2 passed, run twice in a row to confirm repeatability (no
leftover accounts: both TC-01 and TC-02 now create and delete their own user via the API).

Also flagged to the user (not applied without confirmation): the MCP server writes browser snapshots to
`playwright-project/.playwright-mcp/`, which `task.12/.gitignore` doesn't currently exclude.

## Cypress cy.prompt

TC-03 and TC-04 are driven by `cy.prompt`, Cypress's AI natural-language command. Requires
Cypress 15.4.0+ and a linked Cypress Cloud project — the project was upgraded from 13.17.0 to
15.21.1 and a Cloud project connected (`projectId: 'wrecjm'` in `cypress.config.ts`). No Page
Object Model is used here: `cy.prompt` resolves elements itself from the natural-language
description, so there's nothing for a POM layer to wrap.

### Hybrid approach: AI for navigation, deterministic code for the oracle

`cy.prompt` evaluates its own "verify" steps with an AI judgment call, not a fixed assertion. That
is fine for steps like "the heading text is visible" where there's one obvious right answer, but it
is the wrong tool for the actual pass/fail oracle of a test: an AI-evaluated assertion can be talked
into passing on the wrong behaviour by a loosely worded prompt (see the two findings below — both
are exactly that failure mode). So from Phase 2 on, `cy.prompt` is used only for navigation and
simple visibility checks; every assertion that actually decides whether the test caught a real bug
is plain deterministic Cypress code (`cy.get(...).should(...)`) reading real DOM state.

### TC-03 Verify All Products and product detail page — `view-all-products.cy.ts`

Originally asserted that the detail page *has* a name/category/price/etc., which would pass even if
clicking "View Product" opened the wrong product. Fixed by reading the first product's name with
plain Cypress before navigating, then asserting the detail page's `<h2>` equals that exact name:

```ts
cy.visit('/');
cy.prompt([
  'click the Products link in the navigation menu',
  'verify the page heading text "All Products" is visible',
  'verify a list of products is visible',
]);

cy.get('.product-image-wrapper .productinfo p').first().invoke('text').as('firstProductName');

cy.prompt(['click the View Product link on the first product in the list']);

cy.get('@firstProductName').then((firstProductName) => {
  cy.get('.product-information h2').should('have.text', firstProductName);
});

cy.prompt([
  'verify the product detail page shows the product category',
  'verify the product detail page shows the product price',
  'verify the product detail page shows the product availability',
  'verify the product detail page shows the product condition',
  'verify the product detail page shows the product brand',
]);
```

### TC-04 Search Product — `search-product.cy.ts`

Originally used a vague AI oracle ("verify most of the displayed products are related to ...")
that could pass even with a broken search. Replaced with two deterministic assertions: the result
set is non-empty, and it contains a specific product name confirmed live to contain "Top"
(`Blue Top`, product id 1):

```ts
cy.visit('/');
cy.prompt([
  'click the Products link in the navigation menu',
  'type "Top" into the product search input',
  'click the search button',
  'verify the page heading text "Searched Products" is visible',
]);

cy.get('.product-image-wrapper .productinfo p').should('have.length.greaterThan', 0);
cy.contains('.product-image-wrapper .productinfo p', 'Blue Top').should('be.visible');
```

### Finding: the site's search is not a strict name-substring match

Searching "Top" returns 14 products (confirmed live via MCP), but 2 of them ("Little Girls Mr.
Panda Shirt", "Colour Blocked Shirt – Sky Blue") don't contain "Top" in their name — the site's
search matches loosely (likely across category/other fields too). The original TC-04 prompt worked
around this with a vague AI oracle ("most of the displayed products", "allowing for the site's known
loose/fuzzy search matching"); that oracle is gone now (see "Hybrid approach" above) and the
loose-search behaviour is documented here instead of baked into a prompt or a code comment. The
replacement assertion (`have.length.greaterThan(0)` + one confirmed matching name) doesn't need to
know about the loose matches at all.

### Finding: ambiguous prompt phrasing produces wrong assertions

First attempt used `'verify the current page is the All Products page'` / `'...Searched Products
page'` as a step. The AI interpreted "current page is X" as a literal `cy.url().should('eq', 'X')`
string-equality check against the URL — which obviously never equals a page name — failing both
specs. Rephrased to reference visible text instead of the ambiguous "current page" phrasing
(`'verify the page heading text "All Products" is visible'`), which fixed both.

### Result

<!-- FILL: `npx cypress run` output for view-all-products.cy.ts / search-product.cy.ts after the
Phase 2 hybrid-oracle changes — could not be executed in the coding session's environment, see the
note to the user in this session's final report. Selectors and product data used in the new
deterministic assertions (`.product-image-wrapper .productinfo p`, `.product-information h2`,
`Blue Top`, "Searched Products" heading) were confirmed live via Playwright MCP, not guessed. -->
