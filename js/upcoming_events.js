let htmlUpcomingEvents = "";
let htmlUpcomingCategories = "";
let upcomingCategories = [];
let currentDate = new Date(data.currentDate);
for(let event of data.events){
  let eventDate = new Date(event.date);
  if (eventDate >= currentDate) {
    htmlUpcomingEvents += addCardsHtml(event.image, event.name, event.description, event.price);/* ARMA EL HTML DE LAS TARJETAS DE EVENTOS */
    if (!upcomingCategories.includes(event.category)) {/* ARMA EL HTML DE LAS CATEGORÍAS */
      upcomingCategories.push(event.category);
      htmlUpcomingCategories += addCategoryHtml(event.category);
    }
  }
}
const upcomingInsertCards = document.getElementById('upcoming-cards-container');
upcomingInsertCards.innerHTML = htmlUpcomingEvents;/* INYECTA EL HTML DE LAS TARJETAS DE EVENTOS */

const upcomingInsertCategories = document.getElementById('upcoming-categorycheck-container');
upcomingInsertCategories.innerHTML = htmlUpcomingCategories;/* INYECTA EL HTML DE LAS CATEGORÍAS */
