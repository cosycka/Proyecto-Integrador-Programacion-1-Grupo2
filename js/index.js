//API
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let peliculasPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
let seriesPopulares = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`
let mejorCalificadas = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`

//obtenemos los elementos del dom
let cajaPeliculas = document.querySelector(".caja_peliculas")
let cajaSeries = document.querySelector(".caja_series")
let cajaMejorCalificadas = document.querySelector(".caja_mejorCalificadas")

//SECCION PELICULAS

fetch(peliculasPopulares)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data.results)
    peliculas = data.results;
    let contenido = ""
    //Recorremos el array 
    for (let i = 0; i < 5; i++) {
        contenido  += 
        `<article class="fondo">
            <img src="https://image.tmdb.org/t/p/w500/${peliculas[i].poster_path} " width="200" height="250" alt="${peliculas[i].title}">
            <p class="textoindex"> <b> ${peliculas[i].title}</b> <br>
            Fecha de estreno: ${peliculas[i].release_date} </p>
            <a href="./detail-movie.html?id=${peliculas[i].id}" class="img">Ver Mas</a>
        </article>`
    
    }
    cajaPeliculas.innerHTML=contenido //Modificaremos un elemento del DOM 
    return data;
})

.catch(function(error) {
    return error;
})

//SECCION SERIES

fetch(seriesPopulares)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data.results)
    series = data.results;
    let contenido = ""
    for (let i = 0; i < 5; i++) {
        contenido  += 
        `<article class="fondo">
            <img src="https://image.tmdb.org/t/p/w500/${series[i].poster_path}" width="200" height="250" alt="imagen b99">
            <p class="textoindex"> <b>${series[i].name}</b> <br>
            Fecha de estreno: ${series[i].first_air_date}</p>
            <a href="./detail-serie.html?id=${series[i].id}" class="img">Ver Mas</a>
        </article>`
    
    }
    cajaSeries.innerHTML=contenido
    return data;
  
})
.catch(function(error) {
    return error;
})

//SECCION SERIES MEJOR CALIFICADAS
fetch(mejorCalificadas)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data.results)
    mejorCalificadas = data.results;
    let contenido = ""
    for (let i = 0; i < 5; i++) {
        contenido  += 
        `<article class="fondo">
            <img src="https://image.tmdb.org/t/p/w500/${mejorCalificadas[i].poster_path}" width="200" height="250" alt="imagen b99">
            <p class="textoindex"> <b>${mejorCalificadas[i].name}</b> <br>
            Fecha de estreno: ${mejorCalificadas[i].first_air_date}</p>
            <a href="./detail-serie.html?id=${mejorCalificadas[i].id}" class="img">Ver Mas</a>
        </article>`
    
    }
    cajaMejorCalificadas.innerHTML=contenido
    return data;
  
})
.catch(function(error) {
    return error;
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

