const Search = {
  index: {},

  async buildIndex() {
    for (let i = 1; i <= Core.total; i++) {
      const page = await Core.pdf.getPage(i);
      const text = await page.getTextContent();

      this.index[i] = text.items.map(t => t.str).join(" ").toLowerCase();
    }
  },

  run() {
    const q = document.getElementById("searchBox").value.toLowerCase();

    for (let i in this.index) {
      if (this.index[i].includes(q)) {
        alert("Found on page " + i);
        UI.goTo(i);
        break;
      }
    }
  }
};
