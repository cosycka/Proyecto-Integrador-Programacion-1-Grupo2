//creo la variable query string
let qs = location.search; /* se guarda: '?busqueda=' */
//creo el qs del objeto
let qsObj = new URLSearchParams(qs); 
let captura = qsObj.get('busqueda');

//elementos del dom
let pelicula = document.querySelector('.peli')
let series = document.querySelector('.ser')
let serRes = document.querySelector('.searchResul')
let ser  = document.querySelector('.search')
let esconder = document.querySelector('.invisible')
let animacionDeCarga = document.querySelector('.animacionDeCarga')
let noData = document.querySelector('.noData')
let pelicula1 = document.querySelector('.peli1')
let serie1 = document.querySelector('.ser1')

window.addEventListener('load', function () {
    esconder.style.display = 'none'
    setTimeout( function (){
      esconder.style.display = 'block'
      animacionDeCarga.style.display = 'none'
      if (artistas.style.display == 'none'&&albums.style.display == 'none'&& canciones.style.display == 'none') {
        noData.style.display = 'block'
      }
  }, 2000);
  })

  noData.style.display = 'none'
  serRes.innerText =`Resultados de búsqueda para: ${captura}`

  api_key= '3d4602582547bc4afa8f74ef23bb1e57'
  let searchPeliculas = `https://api.themoviedb.org/3/search/movie?api_key=3d4602582547bc4afa8f74ef23bb1e57&query=${captura}&page=1`

    // traemos las peliculas
  fetch(searchPeliculas)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
      console.log(data);
      let peliculas= data.results
      if (data.data.length == 0) {
        pelicula.style.display = 'none'
      }
      else{
        for (let i = 0; i < data.data.length; i++) {
          pelicula1.innerHTML += 
          `<article class="fondo">
            <img src="https://image.tmdb.org/t/p/w500/${peliculas[i].poster_path} " width="200" height="250" alt="${peliculas[i].title}">
            <p class="textoindex"> <b> ${peliculas[i].title}</b> <br>
            Fecha de estreno: ${peliculas[i].release_date} </p>
            <a href="./detail-movie.html" class="img">Ver Mas</a>
          </article>` 
      }
      }
      
  })
  .catch(function(error) {
    console.log("Error: " + error);
  })


