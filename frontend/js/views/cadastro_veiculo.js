import { criarForm } from '../components/form.js';
import { criarInputElement } from '../components/inputElement.js';
import { criarSelectElement } from '../components/select.js';
import { criarFooter } from '../components/footer.js';

/** Classe para a view da página de cadastro de funcionarios. */
class CadastroVeiculoView{
    /** Atualiza a UI com os tipos de veículos possíveis. */
    atualizarUI(tiposVeiculos){
        const inputs = criarInputsVeiculo(tiposVeiculos);
        const form = criarForm('veiculo-form', 'Cadastro de Veículo', inputs, '/veiculo', './home.html');
        const footer = criarFooter();
        // Insere o formulário após o cabeçalho (nav)
        const nav = document.querySelector('nav');
        nav.insertAdjacentElement('afterend', form);
        // Insere o footer no final do body
        form.insertAdjacentElement('afterend', footer);
    }
}

// Criando os inputs do formulário de funcionário
function criarInputsVeiculo(tiposVeiculos){
    const tiposVeiculoDict = {}; // Dicionário de tipos de veículos para o select
    tiposVeiculos.forEach(tipoVeiculo => {
        // No select, o id e o value são o próprio cargo
        tiposVeiculoDict[tipoVeiculo] = tipoVeiculo;
    });
        
    // O id dos inputs deve ser igual ao campo do body lido na requisição
    const tipoVeiculosSelect = criarSelectElement("tipo_veic", "Tipo", tiposVeiculoDict);
    const placaInput = criarInputElement("placa", "text", "Placa");
    const modeloInput = criarInputElement("modelo", "text", "Modelo");
    const corInput = criarInputElement("cor", "text", "Cor");
    const cpfInput = criarInputElement("cpf_cli", "text", "CPF do Cliente");

    // Recupera o CPF do cliente do sessionStorage
    // const cpf_cli = sessionStorage.getItem('cpf_cli');
    // const cpfInput = document.createElement('div') ;
    // cpfInput.className = 'mb-3';
    // cpfInput.innerHTML = `
    //     <label for="${cpf_cli}" class="form-label">CPF do Cliente</label>
    //     <input type="text" id="${cpf_cli}" name="${cpf_cli}" class="form-control" required>
    // `;
    // cpfInput.querySelector('input').value = cpf_cli || ''; // Se o cpf_cli não existir, atribui uma string vazia
    
    return [placaInput, modeloInput, corInput, tipoVeiculosSelect,  cpfInput];
}

export default new CadastroVeiculoView();
