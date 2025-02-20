import fetchApi from '../api/fetch.js';

class modelFaturas{
    async buscarFaturas() {
        const response = await fetchApi('/fatura','GET');
        const data = await response.json();
        const faturas =  data.faturas;
        console.log(faturas);
        // Verifica se as faturas não estão vazios
        if (faturas.length === 0) {
            console.log('Nenhum preco foi obtido.'); // debug
            return;
        }
        return faturas;
    }
}

export default new modelFaturas();