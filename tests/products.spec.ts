import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';



test('Exfiltrate DB Shema', async ({page}) => {


    const productsPage = new ProductsPage(page);
    await productsPage.getDBSchema();


});

test('Exfiltrate Users Table', async ({page}) => {

    const productsPage = new ProductsPage(page);
    await productsPage.getUsersTableValues();

})

test('Exfiltrate Cards Table', async ({page}) => {

    const productsPage = new ProductsPage(page);
    await productsPage.getCardsTableValues();

})
