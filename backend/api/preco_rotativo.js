const servicePrecoRotativo = require("../services/preco_rotativo");

class ApiPrecoRotativo {
    async findByTipo(req, res){
        try {
            const tipo_veic = req.params.tipo
            const valor_hora = await servicePrecoRotativo.findByTipo(tipo_veic)

            res.status(200).send({ valor_hora }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async findAll(req, res) {
        try {
            const valores_hora =  await servicePrecoRotativo.findAll()

            res.status(200).send({ valores_hora }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async create(req, res) {
        try {
            const { tipo_veic, valor_hora } = req.body
            const result = await servicePrecoRotativo.create(tipo_veic, valor_hora)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async update(req, res) {
        try {
            const tipo_veic = req.params.tipo
            const { valor_hora } = req.body
            const result = await servicePrecoRotativo.update(tipo_veic, valor_hora)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async delete(req, res) {
        try {
            const tipo_veic = req.params.tipo
            const result = await servicePrecoRotativo.delete(tipo_veic)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ApiPrecoRotativo();