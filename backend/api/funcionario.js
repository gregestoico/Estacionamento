const serviceFuncionario = require("../services/funcionario");

class ApiFuncionario {
    async findByCpf(req, res){
        try {
            // O cpf pode vir de dois lugares diferentes:
            // (1) dos params, se o gerente estiver buscando os dados de outro usuário (GET na rota /api/funcionario/:cpf)
            // (2) da session, se for o próprio usuário que estiver buscando seus dados (GET na rota /api/funcionario)
            const cpf = req.params.cpf || req.session.cpf
            const funcionario = await serviceFuncionario.findByCpf(cpf)

            res.status(200).send({ funcionario })   //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async findAll(req, res) {
        try {
            const funcionarios =  await serviceFuncionario.findAll()

            res.status(200).send({ funcionarios })  //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async create(req, res) {
        try {
            const { cpf, nome, email, cargo, senha } = req.body
            const result = await serviceFuncionario.create(cpf, nome, email, cargo, senha)

            res.status(200).send({ result })   //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async update(req, res) {
        try {
            // O cpf pode vir de dois lugares diferentes:
            //  (1) da session, se for o prórpio usuário que estiver alterando seus dados (PUT na rota /api/funcionario)
            //  (2) dos params, se o gerente estiver alterando os dados de outro usuário (PUT na rota /api/funcionario/:cpf)
            const cpf = req.params.cpf || req.session.cpf
            const { nome, email, cargo, senha } = req.body
            const result = await serviceFuncionario.update(cpf, nome, email, cargo, senha)

            res.status(200).send({ result })   //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async delete(req, res) {
        try {
            const cpf = req.params.cpf || req.session.cpf
            const result = await serviceFuncionario.delete(cpf)

            res.status(200).send({ result })   //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async login(req, res){
        try{ 
            const { email, senha } = req.body;
            
            const token = await serviceFuncionario.login(email, senha)
            res.status(200).send({ token }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    findCargos(req, res){
        try {
            const cargos = serviceFuncionario.findCargos()

            res.status(200).send({ cargos }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ApiFuncionario();

