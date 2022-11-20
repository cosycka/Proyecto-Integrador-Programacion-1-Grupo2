//capturo qs
let qs = location.search; // la propiedad search va a almacenar la query string de la url. location.search retorna una cadena de texto por lo que va a ser más difícil manipularlo en un futuro.
let qsObj = new URLSearchParams(qs); // define métodos útiles para trabajar con los parámetros de una URL.
let idGenero = qsObj.get('id'); // permite obtener el valor de una clave dentro de la query string.
let type = qsObj.get('type');
console.log(idGenero)

//api
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let detallePeliculas = `https://api.themoviedb.org/3/discover/movie?api_key=3d4602582547bc4afa8f74ef23bb1e57&language=en-US&with_genres=${idGenero}`

let detalleSeries = `https://api.themoviedb.org/3/discover/tv?api_key=3d4602582547bc4afa8f74ef23bb1e57&language=en-USsort_by=popularitydesc&page=1&timezone=America%2FNew_York&with_genres=${idGenero}&include_null_first_air_dates=falsewith_watch_monetization_types=flatrate&with_status=0&with_type=0`


//Capturo elementos
let seccionGenerosPeliculas = document.querySelector(".caja_peliculas");
let seccionGenerosSeries = document.querySelector(".caja_series");
let pelis = document.querySelector(".peliculasGenerosH3");
let seri = document.querySelector(".seriesGenerosH3")

//Generos peliculas
if(type == 'pelicula'){
fetch(detallePeliculas)
    .then(function (respuesta) {
        return respuesta.json()

    })
    .then(function (data) {
        console.log(data.results)
        let peliculas = data.results; 

        pelis.innerHTML = `<h3 class="tituloterror peliculasGenerosH3"> Peliculas:</h3>`  
        let contenido = ""
            for (let i = 0; i < peliculas.length; i++) { //se van a ver todas las peliculas de ese genero que contenga la api
            contenido += `<article class="fondo">
                            <img src="https://image.tmdb.org/t/p/w500${peliculas[i].poster_path}" width="200" height="250" alt="poster de: ${peliculas[i].title}">
                            <p class="textoindex"> <b> ${peliculas[i].title}</b> <br>
                            Fecha de estreno: ${peliculas[i].release_date} </p>
                            <a href="./detail-movie.html?id=${peliculas[i].id}" class="img">Ver Mas</a>
                        </article>`  //con la etiqueta a y el atributo href, se pone como valor los datos que queremos que viajen por la URL una vez que el usuario clickee el link. 
                };
        seccionGenerosPeliculas.innerHTML= contenido;
    }
    ).catch(function (error) {
        return error
    
    })
}

/*generos series*/
if(type == 'serie'){
fetch(detalleSeries)
    .then(function (respuesta) {
        return respuesta.json()

    })
    .then(function (data) {
        console.log(data.results)
        let series= data.results;
        seri.innerHTML='<h3 class="tituloterror seriesGenerosH3">Series: </h3>'
        let contenido1=""
        for (let i = 0; i < series.length; i++) {
            contenido1+= 
            `<article class="fondo">
                <img src="https://image.tmdb.org/t/p/w500${series[i].poster_path}" width="200" height="250" alt="imagen ${series[i].name}">
                <p class="textoindex"> <b>${series[i].name}</b> <br>
                Fecha de estreno: ${series[i].first_air_date}</p>
                <a href="./detail-serie.html?id=${series[i].id}" class="img">Ver Mas</a>
            </article>  `
                            
    }
    seccionGenerosSeries.innerHTML= contenido1;


    })
    .catch(function (error) {
        return error

})
}

//FORMULARIO 

let formulario = document.querySelector(".formulario");
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
