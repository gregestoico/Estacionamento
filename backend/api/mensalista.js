const serviceMensalista = require("../services/mensalista");

class ApiMensalista {
    async findByCpf(req, res){
        try {
            const cpf = req.params.cpf
            const mensalista = await serviceMensalista.findByCpf(cpf)

            res.status(200).send({ mensalista }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async findAll(req, res) {
        try {
            const mensalistas =  await serviceMensalista.findAll()

            res.status(200).send({ mensalistas }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async create(req, res) {
        try {
            const { cpf, nome, email, telefone, cod_plano } = req.body
            const mensalista = await serviceMensalista.create(cpf, nome, email, telefone, cod_plano)

            res.status(200).send({ mensalista }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async update(req, res) {
        try {
            const cpf = req.params.cpf 
            const { nome, email, telefone, cod_plano } = req.body
            const result = await serviceMensalista.update(cpf, nome, email, telefone, cod_plano)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async delete(req, res) {
        try {
            const {cpf} = req.params
            const mensalista = await serviceMensalista.delete(cpf)

            res.status(200).send({ mensalista }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ApiMensalista();