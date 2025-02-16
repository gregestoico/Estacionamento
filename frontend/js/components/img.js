export function criarImg() {
    // Cria um formulário de login
    const div = document.createElement('div');
    div.className = ''
    div.innerHTML = `
        <img src="favicon.ico" alt="Logo" id="logo">
    `;

    // Adiciona um evento de submit ao formulário
    const form = div.querySelector('#loginForm');
    div.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = form.email.value;
        const senha = form.senha.value;
        
        try{
            login(email, senha);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocorreu um erro: ' + error.message);
        }
    });

    return div;
}