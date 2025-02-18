export function criarLogoImg(src, alt, classAttr) {
    // Cria uma imagem que cobre 100% da altura e largura do container
    const div = document.createElement('div');
    div.className = `${classAttr} flex-column justify-content-center align-items-center bg-primary text-white p-5`
    div.setAttribute('style', 'height: 100%;');
    div.innerHTML = `
        <img src="${src}" alt="${alt}" class="img-fluid w-100" style="flex-grow: 1; object-fit: cover;">
        <h1 class="text-center w-100" style="font-size: clamp(2rem, 5vw, 6rem); font-weight: bold;">PrimePark</h1>
`;

    return div;
}