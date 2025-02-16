import modelPlano from '../models/plano.js';
import cadastroClienteView from '../views/cadastro_cliente.js';

class CadastroClienteController{
    async init() {
        try {
            // Carrega os planos da API e atualiza a UI
            const planos = await modelPlano.buscarPlanos();
            
            cadastroClienteView.atualizarUI(planos);
    
        } catch (error) {
            console.error('Erro ao carregar planos:', error);
        }
    }
}

export default new CadastroClienteController();
