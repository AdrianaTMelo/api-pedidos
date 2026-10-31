const express = require('express');
const app = express();
/*---------------------------------------------------------------------------------------------------------
Criação de uma classe de erro personalizada para a API, que estende a classe Error do JavaScript. 
----------------------------------------------------------------------------------------------------------*/
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;