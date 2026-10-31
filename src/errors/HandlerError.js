const AppError = require('./AppError');

const handlerError = (err, req, res, next) => {
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
};

module.exports = handlerError;

/*------------------------------------------------------------------------------------------------------------------------------- 
Handler = Tratador de erros do código, que é responsável por capturar e tratar os erros que ocorrem durante a execução da aplicação.
-------------------------------------------------------------------------------------------------------------------------------*/