function addCardsHtml (image, name, description, price) {
    return `<div class="card text-center d-flex justify-content-center align-items-between">

    <div class="card-img-container"><!-- IMAGEN -->
      <img src="${image}" class="card-img-top object-fit-cover card-img" alt="Cinema">  
    </div>

    <div class="card-body d-flex flex-column justify-content-center align-items-center my-3"><!-- INFORMACIÓN -->
      <h2 class="card-title">${name}</h2>

      <p class="card-text">${description}</p>
    </div>

    <div class="d-flex justify-content-between align-items-center"><!-- FOOTER -->
      <span>Price: $ ${price}</span><a href="./details.html" class="btn-card">More details...</a><!-- BOTÓN -->
    </div>
  </div>

  `;
}


function addCategoryHtml(category) {
    return `<label class="mx-3 my-3"><input type="checkbox" id="cat1" name="cat1" value="true"> ${category}</label>
    `;
}


