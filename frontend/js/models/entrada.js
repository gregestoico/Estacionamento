import fetchApi from '../api/fetch.js';

class ModelEntrada{
    async buscarEntradas() {
        const response = await fetchApi('/entrada','GET');
        const data = await response.json();
        const entradas =  data.entradas;
        console.log(entradas);
        // Verifica se a lista de entradas não está vazia
        if (entradas.length === 0) {
            console.log('Nenhum entrada foi obtido.'); // debug
            return;
        }
        return entradas;
    }
}

export default new ModelEntrada();