const { test, expect } = require('@playwright/test');

// Публичный демо-сайт для практики UI-автоматизации: https://www.saucedemo.com
test.describe('Login — SauceDemo', () => {
  test('успешный вход с валидными данными', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('ошибка при заблокированном пользователе', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('ошибка при пустых полях (граничный случай)', async ({ page }) => {
    await page.goto('/');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});
