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