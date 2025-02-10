const modelPrecoRotativo = require("../models/preco_rotativo")

class ServicePrecoRotativo {
    async findByTipo(tipo_veic){
        return await modelPrecoRotativo.findByTipo(tipo_veic)
    }

    async findAll(){
        return await modelPrecoRotativo.findAll()
    }

    async create(tipo_veic, valor_hora) {
        if(!tipo_veic) {
            throw new Error("Favor informar o tipo do veiculo")
        } else if(!valor_hora) {
            throw new Error("Favor informar o valor da hora")
        }

        return modelPrecoRotativo.create(tipo_veic, valor_hora)
    }

    async update(tipo_veic, valor_hora) {
        const rowPrecoRotativo = await this.findByTipo(tipo_veic)
        if(!rowPrecoRotativo) {
            throw new Error("Tipo de veículo não encontrado")
        }

        // Substitui as informações atuais pelas novas informações (se forem passadas)
        rowPrecoRotativo.valor_hora = valor_hora || rowPrecoRotativo.valor_hora

        return await modelPrecoRotativo.update(
            rowPrecoRotativo.tipo_veic,
            rowPrecoRotativo.valor_hora
        )
    }

    async delete(tipo_veic) {
        const rowPrecoRotativo = await this.findByTipo(tipo_veic)
        // Verifica se o tipo de veículo existe
        if(!rowPrecoRotativo) {
            throw new Error("Tipo de veículo não encontrado")
        }

        return modelPrecoRotativo.delete(tipo_veic);
    }
}

module.exports = new ServicePrecoRotativo()