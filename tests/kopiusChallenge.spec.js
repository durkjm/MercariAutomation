const { test } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const CategoryPage = require('../pages/CategoryPage');

let homePage;
let categoryPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  categoryPage = new CategoryPage(page);
  await homePage.gotoHome();
  await homePage.readyState();
});

test('Should search browserContext on Playwright docs', async () => {
  await homePage.enterSection('Docs');
  await categoryPage.assertMainHeadingIs('Installation');
  await categoryPage.openSearch();
  await categoryPage.search('browserContext');
  await categoryPage.clickSearchResult('browserContext');
  await categoryPage.assertUrlContains('/class-browsercontext');
});
