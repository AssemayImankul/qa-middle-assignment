# Задание 3 — Автотесты E2E (Playwright + Page Object Model + BDD)

E2E-автотесты для `https://the-internet.herokuapp.com` на **Playwright (TypeScript)**.
Архитектура — **Page Object Model**, Gherkin-сценарии исполняются через **playwright-bdd**.

## Запуск

Требуется Node.js 18+.

```bash
npm install
npx playwright install chromium   # скачать браузер
npm test                          # генерирует BDD-тесты и запускает все
```

`npm test` = `bddgen && playwright test` — сначала из `.feature` файлов генерируются
исполняемые specs, затем запускаются оба проекта (`e2e` + `bdd`).

Дополнительно:

```bash
npm run test:e2e     # запустить только обычные тесты
npm run test:bdd     # только Gherkin-сценарии
npm run report       # открыть отчёт с результатами
```

## Структура

```
tests/
  e2e/                      # классические Playwright-specs
    login.spec.ts           # data-driven логин (валид + 3 невалидных кейса)
    upload.spec.ts          # загрузка файла (позитив + негатив)
    dynamic-loading.spec.ts # ожидание асинхронного элемента
  features/                 # Gherkin .feature (исполняются через playwright-bdd)
    login.feature
    upload.feature
  steps/                    # step definitions
    fixtures.ts
    login.steps.ts
    upload.steps.ts
  pages/                    # Page Object Model
    BasePage.ts             
    LoginPage.ts
    UploadPage.ts
    DynamicLoadingPage.ts
  fixtures/
    users.json              # данные для data-driven логина
    sample-upload.txt       # файл для теста загрузки
playwright.config.ts        # в корне репозитория
```

## Покрытие тест-кейсами

| ID | Тип | Сценарий | Где |
|----|-----|----------|-----|
| TC-LOGIN-01 | позитив | Валидный логин → Secure Area | `login.spec.ts` + `login.feature` |
| TC-LOGIN — wrong username | негатив | Неверный логин -> ошибка | `login.spec.ts` + `login.feature` |
| TC-LOGIN — wrong password | негатив | Неверный пароль -> ошибка | `login.spec.ts` + `login.feature`  |
| TC-LOGIN — empty credentials | негатив | Пустые поля -> ошибка | `login.spec.ts` |
| TC-UPLOAD-01 | позитив | Загрузка файла -> «File Uploaded!» | `upload.spec.ts` + `upload.feature` |
| TC-UPLOAD-02 | негатив | Отправка без файла -> нет успеха | `upload.spec.ts` + `upload.feature` |
| TC-DYNLOAD-01 | позитив | Появление элемента после async-загрузки | `dynamic-loading.spec.ts` |

## Реализация обязательных требований

- **Page Object Model** — вся работа с UI инкапсулирована в `pages/*`; specs и
  step-definitions не содержат селекторов.
- **Gherkin (.feature)** — `login.feature` и `upload.feature` исполняются по-настоящему
  через `playwright-bdd` (не декоративные), step-definitions переиспользуют те же
  Page Objects.
- **Параметризация (data-driven)** — двумя способами: цикл по `fixtures/users.json`
  в `login.spec.ts` и `Scenario Outline` с `Examples` в `login.feature`.
- **Техника тест-дизайна** — Equivalence Partitioning: невалидные кредами разбиты на
  классы (плохой логин / плохой пароль / пустые поля), по одному представителю на класс.
- **Один command для запуска** — `npm install` + `npm test`.

## Наблюдения

- На странице `/upload` отправка формы без выбранного файла не возвращает понятную
  валидацию пользователю — стенд отдаёт страницу ошибки вместо сообщения «выберите файл».
  Тест `TC-UPLOAD-02` проверяет именно отсутствие признака успеха.
