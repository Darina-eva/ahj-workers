![CI](https://github.com/Darina-eva/ahj-workers/actions/workflows/web.yml/badge.svg)

# Loading Styling

Виджет «Новости мира кино» с интерфейсом загрузки (skeleton): пока данные не пришли с сервера, вместо новостей показываются серые заглушки. Статические ресурсы кешируются Service Worker'ом (Workbox, `GenerateSW`), поэтому без подключения страница всё равно открывается в режиме загрузки, а после неудачного запроса показывает сообщение «Не удалось загрузить данные».

Сервер (`backend/`) написан на Koa: `GET /news` отдаёт случайные новости, задержка ответа (3 секунды) эмулируется собственным middleware.

[GitHub Pages](https://darina-eva.github.io/ahj-workers/)

## Сервер

Сервер развёрнут на Render: https://ahj-workers-1owb.onrender.com (эндпоинт `/news`). Адрес задаётся в `src/js/config.js`.

Локальный запуск:

```bash
cd backend
npm install
npm start
```
