const express = require("express");
const routerFuncionario = express.Router();
const apiFuncionario = require("../api/funcionario");
const authMiddleware = require('../middleware/auth');


// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerFuncionario.get('/info', authMiddleware(), apiFuncionario.findByCpf)
routerFuncionario.put('/', authMiddleware(), apiFuncionario.update)
routerFuncionario.delete('/', authMiddleware(), apiFuncionario.delete)


// Rotas do admin (apenas funcionários logados como admin podem acessar)
routerFuncionario.post('/', authMiddleware('admin'), apiFuncionario.create)
routerFuncionario.get('/', authMiddleware('admin'), apiFuncionario.findAll)
routerFuncionario.get('/:cpf', authMiddleware('admin'), apiFuncionario.findByCpf)
routerFuncionario.put('/:cpf', authMiddleware('admin'), apiFuncionario.update)
routerFuncionario.delete('/:cpf', authMiddleware('admin'), apiFuncionario.delete)


module.exports = routerFuncionario

