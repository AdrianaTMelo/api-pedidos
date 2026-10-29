const pedidoRoutes = require('./routes/pedidosRoutes');

//-----------------------------------------------------------------
//Criação do servidor
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/pedidos', pedidoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});