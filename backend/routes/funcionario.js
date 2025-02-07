const express = require("express");
const routerFuncionario = express.Router();
const apiFuncionario = require("../api/funcionario");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerFuncionario.get('/info', authMiddleware(), apiFuncionario.findByCpf)
routerFuncionario.put('/', authMiddleware(), apiFuncionario.update)
routerFuncionario.delete('/', authMiddleware(), apiFuncionario.delete)

// Rotas do gerente (apenas funcionários logados como gerente podem acessar)
routerFuncionario.post('/', authMiddleware('gerente'), apiFuncionario.create)
routerFuncionario.get('/', authMiddleware('gerente'), apiFuncionario.findAll)
routerFuncionario.get('/:cpf', authMiddleware('gerente'), apiFuncionario.findByCpf)
routerFuncionario.put('/:cpf', authMiddleware('gerente'), apiFuncionario.update)
routerFuncionario.delete('/:cpf', authMiddleware('gerente'), apiFuncionario.delete)


module.exports = routerFuncionario

