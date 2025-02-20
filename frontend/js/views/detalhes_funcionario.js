import { criarFuncionarioModal } from '../components/funcionarioModal.js';
import { criarFuncionarioContainer } from '../components/funcContainer.js';
import { desabilitarNavbarLink } from './home.js';

/** Classe para a view da página de cadastro de funcionarios. */
class DetalhesFuncionarioView{
    /** Atualiza a UI com os cargos disponíveis. */
    atualizarUI(funcionarios){
        desabilitarNavbarLink('detalhes-funcionario');

        if (funcionarios.length > 0) {
            document.body.appendChild(criarFuncionarioContainer(funcionarios));
            document.body.appendChild(criarFuncionarioModal());
        }
    }
}

export default new DetalhesFuncionarioView();