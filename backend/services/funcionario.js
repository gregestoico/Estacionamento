require("dotenv").config();
const modelFuncionario = require("../models/funcionario")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cargos = ['gerente', 'atendente']
const salt = 12
const secretKey = process.env.SECRETKEY || 'M1NH4S3NH4S3CRT4'

class ServiceFuncionario {
    async findByCpf(cpf){
        return await modelFuncionario.findByCpf(cpf)
    }

    async findAll(){
        const funcionarios = await modelFuncionario.findAll()
        return funcionarios
    }

    async create(cpf, nome, email, cargo, senha) {
        // passa o cargo para lowercase
        cargo = cargo.toLowerCase()
        if(!cpf) {
            throw new Error("Favor informar o cpf")
        } else if(!nome) {
            throw new Error("Favor informar o nome")
        } else if(!email) {
            throw new Error("Favor informar o email")
        } else if(!senha) {
            throw new Error("Favor informar a senha")
        } else if(!cargo || !cargos.includes(cargo)) {
            throw new Error("Favor informar o cargo corretamente")
        }

        // const hashPass = await bcrypt.hash(senha, salt)

        // Criando um funcionário com a senha criptografada
        // return modelFuncionario.create(cpf, nome, email, hashPass, cargo)
        
        return modelFuncionario.create(cpf, nome, email, senha, cargo)
    }

    async update(cpf, nome, email, cargo, senha) {
        const rowFuncionario = await this.findByCpf(cpf)
        if(!rowFuncionario) {
            throw new Error("Funcionário não encontrado")
        }
        
        if(cargo && !cargos.includes(cargo)) {
            throw new Error("Favor informar o cargo corretamente")
        }

        // Substitui o cargo atual pelo novo cargo
        if(cargo && rowFuncionario.cargo !== cargo) {
            // TO_FIX: Um atendente pode alterar o seu próprio cargo
            rowFuncionario.cargo = cargo
        }
        rowFuncionario.nome_func = nome || rowFuncionario.nome_func
        rowFuncionario.email_func = email || rowFuncionario.email_func
        rowFuncionario.senha = senha || rowFuncionario.senha

        return await modelFuncionario.update(
            rowFuncionario.cpf_func,
            rowFuncionario.nome_func,
            rowFuncionario.email_func,
            rowFuncionario.cargo,
            rowFuncionario.senha
        )
    }

    async delete(cpf) {
        const rowFuncionario = await this.findByCpf(cpf)
        // Verifica se o funcionário existe
        if(!rowFuncionario) {
            throw new Error("Funcionario não encontrado")
        }

        return modelFuncionario.delete(cpf);
    }

    async login(email, senha) {
        if(!email || !senha) {  
            throw new Error("Favor informar email e senha")
        }
        // O resultado é um array de 1 ou 0 objetos
        const funcionario = await modelFuncionario.findByEmail(email)
        if(!funcionario) {
            throw new Error("Email ou senha inválidos")
        }

        // const verify = await bcrypt.compare(senha, funcionario.senha)

        if(senha === funcionario.senha) {
            // Este objeto será o token
            return jwt.sign({
                cpf: funcionario.cpf_func,
                nome: funcionario.nome_func,
                cargo: funcionario.cargo
            }, secretKey, { expiresIn: 60 * 60 } )
        }

        throw new Error("Email ou senha inválidos")
    }

    async verify(cpf, cargo) {
        return modelFuncionario.findByCpfAndCargo(cpf, cargo)
    }

    findCargos() {
        return modelFuncionario.findCargos()
    }
}

module.exports = new ServiceFuncionario()