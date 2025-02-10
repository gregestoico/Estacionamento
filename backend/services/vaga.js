const modelVaga = require("../models/vaga")

class ServiceVaga {
    async findByCod(cod_vaga){
        return await modelVaga.findByCod(cod_vaga)
    }

    async findAll(){
        return await modelVaga.findAll()
    }

    async create(cod_vaga, tipo_veic, situacao) {
        if(!cod_vaga) {
            throw new Error("Favor informar o codigo da vaga")
        } else if(!tipo_veic) {
            throw new Error("Favor informar o tipo do veiculo")
        } else if(!situacao) {
            throw new Error("Favor informar a situacao")
        }

        return modelVaga.create(cod_vaga, tipo_veic, situacao)
    }

    async update(cod_vaga, tipo_veic, situacao) {
        const rowVaga = await this.findByCod(cod_vaga)
        if(!rowVaga) {
            throw new Error("Vaga não encontrada")
        }

        // Substitui as informações atuais pelas novas informações (se forem passadas)
        rowVaga.tipo_veic = tipo_veic || rowVaga.tipo_veic
        rowVaga.situacao = situacao || rowVaga.situacao

        return await modelVaga.update(
            rowVaga.cod_vaga,
            rowVaga.tipo_veic,
            rowVaga.situacao
        )
    }

    async delete(cod_vaga) {
        const rowVaga = await this.findByCod(cod_vaga)
        // Verifica se a vaga existe
        if(!rowVaga) {
            throw new Error("Vaga não encontrada")
        }

        return modelVaga.delete(cod_vaga);
    }
}

module.exports = new ServiceVaga()