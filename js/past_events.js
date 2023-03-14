let htmlPastCards = ""; /* VARIABLE PARA ALMACENAR EL CÓDIGO HTML DE LAS TARJETAS */
let htmlCategories = ""; /* VARIABLE PARA ALMACENAR EL CÓDIGO HTML DE LAS CATEGORÍAS */
let allCategories = []; /* ARREGLO PARA ALMACENAR LAS CATEGORÍAS */
let pastEvents = []; /* ARREGLO PARA EVENTOS PASADOS */
obtenerDatos().then(data => {
  let currentDate = new Date(data.currentDate);

  for(let event of data.events) {
    let eventDate = new Date(event.date); 
    if (!allCategories.includes(event.category)) {/* ARMA EL HTML DE LAS CATEGORÍAS */
      allCategories.push(event.category);
      htmlCategories += addCategoryHtml(event.category);
    }
    if (eventDate < currentDate) {/* FILTRA POR FECHA DE EVENTO */
      pastEvents.push(event); /* AGREGA EL EVENTO AL ARRAY DE EVENTOS PASADOS */
      htmlPastCards += addCardsHtml(event);/* ARMA EL HTML DE LAS TARJETAS DE EVENTOS PASADOS */
    }
  }
  /* console.log(pastEvents) */

  document.getElementById('categorycheck-container').innerHTML = htmlCategories;/* INYECTA EL HTML DE LAS CATEGORÍAS */
  document.getElementById('cards-container').innerHTML = htmlPastCards;/* INYECTA EL HTML DE LAS TARJETAS DE EVENTOS */

  /*  CUANDO CAMBIA EL VALUE DEL INPUT DE BÚSQUEDA SE CARGAN LAS TARJETAS FILTRADAS*/
  document.getElementById(`search-input`).addEventListener(`input`, () =>
  showCards(document.getElementById(`search-input`).value, pastEvents, allCategories)) 

  /* CUANDO CAMBIA EL VALUE DE ALGÚN CHECKBOX SE CARGAN LAS TARJETAS FILTRADAS*/
  document.querySelectorAll(`.category-chk`).forEach(checkbox => checkbox.addEventListener(`input`, () => 
    showCards(document.getElementById(`search-input`).value, pastEvents, allCategories))) 

})