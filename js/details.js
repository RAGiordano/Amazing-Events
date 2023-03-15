const queryString = location.search;
const params = new URLSearchParams(queryString);
const idEvento = params.get("id");
obtenerDatos().then(data => {
    const eventoSeleccionado = data.events.find(evento => evento._id == idEvento);

    document.getElementById('details-container').innerHTML = createHtmlDetails(eventoSeleccionado);
})


/* RETORNA CÓDIGO HTML DE LA TARJETA DE DETAILS */
function createHtmlDetails(evento) {
    return `<div class="details-1 mx-3">
    <img class="details-img" src=${evento.image} alt=${evento.name}>
    </div>
    <div class="details-2 border mx-3 p-5">
    <div class="text-center px-3 justify-content-center">
      <h1 class="h1-detail my-4">${evento.name}</h1>
      <p><b>Date:</b> ${evento.date}</p>
      <p><b>Description:</b> ${evento.description}</p>
      <p><b>Category:</b> ${evento.category}</p>
      <p><b>Place:</b> ${evento.place}</p>
      <p><b>Capacity:</b> ${evento.capacity}</p>
      <p><b>` + (evento.assistance != undefined ? `Assistance:</b> ${evento.assistance}`: `Estimate:</b> ${evento.estimate}`) + `</p>
      <p><b>Price:</b> $ ${evento.price}</p>
      <div class="d-flex justify-content-center">
        <a class="pink-button d-flex justify-content-center align-items-center mt-3" href="javascript: history.go(-1)">Return</a>
      </div>
    </div>
    </div>`
  }