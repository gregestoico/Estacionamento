require("dotenv").config();
const jwt = require('jsonwebtoken')
const funcionario = require('../services/funcionario')

const secretKey = process.env.SECRETKEY || 'M1NH4S3NH4S3CRT4'

/**
 * Função autenticadora de login.
 * Essa função retorna um middleware autenticador
 * de acordo com o role passado.
 * Se role não for passado como argumento, o middleware
 * será uma função que apenas verifica se o token é válido 
 * e se o usuário existe.
 */
function authMiddleware(cargo) {
    return (req, res, next) => {
        const token = req.headers['authorization']
        if(!token) {
           res.status(400).json({ msg: 'Token inválido ou não fornecido' })
           return
        }

        jwt.verify(token, secretKey, async (err, decoded) => {
            if(err) {
                console.log(err)
                res.status(400).json({ msg: 'Token inválido ou não fornecido' })
                return
            }

            const verify = await funcionario.verify(decoded.cpf, decoded.cargo)
            // Verifica se o usuário tem permissão para acessar a rota
            if(!verify || (cargo && !cargo.includes(decoded.cargo))){
                res.status(401).json({ msg: 'Permissão negada - Sem permissão' })
                return
            }
            // Coloca o objeto decodificado (cpf, nome, cargo) na sessão
            // para ser utilizado nas rotas (middleware) seguintes
            req.session = decoded
            
            next()  // Chama o próximo middleware
        })
    }
}

module.exports = authMiddleware