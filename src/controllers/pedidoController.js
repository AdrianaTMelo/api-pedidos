const pedidoService = require('../services/pedidoService');

const pedidoController = {
  //Criar pedido
  create: (req, res, next) => {
    try {
      const novoPedido = pedidoService.criarPedido(req.body);
      console.log('Pedido criado com sucesso:', novoPedido);

      return res.status(201).json(novoPedido);
    } catch (error) {
      next(error);
    }
  },

  //Listar todos os pedidos
  getAll: (req, res, next) => {
    try {
      const pedidos = pedidoService.listarPedidos();
      
      if (pedidos.length === 0) {
        console.log('Nenhum pedido encontrado.');
      } else {
        console.log('Pedidos encontrados:', pedidos);
      }

      return res.status(200).json(pedidos);
    } catch (error) {
      next(error);
    }
  },

  //Buscar pedido por ID
  getById: (req, res, next) => {
    try {
      const pedido = pedidoService.buscarPorId(req.params.id);
      console.log('Pedido encontrado:', pedido);

      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  },

  //Atualizar status do pedido
  updateStatus: (req, res, next) => {
    try {
      const { status } = req.body;
      const pedidoAtualizado = pedidoService.atualizarStatus(req.params.id, status);
      console.log('Status do pedido atualizado com sucesso:', pedidoAtualizado);

      return res.status(200).json(pedidoAtualizado);
    } catch (error) {
      next(error);
    }
  },

  //Deletar pedido por ID
  deleteById: (req, res, next) => {
    try {
      const pedidoDeletado = pedidoService.deletarPorId(req.params.id);
      console.log('Pedido deletado com sucesso:', pedidoDeletado);

      return res.status(200).json(pedidoDeletado);
    } catch (error) {
      next(error);
    }
  }

};

module.exports = pedidoController;