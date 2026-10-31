# 📦 API REST de Gerenciamento de Pedidos

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Jest](https://img.shields.io/badge/Jest-Tests-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)]()
[![Licença](https://img.shields.io/badge/Licença-ISC-blue?style=for-the-badge)](./LICENSE)

> **Projeto Prático Avaliativo** — Disciplina de **Tópicos Avançados em Sistemas de Informação II**  
> Repositório oficial: [https://github.com/AdrianaTMelo/api-pedidos](https://github.com/AdrianaTMelo/api-pedidos)

---

## 📌 Visão Geral do Projeto

A **API de Gerenciamento de Pedidos** é uma solução RESTful desenvolvida em **Node.js** e **Express** concebida para atender às demandas de controle de pedidos de uma loja. O sistema permite o ciclo de vida completo do pedido — desde o cadastramento com dados do cliente, tipo de atendimento, valor monetário e nível de prioridade, até consultas pontuais e em lote, além de transições de status guiadas por uma máquina de estados determinada.

O projeto foi concebido com ênfase na excelência arquitetural e qualidade de código, implementando o princípio da separação de responsabilidades (*Separation of Concerns*), validação estrita de dados na camada de serviço, isolamento de persistência em memória e tratamento centralizado de exceções operacionais versus erros não mapeados.

> ℹ️ **Decisões Técnicas & Diferenciais:**  
> * **Arquitetura em Camadas (Layered Architecture):** Segregação rigorosa entre roteamento (`routes`), orquestração HTTP (`controllers`), lógica de negócio/regras de domínio (`services`), abstração de dados (`repositories`) e tipagem de erros (`errors`).  
> * **Armazenamento em Memória Volátil com Repositório Abstrato:** Permite execução instantânea sem necessidade de provisionamento de bancos externos para validação acadêmica, com interface preparada para fácil troca por um ORM/banco persistente (PostgreSQL, MongoDB, etc.).  
> * **Máquina de Estados de Domínio:** O status do pedido obedece a uma matriz estrita de transições permitidas, impedindo estados inválidos (por exemplo, transitar de *recebido* diretamente para *entregue*).  
> * **Tratamento Centralizado de Exceções (`AppError` & `HandlerError`):** Diferenciação transparente entre erros de domínio/cliente (HTTP 400 e 404) e falhas críticas internas de infraestrutura (HTTP 500).  
> * **Suíte de Testes com Jest e Supertest:** Testes de integração automatizados cobrindo todos os fluxos de sucesso e casos de borda/validação com limpeza de repositório entre asserções (`beforeEach`).

---

## 🎯 Objetivos

### Objetivo Geral
Desenvolver e disponibilizar uma API REST completa para o gerenciamento de pedidos de uma loja comercial, assegurando integridade dos dados, tratamento robusto de erros e comprovação empírica de funcionamento através de testes automatizados e evidências de execução via Postman.

### Objetivos Pedagógicos & Técnicos
* **Aplicação de Arquitetura em Camadas (SoC):** Demonstrar domínio na distribuição de responsabilidades entre rotas, controladores, serviços e repositórios.
* **Validação e Higienização de Entradas:** Implementar validações ativas de tipos, campos obrigatórios, aparagem de strings (*trim*) e valores numéricos positivos.
* **Modelagem de Regras de Negócio:** Implementar uma máquina de estados finitos que valida se a alteração de status requisitada é permitida de acordo com o estágio atual do pedido.
* **Tratamento Elegante de Erros:** Fornecer retornos JSON informativos com os códigos HTTP semânticos correspondentes (`200`, `201`, `400`, `404`, `500`).
* **Qualidade de Software com Testes Automatizados:** Escrever e executar casos de teste que validem o ciclo de vida da API com Jest e Supertest.
* **Versionamento Semântico e Rastreabilidade:** Registrar a evolução do desenvolvimento por meio de commits claros e estruturados no Git/GitHub.

---

## 🏛️ Arquitetura e Estrutura de Pastas

A aplicação implementa o padrão arquitetural em camadas com fluxo unidirecional de dependências:

```
Requisição HTTP (Cliente/Postman)
           │
           ▼
┌───────────────────────┐
│   src/routes          │  ➔ Declara endpoints, verbos HTTP e middlewares
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│   src/controllers     │  ➔ Recebe requisições (req), extrai parâmetros e envia resposta (res)
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│   src/services        │  ➔ Contém as regras de negócio, validações e máquina de estados
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│   src/repositories    │  ➔ Armazena e manipula a coleção de pedidos em memória
└───────────────────────┘
           │
     (Caso ocorra erro)
           ▼
┌───────────────────────┐
│   src/errors          │  ➔ AppError (erro operacional) & HandlerError (middleware de captura)
└───────────────────────┘
```

### Árvore de Diretórios do Repositório

```text
Teste-APi/
|
├── evidencias/                       # Capturas de tela comprobatórias da execução via Postman
|   |
│   ├── 01-criacao.png                # POST /pedidos com resposta HTTP 201
│   ├── 02-validacao.png              # POST inválido com resposta HTTP 400
│   ├── 03-listagem.png               # GET /pedidos com resposta HTTP 200
│   ├── 04-consulta-inexistente.png   # GET /pedidos/:id com resposta HTTP 404
│   └── 05-atualizacao.png            # PATCH /pedidos/:id/status com resposta HTTP 200
|
├── src/
|   |
│   ├── controllers/
│   │   └── pedidoController.js       # Orquestrador das requisições e respostas HTTP
|   |
│   ├── errors/
│   │   ├── AppError.js               # Classe personalizada para exceções de negócio e status HTTP
│   │   └── HandlerError.js           # Middleware Express de interceptação global de erros
|   |
│   ├── repositories/
│   │   └── pedidoRepository.js       # Camada de dados em memória (CRUD e autoincremento de ID)
|   |
│   ├── routes/
│   │   └── pedidoRoutes.js           # Definição e mapeamento dos verbos HTTP para /pedidos
|   |
│   ├── services/
│   │   └── pedidoService.js          # Regras de negócio, validações e máquina de estados
|   |
│   └── index.js                      # Inicialização do Express e configuração de portas
|
├── tests/
│   └── pedidos.test.js               # Casos de teste de integração automatizados (Jest + Supertest)
|
├── .gitignore                        # Arquivos e diretórios ignorados pelo Git (ex: node_modules)
├── package.json                      # Metadados do projeto, scripts e dependências
├── package-lock.json                 # Trava de versões exatas das dependências
└── README.md                         # Documentação completa do projeto
```

---

## ⚙️ Funcionalidades e Regras de Negócio

### Requisitos Funcionais

| Código | Requisito | Status | Descrição |
| :---: | :--- | :---: | :--- |
| **RF01** | Cadastrar pedido | `[x]` Concluído | Cria um pedido com cliente, tipo, valor e prioridade, iniciando no status `recebido`. |
| **RF02** | Listar pedidos | `[x]` Concluído | Retorna um array contendo todos os pedidos atualmente em memória. |
| **RF03** | Consultar por ID | `[x]` Concluído | Localiza e retorna os detalhes de um pedido específico com base em seu ID numérico. |
| **RF04** | Atualizar status | `[x]` Concluído | Atualiza o status do pedido respeitando as transições da máquina de estados. |
| **RF05** | Deletar pedido *(Adicional)* | `[x]` Concluído | Remove um pedido da memória pelo ID (implementado como diferencial de consistência). |

---

### Regras de Domínio e Validações de Entrada

1. **`cliente` (Obrigatório - String):**
   * Deve ser uma string preenchida.
   * Não pode conter apenas espaços em branco; espaços excedentes no início e fim são removidos via `.trim()`.
   * *Código de erro:* HTTP `400 Bad Request` caso ausente ou vazio.

2. **`valor` (Obrigatório - Numérico):**
   * Deve ser do tipo `number`.
   * Deve ser estritamente maior que zero (`valor > 0`).
   * *Código de erro:* HTTP `400 Bad Request` caso não seja numérico ou seja $\le 0$.

3. **`tipo` (Obrigatório - Enum):**
   * Aceita exclusivamente os valores: `"entrega"` ou `"retirada"`.
   * *Código de erro:* HTTP `400 Bad Request` para qualquer outro valor.

4. **`prioridade` (Obrigatório - Enum):**
   * Aceita exclusivamente os valores: `"baixa"`, `"normal"` ou `"alta"`.
   * *Código de erro:* HTTP `400 Bad Request` para qualquer outro valor.

5. **`status` (Automático / Controlado):**
   * No cadastro, o pedido é inicializado compulsoriamente com o status `"recebido"`.
   * Identificadores inexistentes em consultas ou alterações disparam HTTP `404 Not Found`.
   * Identificadores não numéricos ou menores que 1 disparam HTTP `400 Bad Request`.

---

### 🔄 Máquina de Estados (Transições de Status)

A alteração do status do pedido no endpoint `PATCH /pedidos/:id/status` deve respeitar rigorosamente o grafo de transições:

```
                ┌──────────────┐
                │   recebido   │
                └──────┬───────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌──────────────────┐       ┌──────────────────┐
│  em_preparacao   │       │    cancelado     │  (Estado Terminal)
└────────┬─────────┘       └──────────────────┘
         │                           ▲
         ├───────────────────────────┤
         ▼
┌──────────────────┐
│     enviado      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     entregue     │  (Estado Terminal)
└──────────────────┘
```

* **Regras de Transição:**
  * De **`recebido`** pode ir para: `em_preparacao` ou `cancelado`.
  * De **`em_preparacao`** pode ir para: `enviado` ou `cancelado`.
  * De **`enviado`** pode ir para: `entregue`.
  * **`entregue`** e **`cancelado`** são estados finais e não admitem nenhuma nova transição.
* Qualquer tentativa de transição fora dessa matriz resultará em HTTP `400 Bad Request` com a mensagem:  
  *`"Transição de status inválida: não é permitido alterar de \"<origem>\" para \"<destino>\"."`*

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Função no Projeto |
| :--- | :---: | :--- |
| **Node.js** | `>= 18.x` | Ambiente de execução JavaScript server-side |
| **Express** | `^5.3.0` | Framework web para criação e gerenciamento das rotas e middlewares REST |
| **Jest** | `^30.5.2` | Framework de testes unitários e de integração automatizados |
| **Supertest** | `^7.3.1` | Biblioteca de asserções e simulação de requisições HTTP para os testes |
| **Nodemon** | `^3.1.14` | Utilitário de monitoramento e reinicialização automática em desenvolvimento |
| **Postman** | Versão atual | Ferramenta visual para testes manuais e geração de evidências |
| **Git / GitHub** | — | Controle de versão distribuído, histórico de commits e repositório remoto |

---

<div id="rotas-da-api"></div>

## 🛣️ Rotas da API e Exemplos de Requisição

> 💡 **Divisória de Referência de Endpoints:**  
> A URL base padrão para execução local é: `http://localhost:3000`

### Sumário de Endpoints

| Método | Rota | Descrição | Status de Sucesso | Status de Falha |
| :---: | :--- | :--- | :---: | :---: |
| `POST` | `/pedidos` | Cadastra um novo pedido | `201 Created` | `400 Bad Request` |
| `GET` | `/pedidos` | Lista todos os pedidos cadastrados | `200 OK` | `500 Internal Error` |
| `GET` | `/pedidos/:id` | Consulta um pedido específico por ID | `200 OK` | `400` / `404 Not Found` |
| `PATCH` | `/pedidos/:id/status` | Atualiza o status do pedido | `200 OK` | `400` / `404 Not Found` |
| `DELETE` | `/pedidos/:id` | Remove um pedido por ID | `200 OK` | `400` / `404 Not Found` |

---

### Detalhamento dos Endpoints e Payloads JSON

#### 1. Criar Pedido (`POST /pedidos`)
Cadastra um novo pedido no sistema. O campo `status` é atribuído automaticamente como `"recebido"` e o `id` é gerado incrementalmente.

* **Exemplo de Requisição (Headers):**
  ```http
  POST /pedidos HTTP/1.1
  Host: localhost:3000
  Content-Type: application/json
  ```
* **Corpo da Requisição (`.json`):**
  ```json
  {
    "cliente": "Carlos Silva",
    "tipo": "entrega",
    "valor": 350.00,
    "prioridade": "normal"
  }
  ```
* **Resposta de Sucesso (`HTTP 201 Created`):**
  ```json
  {
    "id": 1,
    "cliente": "Carlos Silva",
    "tipo": "entrega",
    "valor": 350,
    "prioridade": "normal",
    "status": "recebido"
  }
  ```
* **Resposta de Erro de Validação (`HTTP 400 Bad Request`):**
  ```json
  {
    "status": "error",
    "message": "O campo \"cliente\" é obrigatório e não pode ser vazio."
  }
  ```

---

#### 2. Listar Todos os Pedidos (`GET /pedidos`)
Retorna a lista completa de todos os pedidos atualmente salvos em memória.

* **Exemplo de Requisição:**
  ```http
  GET /pedidos HTTP/1.1
  Host: localhost:3000
  Accept: application/json
  ```
* **Resposta de Sucesso (`HTTP 200 OK`):**
  ```json
  [
    {
      "id": 1,
      "cliente": "Carlos Silva",
      "tipo": "entrega",
      "valor": 350,
      "prioridade": "normal",
      "status": "recebido"
    },
    {
      "id": 2,
      "cliente": "Mariana Souza",
      "tipo": "retirada",
      "valor": 120.5,
      "prioridade": "alta",
      "status": "em_preparacao"
    }
  ]
  ```

---

#### 3. Consultar Pedido por ID (`GET /pedidos/:id`)
Recupera os detalhes de um único pedido pelo seu identificador numérico.

* **Exemplo de Requisição:**
  ```http
  GET /pedidos/1 HTTP/1.1
  Host: localhost:3000
  Accept: application/json
  ```
* **Resposta de Sucesso (`HTTP 200 OK`):**
  ```json
  {
    "id": 1,
    "cliente": "Carlos Silva",
    "tipo": "entrega",
    "valor": 350,
    "prioridade": "normal",
    "status": "recebido"
  }
  ```
* **Resposta de Pedido Não Encontrado (`HTTP 404 Not Found`):**
  ```json
  {
    "status": "error",
    "message": "Pedido com ID 999 não foi encontrado."
  }
  ```
* **Resposta de ID Inválido (`HTTP 400 Bad Request`):**
  ```json
  {
    "status": "error",
    "message": "Identificador inválido."
  }
  ```

---

#### 4. Atualizar Status do Pedido (`PATCH /pedidos/:id/status`)
Avança ou altera o status de um pedido existente, aplicando as regras de transição de estado.

* **Exemplo de Requisição:**
  ```http
  PATCH /pedidos/1/status HTTP/1.1
  Host: localhost:3000
  Content-Type: application/json
  ```
* **Corpo da Requisição (`.json`):**
  ```json
  {
    "status": "em_preparacao"
  }
  ```
* **Resposta de Sucesso (`HTTP 200 OK`):**
  ```json
  {
    "id": 1,
    "cliente": "Carlos Silva",
    "tipo": "entrega",
    "valor": 350,
    "prioridade": "normal",
    "status": "em_preparacao"
  }
  ```
* **Resposta de Transição Não Permitida (`HTTP 400 Bad Request`):**
  ```json
  {
    "status": "error",
    "message": "Transição de status inválida: não é permitido alterar de \"recebido\" para \"entregue\"."
  }
  ```

---

#### 5. Deletar Pedido por ID (`DELETE /pedidos/:id`)
Remove o pedido especificado do repositório em memória.

* **Exemplo de Requisição:**
  ```http
  DELETE /pedidos/1 HTTP/1.1
  Host: localhost:3000
  ```
* **Resposta de Sucesso (`HTTP 200 OK`):**
  ```json
  {
    "id": 1,
    "cliente": "Carlos Silva",
    "tipo": "entrega",
    "valor": 350,
    "prioridade": "normal",
    "status": "em_preparacao"
  }
  ```

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
Antes de iniciar, certifique-se de possuir instalado em sua máquina:
* [Node.js](https://nodejs.org/) versão `18.x` ou superior.
* [Git](https://git-scm.com/) para clonagem do repositório.
* Um cliente HTTP para testes manuais, como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

---

### 2. Clonagem do Repositório
Abra o seu terminal e execute:
```bash
git clone https://github.com/MarcoAntonio16AS/Teste-APi.git
cd Teste-APi
```

---

### 3. Instalação das Dependências
Instale todas as dependências declaradas no `package.json`:
```bash
npm install
```

---

### 4. Executando o Servidor

#### Modo Padrão / Produção:
```bash
npm start
```

#### Modo Desenvolvimento com Auto-Reload (Nodemon):
```bash
npx nodemon src/index.js
```

O terminal exibirá a confirmação:
```text
Servidor rodando com sucesso na porta 3000
```
A API estará acessível em: `http://localhost:3000/pedidos`.

---

### 5. Executando a Suíte de Testes Automatizados
Para executar todos os testes automatizados com Jest:
```bash
npm test
```
*O comando executará `jest --runInBand --detectOpenHandles`, validando todos os cenários de criação, validação de campos, listagem, consultas e transições de status.*

---

## 📸 Evidências de Testes (Postman)

Conforme os requisitos avaliativos, as evidências de execução e validação das rotas foram salvas e organizadas na pasta `/evidencias`:

| Arquivo | Cenário Avaliado | Rota & Método | Status HTTP |
| :--- | :--- | :---: | :---: |
| [`01-criacao.png`](./evidencias/01-criacao.png) | Criação de pedido com dados válidos | `POST /pedidos` | `201 Created` |
| [`02-validacao.png`](./evidencias/02-validacao.png) | Rejeição de pedido com dados inválidos / faltantes | `POST /pedidos` | `400 Bad Request` |
| [`03-listagem.png`](./evidencias/03-listagem.png) | Listagem geral de todos os pedidos cadastrados | `GET /pedidos` | `200 OK` |
| [`04-consulta-inexistente.png`](./evidencias/04-consulta-inexistente.png) | Consulta a identificador numérico inexistente | `GET /pedidos/:id` | `404 Not Found` |
| [`05-atualizacao.png`](./evidencias/05-atualizacao.png) | Atualização de status com transição permitida | `PATCH /pedidos/:id/status` | `200 OK` |
| [`06-delete-id.png`] | Necessário acrescentar | `DELETE /pedidos/:id` | `200 OK` | 

---

## 🤖 Uso de IA no Projeto

> 📝 **ÁREA RESERVADA PARA PREENCHIMENTO MANUAL PELO ALUNO**  
> *(Conforme item 8 do documento avaliativo: "No README, incluir uma seção 'Uso de IA', informando se utilizou, para quais tarefas e descrevendo ao menos uma sugestão aceita, modificada ou rejeitada, com justificativa.")*

Preencha os campos abaixo de acordo com a sua experiência de desenvolvimento:

* **Utilizou ferramentas de Inteligência Artificial como apoio?**  
  `[ ] Sim`  
  `[ ] Não`

* **Ferramenta(s) utilizada(s):**  
  *(Ex.: ChatGPT, GitHub Copilot, Gemini, Claude, etc.)*  
  > _Escreva aqui_

* **Tarefas em que a IA foi aplicada:**  
  * `[ ]` Auxílio no levantamento ou refatoração da arquitetura em camadas
  * `[ ]` Elaboração ou revisão das regras da máquina de estados
  * `[ ]` Criação de roteiros de teste unitário e de integração (Jest/Supertest)
  * `[ ]` Resolução de erros e mensagens de validação
  * `[ ]` Apoio na confecção da documentação e formatação do README
  * `[ ]` Outro: _especifique aqui_

* **Sugestão Aceita (com justificativa):**  
  > **Sugestão fornecida pela IA:**  
  > _Descreva aqui a sugestão que a IA sugeriu e você implementou integralmente._  
  >  
  > **Justificativa da aceitação:**  
  > _Explique por que essa solução foi benéfica para a arquitetura ou funcionalidade do projeto._

* **Sugestão Modificada ou Rejeitada (com justificativa):**  
  > **Sugestão fornecida pela IA:**  
  > _Descreva aqui uma sugestão que a IA deu, mas que você precisou alterar ou optou por descartar._  
  >  
  > **Justificativa da modificação/rejeição:**  
  > _Explique o motivo técnico ou decisão de domínio que levou você a ajustar ou não aplicar o código sugerido._

---

## 🤝 Como Contribuir

1. Realize um Fork do projeto (`git fork`).
2. Crie uma Branch para a sua funcionalidade ou correção:
   ```bash
   git checkout -b feature/minha-melhoria
   ```
3. Realize commits semânticos explicando com clareza as alterações realizadas:
   * `feat: adiciona filtro por prioridade na listagem de pedidos`
   * `fix: corrige validacao de espacos em branco no cliente`
   * `test: adiciona cobertura de testes para transicao de cancelamento`
   * `docs: atualiza documentacao dos endpoints no README`
4. Envie as modificações para o seu repositório remoto:
   ```bash
   git push origin feature/minha-melhoria
   ```
5. Abra um **Pull Request** detalhando as alterações e referenciando os testes executados.

---

## 🗺️ Roadmap e Próximos Passos

- [x] Arquitetura básica em camadas (`routes`, `controllers`, `services`, `repositories`, `errors`).
- [x] CRUD completo com validação de domínio e sanitização de dados.
- [x] Máquina de estados para transições do ciclo de vida do pedido.
- [x] Cobertura de testes de integração com Jest e Supertest.
- [x] Pasta de evidências com capturas de tela do Postman.

---

## 👥 Autores & Identificação Acadêmica

* **Desenvolvedor:** `[INFORMAR_O_NOME_DOS_MEMBROS]`  
* **Disciplina:** Tópicos Avançados em Sistemas de Informação II  
* **GitHub:** [@AdrianaTMelo], [@MarcoAntonio16AS], `[ADICIONAR DOS DEMAIS]`  
* **Repositório:** [https://github.com/AdrianaTMelo/api-pedidos]([https://github.com/AdrianaTMelo/api-pedidos)

---

## 📄 Licença

Este projeto está distribuído sob a licença **ISC**. Consulte o arquivo [LICENSE](./package.json) para mais detalhes.
