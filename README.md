# 🧪 Playwright Automation Framework

## Test Design Explanation

My test was developed by following the **Page Object Model (POM)** pattern with **Playwright** and **JavaScript**. It implements page classes: `HomePage`, which handles global navigation actions like accessing the Docs section, and `CategoryPage`, which handles interactions within the documentation area (like validating headings and using the search functionality). A `BasePage` class is used to encapsulate shared utilities such as URL assertions and navigation helpers. Each test uses `beforeEach` to instantiate page objects, ensuring reusability and clarity across multiple test scenarios. I also tried to keep the test as clean as possible, for easy understanding.

I chose this approach to ensure **maintainability**, **scalability**, and **readability** of the automation framework. All selectors use Playwright’s recommended `getByRole`, `id`, etc., which are resilient to UI changes and aligned with accessibility best practices. Assertions like verifying the main heading (`<h1>`) instead of just the browser tab title make the tests more aligned with what the user actually sees. The overall flow of the test simulates a real user’s interaction: navigating through sections, performing searches.

In a real-world project, I would expand this framework by adding more test coverage with strong testing practices, increasing parallel execution workers, and testing the app in more than one browser or in mobile emulation mode. There are many things I would include to make this framework more robust and professional: **environment management**, **data providers**, **CI/CD integration**, **parallelism**, and detailed reporting.
