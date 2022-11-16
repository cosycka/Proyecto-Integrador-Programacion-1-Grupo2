let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idPelicula = qsObj.get('id');

//api key y el endpoint de detalle de peliculas
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let detalleSerie= `https://api.themoviedb.org/3/tv/${idPelicula}?api_key=${api_key}&language=en-US`

let titulo = document.querySelector(".titledetailserie")

fetch(detalleSerie)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    titulo.innerHTML=data.original_title;

    return data
})
.catch(function (errores) {
    console.log(errores);
})