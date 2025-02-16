import fetchApi from '../api/fetch.js';

class ModelVaga{
    async buscarVagas() {
        const response = await fetchApi('/vaga','GET');
        const data = await response.json();
        const vagas =  data.vagas;

        // Verifica se as vagas não estão vazias
        if (vagas.length === 0) {
            console.log('Nenhuma vaga foi cadastrada no banco de dados'); // debug
            return;
        }
        return vagas;
    }
}

export default new ModelVaga();