import { criarVagaModal } from '../components/vagaModal.js';
import {criarVagasContainer} from '../components/vagasContainer.js';
import {criarTitle1} from '../components/title1.js';
import { criarFooter } from '../components/footer.js';

/** Classe para a view da página inicial. */
class HomeView{
    /** Atualiza a UI com as vagas disponíveis. */
    atualizarUI(vagas){
        const titulo1 = criarTitle1('Vagas do Pátio');
        const vagasContainer = criarVagasContainer(vagas);
        const footer = criarFooter();
        const body = document.querySelector('body');
        body.appendChild(titulo1);
        body.appendChild(vagasContainer);
        // body.appendChild(footer);

        const vagaModal = criarVagaModal();
        body.appendChild(vagaModal);
    }
}

export default new HomeView();