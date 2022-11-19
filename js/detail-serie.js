let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idSerie = qsObj.get('id');

//api key y el endpoint de detalle de peliculas
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let detalleSerie= `https://api.themoviedb.org/3/tv/${idSerie}?api_key=${api_key}&language=en-US`
let recoSerie= `https://api.themoviedb.org/3/tv/${idSerie}/recommendations?api_key=${api_key}&language=en-US&page=1`
let provSerie= `https://api.themoviedb.org/3/tv/${idSerie}/watch/providers?api_key=${api_key}`

// capturando elementos del dom
let titulo = document.querySelector('.titledetailserie')
let calificacion = document.querySelector('.calificacion')
let estreno = document.querySelector('.estreno')
let poster = document.querySelector('.movieposterdetailserie')
let sinopsis = document.querySelector('.sinopsis')
let generos = document.querySelector('.listsdetailserie')


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