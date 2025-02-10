const serviceVaga = require("../services/vaga");

class ApiVaga {
    async findByCod(req, res){
        try {
            const cod_vaga = req.params.cod
            const vaga = await serviceVaga.findByCod(cod_vaga)

            res.status(200).send({ vaga }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async findAll(req, res) {
        try {
            const vagas =  await serviceVaga.findAll()

            res.status(200).send({ vagas }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async create(req, res) {
        try {
            const { cod_vaga, tipo_veic, situacao} = req.body
            const result = await serviceVaga.create(cod_vaga, tipo_veic, situacao)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async update(req, res) {
        try {
            const cod_vaga = req.params.cod
            const { tipo_veic, situacao } = req.body
            const result = await serviceVaga.update(cod_vaga, tipo_veic, situacao)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async delete(req, res) {
        try {
            const cod_vaga = req.params.cod
            const result = await serviceVaga.delete(cod_vaga)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ApiVaga();