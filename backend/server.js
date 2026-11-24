import { randomUUID } from "node:crypto";
import cors from "@koa/cors";
import { faker } from "@faker-js/faker";
import Koa from "koa";

const DELAY = Number(process.env.DELAY) || 3000;

const app = new Koa();

function slow(delay) {
  return async (ctx, next) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    await next();
  };
}

function createNews() {
  const id = randomUUID();
  return {
    id,
    title: faker.book.title(),
    text: faker.lorem.sentences(2),
    image: `https://picsum.photos/seed/${id}/100/100`,
    received: Date.now() - faker.number.int({ min: 0, max: 86400000 }),
  };
}

app.use(cors());
app.use(slow(DELAY));
app.use(async (ctx) => {
  if (ctx.method === "GET" && ctx.path === "/news") {
    ctx.body = {
      status: "ok",
      news: Array.from({ length: 3 }, createNews),
    };
    return;
  }
  ctx.status = 404;
  ctx.body = { status: "error", message: "Not found" };
});

const port = process.env.PORT || 7070;

app.listen(port, () => {
  console.log(`Server has been started on http://localhost:${port}`);
});
