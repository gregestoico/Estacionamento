import { criarClienteModal } from '../components/clienteModal.js';
import { criarClienteContainer } from '../components/clienteContainer.js';
import { desabilitarNavbarLink } from './home.js';

/** Classe para a view da página de cadastro de clientes. */
class DetalhesClienteView{
    /** Atualiza a UI com os os clientes cadastrados. */
    atualizarUI(clientes){
        desabilitarNavbarLink('detalhes-cliente');
        
        if (clientes.length > 0) {
            document.body.appendChild(criarClienteContainer(clientes));
            document.body.appendChild(criarClienteModal());
        }
    }
}

export default new DetalhesClienteView();
