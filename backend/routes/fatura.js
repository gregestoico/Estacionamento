const express = require("express");
const routerFatura = express.Router();
const apiFatura = require("../api/fatura");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerFatura.get('/:cod', authMiddleware(), apiFatura.findByCod)
routerFatura.get('/', authMiddleware(), apiFatura.findAll)
routerFatura.post('/', authMiddleware(), apiFatura.create)
routerFatura.put('/:cod', authMiddleware(), apiFatura.update)
routerFatura.delete('/:cod', authMiddleware(), apiFatura.delete)

module.exports = routerFatura

