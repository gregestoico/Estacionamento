const servicePlano = require("../services/plano");

class ApiPlano {
    async findByCod(req, res){
        try {
            const cod_plano = req.params.cod
            const plano = await servicePlano.findByCod(cod_plano)

            res.status(200).send({ plano }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async findAll(req, res) {
        try {
            const planos =  await servicePlano.findAll()

            res.status(200).send({ planos }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async create(req, res) {
        try {
            const { cod_plano, turno, preco_mensal } = req.body
            const result = await servicePlano.create(cod_plano, turno, preco_mensal)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async update(req, res) {
        try {
            const cod_plano = req.params.cod
            const { turno, preco_mensal } = req.body
            const result = await servicePlano.update(cod_plano, turno, preco_mensal)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async delete(req, res) {
        try {
            const cod_plano = req.params.cod
            const result = await servicePlano.delete(cod_plano)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ApiPlano();