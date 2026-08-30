const { faker } = require('@faker-js/faker');

function randomEmail() {
  return faker.internet.email();
}

function randomPassword() {
  return faker.internet.password({ length: 10 });
}

module.exports = { randomEmail, randomPassword };