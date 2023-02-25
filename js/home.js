let htmlEvents = "";
let htmlCategories = "";
let allCategories = [];
for (let event of data.events) {
  htmlEvents += addCardsHtml(event.image, event.name, event.description, event.price);/* ARMA EL HTML DE LAS TARJETAS DE EVENTOS */
  if (!allCategories.includes(event.category)) {/* ARMA EL HTML DE LAS CATEGORÍAS */
    allCategories.push(event.category);
    htmlCategories += addCategoryHtml(event.category);
  }
}
const indexInsertCards = document.getElementById('index-cards-container');
indexInsertCards.innerHTML = htmlEvents;/* INYECTA EL HTML DE LAS TARJETAS DE EVENTOS */


const indexInsertCategories = document.getElementById('index-categorycheck-container');
indexInsertCategories.innerHTML = htmlCategories;/* INYECTA EL HTML DE LAS CATEGORÍAS */
