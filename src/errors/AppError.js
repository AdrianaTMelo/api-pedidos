class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;

/* 
Usaremos essa file para realizar o tratamento de erros da API. Ela está retornando uma mensagem de erro
+ o código de status do erro. O que está correto, mas o professor pediu especificamente tratar os erros de forma
mais detalhada, uma vez que o usuário pode não saber o que está ocorrendo. Faremos isso aqui ao invés de exportar
essa classe lá para o app.js, enquanto permite unir app.js + server.js em um único arquivo 
*/