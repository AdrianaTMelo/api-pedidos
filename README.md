# API de Gerenciamento de Pedidos

Projeto avaliativo prático desenvolvido para a disciplina de **Tópicos Avançados em Sistemas de Informação II**.

## Descrição do Projeto
API RESTful desenvolvida em Node.js e Express para gerenciamento de pedidos de uma loja. O sistema adota arquitetura em camadas, validações rigorosas de domínio, tratamento centralizado de erros e armazenamento volátil em memória.

---

## Arquitetura do Software
O projeto foi estruturado seguindo o padrão de separação de responsabilidades (*Separation of Concerns* - SoC):

- **`src/routes` (Routes):** Declaração das rotas e verbos HTTP (`POST`, `GET`, `PATCH`), repassando as requisições para a camada de controle.
- **`src/controllers` (Controllers):** Recepção dos dados de entrada (`req`), invocação dos serviços de negócio e retorno da resposta HTTP formatada (`res`).
- **`src/services` (Services):** Centralização das regras de negócio, validações de integridade e máquina de estados para transições de status.
- **`src/repositories` (Repositories):** Camada de abstração e persistência dos dados armazenados em memória (`Array`).
- **`src/errors` (Errors):** Padronização de erros operacionais (`AppError`) para diferenciar erros de cliente (HTTP 400, 404) de falhas inesperadas (HTTP 500).

---

## Regras de Domínio e Validações

### Campos do Pedido:
- **`cliente`**: Obrigatório, texto não vazio (espaços em branco nas extremidades são eliminados via `.trim()`).
- **`valor`**: Obrigatório, numérico e estritamente maior que zero (`> 0`).
- **`tipo`**: Obrigatório. Valores aceitos: `entrega`, `retirada`.
- **`prioridade`**: Obrigatório. Valores aceitos: `baixa`, `normal`, `alta`.
- **`status`**: Inicializado automaticamente com o estado `recebido`.

### Máquina de Estados (Transições de Status):
- `recebido` ➔ `em_preparacao` ou `cancelado`
- `em_preparacao` ➔ `enviado` ou `cancelado`
- `enviado` ➔ `entregue`
- `entregue` e `cancelado` são estados finais (não admitem novas transições).

---

## Instruções de Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm

### 1. Clonar o repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd api-pedidos