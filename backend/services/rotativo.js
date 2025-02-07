const modelRotativo = require("../models/rotativo")

class ServiceRotativo {
    async findByTipo(tipo_veic){
        return await modelRotativo.findByTipo(tipo_veic)
    }

    async findAll(){
        return await modelRotativo.findAll()
    }

    async create(tipo_veic, valor_hora) {
    }

    async update(tipo_veic, valor_hora) {
        
    }

    async delete(tipo_veic) {
    }
}

module.exports = new ServiceRotativo()