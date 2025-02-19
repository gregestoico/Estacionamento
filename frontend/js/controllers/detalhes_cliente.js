import modelCliente from '../models/mensalista.js';
import detalhesClienteView from '../views/detalhes_cliente.js';

class DetalhesClienteController{
    async init() {
        try {
            // Carrega os cargos da API e atualiza a UI
            const clientes = await modelCliente.buscarMensalistas();
            
            detalhesClienteView.atualizarUI(clientes);
    
        } catch (error) {
            console.error('Erro ao carregar dados dos clientes:', error);
        }
    }
}

export default new DetalhesClienteController();
