function addCardsHTML (image, name, description, price) {
    return `<div class="card text-center d-flex justify-content-center">
    <div class="card-img-container"><!-- IMAGEN -->
      <img src="${image}" class="card-img-top object-fit-cover card-img" alt="Cinema">  
    </div>
    <div class="card-body"><!-- INFORMACIÓN -->
      <h2 class="card-title">${name}</h2>
      <p class="card-text">${description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <span>Price: $ ${price}</span><a href="./details.html" class="btn-card">More details...</a><!-- BOTÓN -->
      </div>
    </div>
  </div>

  `;
}