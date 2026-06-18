# QA Assignment: Restful Booker API & the-internet UI

Тестовое задание QA-инженера. В репозитории собраны материалы по всем заданиям:
API-тестирование (Postman/Newman), E2E-автотесты (Playwright + POM + BDD),
ручные UI тест-кейсы, SQL/NoSQL и диаграммы (BPMN / Sequence / State Transition).

## Что сделано и из чего состоит проект

| Задание | Что это | Где |
|---------|---------|-----|
| 1 | REST API тесты `/booking` (Postman + Newman) | [postman/](postman/) |
| 2 | Ручные UI тест-кейсы (login, upload, dynamic loading) | [test-cases/ui-test-cases.md](test-cases/ui-test-cases.md) |
| 3 | E2E автотесты (Playwright, Page Object Model, BDD/Gherkin) | [tests/](tests/) |
| 4a | SQL-запросы | [sql/queries.sql](sql/queries.sql) |
| 4b | NoSQL — ответ по MongoDB | [nosql/mongodb-answer.md](nosql/mongodb-answer.md) |
| 5 | Диаграммы BPMN / Sequence / State Transition | [diagrams/](diagrams/) |

```
.
├── postman/        # Задание 1 — Postman-коллекция + environment + README
├── test-cases/     # Задание 2 — ручные UI тест-кейсы
├── tests/          # Задание 3 — Playwright (e2e + features + steps + pages)
├── sql/            # Задание 4a — SQL-запросы
├── nosql/          # Задание 4b — ответ по MongoDB
├── diagrams/       # Задание 5 — BPMN / Sequence / State Transition
├── playwright.config.ts
└── package.json
```

## Окружение

- Node.js 18+
- Newman (для Postman-коллекции)
- Playwright (ставится через `npm install`)

## Запуск Postman-коллекции через Newman (Задание 1) — copy-paste ready

```bash
npm install -g newman                 # установка Newman (один раз)
newman run postman/collection.json -e postman/environment.json
```

Без глобальной установки:

```bash
npx newman run postman/collection.json -e postman/environment.json
```

Коллекция запускается «из коробки»: токен и `booking_id` сохраняются автоматически
в pre-request/тест-скриптах. Подробности — в [postman/README.md](postman/README.md).


## Запуск автотестов (Задание 3) - copy-paste ready

```bash
npm install
npx playwright install chromium   # один раз скачать браузер
npm test                          # запустить ВСЕ тесты сразу
```

Дополнительно:

```bash
npm run test:e2e     # запустить только обычные тесты
npm run test:bdd     # только Gherkin-сценарии
npm run report       # открыть HTML-отчёт с результатами
```

Детали архитектуры — в [tests/README.md](tests/README.md).


## Найденные баги / наблюдения

**Restful Booker API** (учебный стенд со слабой валидацией):

1. `POST /booking` с неверными типами полей возвращает `500` вместо `400`.
2. Неполный payload (нет обязательных полей) приводит к `500`, а не `400`.
3. Нет валидации дат: принимаются прошедший `checkin` и диапазон, где `checkout`
   раньше `checkin` (`200 OK`).
4. Невалидный формат даты сохраняется как `"0NaN-aN-aN"`.
5. `DELETE /booking/:id` возвращает `201 Created` вместо `200/204`.

**the-internet UI:**

- `/upload`: отправка формы без выбранного файла не даёт понятной валидации —
  стенд отдаёт страницу «Internal Server Error» вместо сообщения пользователю.
  Оформлено баг-репортом `BUG-UPLOAD-001` в [test-cases/ui-test-cases.md](test-cases/ui-test-cases.md)
  и подтверждено автотестом [tests/features/upload.feature](tests/features/upload.feature).

## Что бы улучшил при наличии дополнительного времени

- CI через GitHub Actions: автозапуск Newman и Playwright на каждый push.
- HTML-отчёты (Playwright HTML уже подключён; для API — `newman-reporter-htmlextra`).
- Dockerfile для изолированного и воспроизводимого запуска тестов.
- Вынести общие assertions Postman в коллекционные скрипты, добавить data-driven
  прогон коллекции через `-d data.json`.
- Добавить страницу Drag and Drop в ручные тест-кейсы и автотесты.
