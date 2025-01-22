import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test('SQL Injection login', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.enterOwaspJuiceWebsite();
  await loginPage.sqlInjection();
  
});

test('Stored XSS', async ({page}) => {




});
