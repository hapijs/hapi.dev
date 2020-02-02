import { copyToClipboard } from "~/utils/clipboard";

export default {
  data() {
    return { listeners: new Map() };
  },
  beforeDestroy() {
    for (let [element, listener] of this.listeners) {
      element.removeEventListener('click', listener);
    }
    this.listeners.clear();
  },
  mounted() {
    const snippets = document.querySelectorAll(".highlight-source-js");

    for (let snippet of snippets) {
      const copyClipBoardElement = document.createElement("span");
      copyClipBoardElement.classList.add("copy-clipboard");
      copyClipBoardElement.title = "Copy code snippet";

      const eventListener = function() {
        const code = snippet.firstChild.textContent;
        copyToClipboard(code);

        copyClipBoardElement.classList.add('copy-clipboard-checked');
        setTimeout(() => {
          copyClipBoardElement.classList.remove('copy-clipboard-checked');
        }, 3000)
      };
      copyClipBoardElement.addEventListener("click", eventListener);

      this.listeners.set(copyClipBoardElement, eventListener);

      snippet.appendChild(copyClipBoardElement);
    }
  }
}
