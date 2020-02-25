import { setCodeClipboards } from "~/utils/clipboard";

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
    setCodeClipboards(this.listeners)
  }
}
