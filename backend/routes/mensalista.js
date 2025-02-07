const express = require("express");
const routerMensalista = express.Router();
const apiMensalista = require("../api/mensalista");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerMensalista.get('/:cpf', authMiddleware(), apiMensalista.findByCpf)
routerMensalista.get('/', authMiddleware(), apiMensalista.findAll)
routerMensalista.post('/', authMiddleware(), apiMensalista.create)
routerMensalista.put('/:cpf', authMiddleware(), apiMensalista.update)
routerMensalista.delete('/:cpf', authMiddleware(), apiMensalista.delete)

module.exports = routerMensalista

