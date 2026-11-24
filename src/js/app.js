import { API_URL } from "./config";
import NewsWidget from "./NewsWidget";

const widget = new NewsWidget(
  document.getElementById("root"),
  `${API_URL}/news`,
);
widget.init();
