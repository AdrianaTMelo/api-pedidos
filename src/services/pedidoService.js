const pedidoRepository = require('../repositories/pedidoRepository');
const AppError = require('../errors/AppError');

const TIPOS_VALIDOS = ['entrega', 'retirada'];
const PRIORIDADES_VALIDAS = ['baixa', 'normal', 'alta'];
const STATUS_VALIDOS = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

const TRANSIÇÕES_PERMITIDAS = {
  recebido: ['em_preparacao', 'cancelado'],
  em_preparacao: ['enviado', 'cancelado'],
  enviado: ['entregue'],
  entregue: [],
  cancelado: []
};

const pedidoService = {
  criarPedido: (dados) => {
    const { cliente, tipo, valor, prioridade } = dados;

    if (!cliente || typeof cliente !== 'string' || cliente.trim() === '') {
      throw new AppError('O campo "cliente" é obrigatório e não pode ser vazio.', 400);
    }

    if (valor === undefined || typeof valor !== 'number' || isNaN(valor) || valor <= 0) {
      throw new AppError('O campo "valor" deve ser um número maior que zero.', 400);
    }

    if (!tipo || !TIPOS_VALIDOS.includes(tipo)) {
      throw new AppError(`O campo "tipo" deve ser um dos seguintes: ${TIPOS_VALIDOS.join(', ')}.`, 400);
    }

    if (!prioridade || !PRIORIDADES_VALIDAS.includes(prioridade)) {
      throw new AppError(`O campo "prioridade" deve ser um dos seguintes: ${PRIORIDADES_VALIDAS.join(', ')}.`, 400);
    }

    const payload = {
      cliente: cliente.trim(),
      tipo,
      valor,
      prioridade,
      status: 'recebido'
    };

    return pedidoRepository.create(payload);
  },

  listarPedidos: () => {
    return pedidoRepository.findAll();
  },

  buscarPorId: (id) => {
    const numId = Number(id);
    if (isNaN(numId) || numId <= 0) {
      throw new AppError('Identificador inválido.', 400);
    }

    const pedido = pedidoRepository.findById(numId);
    if (!pedido) {
      throw new AppError(`Pedido com ID ${id} não foi encontrado.`, 404);
    }

    return pedido;
  },

  atualizarStatus: (id, novoStatus) => {
    const numId = Number(id);
    if (isNaN(numId) || numId <= 0) {
      throw new AppError('Identificador inválido.', 400);
    }

    if (!novoStatus || !STATUS_VALIDOS.includes(novoStatus)) {
      throw new AppError(`Status inválido. Valores aceitos: ${STATUS_VALIDOS.join(', ')}.`, 400);
    }

    const pedido = pedidoRepository.findById(numId);
    if (!pedido) {
      throw new AppError(`Pedido com ID ${id} não foi encontrado.`, 404);
    }

    const proximosStatus = TRANSIÇÕES_PERMITIDAS[pedido.status] || [];
    if (!proximosStatus.includes(novoStatus)) {
      throw new AppError(
        `Transição de status inválida: não é permitido alterar de "${pedido.status}" para "${novoStatus}".`,
        400
      );
    }

    return pedidoRepository.updateStatus(numId, novoStatus);
  }
};

module.exports = pedidoService;