let htmlPastEvents = "";
let currentDate = new Date(data.currentDate);
for(let event of data.events) {
  let eventDate = new Date(event.date);
  if (eventDate < currentDate) {
    htmlPastEvents += addCardsHTML(event.image, event.name, event.description, event.price);
  }
}
const pastInsertCards = document.getElementById('past-cards-container');
pastInsertCards.innerHTML = htmlPastEvents;