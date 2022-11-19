api_key = '3d4602582547bc4afa8f74ef23bb1e57'
/* Recupero el storage */
let recuperoStorage = localStorage.getItem("favPeliculas");

/* transformar el json (string) en obj o un array */
let peliculasfavoritas = JSON.parse(recuperoStorage);

let sectionpeliculas = document.querySelector('.sectionfavpeliculas');


let contenidopeliculasfav = "";
if (peliculasfavoritas == null || peliculasfavoritas.length == 0){
    sectionpeliculas.innerHTML = `<p> No se agregaron peliculas a favoritos <p/>`
}
else{
    for (let i = 0; i < peliculasfavoritas.length; i++) {
    let peliculasurl = `https://api.themoviedb.org/3/movie/${peliculasfavoritas[i]}?api_key=${api_key}&language=en-US`

    fetch(peliculasurl)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data.results)
        contenidopeliculasfav += `<article class="fondo">
                                        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" width="200" height="250" alt="imagen Mamma Mia">
                                        <p class="textoindex"> <b>${data.title}</b> <br>
                                        Fecha de estreno: ${data.release_date}</p>
                                        <a href="./detail-movie.html?id=${data.id}" class="img">Ver Mas</a>
                                    </article>`
        
        sectionpeliculas.innerHTML = contenidopeliculasfav;
    })
    .catch(function(error){
        console.log(error);
        return error;
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