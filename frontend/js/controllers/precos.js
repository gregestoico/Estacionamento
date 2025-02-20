import modelPrecos from '../models/precos.js';
import precosView from '../views/precos.js';

class PrecosController{
    async init() {
        try {
            // Carrega os precos da API e atualiza a UI
            const precos = await modelPrecos.buscarPrecos();
            
            precosView.atualizarUI(precos);
            
        } catch (error) {
            console.error('Erro ao carregar dados dos precos:', error);
        }
    }
}

export default new PrecosController();
