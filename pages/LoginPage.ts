import { expect, Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    private owasp_juice_url = "http://localhost:3000/#/";
    private welcome_banner = "xpath=//button[@aria-label='Close Welcome Banner']";
    private account_menu = "xpath=//button[@aria-label='Show/hide account menu']";
    private go_to_login = "xpath=//button[@aria-label='Go to login page']";
    private email_field = "xpath=//input[@aria-label='Text field for the login email']";
    private password_field = "xpath=//input[@aria-label='Text field for the login password']";
    private login_button = "xpath=//button[@aria-label='Login']";
    private logged_email = "//button[@aria-label='Go to user profile']//span[text()=' admin@juice-sh.op ']";
    private apple_juice_item = "//img[@alt='Apple Juice (1000ml)']";
    

    private sql_injection_query = "' OR 1=1--";
    private sql_injection_password = "123";

    private bruteforce_email = "admin@juice-sh.op";
    private bruteforce_password = "admin123"


  constructor(page: Page) {
    this.page = page;
  }


  async enterOwaspJuiceWebsite(){
    await this.page.goto(this.owasp_juice_url);
  }


  async sqlInjection() {

    await this.page.locator(this.welcome_banner).click();
    await this.page.locator(this.account_menu).click();
    await this.page.locator(this.go_to_login).click();
    await this.page.locator(this.email_field).fill(this.sql_injection_query);
    await this.page.locator(this.password_field).fill(this.sql_injection_password);
    await this.page.locator(this.login_button).click();
    await this.page.locator(this.apple_juice_item).isVisible();
    await this.page.locator(this.account_menu).click();
    expect(this.page.locator(this.logged_email).isVisible());
    
  }

  

  async isErrorMessageVisible(): Promise<boolean> {
    return this.page.isVisible('.error-message');
  }
}