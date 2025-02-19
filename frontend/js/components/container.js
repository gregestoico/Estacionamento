export function criarContainer(id='', className='', style=''){
    const mainContainer = document.createElement('div');
    mainContainer.id = id;
    mainContainer.className = className;
    mainContainer.style = style;
    return mainContainer;
}