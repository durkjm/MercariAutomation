const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  categoryLink(name) {
    return this.page.getByRole('link', { name });
  }

  async gotoHome() {
    await this.goto('/');
  }

  async enterSection(name) {
    await this.categoryLink(name).click();
  }
}

module.exports = HomePage;
