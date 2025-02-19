import { cardVaga } from './cardVaga.js';

/**
 * Função para criar um container com as vagas.
 *
 * @param {Array} vagas - As vagas a serem exibidas.
 * @returns {HTMLElement} - O container com as vagas.
 */
export function criarVagasContainer(vagas) {
    
    // Cria o elemento div que será o container das vagas
    const vagasContainer = document.createElement('div');
    vagasContainer.className = 'container px-4 mx-auto';
    vagasContainer.setAttribute('id', 'vagas-container');

    
    const row = document.createElement('div');
    row.className = 'row';
    // Mapeia as vagas para criar os elementos HTML correspondentes usando a função cardVaga
    row.innerHTML = vagas.map(vaga => 
        cardVaga(vaga.cod_vaga, vaga.tipo_veic, vaga.situacao)
    ).join('');
    // Agrupa as vagas por tipo de veículo
    const vagasPorTipo = vagas.reduce((acc, vaga) => {
        if (!acc[vaga.tipo_veic]) {
            acc[vaga.tipo_veic] = [];
        }
        acc[vaga.tipo_veic].push(vaga);
        return acc;
    }, {});

    // Cria os elementos HTML para cada grupo de vagas
    row.innerHTML = Object.keys(vagasPorTipo).map(tipo => {
        const vagasDoTipo = vagasPorTipo[tipo];
        const subtitulo = `<h3 class="my-3">${tipo}</h3>`;
        const cards = vagasDoTipo.map(vaga => 
            cardVaga(vaga.cod_vaga, vaga.tipo_veic, vaga.situacao)
        ).join('');
        return subtitulo + cards;
    }).join('');

    // Adiciona a linha (row) ao container das vagas
    vagasContainer.appendChild(row);

    

    // Retorna o container completo com as vagas
    return vagasContainer;
}