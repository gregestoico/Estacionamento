const express = require("express");
const routerVeiculo = express.Router();
const apiVeiculo = require("../api/veiculo");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerVeiculo.get('/:cod', authMiddleware(), apiVeiculo.findByCod)
routerVeiculo.get('/', authMiddleware(), apiVeiculo.findAll)
routerVeiculo.post('/', authMiddleware(), apiVeiculo.create)
routerVeiculo.put('/:cod', authMiddleware(), apiVeiculo.update)
routerVeiculo.delete('/:cod', authMiddleware(), apiVeiculo.delete)

module.exports = routerVeiculo

