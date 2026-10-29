const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');
const AppError = require('./errors/AppError');

const app = express();

app.use(express.json());

app.use('/pedidos', pedidoRoutes);

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

module.exports = app;

//Vai se fundir com o app.js para formar o index.js, concentrando em um só arquivo a criação do servidor e a configuração das rotas. 
//Ajuda a simplificar a estrutura do projeto, tornando-o mais fácil de entender e manter.
//Tratamento de erros irá para a pasta Errors.