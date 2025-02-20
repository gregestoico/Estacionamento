import modelFuncionario from '../models/funcionario.js';
import detalhesFuncionarioView from '../views/planos.js';

class DetalhesFuncionarioController{
    async init() {
        try {
            // Carrega os cargos da API e atualiza a UI
            const funcionarios = await modelFuncionario.buscarFuncionarios();
            
            detalhesFuncionarioView.atualizarUI(funcionarios);
    
        } catch (error) {
            console.error('Erro ao carregar dados dos funcionarios:', error);
        }
    }
}

export default new DetalhesFuncionarioController();
