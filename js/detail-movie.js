let qs = location.search;
let qsObj = new URLSearchParams(qs);
let captura = qsObj.get('id');

//no funcionan los links noc porque
let detallePelicula = (`https://api.themoviedb.org/3/movie/{movie_id}?api_key=3d4602582547bc4afa8f74ef23bb1e57&language=en-US`)
let plataformasPeliculas=(`https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=3d4602582547bc4afa8f74ef23bb1e57`) //no funciona el link


// capturando elementos del dom
let section1= document.querySelector('.section1detailmovie')
let article1 = document.querySelector('.articlesection1detailmovie')

let sinopsis = document.querySelector('.section2detailmovie')


fetch(detallePelicula)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    section1.innerHTML += 
    `<img class="movieposterdetailmovie" src="./img/MammaMiacover copy.webp" alt="Poster de Mamma Mia">
    <article class="articlesection1detailmovie">
        <h1 class="titledetailmovie">Mamma Mia!</h1>
        <h4 class="h4section1detailmovie">Calificación</h4>
        <p class="psection1detailmovie"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i
                class="fa-regular fa-star"></i> (6.7/10)</p>
        <h4 class="h4section1detailmovie"> Fecha de estreno </h4>
        <p class="psection1detailmovie">18/07/2008</p>
        <h4 class="h4section1detailmovie">Duración </h4>
        <p class="psection1detailmovie">108 mins</p>
    </article>`
            
})
.catch(function (errores) {
    console.log(errores);
})