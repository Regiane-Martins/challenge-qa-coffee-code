#### Este repositório contém os testes automatizados utilizando o Cypress para verificar o fluxo de carrinho de compras e checkout de um e-commerce. Os relatórios de testes são gerados usando o Allure.

##### Pré-requisitos
Antes de começar, certifique-se de ter os seguintes itens instalados:

* Node.js
* npm ou Yarn
* Java (necessário para o Allure)

##### Instalação
1. Clone este repositório: 'https://github.com/Regiane-Martins/challenge-qa-coffee-code.git'
2. Instale as dependências do projeto: 'npm install'
3. Instale o Allure Commandline: 'npm install -g allure-commandline --save-dev'

##### Executando os Testes
* Interface Gráfica do Cypress : 'npx cypress open'

##### Gerando Relatórios do Allure
* allure generate allure-results --clean -o allure-report
* allure open allure-report


##### Limitações e Contornos
* Validação do Email

Na etapa de validação do email, a implementação completa da validação ficou pendente devido à API de envio de email não estar cadastrando o usuário corretamente. Durante os testes, em vez de validar o envio e a recepção de emails, utilizei emails gerados dinamicamente com o uso do timestamp no código para garantir que os testes pudessem ser executados sem interrupções.


##### Verificação do Histórico de Pedidos
Devido à limitação da API de envio de email que não cadastra corretamente o usuário, não foi possível concluir o teste de verificação se o pedido aparece corretamente no histórico de pedidos do usuário. A autenticação do usuário não pôde ser realizada com sucesso, impedindo a verificação dessa funcionalidade específica.
Para contornar essa situação, fiz a análise da tela de confirmação do pedido, onde constam os dados e detalhes do pedido.