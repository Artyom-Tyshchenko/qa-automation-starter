# qa-automation-starter

Базовый шаблон репозитория для автотестов на **Playwright** (UI + API) с CI на GitHub Actions.

Тесты написаны на публичных площадках для практики, без реального продукта:
- UI: [saucedemo.com](https://www.saucedemo.com) — демо-магазин для практики автоматизации логина
- API: [reqres.in](https://reqres.in) — публичный тестовый REST API

## Структура репозитория

```
qa-automation-starter/
├── .github/
│   └── workflows/
│       └── tests.yml        # CI: прогон тестов на push / PR в main
├── tests/
│   ├── ui/
│   │   └── login.spec.js    # UI-тесты логина (SauceDemo)
│   └── api/
│       └── users.spec.js    # API-тесты (reqres.in)
├── playwright.config.js
├── package.json
├── .gitignore
└── README.md
```

## Установка и запуск

```bash
npm install
npx playwright install --with-deps

npm test              # все тесты
npm run test:ui       # только UI
npm run test:api      # только API
npm run report        # открыть HTML-отчёт последнего прогона
```

---

## Шпаргалка JS-синтаксиса для автотестов

То, что чаще всего встречается в коде автотестов (Playwright/Jest/Mocha):

**async/await** — почти всё в Playwright асинхронно:
```js
test('пример', async ({ page }) => {
  await page.goto('/');
  await page.click('#login-button');
});
```

**Стрелочные функции** — колбэки в `test()`, `describe()`, `map/filter`:
```js
const isActive = (user) => user.status === 'active';
```

**Деструктуризация** — из fixtures Playwright достаём нужные объекты:
```js
async ({ page, request }) => { /* ... */ }
const { data } = await response.json();
```

**Шаблонные строки** — сборка URL и сообщений:
```js
const response = await request.get(`${BASE_URL}/users/${id}`);
```

**Методы массивов** — обработка списков данных в тестах:
```js
const emails = users.map(u => u.email);
const hasAdmin = users.some(u => u.role === 'admin');
```

**Опциональная цепочка и `??`** — безопасный доступ к вложенным полям ответа API:
```js
const city = response?.data?.address?.city ?? 'не указан';
```

---

## Git-воркфлоу для этого репозитория

### Именование веток
```
feature/<короткое-описание>    — новый тест или новая функциональность
fix/<короткое-описание>        — исправление упавшего теста / бага в фреймворке
chore/<короткое-описание>      — рутина: обновление зависимостей, конфиги
```
Примеры: `feature/add-checkout-tests`, `fix/flaky-login-test`.

### Типичный цикл работы

```bash
git checkout main
git pull origin main
git checkout -b feature/add-checkout-tests

# ... пишем тесты ...

git add .
git commit -m "test: добавлены тесты оформления заказа"
git push -u origin feature/add-checkout-tests
```

Дальше — открыть Pull Request на GitHub из ветки `feature/add-checkout-tests` в `main`.

### Формат коммитов (Conventional Commits)
```
test: добавлены тесты для формы логина
fix: исправлен нестабильный селектор в login.spec.js
chore: обновлена версия Playwright
docs: обновлён README с инструкцией по запуску
```

### Чек-лист перед созданием PR
- [ ] Тесты проходят локально (`npm test`)
- [ ] Нет закомментированного/мёртвого кода
- [ ] Имя ветки и коммитов соответствует конвенции
- [ ] В описании PR указано, что именно протестировано и почему
- [ ] CI (GitHub Actions) прошёл зелёным после пуша

### Как опубликовать этот шаблон в своём GitHub

```bash
cd qa-automation-starter
git init
git add .
git commit -m "chore: базовая структура автотестов (Playwright)"
git branch -M main

# создать пустой репозиторий на github.com, затем:
git remote add origin https://github.com/<username>/qa-automation-starter.git
git push -u origin main
```
