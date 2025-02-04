import { expect, Page } from '@playwright/test';


export class ProfilePage {
    private page: Page;

    private user_profile_button = "//button[@aria-label='Go to user profile']";
    private user_account_button = "//button[@aria-label='Show/hide account menu']";

    private url_field = "//input[@aria-label='Text field for the image link']";
    private malicious_url = "https://a.png; script-src 'unsafe-inline' 'self' 'unsafe-eval'";
    private link_image_button = "//button[@aria-label='Button to include image from link']";

    private username_field = "//input[@aria-label='Text field for the username']";
    private malicous_xss_script = "<<script>ascript>alert('Stored XSS In')</script>";
    private set_username_button = "//button[@aria-label='Button to save/set the username']";
     

  constructor(page: Page) {
    this.page = page;
  }


  async storedXSS() {

    this.page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Stored XSS In');
        await dialog.accept(); 
    });

    await this.page.locator(this.user_profile_button).click();
    await this.page.locator(this.url_field).fill(this.malicious_url);
    await this.page.locator(this.link_image_button).click();
    await this.page.reload();
    await this.page.locator(this.username_field).fill(this.malicous_xss_script);
    await this.page.locator(this.set_username_button).click();
    await this.page.reload();

  }

  async isErrorMessageVisible(): Promise<boolean> {
    return this.page.isVisible('.error-message');
  }
}