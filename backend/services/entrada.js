const modelEntrada = require("../models/entrada")

class ServiceEntrada {
    async findById(id_entrada){
        return await modelEntrada.findById(id_entrada)
    }

    async findAll(){
        return await modelEntrada.findAll()
    }

    async create() {
    }

    async update(id_entrada) {
       
    }

    async delete(id_entrada) {
        
    }
}

module.exports = new ServiceEntrada()