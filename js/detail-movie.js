let qs = location.search; //la qs captura toda la url con location que tiene la propiedad search(que acorta la url y me manda el qs)
let qsObj = new URLSearchParams(qs); //la transformamos en objeto literal para poder manipularla
let idPelicula = qsObj.get('id'); //me da el id 

//api key y el endpoint de detalle de peliculas
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let detallePelicula = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${api_key}&language=en-US`



// capturando elementos del dom
let titulo = document.querySelector('.titledetailmovie')
let estreno = document.querySelector('.estreno')
let calificacion = document.querySelector('.calificacion')
let duracion= document.querySelector('.duracion')
let poster = document.querySelector('.movieposterdetailmovie')
let sinopsis = document.querySelector('.sinopsis')
let generos = document.querySelector('.listsdetailmovie')
//let generos = document.querySelector('.')


fetch(detallePelicula)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);

    titulo.innerHTML= data.original_title;
    calificacion.innerHTML = `${data.vote_average}/10`;
    estreno.innerHTML= data.release_date;
    duracion.innerHTML= `${data.runtime} min`
    poster.src=`https://image.tmdb.org/t/p/w500${data.poster_path}`;
    sinopsis.innerHTML= data.overview;

    for (let index = 0; index < data.genres.length; index++) {
        generos.innerHTML += ` <li class="itemlista1detailmovie"> <a class="linknavdetailmovie"
        href="./detail-genres.html?id=${data.genres[index].id}&type=pelicula">${data.genres[index].name}</a></li>`
        
    }

    return data
    
})
.catch(function (errores) {
    console.log(errores);
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