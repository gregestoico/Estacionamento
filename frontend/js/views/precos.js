import { criarPrecoModal } from '../components/precoModal.js';
import { criarPrecosContainer } from '../components/precosContainer.js';
import { desabilitarNavbarLink } from './home.js';

/** Classe para a view da página de consulta de precos. */
class PrecosView{
    /** Atualiza a UI com os precos disponíveis. */
    atualizarUI(precos){
        desabilitarNavbarLink('precos-link');

        if (precos.length > 0) {
            document.body.appendChild(criarPrecosContainer(precos));
            document.body.appendChild(criarPrecoModal());
        }
    }
}

export default new PrecosView();
