const serviceVeiculo = require("../services/veiculo");

class ApiVeiculo {
    async findByPlaca(req, res){
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

module.exports = new ApiVeiculo();