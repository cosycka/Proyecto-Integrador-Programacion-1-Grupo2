//API
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let peliculasPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
let seriesPopulares = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`
let mejorCalificadas = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`

//obtenemos los elementos del dom
//document es un objeto literal que representa el html cargado
// Utilizamos un selector, querySelector(), que recibe un string indicando el elemento a capturar.
let cajaPeliculas = document.querySelector(".caja_peliculas")
let cajaSeries = document.querySelector(".caja_series")
let cajaMejorCalificadas = document.querySelector(".caja_mejorCalificadas")

//SECCION PELICULAS

//Utilizamos el metodo fetch que recibe como parametro la URL a la API, tambien conocido como endpoint
fetch(peliculasPopulares)
// Luego utilizamos el metodo .then() que tiene un callback  que tiene como parametro la respuesta del fetch
.then(function(response) {
    //Utilizando el metodo .json() convertimos la respuesta en un objeto literal
    return response.json();
})
//El segundo metodo .then() recibe como parametro un callback que tiene como parametro el la informacion obtenida en el primer .then()
.then(function(data) {
    //Dentro de esta funcion ya podemos trabajar con los datos provistos por la API
    console.log(data.results)
    peliculas = data.results;
    let contenido = ""
    //utilizamos un ciclo for para recorrer el array que tiene las peliculas
    for (let i = 0; i < 5; i++) {
        //Modificaremos un elemento del DOM utilizando el .innerHTML
        //Ademas usaremos las template strings para poder utilizar los datos 
        contenido  += 
        `<article class="fondo">
            <img src="https://image.tmdb.org/t/p/w500/${peliculas[i].poster_path} " width="200" height="250" alt="${peliculas[i].title}">
            <p class="textoindex"> <b> ${peliculas[i].title}</b> <br>
            Fecha de estreno: ${peliculas[i].release_date} </p>
            <a href="./detail-movie.html" class="img">Ver Mas</a>
        </article>`
    
    }
    cajaPeliculas.innerHTML=contenido
    return data;
})
//Finalmente utilizamos el metodo .catch() el cual atrapa los errores en cualquier instancia del fetch, este tiene un callback que recibe como parametro el error
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
            <a href="./detail-serie.html" class="img">Ver Mas</a>
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
            <a href="./detail-serie.html" class="img">Ver Mas</a>
        </article>`
    
    }
    cajaMejorCalificadas.innerHTML=contenido
    return data;
  
})
.catch(function(error) {
    return error;
})

