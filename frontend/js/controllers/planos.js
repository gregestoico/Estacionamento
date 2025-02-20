import modelPlanos from '../models/plano.js';
import planosView from '../views/planos.js';

class PlanosController{
    async init() {
        try {
            // Carrega os cargos da API e atualiza a UI
            const planos = await modelPlanos.buscarPlanos();
            
            planosView.atualizarUI(planos);
            
        } catch (error) {
            console.error('Erro ao carregar dados dos planos:', error);
        }
    }
}

export default new PlanosController();
