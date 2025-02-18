export function criarContainer(id='', className=''){
    const mainContainer = document.createElement('div');
    mainContainer.id = id;
    mainContainer.className = className;
    
    return mainContainer;
}