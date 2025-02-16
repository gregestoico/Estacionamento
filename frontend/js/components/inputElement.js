
/* <div class="mb-3">
<label for="cpf" class="form-label">CPF</label>
<input type="text" id="cpf" name="cpf" class="form-control" required>
</div>
<div class="mb-3">
<label for="name" class="form-label">Nome</label>
<input type="text" id="name" name="name" class="form-control" required>
</div>
<div class="mb-3">
<label for="email" class="form-label">Email</label>
<input type="email" id="email" name="email" class="form-control" required>
</div>
<div class="mb-3">
<label for="password" class="form-label">Senha</label>
<input type="password" id="password" name="password" class="form-control" required>
</div> */

/**
 * Gera um elemento de entrada (input) com um rótulo (label) dentro de um contêiner div.
 *
 * @param {string} id - O identificador do elemento input e do rótulo.
 * @param {string} type - O tipo do elemento input (por exemplo, 'text', 'email', 'password').
 * @param {string} label - O rótulo do elemento input.
 * @returns {HTMLDivElement} - Um elemento div contendo o rótulo e o input.
 */
export function criarInputElement(id, type, label) {
    const div = document.createElement('div') ;
    div.className = 'mb-3';
    div.innerHTML = `
        <label for="${id}" class="form-label">${label}</label>
        <input type="${type}" id="${id}" name="${id}" class="form-control" required>
    `;
    return div;
}

