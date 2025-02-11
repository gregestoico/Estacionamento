const serviceVeiculo = require("../services/veiculo");

class ApiVeiculo {
    async findByPlaca(req, res){
        try {
            const placa = req.params.placa
            const veiculo = await serviceVeiculo.findByPlaca(placa)

            res.status(200).send({ veiculo }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async findAll(req, res) {
        try {
            const veiculos =  await serviceVeiculo.findAll()

            res.status(200).send({ veiculos }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async create(req, res) {
        try {
            const { placa, modelo, cor, tipo_veic, cpf_cli } = req.body
            const result = await serviceVeiculo.create(placa, modelo, cor, tipo_veic, cpf_cli)

            res.status(200).send({ result }) //Envia
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async update(req, res) {
        try {
            const placa = req.params.placa
            const { modelo, cor, tipo_veic, cpf_cli } = req.body
            const result = await serviceVeiculo.update(placa, modelo, cor, tipo_veic, cpf_cli)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async delete(req, res) {
        try {
            const placa = req.params.placa
            const result = await serviceVeiculo.delete(placa)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async findTipos(req, res) {
        try {
            const tipos = await serviceVeiculo.findTipos()
            res.status(200).send({ tipos }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ApiVeiculo();