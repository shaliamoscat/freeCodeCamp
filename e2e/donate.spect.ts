import { test, expect, type Page } from '@playwright/test';

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('/donate');
});

test.afterAll(async () => {
  await page.close();
});

test.describe('The donate page', () => {
  test('The page has a FAQ section', async () => {
    await expect(page).toContain('Frequently asked questions');
  });

  test('The page has a thank you message', async () => {
    const thankYouElement = await page.$('h2:has-text("Thank You Message")');
    expect(thankYouElement).toBeNull();
  });

  test('The page has a help more message', async () => {
    const helpMoreElement = await page.$('h2:has-text("Help More Message")');
    expect(helpMoreElement).not.toBeNull();
  });

  test('Test DonateForm on Donation Page', async () => {
    const form = page.getByTestId('pageContext');
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute('Card number', 'First name');
  });
  
});
