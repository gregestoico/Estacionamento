import fetchApi from '../api/fetch.js';

class ModelVeiculo{
    async buscarTiposVeiculos() {
        const response = await fetchApi('/veiculo/tipos','GET');
        const data = await response.json();
        const tiposVeiculos =  data.tipos;

        // Verifica se as tiposVeiculos não estão vazias
        if (tiposVeiculos.length === 0) {
            console.log('Nenhum tipo de veículo foi cadastrado no banco de dados'); // debug
            return;
        }
        return tiposVeiculos;
    }
}

export default new ModelVeiculo();