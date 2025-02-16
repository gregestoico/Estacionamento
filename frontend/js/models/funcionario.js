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
}

export default new modelFuncionario();