Sistema de Gerenciamento de Clientes com Roteamento Otimizado
Descrição
Este sistema permite que uma empresa de serviços cadastre clientes e otimize rotas de atendimento. A solução é dividida em um backend em Node.js com banco de dados PostgreSQL para gerenciar os dados dos clientes e um frontend em React para interação do usuário. Utiliza-se a API do Google Maps Directions para calcular rotas otimizadas.

Pré-requisitos
Node.js
PostgreSQL
React
@google/maps Node.js client library
Uma chave da API do Google Maps com a Directions API ativada
Instalação
Banco de Dados PostgreSQL
Instale e configure o PostgreSQL em sua máquina.
Crie um banco de dados chamado clientes_db.
Dentro deste banco de dados, crie uma tabela clientes com as seguintes colunas: id, nome, email, telefone, coordenada_x, coordenada_y.
Backend (Node.js)
Clone o repositório para sua máquina local.
Navegue até a pasta backend e instale as dependências com npm install.
Configure as variáveis de ambiente no arquivo .env com as credenciais do seu banco de dados e chave da API do Google Maps.
Inicie o servidor com npm start.
Frontend (React)
Navegue até a pasta frontend e instale as dependências com npm install.
Inicie a aplicação React com npm start.
A aplicação estará disponível no navegador em localhost:3000.
Uso
Cadastrar Clientes
No frontend, preencha os campos do formulário com os detalhes do cliente e suas coordenadas geográficas.
Clique em "Cadastrar Cliente" para enviar os dados ao backend.
Visualizar Clientes
Os clientes cadastrados podem ser visualizados diretamente na interface do usuário, onde serão listados.
Calcular Rota Otimizada
Após cadastrar os clientes, clique em "Calcular Rota Otimizada".
Uma modal será exibida com a lista dos clientes na ordem que devem ser visitados, conforme calculado pela API do Google Maps.



Estrutura do Projeto
bash
Copy code
/projeto
│
├── /backend
│   ├── routes.js         # Endpoints da API para gerenciar clientes e calcular rotas.
│   ├── server.js         # Inicialização e configuração do servidor Express.
│   └── ...
│
├── /clientes
│   ├── /public
│   │   └── index.html
│   ├── /src
│   │   ├── App.js        # Componente principal do React.
│   │   ├── RouteModal.js # Modal para exibir a rota otimizada.
│   │   ├── index.js      # Ponto de entrada do React.
│   │   └── ...
│   └── package.json      # Dependências do projeto React.
│
└── README.md             # Instruções e documentação do projeto.