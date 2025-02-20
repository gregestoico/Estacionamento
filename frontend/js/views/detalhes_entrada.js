import { criarEntradaContainer } from '../components/entradaContainer.js';
import { desabilitarNavbarLink } from './home.js';

/** Classe para a view da página de cadastro de entradas. */
class DetalhesEntradaView{
    /** Atualiza a UI com as entradas registradas */
    atualizarUI(entradas){
        desabilitarNavbarLink('entradas-link');

        if (entradas.length > 0) {
            document.body.appendChild(criarEntradaContainer(entradas));
        }
    }
}

export default new DetalhesEntradaView();
