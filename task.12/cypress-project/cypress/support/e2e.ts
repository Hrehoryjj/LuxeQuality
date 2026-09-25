import 'cypress-mochawesome-reporter/register';

const BLOCKED_AD_HOSTS = [
  'googlesyndication.com',
  'doubleclick.net',
  'googletagservices.com',
  'adtrafficquality.google',
  'fundingchoicesmessages.google.com',
];

beforeEach(() => {
  cy.intercept(new RegExp(BLOCKED_AD_HOSTS.join('|')), (req) => {
    req.destroy();
  });
});
