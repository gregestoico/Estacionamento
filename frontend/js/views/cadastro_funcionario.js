import { criarForm } from '../components/form.js';
import { criarInputElement } from '../components/inputElement.js';
import { criarSelectElement } from '../components/select.js';
import { criarFooter } from '../components/footer.js';

/** Classe para a view da página de cadastro de funcionarios. */
class CadastroFuncionarioView{
    /** Atualiza a UI com os cargos disponíveis. */
    atualizarUI(cargos){
        const inputs = criarInputsFuncionario(cargos);
        const form = criarForm('client-form', 'Cadastro de Funcionário', inputs);
        const footer = criarFooter();
        // Insere o formulário após o cabeçalho (nav)
        const nav = document.querySelector('nav');
        nav.insertAdjacentElement('afterend', form);
        // Insere o footer no final do body
        document.body.appendChild(footer);
    }
}

// Criando os inputs do formulário de funcionário
function criarInputsFuncionario(cargos){
    const cargosDict = {}; // Dicionário de cargos para o select
    cargos.forEach(cargo => {
        // No select, o id e o value são o próprio cargo
        cargosDict[cargo] = cargo;
    });
        
    // O id dos inputs deve ser igual ao campo do body lido na requisição
    const cargoSelect = criarSelectElement("cargo", "Cargo", cargosDict);
    const cpfInput = criarInputElement("cpf", "text", "CPF");
    const nomeInput = criarInputElement("nome", "text", "Nome");
    const emailInput = criarInputElement("email", "Email", "Email");
    const senhaInput = criarInputElement("senha", "password", "Senha");

    return [cpfInput, nomeInput, emailInput, cargoSelect, senhaInput];
}

export default new CadastroFuncionarioView();
