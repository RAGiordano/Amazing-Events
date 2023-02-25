let htmlPastEvents = "";
let htmlPastCategories = "";
let pastCategories = [];
let currentDate = new Date(data.currentDate);
for(let event of data.events) {
  let eventDate = new Date(event.date);
  if (eventDate < currentDate) {/* FILTRA POR FECHA DE EVENTO */
    htmlPastEvents += addCardsHtml(event.image, event.name, event.description, event.price);/* ARMA EL HTML DE LAS TARJETAS DE EVENTOS */
    if (!pastCategories.includes(event.category)) {/* ARMA EL HTML DE LAS CATEGORÍAS */
      pastCategories.push(event.category);
      htmlPastCategories += addCategoryHtml(event.category);
    }
  }
}
const pastInsertCards = document.getElementById('past-cards-container');
pastInsertCards.innerHTML = htmlPastEvents;/* INYECTA EL HTML DE LAS TARJETAS DE EVENTOS */

const pastInsertCategories = document.getElementById('past-categorycheck-container');
pastInsertCategories.innerHTML = htmlPastCategories;/* INYECTA EL HTML DE LAS CATEGORÍAS */
