const pedidoRoutes = require('./routes/pedidoRoutes');

/*-----------------------------------------------------------------
  Criação do servidor
-----------------------------------------------------------------*/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const handlerError = require('./errors/HandlerError');

app.use(express.json());
app.use('/pedidos', pedidoRoutes);

app.use(handlerError);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
  });
}

//Exportando o app para que possa ser usado nos testes
module.exports = app;

/*-----------------------------------------------------------------------------------------------------------------
A criação desse 'if' é para evitar que o servidor seja iniciado durante os testes usando Jest
Assim, o Jest pode importar o app sem iniciar o servidor, permitindo que os testes sejam executados corretamente.
-----------------------------------------------------------------------------------------------------------------*/