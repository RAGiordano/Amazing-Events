let htmlEvents = "";
for(let event of data.events){
    htmlEvents += addCardsHTML(event.image, event.name, event.description, event.price);
}
const indexInsertCards = document.getElementById('index-cards-container');
indexInsertCards.innerHTML = htmlEvents;