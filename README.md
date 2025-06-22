# UiBank UI Automation with Playwright

This repository hosts a robust and well-structured UI automation framework for the UiBank application, built using Playwright and JavaScript. It demonstrates comprehensive end-to-end testing capabilities for key user flows, adhering to best practices in test automation design.

## 🚀 Project Overview
This project aims to provide reliable, maintainable, and scalable automated tests for the UiBank web application's user interface. It focuses on critical user journeys, ensuring core functionalities remain stable across development cycles.

**Key Features Covered:**

* **User Registration:** Automating the full registration process, from entering credentials to providing personal details.
* **Account Management (First-Time User):** Verifying the initial account summary state for new users and enabling navigation to account creation.
* **New Account Creation:** Automating the process of applying for both Checking and Savings accounts.
* **Account Summary Verification:** Dynamically validating the presence and details of newly created accounts on the user's dashboard.
* **Navigation & User Flow:** Ensuring seamless transitions between different sections of the application.

## ✨ Automation Framework Design
This framework is meticulously designed for clarity, efficiency, and extensibility, leveraging Playwright's powerful capabilities and the **Page Object Model (POM)** design pattern.

### **Page Object Model (POM)**
The heart of this automation framework is its strict adherence to the Page Object Model.

* **Purpose:** POM separates test logic from page interaction logic. Each significant web page (or distinct UI component) within the application has a corresponding "Page Object" class.
* **Benefits:**
    * **Enhanced Readability:** Tests describe user actions in plain language (e.g., `registrationPage.fillEmail()`, `accountPage.clickApplyForNewAccountButton()`).
    * **Improved Maintainability:** If UI elements change, only the respective Page Object needs updating, not every test case that interacts with that element. This drastically reduces maintenance overhead.
    * **Code Reusability:** Common page interactions are encapsulated in methods within the Page Objects, preventing code duplication across multiple tests.
    * **Clear Separation of Concerns:** Tests focus on *what* to test, while Page Objects handle *how* to interact with the UI.

### **Robust Locator Strategies**
Playwright's intelligent locator strategies are utilized to ensure tests are resilient to minor UI changes:

* **Role-based Locators (`getByRole`)**: Prioritizes semantic HTML and accessibility roles (e.g., `page.getByRole('button', { name: 'Apply' })`). This makes tests more robust against CSS or HTML structure changes.
* **Text-based Locators (`getByText`)**: Directly targets elements by their visible text content, which is less likely to change frequently than CSS classes or IDs.
* **ID Locators (`page.locator('#id')`)**: Used for elements with stable and unique `id` attributes.
* **CSS Selectors (`page.locator('.class-name')`)**: Employed for elements where role or text locators are not ideal, focusing on stable class names or structural patterns.

### **Implicit & Explicit Synchronization**
Playwright's auto-waiting mechanism handles most asynchronous operations, automatically waiting for elements to be visible, enabled, and interactive. For more complex scenarios, explicit waits (e.g., `expect(locator).toBeVisible()`, `locator.waitFor()`, `expect(count).resolves.toBe()`) are strategically implemented to ensure test stability and accurate state verification, especially after dynamic content loads.

### **Modular and Organized Structure**
The project is thoughtfully organized into intuitive directories:

* `tests/`: Contains all the test spec files (e.g., `registeruser.spec.js`, `applyNewAccount.spec.js`). Each file groups related test scenarios.
* `page-objects/`: Houses all the Page Object classes (`RegistrationPage.js`, `AccountPage.js`, `NewAccountPage.js`, `AccountCreateResultsPage.js`), ensuring a clean separation of UI interactions.

This modularity makes the project easy to navigate, understand, and extend with new features or test cases.

## 🚀 Getting Started
To set up and run this automation framework on your local machine, follow these steps:

### Prerequisites

* **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/) (LTS version recommended). This includes `npm` (Node Package Manager).
* **Git**: [Download & Install Git](https://git-scm.com/downloads).
* **Web Browser**: Playwright supports Chromium, Firefox, and WebKit. They will be installed automatically by Playwright.

### Installation
1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/sdetshubhamthakur/UiBankUiAutomationPlaywright.git](https://github.com/sdetshubhamthakur/UiBankUiAutomationPlaywright.git)
    ```
2.  **Navigate to the Project Directory:**
    ```bash
    cd UiBankUiAutomationPlaywright
    ```
3.  **Install Dependencies:**
    (Subtext) Install Playwright and other necessary packages. This command will also install the browser binaries.
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

### Running Tests
You can run the tests using the Playwright Test Runner.

* **Run all tests in headless mode (default):**
    ```bash
    npx playwright test
    ```
* **Run all tests in UI mode (interactive debugging):**
    ```bash
    npx playwright test --ui
    ```
* **Run tests from a specific file:**
    ```bash
    npx playwright test tests/UI/registeruser.spec.js
    ```
* **Run tests with browser visible (headed mode):**
    ```bash
    npx playwright test --headed
    ```
* **Run tests on a specific browser (e.g., Firefox):**
    ```bash
    npx playwright test --project=firefox
    ```
For more Playwright CLI options, refer to the [Playwright documentation](https://playwright.dev/docs/test-cli).

## 📂 Project Structure
```
UiBankUiAutomationPlaywright/
├── tests/
│   └── UI/
│       ├── registeruser.spec.js        # Tests for user registration
│       ├── login.spec.js               # Tests for login flow
│       ├── account.spec.js             # Tests for account summary flow
│       ├── applyNewAccount.spec.js     # Tests for account creation flow
│       ├── transferfund.spec.js        # Tests for transfer fund flow
│       ├── applyloan.spec.js           # Tests for loan application flow
│       └── checkloanstatus.spec.js     # Tests for check loan status flow
├── page-objects/
│   ├── RegistrationPage.js             # POM for the user registration form
│   ├── RegistrationSuccessPage.js      # POM for the registration success message page
│   ├── AccountPage.js                  # POM for the account summary page (handles both no-accounts and with-accounts states)
│   ├── NewAccountPage.js               # POM for the new account application form
│   ├── AccountCreateResultsPage.js     # POM for the new account creation success page
│   ├── TransferFund.js                 # POM for the transfer funds page
│   ├── ApplyLoan.js                    # POM for the loan application page
│   └── LoanStatus.js                   # POM for the check loan status page
├── node_modules/                       # Installed Node.js packages
├── playwright.config.js                # Playwright configuration file
├── package.json                        # Project metadata and dependencies
├── package-lock.json (or yarn.lock)    # Dependency lock file
└── README.md                           # This file
```

## 📈 Extensibility and Maintainability
This framework is built with scalability in mind:

* **Adding New Pages:** To extend coverage, simply create a new `.js` file in the `page-objects/` directory for each new page, define its locators and methods, and then import it into your test files.
* **Adding New Tests:** Create new `.spec.js` files in the `tests/` directory or add new `test()` blocks to existing ones.
* **Updating UI:** If the UI changes, locate the corresponding Page Object file, update the affected locators, and your tests will mostly remain functional without broader modifications.

The systematic approach ensures that the project remains highly maintainable and adaptable to evolving application features.
