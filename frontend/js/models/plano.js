import fetchApi from '../api/fetch.js';

class modelPlanos{
    async buscarPlanos() {
        const response = await fetchApi('/plano','GET');
        const data = await response.json();
        const planos =  data.planos;
        console.log(planos);
        // Verifica se os planos não estão vazios
        if (planos.length === 0) {
            console.log('Nenhum plano foi obtido.'); // debug
            return;
        }
        return planos;
    }
}

export default new modelPlanos();