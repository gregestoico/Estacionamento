import fetchApi from "../api/fetch.js";

/**
 * Gera um formulário baseado em um array de elementos de entrada.
 *
 * @param {string} id - O ID do formulário.
 * @param {string} formTitle - O título do formulário.
 * @param {HTMLElement[]} inputArray - Um array contendo os elementos <div class="mb-3"> com inputs.
 * @returns {HTMLDivElement} - O elemento <div> contendo todo o formulário.
 */
export function criarForm(id, formTitle, inputArray) {
  const div = document.createElement('div');
  div.className = 'container flex-grow-1 d-flex align-items-center justify-content-center';

  // Criação da estrutura do formulário
  div.innerHTML = `
    <div class="card shadow-sm mx-auto" style="max-width: 500px;">
      <div class="card-body p-4">
        <h1 class="card-title text-center text-dark mb-4">${formTitle}</h1>
        <form id="${id}"></form>
      </div>
    </div>
  `;

  // Adiciona os inputs dentro da div correta
  const form = div.querySelector(`#${id}`);
  inputArray.forEach(input => form.appendChild(input));
  // Adiciona um botão de submit ao final do formulário
  form.innerHTML += `<button type="submit" class="btn btn-primary w-100">Cadastrar</button>`


  // Adiciona um evento de submit ao formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Cria um dicionário id -> valor com os dados do formulário
    const formData = criarFormData(inputArray);
    console.log('Dados do formulário:', formData); // debug
    
    try {
      const response = await fetchApi('/funcionario', 'POST', formData);
      if (response.ok) {
          alert('Cadastro realizado com sucesso!');
          
          form.reset();
          // Redireciona para a página inicial
          window.location.href = './home.html';
      } else {
          alert('Erro ao realizar cadastro');
      }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar cadastro');
    }
});

  return div;
}

/** Cria um dicionário id -> valor com os dados do formulário
 * 
 * @param {HTMLElement[]} inputArray - Um array contendo os elementos <div class="mb-3"> com inputs.
*/
function criarFormData(inputDiv) {
  const input = inputDiv.querySelector('input, select, textarea');
  if (input && input.name) {
    formData[input.name] = input.value;
  }
}