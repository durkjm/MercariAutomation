const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 2,

  reporter: "html",
  use: {
    headless: false,
    baseURL: "https://jp.mercari.com/",
  },
  expect: {
    timeout: 15000,
  },
});
