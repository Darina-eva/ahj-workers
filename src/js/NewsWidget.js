function formatDate(timestamp) {
  const date = new Date(timestamp);
  const pad = (value) => String(value).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

const SKELETON_ITEMS = 3;

export default class NewsWidget {
  constructor(container, url) {
    this.container = container;
    this.url = url;
  }

  init() {
    this.container.innerHTML = `
      <div class="news">
        <div class="news-header">
          <h1 class="news-title">Новости мира кино</h1>
          <button type="button" class="news-refresh">Обновить</button>
        </div>
        <ul class="news-list"></ul>
        <div class="news-error hidden">
          Не удалось загрузить данные<br />
          Проверьте подключение<br />
          и обновите страницу
        </div>
      </div>
    `;
    this.widget = this.container.querySelector(".news");
    this.list = this.container.querySelector(".news-list");
    this.container
      .querySelector(".news-refresh")
      .addEventListener("click", () => this.load());
    this.load();
  }

  showSkeleton() {
    this.widget.classList.remove("failed");
    this.container.querySelector(".news-error").classList.add("hidden");
    this.list.innerHTML = Array.from(
      { length: SKELETON_ITEMS },
      () => `
        <li class="news-item loading">
          <div class="news-item-date skeleton"></div>
          <div class="news-item-body">
            <div class="news-item-image skeleton"></div>
            <div class="news-item-content">
              <div class="news-item-line skeleton"></div>
              <div class="news-item-line skeleton"></div>
            </div>
          </div>
        </li>
      `,
    ).join("");
  }

  showError() {
    this.widget.classList.add("failed");
    this.container.querySelector(".news-error").classList.remove("hidden");
  }

  async load() {
    this.showSkeleton();
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      const { news } = await response.json();
      this.render(news);
    } catch {
      this.showError();
    }
  }

  render(news) {
    this.list.innerHTML = "";
    news.forEach((item) => {
      const element = document.createElement("li");
      element.className = "news-item";
      element.innerHTML = `
        <div class="news-item-date"></div>
        <div class="news-item-body">
          <img class="news-item-image" alt="" />
          <div class="news-item-content">
            <div class="news-item-heading"></div>
            <div class="news-item-text"></div>
          </div>
        </div>
      `;
      element.querySelector(".news-item-date").textContent = formatDate(
        item.received,
      );
      element.querySelector(".news-item-image").src = item.image;
      element.querySelector(".news-item-heading").textContent = item.title;
      element.querySelector(".news-item-text").textContent = item.text;
      this.list.append(element);
    });
  }
}
