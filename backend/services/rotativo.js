const modelPlano = require("../models/plano")

class ServicePlano {
    async findByCod(cod_plano){
        return await modelPlano.findByCod(cod_plano)
    }

    async findAll(){
        return await modelPlano.findAll()
    }

    async create(cod_plano, turno, preco_mensal) {
        if(!cod_plano) {
            throw new Error("Favor informar o codigo do plano) {")
        } else if(!turno) {
            throw new Error("Favor informar o turno")
        } else if(!preco_mensal) {
            throw new Error("Favor informar o preço mensal")
        }

        return modelPlano.create(cod_plano, turno, preco_mensal)
    }

    async update(cod_plano, turno, preco_mensal) {
        const rowPlano = await this.findByCod(cod_plano)
        if(!rowPlano) {
            throw new Error("Plano não encontrado")
        }

        // Substitui as informações atuais pelas novas informações (se forem passadas)
        rowPlano.turno = turno || rowPlano.turno
        rowPlano.preco_mensal = preco_mensal || rowPlano.preco_mensal

        return await modelPlano.update(
            rowPlano.cod_plano,
            rowPlano.turno,
            rowPlano.preco_mensal
        )
    }

    async delete(cod_plano) {
        const rowPlano = await this.findByCod(cod_plano)
        // Verifica se o plano existe
        if(!rowPlano) {
            throw new Error("Plano não encontrado")
        }

        return modelPlano.delete(cod_plano);
    }
}

module.exports = new ServicePlano()