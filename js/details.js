const queryString = location.search;
const params = new URLSearchParams(queryString);
const idEvento = params.get("id");
obtenerDatos().then(data => {
    const eventoSeleccionado = data.events.find(evento => evento._id == idEvento);

    document.getElementById('details-container').innerHTML = createHtmlDetails(eventoSeleccionado);
})
