import modelFuncionario from '../models/funcionario.js';
import cadastroFuncionarioView from '../views/cadastro_funcionario.js';

class CadastroFuncionarioController{
    async init() {
        try {
            // Carrega os cargos da API e atualiza a UI
            const cargos = await modelFuncionario.buscarCargos();
            
            cadastroFuncionarioView.atualizarUI(cargos);
    
        } catch (error) {
            console.error('Erro ao carregar cargos:', error);
        }
    }
}

export default new CadastroFuncionarioController();
