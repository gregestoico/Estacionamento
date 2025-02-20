// import { criarFaturaModal } from '../components/faturaModal.js';
// import { criarFaturasContainer } from '../components/faturasContainer.js';
import { criarFaturaView } from './faturaView.js';
import { desabilitarNavbarLink } from './home.js';

/** Classe para a view da página de consulta de faturas. */
class FaturasView{
    /** Atualiza a UI com os faturas disponíveis. */
    atualizarUI(faturas){
        desabilitarNavbarLink('faturas-link');

        if (faturas.length > 0) {
             criarFaturaView(faturas);
            // document.body.appendChild(faturaview);
            // document.body.appendChild(criarFaturasContainer(faturas));
            // document.body.appendChild(criarFaturaModal());
        }
    }
}

export default new FaturasView();
