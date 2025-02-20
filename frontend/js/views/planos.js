import { criarPlanoModal } from '../components/planoModal.js';
import { criarPlanosContainer } from '../components/planosContainer.js';
import { desabilitarNavbarLink } from './home.js';

/** Classe para a view da página de cadastro de planos. */
class PlanosView{
    /** Atualiza a UI com os planos disponíveis. */
    atualizarUI(planos){
        desabilitarNavbarLink('planos-link');

        if (planos.length > 0) {
            document.body.appendChild(criarPlanosContainer(planos));
            document.body.appendChild(criarPlanoModal());
        }
    }
}

export default new PlanosView();
