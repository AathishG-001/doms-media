const Core = {
  pdf: null,
  total: 0,
  current: 1,
  cache: {},
  scale: 1.5,

  async init(url) {
    this.pdf = await pdfjsLib.getDocument(url).promise;
    this.total = this.pdf.numPages;

    UI.updatePage();
    Flipbook.init();
    PDFView.init();
    Search.buildIndex();
  },

  async getPage(n) {
    if (this.cache[n]) return this.cache[n];

    const page = await this.pdf.getPage(n);
    const vp = page.getViewport({ scale: this.scale });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = vp.width;
    canvas.height = vp.height;

    await page.render({ canvasContext: ctx, viewport: vp }).promise;

    this.cache[n] = { canvas, page };
    return this.cache[n];
  }
};
