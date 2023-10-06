const url = "https://japceibal.github.io/japflix_api/movies-data.json";
const contenedor = document.getElementById("lista");
const searchButton = document.getElementById("btnBuscar");
const searchField = document.getElementById("inputBuscar");
const contenedorOffCanvas = document.getElementById("off-canvas-container")
let arrayMovies = [];

function getJSONdata(url){
    fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error('Error en la solicitud');
    }
    return response.json();
      })
    .then(data => {
        arrayMovies = data;
    })
    .catch(error => {
        console.error('Hubo un error:', error);
    });
}


document.addEventListener("DOMContentLoaded", () => {
	getJSONdata(url);
    searchButton.addEventListener("click", () => {mostrar(searchField.value)});
	searchField.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
		event.preventDefault();
        mostrar(searchField.value);
		}
	}); 
});





function mostrar(query) {
    contenedor.innerHTML = "";
    if(query == ""){
        alert("Campo vacío")
    } else {
      
    let filteredArray = arrayMovies.filter((movie) => 
    movie.genres.map((item) => item['name']).toString().toLowerCase().includes(query.toLowerCase()) || 
    movie.title.toString().toLowerCase().includes(query.toLowerCase()) || 
    movie.tagline.toString().toLowerCase().includes(query.toLowerCase()) || 
    movie.overview.toString().toLowerCase().includes(query.toLowerCase()));

    
    for (const pelicula of filteredArray) {
        let date = pelicula.release_date.split("-");
        contenedor.innerHTML += `
            <li class="list-group-item d-flex bg-dark text-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_${pelicula.id}" aria-controls="offcanvasWithBothOptions">
                <div class="me-auto">
                    <div class="fw-bold">${pelicula.title}</div>
                    <div class="text-secondary">${pelicula.tagline}</div>
                </div>
                <span>${estrellas(pelicula.vote_average)}</span>
            </li>
        `;
		
        contenedorOffCanvas.innerHTML += `
			<div class="offcanvas offcanvas-top" data-bs-scroll="false" tabindex="-1" id="offcanvas_${pelicula.id}" aria-labelledby="offcanvasWithBothOptionsLabel">
				<div class="offcanvas-header">
					<h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">${pelicula.title}</h5>
					<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div class="offcanvas-body" style="overflow: visible;">
				<div class="row">
					<div class="col-12">
					<p>${pelicula.overview}</p>
					</div>
					<div class="col-10">
					<p class="text-muted">${pelicula.genres.map(item => item["name"]).join(' - ')}</p>
					</div>
					<div class="col-2">
						<div class="dropdown">
							<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								More
							</button>
							<ul class="dropdown-menu">
								<li class="dropdown-item-text">Year: ${date[0]}</li>
								<li class="dropdown-item-text">Runtime: ${pelicula.runtime}</li>
								<li class="dropdown-item-text">Budgect: ${pelicula.budget}</li>
								<li class="dropdown-item-text">Revenue: $${pelicula.revenue}</li>
							</ul>
						</div>
					</div>
				</div>
				</div>
			</div>
        `

    }
 

    }
}



function estrellas(rating){
    let ratingFixed= Math.round(rating/2);
    const stars =  '<i class="fa fa-star checked"></i>'.repeat(ratingFixed) 
    const starsEmpty = '<i class="fa fa-star"></i>'.repeat(5 - ratingFixed )
    return stars + starsEmpty;
}


/* Authors:
		Sofía Rodríguez, Nicolás Esteban, Santiago Font, Matias Mendez, Gonzalo Vera, Lucas Barreiro*/
