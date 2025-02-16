
/**
 * Gera um elemento de seleção (select) com um rótulo (label) e opções baseadas em um dicionário de valores e textos.
 *
 * @param {string} id - O identificador do elemento select e do rótulo.
 * @param {string} label - O rótulo do elemento select.
 * @param {Object} optionsDict - Um dicionário onde as chaves são os valores (value) das opções e os valores são os textos (textContent) exibidos.
 * @returns {HTMLDivElement} - Um elemento div contendo o rótulo e o select.
 */
export function criarSelectElement(id, label, optionsDict) {
    const div = document.createElement('div');
    div.className = 'mb-3';
    
    const select = document.createElement('select');
    select.id = id;
    select.name = id;
    select.className = 'form-select';
    select.required = true;

    // Adiciona uma opção padrão não selecionável
    const option = document.createElement('option');
    option.textContent = `Selecione o ${label.toLowerCase()}`;
    select.appendChild(option);

    // Adiciona as opções ao select
    for (const [value, text] of Object.entries(optionsDict)) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    }

    div.innerHTML += `<label for="${id}" class="form-label">${label}</label>`;
    div.appendChild(select);

    return div;
}
