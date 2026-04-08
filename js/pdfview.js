const PDFView = {
  container: null,

  init() {
    this.container = document.getElementById("pdfView");

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          Core.current = parseInt(e.target.dataset.page);
          UI.updatePage();
        }
      });
    }, { threshold: 0.6 });

    this.renderPage(1);
  },

  async renderPage(n) {
    if (document.querySelector(`[data-page="${n}"]`)) return;

    const { canvas } = await Core.getPage(n);

    const wrap = document.createElement("div");
    wrap.dataset.page = n;
    wrap.appendChild(canvas);

    this.container.appendChild(wrap);
    this.observer.observe(wrap);

    // preload next
    if (n + 1 <= Core.total) this.renderPage(n + 1);
  }
};
