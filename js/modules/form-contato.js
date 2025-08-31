export default class FormContato {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    // Se não encontrar o formulário na página, o script para aqui.
    if (!this.form) return;

    // CORREÇÃO: Selecionamos os dois containers de mensagem de forma explícita
    this.successContainer = document.querySelector(".success-message");
    this.errorContainer = document.querySelector(".error-message");

    // A linha abaixo é crucial para garantir o 'this' correto dentro do handleSubmit
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validaNome(nome) {
    const nomeArray = nome.trim().split(" ");
    return nomeArray.length >= 2;
  }

  // Função para limpar mensagens antigas
  ocultaMensagens() {
    if (this.successContainer) this.successContainer.style.display = "none";
    if (this.errorContainer) this.errorContainer.style.display = "none";
  }

  // Função para exibir uma mensagem no container correto
  exibeMensagem(type, mensagem) {
    this.ocultaMensagens();
    const container =
      type === "success" ? this.successContainer : this.errorContainer;
    if (container) {
      container.innerText = mensagem;
      container.style.display = "block";
    }
  }

  handleSubmit(event) {
    // Esta é a linha que impede o recarregamento
    event.preventDefault();

    const nomeInput = this.form.querySelector("#nome");
    const emailInput = this.form.querySelector("#email");
    const mensagemInput = this.form.querySelector("#mensagem");

    const nomeEValido = this.validaNome(nomeInput.value);

    if (!nomeEValido || emailInput.value === "" || mensagemInput.value === "") {
      this.exibeMensagem(
        "error",
        "Por favor, preencha todos os campos corretamente."
      );
    } else {
      this.exibeMensagem(
        "success",
        "Mensagem enviada com sucesso! Agradecemos o contato."
      );
      this.form.reset();
    }
  }

  addFormEvent() {
    this.form.addEventListener("submit", this.handleSubmit);
  }

  init() {
    if (this.form) {
      this.addFormEvent();
    }
    return this;
  }
}
