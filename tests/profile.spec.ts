import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';



test('Stored XSS', async ({page}) => {

    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

    await loginPage.enterOwaspJuiceWebsite();
    await loginPage.sqlInjection();
    await profilePage.storedXSS();


});
