const { test } = require("@playwright/test");
const MercariHomePage = require("../pages/MercariHomePage");
const MercariCategoriesPage = require("../pages/MercariCategoriesPage");

test.describe("Mercari Application Search Tests", () => {
  let mercariTopPage;
  let mercariCategoryPage;

  test.beforeEach(async ({ page }) => {
    mercariTopPage = new MercariHomePage(page);
    mercariCategoryPage = new MercariCategoriesPage(page);

    await mercariTopPage.navigate();
  });

  test("Search conditions are set correctly on Mercari.", async () => {
    // Select an option in the search
    await mercariTopPage.selectSearchOption("カテゴリーからさがす");

    await mercariCategoryPage.verifyCategoriesPage();
    //Select the category we want.
    await mercariCategoryPage.selectCategory("本・雑誌・漫画");
    await mercariCategoryPage.verifySelectedCategoryPage("本・雑誌・漫画");

    //Select the subcategory we want.
    await mercariCategoryPage.selectCategory("本");
    await mercariCategoryPage.verifySelectedCategoryPage("本");

    //Select the subcategory we want.
    await mercariCategoryPage.selectCategory("コンピュータ・IT");

    //Here we assert that the dropdowns contains the selected categories.
    await mercariCategoryPage.validateSelectedCategoriesDropdowns(
      "本・雑誌・漫画",
      "本"
    );
    //Finally we assert that the checkbox for our category is set to true.
    await mercariCategoryPage.validateCategoryCheckboxIsAriaChecked(
      "コンピュータ・IT"
    );
  });

  test("Search conditions are set correctly from the latest browsing history.", async () => {
    // Comment: We can also create this histories, by adding this logic in a class helper so we can avoid repeating the code and have it in one only function.

    //Generate History 1 (Books, entertainment)
    await mercariTopPage.selectSearchOption("カテゴリーからさがす");

    await mercariCategoryPage.verifyCategoriesPage();
    await mercariCategoryPage.selectCategory("本・雑誌・漫画");
    await mercariCategoryPage.verifySelectedCategoryPage("本・雑誌・漫画");

    await mercariCategoryPage.selectCategory("本");
    await mercariCategoryPage.verifySelectedCategoryPage("本");

    await mercariCategoryPage.selectCategory("エンターテインメント");
    await mercariCategoryPage.validateCategoryCheckboxIsAriaChecked(
      "エンターテインメント"
    );

    //Generate History 2, (latest) (Books, computer TI)
    await mercariTopPage.selectSearchOption("カテゴリーからさがす");

    await mercariCategoryPage.verifyCategoriesPage();
    await mercariCategoryPage.selectCategory("本・雑誌・漫画");
    await mercariCategoryPage.verifySelectedCategoryPage("本・雑誌・漫画");

    await mercariCategoryPage.selectCategory("本");
    await mercariCategoryPage.verifySelectedCategoryPage("本");

    await mercariCategoryPage.selectCategory("コンピュータ・IT");
    await mercariCategoryPage.validateCategoryCheckboxIsAriaChecked(
      "コンピュータ・IT"
    );

    //Check now we have 2 history items
    await mercariTopPage.openSearchMenu();
    await mercariTopPage.checkHistoryItemsQuantity(2);

    //Check the first history item is the latest one and after entering, check side bar conditions
    await mercariTopPage.checkLatestHistoryItem("コンピュータ・IT");
    await mercariCategoryPage.validateCategoryCheckboxIsAriaChecked(
      "コンピュータ・IT"
    );
    await mercariCategoryPage.validateSelectedCategoriesDropdowns(
      "本・雑誌・漫画",
      "本"
    );

    //search for therm Javascript
    await mercariTopPage.search("Javascript");

    // go to mercari top page again and assert we have now 3 history elements.
    await mercariTopPage.navigate();
    await mercariTopPage.openSearchMenu();
    await mercariTopPage.checkHistoryItemsQuantity(3);

    //Verify the latest browsing history is showing correctly
    await mercariTopPage.checkLatestHistoryItem("Javascript");
  });
});
