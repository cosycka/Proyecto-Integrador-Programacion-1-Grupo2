api_key = '3d4602582547bc4afa8f74ef23bb1e57'
/* Recupero el storage */
let recuperoStoragePeliculas = localStorage.getItem("favPeliculas");
let recuperoStorageSeries = localStorage.getItem("favSeries");

/* transformar el json (string) en obj o un array */
let peliculasfavoritas = JSON.parse(recuperoStoragePeliculas);
let seriesfavoritas = JSON.parse(recuperoStorageSeries);

let sectionPeliculas = document.querySelector('.sectionfavpeliculas');
let sectionSeries = document.querySelector('.sectionfavseries')

// peliulas
let contenidopeliculasfav = "";
if (peliculasfavoritas == null || peliculasfavoritas.length == 0){
    sectionPeliculas.innerHTML = `<article><p class= pnohayfav> No se agregaron peliculas a favoritos <p/></article>`
}
else{
    for (let i = 0; i < peliculasfavoritas.length; i++) {
    let peliculasurl = `https://api.themoviedb.org/3/movie/${peliculasfavoritas[i]}?api_key=${api_key}&language=en-US&page=1` 

    fetch(peliculasurl)
    .then(function(response){
        return response.json()
    })
    .then(function(data){       
        contenidopeliculasfav += `<article class="fondo">
                                        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" width="200" height="250" alt="imagen Mamma Mia">
                                        <p class="textoindex"> <b>${data.title}</b> <br>
                                        Fecha de estreno: ${data.release_date}</p>
                                        <a href="./detail-movie.html?id=${data.id}" class="img">Ver Mas</a>
                                    </article>`
    sectionPeliculas.innerHTML = contenidopeliculasfav;
        
    })
    .catch(function(error){
        console.log(error);
    })      
}   
}

// series
let contenidoseriesfav = "";
if (seriesfavoritas == null || seriesfavoritas.length ==0){
    sectionSeries.innerHTML = `<article><p class= pnohayfav> No se agregaron series a favoritos <p/></article>`
}
else{
    for (let i = 0; i < seriesfavoritas.length; i++) {
        let seriesurl = `https://api.themoviedb.org/3/tv/${seriesfavoritas[i]}?api_key=${api_key}&language=en-US&page=1` 
    
        fetch(seriesurl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            let dataseries = data
            contenidoseriesfav += `<article class="fondo">
                                            <img src="https://image.tmdb.org/t/p/w500/${dataseries.poster_path}" width="200" height="250" alt="imagen Mamma Mia">
                                            <p class="textoindex"> <b>${dataseries.name}</b> <br>
                                            Fecha de estreno: ${dataseries.first_air_date}</p>
                                            <a href="./detail-serie.html?id=${dataseries.id}" class="img">Ver Mas</a>
                                        </article>`
            
            sectionSeries.innerHTML = contenidoseriesfav;
        })
        .catch(function(error){
            console.log(error);
        })
}

}

//FORMULARIO 

let formulario= document.querySelector(".formulario");
let campo= document.querySelector("[name=busquedacodigo]");

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    if ( campo.value =="") {
        alert("El campo de busqueda esta vacio")
    } else if (campo.value.length< 3){
        alert("Su búsqueda debe tener al menos tres caracteres")
    }else {
        this.submit()
    }

    
})