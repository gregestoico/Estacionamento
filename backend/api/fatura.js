const serviceFatura = require("../services/fatura");

class ApiFatura {
    async findByCod(req, res){
        try {
            const cod_fatura = req.params.cod
            const fatura = await serviceFatura.findByCod(cod_fatura)

            res.status(200).send({ fatura }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async findAll(req, res) {
        try {
            const faturas =  await serviceFatura.findAll()

            res.status(200).send({ faturas }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async create(req, res) {
        try {
            const { cod_fatura, data_venc, data_pag, cpf_cli } = req.body
            const result = await serviceFatura.create(
                cod_fatura, data_venc, data_pag, cpf_cli)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async update(req, res) {
        try {
            const cod_fatura = req.params.cod
            const { data_venc, data_pag } = req.body
            const result = await serviceFatura.update(cod_fatura, data_venc, data_pag)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async delete(req, res) {
        try {
            const cod_fatura = req.params.cod
            const result = await serviceFatura.delete(cod_fatura)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async pagarFatura(req, res) {
        try {
            const cod_fatura = req.params.cod
            const result = await serviceFatura.pagarFatura(cod_fatura)

            res.status(200).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async faturamento(req, res) {
        try {
            const { cpf_cli, startDate } = req.body;
            const faturamento = await serviceFatura.faturamento(cpf_cli, startDate);

            res.status(200).send( faturamento ); // Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    async faturamentoMensalistas(req, res) {
        try {
            const { valorMinimo } = req.body;
            const faturamentos = await serviceFatura.faturamentoMensalistas(valorMinimo);

            res.status(200).send({ faturamentos }); // Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    async faturasDeFaturamentoMin(req, res) {
        try {
            const { valorMinimo } = req.body;
            const faturas = await serviceFatura.faturasDeFaturamentoMin(valorMinimo);

            res.status(200).send({ faturas }); // Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
}

module.exports = new ApiFatura();