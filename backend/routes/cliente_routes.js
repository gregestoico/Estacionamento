const express = require('express');
const router = express.Router();
const { getAllPlans } = require('../database/plano_queries');
const { createClientAndVehicle } = require('../database/cliente_queries');

router.get('/plans', async (req, res) => {
    try {
        const plans = await getAllPlans();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar planos' });
    }
});

router.post('/clients', async (req, res) => {
    try {
        await createClientAndVehicle(req.body.client, req.body.vehicle);
        res.status(201).json({ message: 'Cadastro realizado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao cadastrar' });
    }
});

module.exports = router;
