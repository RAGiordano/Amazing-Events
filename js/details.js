const queryString = location.search;
const params = new URLSearchParams(queryString);
const idEvento = params.get("id");
const eventoSeleccionado = data.events.find(evento => evento._id == idEvento);

document.getElementById('details-container').innerHTML = createHtmlDetails(eventoSeleccionado);
