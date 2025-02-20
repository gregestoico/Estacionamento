import fetchApi from '../api/fetch.js';

class modelPrecos{
    async buscarPrecos() {
        const response = await fetchApi('/preco_rotativo','GET');
        const data = await response.json();
        const precos =  data.precos;
        console.log(precos);
        // Verifica se os precos não estão vazios
        if (precos.length === 0) {
            console.log('Nenhum preco foi obtido.'); // debug
            return;
        }
        return precos;
    }
}

export default new modelPrecos();