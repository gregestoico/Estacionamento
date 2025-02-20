import modelEntrada from '../models/entrada.js';
import detalhesEntradaView from '../views/detalhes_entrada.js';

class DetalhesEntradaController{
    async init() {
        try {
            // Carrega as entradas da API e atualiza a UI
            const entradas = await modelEntrada.buscarEntradas();
            
            detalhesEntradaView.atualizarUI(entradas);
    
        } catch (error) {
            console.error('Erro ao carregar dados dos entradas:', error);
        }
    }
}

export default new DetalhesEntradaController();
