//Criação de um repositório de dados salvos na memória, visando simular um banco de dados.

let pedidos = [];
let currentId = 1;

const pedidoRepository = {

  //Criando pedido
  create: (dados) => {
    const novoPedido = { id: currentId++, ...dados }; //Incrementa o ID para cada novo pedido criado
    pedidos.push(novoPedido); //Adiciona o novo pedido ao array de pedidos
    return { ...novoPedido }; //Retorna uma cópia do novo pedido criado para ser verificado
  },

  //Procura todos os pedidos
  findAll: () => {
    return [...pedidos];
  },

  //Procura pedido por ID
  findById: (id) => {
    const pedido = pedidos.find(p => p.id === Number(id));
    return pedido ? { ...pedido } : null;
  },

  //Atualizando status do pedido
  updateStatus: (id, novoStatus) => {
    const index = pedidos.findIndex(p => p.id === Number(id));
    if (index === -1) return null; //Se o pedido não for encontrado, retorna null
    pedidos[index].status = novoStatus;
    return { ...pedidos[index] };
  },

  //Deletando TODOS os pedidos
  clear: () => {
    pedidos = [];
    currentId = 1;
  },

  //Deletar pedido por ID
  clearById: (id) => {
    const index = pedidos.findIndex(p => p.id === Number(id));
    if (index === -1) return null; //Se o pedido não for encontrado, retorna null
    const deletedPedido = pedidos.splice(index, 1)[0]; //Remove o pedido do array e retorna o pedido deletado
    return { ...deletedPedido };
  }
  
};

module.exports = pedidoRepository;