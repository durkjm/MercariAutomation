const { expect } = require("@playwright/test");

class MercariCategoriesPage {
  constructor(page) {
    this.page = page;
    this.categoryBaseSelector = '[data-testid="merListItem-container"]';
    this.categoryHeadingLocator = page.getByRole("heading", {
      name: "カテゴリー",
    });
    this.categoriesDropdownsLocator = page.locator(
      'div[data-testid="facet-item-dropdown"]'
    );
  }

  async verifyCategoriesPage() {
    await expect(this.categoryHeadingLocator).toBeVisible();
  }

  async verifySelectedCategoryPage(categoryName) {
    const selectedCategoryLocatorHeading = this.page.getByRole("heading", {
      name: categoryName,
    });

    await expect(selectedCategoryLocatorHeading).toBeVisible();
  }

  async selectCategory(categoryOption) {
    const categoryLocator = this.page.locator(this.categoryBaseSelector, {
      hasText: categoryOption,
    });

    await expect(categoryLocator).toBeVisible();
    await expect(categoryLocator).toBeEnabled();
    await categoryLocator.click();
  }

  async validateSelectedCategoriesDropdowns(
    firstCategoryValue,
    secondCategoryValue
  ) {
    const firstCategoryDropdown = this.categoriesDropdownsLocator.first();
    await expect(firstCategoryDropdown).toBeVisible();
    const select = this.categoriesDropdownsLocator.first().locator("select");
    await expect(select).toBeVisible();
    const selectedValue = await select.evaluate((node) => node.value);
    const selectedText = await firstCategoryDropdown
      .locator(`option[value="${selectedValue}"]`)
      .evaluate((node) => node.textContent);

    expect(selectedText).toBe(firstCategoryValue);

    const secondCategoryDropdown = this.categoriesDropdownsLocator.nth(1);
    await expect(secondCategoryDropdown).toBeVisible();
    const secondSelect = secondCategoryDropdown.locator("select");
    await expect(secondSelect).toBeVisible();
    const secondSelectedValue = await secondSelect.evaluate(
      (node) => node.value
    );
    const secondSelectedText = await secondSelect
      .locator(`option[value="${secondSelectedValue}"]`)
      .evaluate((node) => node.textContent);

    expect(secondSelectedText).toBe(secondCategoryValue);
  }
  async validateCategoryCheckboxIsAriaChecked(categoryCheckLabel) {
    const checkbox = this.page.getByLabel(categoryCheckLabel);
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeChecked();
  }
}

module.exports = MercariCategoriesPage;
