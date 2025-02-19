import { criarVagaModal } from '../components/vagaModal.js';
import {criarVagasContainer} from '../components/vagasContainer.js';
import {criarTitle1} from '../components/title1.js';
import { criarFooter } from '../components/footer.js';
import { criarContainer } from '../components/container.js';
import { criarSidebar } from '../components/sidebar.js';

/** Classe para a view da página inicial. */
class HomeView{
    /** Atualiza a UI com as vagas disponíveis. */
    atualizarUI(vagas){
        
        const mainContainer = criarContainer('main-conteiner','container-fluid flex-grow-1');
        const sidebar = criarSidebar();
        const titulo1 = criarTitle1('Vagas do Pátio');
        const vagasContainer = criarVagasContainer(vagas);
        const vagaModal = criarVagaModal();
        const footer = criarFooter();
        
        mainContainer.appendChild(titulo1);
        mainContainer.appendChild(vagasContainer);
        mainContainer.appendChild(vagaModal);
        
        const wrapper = criarContainer('wrapper','d-flex ');  
        wrapper.appendChild(sidebar);
        wrapper.appendChild(mainContainer);
        
        const body = document.querySelector('body');
        body.appendChild(wrapper);
        body.appendChild(footer);
    }
}

export default new HomeView();