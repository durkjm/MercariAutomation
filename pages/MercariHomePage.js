const { expect } = require("@playwright/test");

class MercariHomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole("search", { name: "検索" });
    this.historyItems = page.locator(
      'section[data-testid="search-history"] div[role="listitem"]'
    );
    this.searchButton = page.getByRole("button", { name: "検索", exact: true });
  }

  async navigate() {
    await this.page.goto("/");
  }

  async openSearchMenu() {
    await this.searchInput.click();
  }

  async search(searchTherm) {
    await this.searchInput.click();
    await this.searchInput.type(searchTherm);
    await this.searchButton.click();
  }

  async selectSearchOption(searchOption) {
    await this.searchInput.click();
    await this.page.getByRole("link", { name: searchOption }).click();
  }

  async checkHistoryItemsQuantity(amountItems) {
    await expect(this.historyItems).toHaveCount(amountItems);
  }

  async checkLatestHistoryItem(searchedItem) {
    const firstHistoryItem = this.historyItems.first();
    await expect(firstHistoryItem).toContainText(searchedItem);
    await firstHistoryItem.click();
  }
}

module.exports = MercariHomePage;
