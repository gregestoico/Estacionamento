const express = require("express");
const routerFatura = express.Router();
const apiFatura = require("../api/fatura");
const authMiddleware = require('../middleware/auth');

// Rotas auxiliares
routerFatura.put('/pagar/:cod', authMiddleware(), apiFatura.pagarFatura)
// Novas rotas para faturamento
routerFatura.get('/faturamento', authMiddleware(), apiFatura.faturamento);
// routerFatura.get('/faturamento/mensalistas', authMiddleware(), apiFatura.faturamentoMensalistas);
routerFatura.get('/faturamentoMin', authMiddleware(), apiFatura.faturasDeFaturamentoMin);

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerFatura.get('/:cod', authMiddleware(), apiFatura.findByCod)
routerFatura.get('/', authMiddleware(), apiFatura.findAll)
routerFatura.post('/', authMiddleware(), apiFatura.create)
routerFatura.put('/:cod', authMiddleware(), apiFatura.update)
routerFatura.delete('/:cod', authMiddleware(), apiFatura.delete)


module.exports = routerFatura

