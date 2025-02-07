const modelVeiculo = require("../models/veiculo")

class ServiceVeiculo {
    async findByPlaca(placa){
        return await modelVeiculo.findByPlaca(placa)
    }

    async findAll(){
        return await modelVeiculo.findAll()
    }

    async create() {

    }

    async update() {

    }

    async delete(placa) {

    }
}

module.exports = new ServiceVeiculo()