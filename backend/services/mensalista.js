const modelMensalista = require("../models/mensalista")

class ServiceMensalista {
    async findByCpf(cpf){
        return await modelMensalista.findByCpf(cpf)
    }

    async findAll(){
        return await modelMensalista.findAll()
    }

    async create(cpf, nome, email, telefone, cod_plano) {
        if(!cpf) {
            throw new Error("Favor informar o cpf")
        } else if(!nome) {
            throw new Error("Favor informar o nome")
        } else if(!email) {
            throw new Error("Favor informar o email")
        } else if(!telefone) {
            throw new Error("Favor informar o telefone")
        } else if(!cod_plano) {
            throw new Error("Favor informar o codigo do plano")
        }

        return modelMensalista.create(cpf, nome, email, telefone, cod_plano)
    }

    async update(cpf, nome, email, telefone, cod_plano) {
        const rowMensalista = await this.findByCpf(cpf)
        if(!rowMensalista) {
            throw new Error("Cliente mensalista não encontrado")
        }

        // Substitui as informações atuais pelas novas informações (se forem passadas)
        rowMensalista.nome_cli = nome || rowMensalista.nome_func
        rowMensalista.email_cli = email || rowMensalista.email_cli
        rowMensalista.telefone_cli = telefone || rowMensalista.telefone_cli
        rowMensalista.cod_plano = cod_plano || rowMensalista.cod_plano
        return await modelMensalista.update(
            rowMensalista.cpf_cli,
            rowMensalista.nome_cli,
            rowMensalista.email_cli,
            rowMensalista.telefone_cli,
            rowMensalista.cod_plano
        )
    }

    async delete(cpf) {
        const rowMensalista = await this.findByCpf(cpf)
        // Verifica se o cliente mensalista existe
        if(!rowMensalista) {
            throw new Error("Cliente mensalista não encontrado")
        }
        return modelMensalista.delete(cpf);
    }
}

module.exports = new ServiceMensalista()