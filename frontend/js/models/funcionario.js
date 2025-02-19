import fetchApi from '../api/fetch.js';

class modelFuncionario{
    async buscarCargos() {
        const response = await fetchApi('/funcionario/cargos','GET');
        const data = await response.json();
        const cargos =  data.cargos;

        // Verifica se os cargos não estão vazios
        if (cargos.length === 0) {
            console.log('Nenhuma cargo foi obtido.'); // debug
            return;
        }
        return cargos;
    }

    async cadastrarFuncionario(funcionario) {
        const response = await fetchApi('/funcionario', 'POST', funcionario);
        const data = await response.json();
        return data;
    }

    async buscarFuncionarios() {
        const response = await fetchApi('/funcionario', 'GET');
        const data = await response.json();
        return data.funcionarios;
    }
}

export default new modelFuncionario();