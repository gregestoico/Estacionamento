import { criarVagaModal } from '../components/vagaModal.js';
import {criarVagasContainer} from '../components/vagasContainer.js';
import {criarTitle1} from '../components/title1.js';
import { criarContainer } from '../components/container.js';
import { criarSidebar } from '../components/sidebar.js';
import { criarBtn } from '../components/button.js';

/** Classe para a view da página inicial. */
class HomeView{
    /** Atualiza a UI com as vagas disponíveis. */
    atualizarUI(vagas){
        const mainContainer = criarContainer('main-conteiner','container-fluid flex-grow-1');
        const titleContainer = criarContainer('title-container','d-flex justify-content-between ps-3 pe-5 pt-4 container mx-auto');    
        const sidebar = criarSidebar();
        const titulo1 = criarTitle1('Vagas do Pátio');
        const btnContainer = criarContainer('btn-container','d-flex d-flex gap-3');
        const refreshBtn = criarBtn('refresh-btn','Atualizar','btn-dark custom-btn');
        const insertBtn = criarBtn('insert-btn','Inserir Entrada','ms-3 btn-info custom-btn green');

        btnContainer.appendChild(insertBtn);
        btnContainer.appendChild(refreshBtn);

        const vagasContainer = criarVagasContainer(vagas);
        const vagaModal = criarVagaModal();
        
        titleContainer.appendChild(titulo1);
        titleContainer.appendChild(btnContainer);
        mainContainer.appendChild(titleContainer);
        mainContainer.appendChild(vagasContainer);
        mainContainer.appendChild(vagaModal);
        
        const wrapper = criarContainer('wrapper','d-flex ');  
        wrapper.appendChild(sidebar);
        wrapper.appendChild(mainContainer);
        
        const body = document.querySelector('body');
        body.appendChild(wrapper);
    }
}

export function desabilitarNavbarLink(linkId){
    const linkOption = document.querySelector(`#${linkId}`);
    if (linkOption) {
        linkOption.style.pointerEvents = 'none'; // Desabilita as interações com o link
        linkOption.style.opacity = '0.5'; // Reduz a opacidade do link
        linkOption.style.backgroundColor = 'rgb(10, 84, 194)'; // Muda a cor de fundo para mais escuro
    }
}

export default new HomeView();