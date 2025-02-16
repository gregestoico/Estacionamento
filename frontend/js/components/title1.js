

export function criarTitle1(texto) {
    // Cria o elemento h2 para o título
    const titulo = document.createElement('h1');
    titulo.textContent = texto;
    titulo.className = 'titulo-vagas text-center mt-4 mb-3 font-weight-bold display-2';

    return titulo;
}