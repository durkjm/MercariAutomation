const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class CategoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchInput = page.locator('#docsearch-input');
  }

  async assertMainHeadingIs(expectedText) {
    await expect(this.page.getByRole('heading', { level: 1 })).toHaveText(expectedText);
  }

  async openSearch() {
    await this.searchButton.click();
  }

  async search(term) {
    await this.searchInput.fill(term);
  }

  async clickSearchResult(name) {
    await this.page.getByRole('link', { name }).first().click();
  }
}

module.exports = CategoryPage;
