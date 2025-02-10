const modelFatura = require("../models/fatura")

class ServiceFatura {
    async findByCod(cod_fatura){
        return await modelFatura.findByCod(cod_fatura)
    }

    async findAll(){
        return await modelFatura.findAll()
    }

    async create(cod_fatura, data_venc, data_pag, cpf_cli) {
        // A Data de pagamento pode ser inserida nula
        if(!cod_fatura) {
            throw new Error("Favor informar o codigo da fatura) {")
        } else if(!data_venc) {
            throw new Error("Favor informar a data de vencimento")
        } else if(!cpf_cli) {
            throw new Error("Favor informar o CPF do cliente")
        }

        return modelFatura.create(cod_fatura, data_venc, data_pag, cpf_cli)
    }

    async update(cod_fatura, data_venc, data_pag, cpf_cli) {
        const rowFatura = await this.findByCod(cod_fatura)
        if(!rowFatura) {
            throw new Error("Fatura não encontrado")
        }

        // Substitui as informações atuais pelas novas informações (se forem passadas)
        rowFatura.data_venc = data_venc || rowFatura.data_venc
        rowFatura.data_venc = data_venc || rowFatura.data_venc
        rowFatura.data_pag = data_pag || rowFatura.data_pag
        rowFatura.cpf_cli = cpf_cli || rowFatura.cpf_cli

        return await modelFatura.update(
            rowFatura.cod_fatura,
            rowFatura.data_venc,
            rowFatura.data_pag,
            rowFatura.cpf_cli
        )
    }

    async delete(cod_fatura) {
        const rowFatura = await this.findByCod(cod_fatura)
        // Verifica se a fatura existe
        if(!rowFatura) {
            throw new Error("Fatura não encontrado")
        }

        return modelFatura.delete(cod_fatura);
    }
}

module.exports = new ServiceFatura()