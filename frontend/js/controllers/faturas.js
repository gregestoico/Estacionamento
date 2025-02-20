import modelFaturas from '../models/faturas.js';
import faturasView from '../views/faturas.js';

class FaturasController{
    async init() {
        try {
            // Carrega os faturas da API e atualiza a UI
            const faturas = await modelFaturas.buscarFaturas();
            
            faturasView.atualizarUI(faturas);
            
        } catch (error) {
            console.error('Erro ao carregar dados dos faturas:', error);
        }
    }
}

export default new FaturasController();
