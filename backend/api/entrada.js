const serviceEntrada = require("../services/entrada");

class ApiEntrada {
    async findById(req, res){
        try {
            const id_entrada = req.params.id
            const entrada = await serviceEntrada.findById(id_entrada)

            res.status(200).send({ entrada }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async findAll(req, res) {
        try {
            const entradas =  await serviceEntrada.findAll()

            res.status(200).send({ entradas }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async create(req, res) {
        try {
            const { id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func } = req.body
            const result = await serviceEntrada.create(id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async update(req, res) {
        try {
            const id_entrada = req.params.id
            const { hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func } = req.body
            const result = await serviceEntrada.update(id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async delete(req, res) {
        try {
            const id_entrada = req.params.id
            const result = await serviceEntrada.delete(id_entrada)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async findVagaOcupada(req, res) {
        try {
            const cod_vaga = req.params.cod
            const entrada = await serviceEntrada.findVagaOcupada(cod_vaga)
            
            res.status(200).send({ entrada }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ApiEntrada();