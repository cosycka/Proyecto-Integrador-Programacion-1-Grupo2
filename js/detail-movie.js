let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idPelicula = qsObj.get('id');

//api key y el endpoint de detalle de peliculas
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let detallePelicula = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${api_key}&language=en-US`



// capturando elementos del dom
let titulo = document.querySelector('.titledetailmovie')
let estreno = document.querySelector('.estreno')
let duracion= document.querySelector('.duracion')
let poster = document.querySelector('.movieposterdetailmovie')
let sinopsis = document.querySelector('.sinopsis')
//let generos = document.querySelector('.')


fetch(detallePelicula)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    
    titulo.innerHTML= data.original_title;
    estreno.innerHTML= data.release_date;
    duracion.innerHTML= data.runtime; //como agregar minutos
    poster.src=`https://image.tmdb.org/t/p/w500${data.poster_path}`;
    sinopsis.innerHTML= data.overview;

    //generos

    return data
    
})
.catch(function (errores) {
    console.log(errores);
})