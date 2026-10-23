let pedidos = [];
let currentId = 1;

const pedidoRepository = {
  create: (dados) => {
    const novoPedido = { id: currentId++, ...dados };
    pedidos.push(novoPedido);
    return { ...novoPedido };
  },

  findAll: () => {
    return [...pedidos];
  },

  findById: (id) => {
    const pedido = pedidos.find(p => p.id === Number(id));
    return pedido ? { ...pedido } : null;
  },

  updateStatus: (id, novoStatus) => {
    const index = pedidos.findIndex(p => p.id === Number(id));
    if (index === -1) return null;
    pedidos[index].status = novoStatus;
    return { ...pedidos[index] };
  },

  clear: () => {
    pedidos = [];
    currentId = 1;
  }
};

module.exports = pedidoRepository;