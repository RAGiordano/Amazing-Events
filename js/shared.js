/* RETORNA CÓDIGO HTML PARA INYECTAR UNA CARD */
function addCardsHtml(event) {
    return `<div class="card text-center d-flex justify-content-center align-items-between">

    <div class="card-img-container"><!-- IMAGEN -->
      <img src="${event.image}" class="card-img-top object-fit-cover card-img" alt="Cinema">  
    </div>

    <div class="card-body d-flex flex-column justify-content-center align-items-center my-3"><!-- INFORMACIÓN -->
      <h2 class="card-title">${event.name}</h2>

      <p class="card-text">${event.description}</p>
    </div>

    <div class="d-flex justify-content-between align-items-center"><!-- FOOTER -->
      <span>Price: <div>$ ${event.price}</div></span><a href="./details.html?id=${event._id}" class="btn-card">More details...</a><!-- BOTÓN -->
    </div>
  </div>
  `;
}

/* RETORNA CÓDIGO HTML PARA INYECTAR UN CHECKBOX DE CATEGORÍA CON SU LABEL CORRESPONDIENTE*/
function addCategoryHtml(category) {
    return `<label class="mx-3 my-3"><input type="checkbox" class="category-chk" name="${category}" value="true"> ${category}</label>
    `;
}

/* FILTRA QUE EL NOMBRE O LA DESCRIPCIÓN INCLUYAN EL TEXTO DEL FORMULARIO DE BÚSQUEDA Y AL MISMO TIEMPO QUE SE ENCUENTRE DENTRO DE LAS CATEGORÍAS SELECCIONADAS */ 
function filterEvents(text, categorias, events) {
  return events.filter(evento => evento.name.toUpperCase().includes(text.toUpperCase()) && categorias.includes(evento.category) || evento.description.toUpperCase().includes(text.toUpperCase()) && categorias.includes(evento.category));
}

/* RETORNA CÓDIGO HTML PARA INYECTAR CUANDO NO HAY TARJETAS PARA MOSTRAR */
function createHtmlNoMatches() {
  return `  <div class="d-flex justify-content-center align-items-center m-5 px-3 py-5">
  <h4>No matches found. Try adjusting the filters.</h4>
  </div>`;
}

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
      <a class="nav-link d-flex justify-content-center align-items-center mt-3" href="javascript: history.go(-1)">Return</a>
    </div>
  </div>
  </div>`
}

/* INYECTA EN EL DOM LAS TARJETAS QUE CORRESPONDEN SEGÚN SELECCIÓN */
function showCards(searchText, events, categories) {
  let mensaje0 = createHtmlNoMatches();
  let categoriasSeleccionadas = [];
  let eventosFiltrados = [];
  let htmlEvents = "";

   /* OBTIENE UN ARRAY CON LAS CATEGORÍAS SELECCIONADAS */
  document.querySelectorAll(`.category-chk`).forEach(checkbox => {
    if (checkbox.checked) {
      categoriasSeleccionadas.push(checkbox.name); 
    } 
  })
 
  /* SI NO SE SELECCIONÓ NINGUNA CATEGORÍA, TOMA TODAS LAS CATEGORÍAS */
  if (categoriasSeleccionadas.length == 0) {
    categoriasSeleccionadas = categoriasSeleccionadas.concat(categories); 
  }
  
  eventosFiltrados = filterEvents(searchText, categoriasSeleccionadas, events); /* APLICA FILTROS EVENTOS */
  
  /* eventosFiltrados.forEach(evento => htmlEvents += addCardsHtml(evento)); */
  htmlEvents = eventosFiltrados.reduce((acc, evento) => acc + addCardsHtml(evento), ""); /* ARMA EL HTML DE LAS CARDS */
   
  /* INYECTA EL HTML DE LAS TARJETAS DE EVENTOS O EL MENSAJE DE NO MATCH*/
  document.getElementById('cards-container').innerHTML = (htmlEvents != "" ? htmlEvents : mensaje0)
}