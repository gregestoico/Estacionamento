import fetchApi from '../api/fetch.js';

class modelMensalista{
    async buscarMensalistas() {
        const response = await fetchApi('/mensalista', 'GET');
        const data = await response.json();
        const mensalistas =  data.mensalistas;

        // Verifica se a lista de clientes não está vazia
        if (mensalistas.length === 0) {
            console.log('Nenhum cliente foi obtido.'); // debug
            return;
        }
        return mensalistas;
    }

    async cadastrarMensalista(mensalista) {
        const response = await fetchApi('/mensalista', 'POST', mensalista);
        const data = await response.json();
        return data;
    }

    async atualizarMensalista(mensalista) {
        const response = await fetchApi('/mensalista', 'PUT', mensalista);
        const data = await response.json();
        return data;
    }
    
}

export default new modelMensalista();