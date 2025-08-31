export default class ScrollSuave {
  constructor(links, options) {
    this.linksInternos = document.querySelectorAll(links);
    if (options === undefined) {
      this.options = { behavior: "smooth", block: "start" };
    } else {
      this.options = options;
    }

    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event) {
    const href = event.currentTarget.getAttribute("href");
    // A condição abaixo garante que o script só atue em links internos (que começam com #)
    if (href.startsWith("#")) {
      event.preventDefault();
      const section = document.querySelector(href);
      section.scrollIntoView(this.options);
    }
    // Se não começar com '#', a função não faz nada, e o navegador segue o link normalmente.
  }

  addLinkEvent() {
    this.linksInternos.forEach((link) => {
      link.addEventListener("click", this.scrollToSection);
    });
  }

  init() {
    if (this.linksInternos.length) {
      this.addLinkEvent();
    }
    return this;
  }
}
