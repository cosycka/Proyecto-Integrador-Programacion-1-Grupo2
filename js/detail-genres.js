//capturo qs
let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idGenero = qsObj.get('idGenero');

//api
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let detallePeliculas = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${idGenero}&with_watch_monetization_types=flatrate`
let detalleSeries = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${idGenero}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`


//Capturo elementos
let seccionGenerosPeliculas = document.querySelector(".caja_peliculas");
let seccionGenerosSeries = document.querySelector(".caja_series");
let PelisH3 = document.querySelector(".peliculasGenerosH3");
let h2Series = document.querySelector(".h2dgseries");


//Generos peliculas
fetch(detallePeliculas)
    .then(function (respuesta) {
        return respuesta.json()

    })
    .then(function (data) {
        console.log(data.results)
         let peliculas = data.results;
         
         if (peliculas.length> 0){
         let contenido = ""
         for (let i = 0; i < 5; i++) {
                contenido += 
                `<article class="fondo">
                    <img src="https://image.tmdb.org/t/p/w500${peliculas[i].poster_path}" width="200" height="250" alt="imagen ${peliculas[i].title}">
                    <p class="textoindex"> <b> ${peliculas[i].title}</b> <br>
                    Fecha de estreno: ${peliculas[i].release_date} </p>
                    <a href="./detail-movie.html?idPelicula=${peliculas[i].id}" class="img">Ver Mas</a>
                </article>`
               
            };
            seccionGenerosPeliculas.innerHTML= contenido;
        } else {
            seccionGenerosPeliculas.innerHTML= `<h2> No hay peliculas para el género seleccionado</h2>`

        }
    })
    .catch(function (error) {
        return error

    })

/*generos series*/

fetch(detalleSeries)
    .then(function (respuesta) {
        return respuesta.json()

    })
    .then(function (data) {
        console.log(data.results)
        let series= data.results;
        if (series.length> 0){
        let contenido1=""
        for (let i = 0; i < 5; i++) {
            contenido1+= 
            `<article class="fondo">
                <img src="https://image.tmdb.org/t/p/w500${series[i].poster_path}" width="200" height="250" alt="imagen ${series[i].name}">
                <p class="textoindex"> <b>${series[i].name}</b> <br>
                Fecha de estreno: ${series[i].first_air_date}</p>
                <a href="./detail-serie.htmlidPelicula=${series[i].id}" class="img">Ver Mas</a>
            </article>  `
                            
        };
        seccionGenerosSeries.innerHTML= contenido1;
    } else{
        seccionGenerosSeries.innerHTML= `<h2> No hay series para el género seleccionado</h2>`
    }


    })
    .catch(function (error) {
        return error

    })

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
