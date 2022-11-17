api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let detallePeliculas = `https://api.themoviedb.org/3/discover/movie?api_key=3d4602582547bc4afa8f74ef23bb1e57&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
let detalleSeries = `https://api.themoviedb.org/3/discover/tv?api_key=3d4602582547bc4afa8f74ef23bb1e57&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`




fetch(detallePeliculas)
.then(function(response) {
    return response.json()
})
.then(function(data2){
    console.log(data2.results);

    let contenido=''

    for (let i =0; i<data2.results.length; i++) {
        
        contenido += 
        `<article class="peli-genero">
            <img src="./img/MammaMiacover copy.webp" width="200" height="250" alt="imagen Mamma Mia">
            <p class="textoindex"> <b> </b></p>
            <a href="./detail-movie.html" class="img">Ver Mas</a>
        </article>`
    }
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
