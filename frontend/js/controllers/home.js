import modelVaga from '../models/vaga.js';
import homeView from '../views/home.js';

class HomeController{
    async init() {
        try {
            // Carrega as vagas da API e atualiza a UI
            const vagas = await modelVaga.buscarVagas();
            
            homeView.atualizarUI(vagas);
    
        } catch (error) {
            console.error('Erro ao carregar vagas:', error);
        }
    }
}

export default new HomeController();
