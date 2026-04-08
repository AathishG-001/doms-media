const Flipbook = {
  instance: null,

  async init() {
    const container = document.getElementById("flipbook");

    this.instance = new St.PageFlip(container, {
      width: 400,
      height: 600,
      showCover: true,
      usePortrait: window.innerWidth < 768
    });

    await this.loadSpread(1);

    this.instance.on("flip", async e => {
      Core.current = e.data + 1;
      UI.updatePage();
      this.loadSpread(Core.current);
    });
  },

  async loadSpread(pageNum) {
    let pages = [];

    for (let i = pageNum - 1; i <= pageNum + 1; i++) {
      if (i < 1 || i > Core.total) continue;

      const { canvas } = await Core.getPage(i);

      const div = document.createElement("div");
      div.className = "page";
      div.appendChild(canvas.cloneNode(true));

      pages.push(div);
    }

    this.instance.loadFromHTML(pages);
  }
};
