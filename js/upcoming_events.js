let htmlUpcomingEvents = "";
let currentDate = new Date(data.currentDate);
for(let event of data.events){
  let eventDate = new Date(event.date);
  if (eventDate >= currentDate) {
    htmlUpcomingEvents += addCardsHTML(event.image, event.name, event.description, event.price);
  }
}
const upcomingInsertCards = document.getElementById('upcoming-cards-container');
upcomingInsertCards.innerHTML = htmlUpcomingEvents;