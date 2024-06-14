const { should } = require("chai");

describe("Verificação das funcionalidades do site do desafio", () => {
  it("Deve carregar a página inicial corretamente", () => {
    cy.visit("https://challenge.homolog.tech/");
  });
  it("Deve direcionar para o respectivo produto ao selecionar um produto", () => {
    cy.visit("https://challenge.homolog.tech/");
    cy.get(
      ".post-74 > .woocommerce-LoopProduct-link > .attachment-woocommerce_thumbnail"
    )
      .first()
      .click();
    //verificando se a pagina alterou url para produto esperado
    cy.url().should("include", "produto/album");
    //verificando titulo do produto
    cy.get(".product_title").should("contain", "Album");
  });

  it("Produto deve ser corretamente adicionado ao carrinho de compra", () => {
    cy.visit("https://challenge.homolog.tech/");
    //selecionando o produto a ser comprado
    cy.get(".post-74 > .button").should("be.visible").click();
    //verificar atualização do ícone no carrinho
    cy.get(".cart-contents", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "1");
  });
});

describe("Testes de Carrinho e Checkout", () => {
  const timestamp = Date.now();

  beforeEach(() => {
    cy.visit("https://challenge.homolog.tech/");

    // Selecionando o primeiro produto a ser comprado
    cy.get(".post-74 > .button").should("be.visible").click();
    cy.wait(2000);

    // Ir até o carrinho de compras
    cy.get(".added_to_cart").click();
    cy.url().should("include", "/carrinho");
  });

  it("Produto deve está listado corretamente no carrinho de compras", () => {
    //verificar se o produto esta na listagem do carrinho
    cy.contains("Album").should("be.visible");
  });

  it("Verificar se o processo de checkout pode ser iniciado a partir do carrinho", () => {
    // inicializando processo de checkout da compra
    cy.get(".checkout-button").should("be.visible").click();
    cy.url().should("include", "/finalizar-compra");

    //Verificar se os dados de entrega podem ser preenchidos corretamente no formulário de checkout
    cy.get("#billing_first_name").type("Regiane");
    cy.get("#billing_last_name").type("Henrique");

    // Selecionando tipo de pessoa (Pessoa Física)
    cy.get("#select2-billing_persontype-container").click();
    cy.get("#select2-billing_persontype-container")
      .contains("Pessoa Física")
      .click();

    cy.get("#billing_cpf").type("10155835637");

    // Selecionando país (Brasil)
    cy.get("#select2-billing_country-container").click();
    cy.get("#select2-billing_country-container").contains("Brasil").click();

    cy.get("#billing_postcode").type("35051050");
    cy.get("#billing_address_1").type("Rua 1");
    cy.get("#billing_number").type("163");
    cy.get("#billing_address_2").type("Casa");
    cy.get("#billing_neighborhood").type("Nova Vila Bretas");
    cy.get("#billing_city").type("Governador Valadares");
    cy.get("#select2-billing_state-container").contains("Minas Gerais");
    cy.get("#billing_phone").type("33988653590");
    cy.get("#billing_email").type(`regiane${timestamp}@gmail.com`);

    //Verificar se o método de pagamento pode ser selecionado no checkout

    //Selecionando método de pagamento
    cy.get('[for="payment_method_getnet-creditcard"]').click();
    cy.get(".wc_payment_method.payment_method_getnet-billet > label").click();
    cy.get(".wc_payment_method.payment_method_getnet-pix > label").click();

    //Verificando se o método de pagamento está selecionado
    cy.get(
      '.wc_payment_method.payment_method_getnet-pix > input[type="radio"]'
    ).should("be.checked");

    //Confirmar o pedido
    cy.get("#place_order").click();

    //mensagem de pedido recebido e detalhes do pedido deve aparecer corretamente
    cy.contains("Pedido recebido", { timeout: 10000 }).should("be.visible");
    cy.contains("Detalhes do pedido", { timeout: 10000 }).should("be.visible");
  });
});
