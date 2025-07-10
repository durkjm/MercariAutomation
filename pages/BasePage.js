const { expect } = require('@playwright/test');

class BasePage {

  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async assertUrlContains(partialUrl) {
    await expect(this.page).toHaveURL(new RegExp(partialUrl));
  }

  async readyState() {
    await this.page.waitForLoadState('load');
  }
}

module.exports = BasePage;
