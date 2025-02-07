const serviceVaga = require("../services/vaga");

class ApiVaga {
    async findByCod(req, res){
        try {

        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async findAll(req, res) {
        try {

        } catch (error) {
            res.status(500).send({ msg: error.message }) 
        }
    }

    async create(req, res) {
        try {
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async update(req, res) {
        try {
            const cod_p00).send({ result }) //Envia a resposta
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async delete(req, res) {
        try {
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ApiVaga();