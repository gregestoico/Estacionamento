const modelVeiculo = require("../models/veiculo")

class ServiceVeiculo {
    async findByPlaca(placa){
        return await modelVeiculo.findByPlaca(placa)
    }

    async findAll(){
        return await modelVeiculo.findAll()
    }

    async create(placa, modelo, cor, tipo_veic, cpf_cli) {
        if(!placa) {
            throw new Error("Favor informar a placa")
        } else if(!modelo) {
            throw new Error("Favor informar o modelo")
        } else if(!cor) {
            throw new Error("Favor informar a cor")
        } else if(!tipo_veic) {
            throw new Error("Favor informar o tipo do veículo")
        } else if(!cpf_cli) {
            throw new Error("Favor informar o cpf do cliente")
        }

        return modelVeiculo.create(placa, modelo, cor, tipo_veic, cpf_cli)
    }

    async update(placa, modelo, cor, tipo_veic, cpf_cli) {
        const rowVeiculo = await this.findByPlaca(placa)
        if(!rowVeiculo) {
            throw new Error("Veículo não encontrado")
        }

        // Substitui as informações atuais pelas novas informações (se forem passadas)
        rowVeiculo.modelo = modelo || rowVeiculo.modelo
        rowVeiculo.cor = cor || rowVeiculo.cor
        rowVeiculo.tipo_veic = tipo_veic || rowVeiculo.tipo_veic
        rowVeiculo.cpf_cli = cpf_cli || rowVeiculo.cpf_cli

        return await modelVeiculo.update(
            rowVeiculo.placa,
            rowVeiculo.modelo,
            rowVeiculo.cor,
            rowVeiculo.tipo_veic,
            rowVeiculo.cpf_cli
        )
    }

    async delete(placa) {
        const rowVeiculo = await this.findByPlaca(placa)
        // Verifica se o veículo existe
        if(!rowVeiculo) {
            throw new Error("Veículo não encontrado")
        }

        return modelVeiculo.delete(placa);
    }

    findTipos() {
        return modelVeiculo.findTipos()
    }
}

module.exports = new ServiceVeiculo()