# Задание 2 — UI тест-кейсы (ручное тестирование)

Сайт: **the-internet.herokuapp.com**
Выбранные страницы:
- Form Authentication — `/login`
- File Upload — `/upload`
- Dynamic Loading — `/dynamic_loading`

## Применённые техники тест-дизайна

- **Equivalence Partitioning** - на странице логина. 
Входные данные делим на классы: 
«верный логин/пароль», «неверный логин», «неверный пароль», «пустое
  поле».

- **State Transition Testing** - на Dynamic Loading и на сессии логина: 
- *не загружено → идёт загрузка → загружено*;
- *гость → авторизован → вышел*

- **Boundary Value Analysis (BVA)** - на длине имени загружаемого файла. 
  Файловые системы ограничивают имя 255 символами:
  Проверка: **254 (валидно), 255 (максимум валидно), 256 (за границей )**.

---

## Form Authentication (`/login`)

Валидные данные: `tomsmith` / `SuperSecretPassword!`
*(Equivalence Partitioning: правильные данные)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-LOGIN-001 |
| **Title** | Успешный вход с корректными данными |
| **Priority** | High |
| **Preconditions** | Открыта страница `/login`, пользователь не авторизован |
| **Steps** | 1. Ввести username `tomsmith` 2. Ввести password `SuperSecretPassword!` 3. Нажать **Login** |
| **Expected result** | Редирект на `/secure`, флеш-сообщение «You logged into a secure area!», виден блок Secure Area и кнопка Logout |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |


*(Equivalence Partitioning: неверный логин)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-LOGIN-002 |
| **Title** | Вход с не правильный логином |
| **Priority** | High |
| **Preconditions** | Открыта страница `/login` |
| **Steps** | 1. Ввести username `wronguser` 2. Ввести password `SuperSecretPassword!` 3. Нажать **Login** |
| **Expected result** | Остаёмся на `/login`, красное сообщение «Your username is invalid!» |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |


*(Equivalence Partitioning: не правильный пароль)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-LOGIN-003 |
| **Title** | Вход с неверным паролем |
| **Priority** | High |
| **Preconditions** | Открыта страница `/login` |
| **Steps** | 1. Ввести username `tomsmith` 2. Ввести password `wrongpass` 3. Нажать **Login** |
| **Expected result** | Остаёмся на `/login`, красное сообщение «Your password is invalid!» |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |


*(Equivalence Partitioning/граничный 0 символов: пустые поля)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-LOGIN-004 |
| **Title** | Отправка формы с пустыми полями |
| **Priority** | Medium |
| **Preconditions** | Открыта страница `/login`, поля пустые |
| **Steps** | 1. Оставить username и password пустыми 2. Нажать **Login** |
| **Expected result** | Остаёмся на `/login`, сообщение об ошибке «Your username is invalid!» |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |


*(State Transition: переход авторизован -> гость)*
| Поле | Значение |
|------|----------|
| **Test ID** | TC-LOGIN-005 |
| **Title** | Выход из Secure Area (Logout) |
| **Priority** | Medium |
| **Preconditions** | Пользователь авторизован (выполнен TC-LOGIN-001) |
| **Steps** | 1. На странице `/secure` нажать **Logout** |
| **Expected result** | Редирект на `/login`, сообщение «You logged out of the secure area!» |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |


*(State Transition: нельзя прямой доступ к `/secure` без авторизации)*
| Поле | Значение |
|------|----------|
| **Test ID** | TC-LOGIN-006 |
| **Title** | Прямой доступ к `/secure` без авторизации |
| **Priority** | Medium |
| **Preconditions** | Пользователь не авторизован |
| **Steps** | 1. Открыть в адресной строке `/secure` напрямую |
| **Expected result** | Редирект на `/login`, сообщение «You must login to view the secure area!» |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |



---

## File Upload (`/upload`)

*(Позитивный)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-UPLOAD-001 |
| **Title** | Успешная загрузка валидного файла |
| **Priority** | High |
| **Preconditions** | Открыта страница `/upload`, есть файл `sample-upload.txt` |
| **Steps** | 1. Нажать **Choose File**, выбрать `sample-upload.txt` 2. Нажать **Upload** |
| **Expected result** | Открывается страница «File Uploaded!», отображается имя загруженного файла |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |


*(Негативный)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-UPLOAD-002 |
| **Title** | Отправка формы без выбранного файла |
| **Priority** | High |
| **Preconditions** | Открыта страница `/upload`, файл не выбран |
| **Steps** | 1. Не выбирать файл 2. Нажать **Upload** |
| **Expected result** | Понятное сообщение пользователю, что файл не выбран; остаёмся на `/upload` |
| **Actual result** | Открывается страница ошибки «Internal Server Error» без понятной валидации |
| **Status** | **Fail** (см. BUG-UPLOAD-001) |


*(BVA — граница длины имени файла: 254 / 255 / 256)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-UPLOAD-003 |
| **Title** | Загрузка файла с именем на границе длины (254 / 255 / 256 символов) |
| **Priority** | Low |
| **Preconditions** | Открыта страница `/upload`, подготовлены 3 файла с именами длиной 254, 255 и 256 символов |
| **Steps** | 1. Загрузить файл с именем 254 символа 2. Загрузить файл с именем 255 символов 3. Загрузить файл с именем 256 символов |
| **Expected result** | 254 и 255 — успешно, имя показано без обрезки; 256 — отклоняется (имя за пределами лимита файловой системы) |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |


*(Equivalence Partitioning: допустимые типы файлов)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-UPLOAD-004 |
| **Title** | Загрузка файла разных типов (txt, png, pdf) |
| **Priority** | Medium |
| **Preconditions** | Открыта страница `/upload` |
| **Steps** | 1. Поочерёдно выбрать файлы .txt, .png, .pdf 2. Нажимать **Upload** |
| **Expected result** | Для каждого типа — «File Uploaded!» с верным именем |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |



---

## Dynamic Loading (`/dynamic_loading`)
*(State Transition: скрыт -> идет загрузка -> отображен)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-DYNLOAD-001 |
| **Title** | Example 1 — элемент скрыт, появляется после загрузки |
| **Priority** | High |
| **Preconditions** | Открыта страница `/dynamic_loading/1` |
| **Steps** | 1. Нажать **Start** 2. Дождаться окончания загрузки |
| **Expected result** | Во время загрузки виден индикатор «Loading...», после — появляется текст «Hello World!» |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |


*(State Transition: нет в DOM -> загрузка -> создан)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-DYNLOAD-002 |
| **Title** | Example 2 — элемент отсутствует в DOM, добавляется после загрузки |
| **Priority** | High |
| **Preconditions** | Открыта страница `/dynamic_loading/2` |
| **Steps** | 1. Нажать **Start** 2. Дождаться окончания загрузки |
| **Expected result** | До загрузки элемента нет в DOM; после — он создаётся и показывает «Hello World!» |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |


*(State Transition: корректность промежуточного состояния)*

| Поле | Значение |
|------|----------|
| **Test ID** | TC-DYNLOAD-003 |
| **Title** | Иконка загрузки виден в процессе и скрывается после |
| **Priority** | Medium |
| **Preconditions** | Открыта страница `/dynamic_loading/1` |
| **Steps** | 1. Нажать **Start** 2. Наблюдать за индикатором |
| **Expected result** | «Loading...» виден только во время загрузки и исчезает после её завершения |
| **Actual result** | Соответствует ожидаемому |
| **Status** | Pass |



---

## Найденные bug-и

### BUG-UPLOAD-001

- **Title:** Отправка формы загрузки без файла приводит к странице ошибки вместо понятной валидации
- **Steps to reproduce:**
  1. Открыть `https://the-internet.herokuapp.com/upload`
  2. Не выбирать файл
  3. Нажать **Upload**
- **Expected:** Пользователю показывается понятное сообщение «Файл не выбран», форма остаётся на `/upload`
- **Actual:** Открывается страница «Internal Server Error» без объяснения для пользователя
- **Severity:** Medium (страница не падает критично, но UX и валидация ввода отсутствуют)
- **Screenshot:** <img width="1467" height="502" alt="image" src="https://github.com/user-attachments/assets/b69f8078-5678-44b9-b379-4644b56dfa33" />


> Дефект подтверждён автотестом
> [`tests/features/upload.feature`](../tests/features/upload.feature) — сценарий
> «Submitting without a file does not succeed».
