let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idPelicula = qsObj.get('id');

//api key y el endpoint de detalle de peliculas
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let detallePelicula = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${api_key}&language=en-US`



// capturando elementos del dom
let imagen = document.querySelector('.movieposterdetailmovie')
let article1 = document.querySelector('.articlesection1detailmovie')
let sinopsis = document.querySelector('.section2detailmovie')
let generos = document.querySelector('.section3detailmovie')


fetch(detallePelicula)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    let pelicula = data
    imagen.src=`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
    let contenido = 
    `<article class="articlesection1detailmovie">
        <h1 class="titledetailmovie">${pelicula.original_title}</h1>
        <h4 class="h4section1detailmovie">Calificación</h4>
        <p class="psection1detailmovie"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i
                class="fa-regular fa-star"></i> (6.7/10)</p>
        <h4 class="h4section1detailmovie"> Fecha de estreno </h4>
        <p class="psection1detailmovie">${pelicula.release_date}</p>
        <h4 class="h4section1detailmovie">Duración </h4>
        <p class="psection1detailmovie">${pelicula.runtime}</p>
    </article>`
    article1.innerHTML= contenido;

    let contenido1= 
    `<section class="section2detailmovie">
        <h2>Sinópsis:</h2>
        <p>${pelicula.overview}</p>
    </section>`
    sinopsis.innerHTML= contenido1

    return data
    
})
.catch(function (errores) {
    console.log(errores);
})