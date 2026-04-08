const UI = {
  mode: "flip",

  updatePage() {
    document.getElementById("pageInfo").innerText =
      Core.current + " / " + Core.total;
  },

  next() {
    if (this.mode === "flip") Flipbook.instance.flipNext();
    else PDFView.renderPage(Core.current + 1);
  },

  prev() {
    if (this.mode === "flip") Flipbook.instance.flipPrev();
  },

  goTo(n) {
    Core.current = n;
    if (this.mode === "flip") Flipbook.instance.flip(n - 1);
    else PDFView.renderPage(n);
  },

  toggleView() {
    this.mode = this.mode === "flip" ? "pdf" : "flip";

    document.getElementById("flipbook").classList.toggle("hidden");
    document.getElementById("pdfView").classList.toggle("hidden");
  }
};
