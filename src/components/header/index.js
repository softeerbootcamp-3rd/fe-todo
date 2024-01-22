import { headerTemplate } from "./template";

export default function header(parent, props) {
  parent.innerHTML = headerTemplate(props);

  const historyBtn = parent.querySelector('[todo-data="historyBtn"]');
  historyBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("toggleHistoryList"));
  });
}
