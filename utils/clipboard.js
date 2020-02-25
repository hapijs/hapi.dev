export function copyToClipboard(content) {
  const el = document.createElement("textarea");
  el.value = content;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export function setCodeClipboards(listeners) {
  const snippets = document.querySelectorAll(".highlight-source-js");

  for (let snippet of snippets) {
    const copyClipBoardElement = document.createElement("span");
    copyClipBoardElement.classList.add(
      "copy-clipboard",
      "copy-clipboard-absolute"
    );
    copyClipBoardElement.title = "Copy code snippet";

    const eventListener = function() {
      const code = snippet.firstChild.textContent;
      copyToClipboard(code);

      copyClipBoardElement.classList.add("copy-clipboard-checked");
      setTimeout(() => {
        copyClipBoardElement.classList.remove("copy-clipboard-checked");
      }, 3000);
    };
    copyClipBoardElement.addEventListener("click", eventListener);

    listeners.set(copyClipBoardElement, eventListener);

    snippet.appendChild(copyClipBoardElement);
  }
}
