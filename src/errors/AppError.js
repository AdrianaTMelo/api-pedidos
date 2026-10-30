//Criação de uma classe de erro personalizada para a API, que estende a classe Error do JavaScript.
//Tratamentos de erros ocorrerão diretamente aqui! Mensagens personalizadas serão retornadas para o usuário, 
//de acordo com o tipo de erro que ocorrer.

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro interno no servidor.'
  });
});