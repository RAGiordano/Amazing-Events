let htmlCards = ""; /* VARIABLE PARA ALMACENAR EL CÓDIGO HTML DE LAS TARJETAS */
let htmlCategories = ""; /* VARIABLE PARA ALMACENAR EL CÓDIGO HTML DE LAS CATEGORÍAS */
let allCategories = []; /* ARREGLO PARA ALMACENAR TODAS LAS CATEGORÍAS */
obtenerDatos().then(data => {
  for (let event of data.events) {
    htmlCards += addCardsHtml(event);/* ARMA EL HTML DE LAS TARJETAS DE EVENTOS */
    if (!allCategories.includes(event.category)) {/* ARMA EL HTML DE LAS CATEGORÍAS */
      allCategories.push(event.category);
      htmlCategories += addCategoryHtml(event.category);
    }
  }
  document.getElementById('categorycheck-container').innerHTML = htmlCategories;/* INYECTA EL HTML DE LAS CATEGORÍAS */
  document.getElementById('cards-container').innerHTML = htmlCards;/* INYECTA EL HTML DE LAS TARJETAS DE EVENTOS */
  
  /*  CUANDO CAMBIA EL VALUE DEL INPUT DE BÚSQUEDA SE CARGAN LAS TARJETAS FILTRADAS*/
  document.getElementById(`search-input`).addEventListener(`input`, () =>
  showCards(document.getElementById(`search-input`).value, data.events, allCategories)) 
  
  /* CUANDO CAMBIA EL VALUE DE ALGÚN CHECKBOX SE CARGAN LAS TARJETAS FILTRADAS*/
  document.querySelectorAll(`.category-chk`).forEach(checkbox => checkbox.addEventListener(`input`, () => 
    showCards(document.getElementById(`search-input`).value, data.events, allCategories)))  
})