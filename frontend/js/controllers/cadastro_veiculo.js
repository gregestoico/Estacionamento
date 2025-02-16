import modelVeiculo from '../models/veiculo.js';
import cadastroVeiculoView from '../views/cadastro_veiculo.js';

class CadastroVeiculoController{
    async init() {
        try {
            // Carrega os tipos de veículos da API e atualiza a UI
            const tiposVeiculos = await modelVeiculo.buscarTiposVeiculos();
            
            cadastroVeiculoView.atualizarUI(tiposVeiculos);
    
        } catch (error) {
            console.error('Erro ao carregar tipos de veículos:', error);
        }
    }
}

export default new CadastroVeiculoController();
