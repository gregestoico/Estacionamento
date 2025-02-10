const modelEntrada = require("../models/entrada")

class ServiceEntrada {
    async findById(id_entrada){
        return await modelEntrada.findById(id_entrada)
    }

    async findAll(){
        return await modelEntrada.findAll()
    }

    async create(id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func) {
        // Valor cobrado e Hora de saída podem ser inseridos como nulos
        if(!id_entrada) {
            throw new Error("Favor informar o id da entrada")
        } else if(!hora_entrada) {
            throw new Error("Favor informar a hora de entrada")
        } else if(!placa_veic) {
            throw new Error("Favor informar a placa do veiculo")
        } else if(!cod_vaga) {
            throw new Error("Favor informar o codigo da vaga")
        } else if(!cpf_func) {
            throw new Error("Favor informar o cpf do funcionario")
        }

        return modelEntrada.create(id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func)
    }

    async update(id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func) {
        const rowEntrada = await this.findById(id_entrada)
        if(!rowEntrada) {
            throw new Error("Entrada não encontrada")
        }

        // Substitui as informações atuais pelas novas informações (se forem passadas)
        rowEntrada.hora_entrada = hora_entrada || rowEntrada.hora_entrada
        rowEntrada.hora_saida = hora_saida || rowEntrada.hora_saida
        rowEntrada.valor_cobrado = valor_cobrado || rowEntrada.valor_cobrado
        rowEntrada.placa_veic = placa_veic || rowEntrada.placa_veic
        rowEntrada.cod_vaga = cod_vaga || rowEntrada.cod_vaga
        rowEntrada.cpf_func = cpf_func || rowEntrada.cpf_func

        return await modelEntrada.update(
            rowEntrada.id_entrada,
            rowEntrada.hora_entrada,
            rowEntrada.hora_saida,
            rowEntrada.valor_cobrado,
            rowEntrada.placa_veic,
            rowEntrada.cod_vaga,
            rowEntrada.cpf_func
        )
    }

    async delete(id_entrada) {
        const rowEntrada = await this.findById(id_entrada)
        // Verifica se a entrada existe
        if(!rowEntrada) {
            throw new Error("Entrada não encontrada")
        }

        return modelEntrada.delete(id_entrada);
    }
}

module.exports = new ServiceEntrada()