import { criarForm } from '../components/form.js';
import { criarInputElement } from '../components/inputElement.js';
import { criarSelectElement } from '../components/select.js';
import { criarFooter } from '../components/footer.js';

/** Classe para a view da página de cadastro de clientes mensalistas. */
class CadastroClienteView{
    /** Atualiza a UI com os planos disponíveis. */
    atualizarUI(planos){
        const inputs = criarInputsCliente(planos);
        const form = criarForm('client-form', 'Cadastro de Clientes', inputs);
        const footer = criarFooter();
        // Insere o formulário após o cabeçalho (nav)
        const nav = document.querySelector('nav');
        nav.insertAdjacentElement('afterend', form);
        // Insere o footer no final do body
        document.body.appendChild(footer);
    }
}

// Criando os inputs do formulário de funcionário
function criarInputsCliente(planos){
    // Converte 'planos' para um dicionário de pares { value: textContent }
    const planosDict = Object.fromEntries(
    planos.map(plan => [plan.cod_plano, `${plan.turno} - R$ ${plan.preco_mensal}`])
);
        
    // O id dos inputs deve ser igual ao campo do body lido na requisição
    const planoSelect = criarSelectElement("plano", "Plano", planosDict);
    const cpfInput = criarInputElement("cpf", "text", "CPF");
    const nomeInput = criarInputElement("nome", "text", "Nome");
    const emailInput = criarInputElement("email", "email", "Email");
    const telefoneInput = criarInputElement("telefone", "tel", "Telefone");

    return [cpfInput, nomeInput, emailInput, telefoneInput, planoSelect];
}

export default new CadastroClienteView();