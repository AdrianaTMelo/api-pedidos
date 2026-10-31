const request = require('supertest');
const app = require('../src/index');
const pedidoRepository = require('../src/repositories/pedidoRepository');

// Limpar o repositório antes de cada teste para garantir isolamento
beforeEach(() => {
  pedidoRepository.clear();
});

// Testes de integração para a API de Pedidos (Testando cada uma das rotas e suas funcionalidades)
describe('Fluxo da API de Pedidos', () => {

  // Teste de criação de pedido com sucesso
  test('POST /pedidos - Deve criar um pedido com sucesso (201)', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({
        cliente: 'Carlos Silva',
        tipo: 'entrega',
        valor: 350,
        prioridade: 'normal'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body.cliente).toBe('Carlos Silva');
    expect(res.body.status).toBe('recebido');
  });

  // Teste de criação de pedido com cliente vazio
  test('POST /pedidos - Deve falhar se cliente for vazio (400)', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({
        cliente: '   ',
        tipo: 'entrega',
        valor: 100,
        prioridade: 'normal'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  // Teste de criação de pedido com valor inválido
  test('POST /pedidos - Deve falhar se valor for menor ou igual a zero (400)', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({
        cliente: 'Maria',
        tipo: 'retirada',
        valor: 0,
        prioridade: 'baixa'
      });

    expect(res.status).toBe(400);
  });

  // Teste de captura de de pedidos cadastrados
  test('GET /pedidos - Deve listar todos os pedidos (200)', async () => {
    await request(app).post('/pedidos').send({
      cliente: 'Cliente 1',
      tipo: 'entrega',
      valor: 50,
      prioridade: 'baixa'
    });

    const res = await request(app).get('/pedidos');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  // Teste de busca de pedido por ID inexistente
  test('GET /pedidos/:id - Deve retornar 404 para ID inexistente', async () => {
    const res = await request(app).get('/pedidos/999');
    expect(res.status).toBe(404);
  });

  // Teste de atualização de status de pedido com transição válida
  test('PATCH /pedidos/:id/status - Deve atualizar transição válida (200)', async () => {
    const postRes = await request(app).post('/pedidos').send({
      cliente: 'João',
      tipo: 'retirada',
      valor: 120,
      prioridade: 'alta'
    });

    const patchRes = await request(app)
      .patch(`/pedidos/${postRes.body.id}/status`)
      .send({ status: 'em_preparacao' });

    expect(patchRes.status).toBe(200);
    expect(patchRes.body.status).toBe('em_preparacao');
  });

  // Teste de atualização de status de pedido com transição inválida
  test('PATCH /pedidos/:id/status - Deve barrar transição de status inválida (400)', async () => {
    const postRes = await request(app).post('/pedidos').send({
      cliente: 'Ana',
      tipo: 'entrega',
      valor: 80,
      prioridade: 'normal'
    });

    const patchRes = await request(app)
      .patch(`/pedidos/${postRes.body.id}/status`)
      .send({ status: 'entregue' });

    expect(patchRes.status).toBe(400);
  });

  // Teste de deleção de pedido existente
  test('DELETE /pedidos/:id - Deve deletar pedido existente (200)', async () => {
    const postRes = await request(app).post('/pedidos').send({
      cliente: 'Pedro',
      tipo: 'retirada',
      valor: 200,
      prioridade: 'alta'
    
    });
    const deleteRes = await request(app).delete(`/pedidos/${postRes.body.id}`);
    expect(deleteRes.status).toBe(200);
  });

});