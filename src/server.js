const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});

//Vai se fundir com o app.js para formar o index.js, concentrando em um só arquivo a criação do servidor e a configuração das rotas. 
//Ajuda a simplificar a estrutura do projeto, tornando-o mais fácil de entender e manter.