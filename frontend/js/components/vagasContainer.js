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
    vagasContainer.className = 'container';
    vagasContainer.setAttribute('id', 'vagas-container');

    const row = document.createElement('div');
    row.className = 'row';
    // Mapeia as vagas para criar os elementos HTML correspondentes usando a função cardVaga
    row.innerHTML = vagas.map(vaga => 
        cardVaga(vaga.cod_vaga, vaga.tipo_veic, vaga.situacao)
    ).join('');

    // Adiciona a linha (row) ao container das vagas
    vagasContainer.appendChild(row);

    

    // Retorna o container completo com as vagas
    return vagasContainer;
}