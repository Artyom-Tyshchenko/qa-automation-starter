const { test, expect } = require('@playwright/test');

// Публичный тестовый API для практики: https://reqres.in
const BASE_URL = 'https://reqres.in/api';

test.describe('Public API — reqres.in', () => {
  test('GET /users/2 — возвращает корректную структуру', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('first_name');
  });

  test('GET /users/23 — 404 для несуществующего пользователя', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/23`);
    expect(response.status()).toBe(404);
  });

  test('POST /users — создание пользователя, статус 201', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: { name: 'Артём Тыщенко', job: 'QA Engineer' },
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Артём Тыщенко');
    expect(body).toHaveProperty('id');
  });
});
