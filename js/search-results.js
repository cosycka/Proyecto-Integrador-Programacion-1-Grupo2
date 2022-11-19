//creo la variable query string
let qs = location.search; /* se guarda: '?busqueda=' */
//creo el qs del objeto
let qsObj = new URLSearchParams(qs); //lo convierto en objeto literal
let captura = qsObj.get('busquedacodigo');

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
      if (pelicula.style.display == 'none'&&series.style.display == 'none') {
        noData.style.display = 'block'
      }
      
  },2000);
  })





  noData.style.display = 'none'   
  serRes.innerText =`Resultados de búsqueda para: ${captura}`

  api_key= '3d4602582547bc4afa8f74ef23bb1e57'
  let searchPeliculas = `https://api.themoviedb.org/3/search/movie?api_key=3d4602582547bc4afa8f74ef23bb1e57&query=${captura}&page=1`
  let searchSeries=`https://api.themoviedb.org/3/search/tv?api_key=3d4602582547bc4afa8f74ef23bb1e57&language=en-US&page=1&query=${captura}&include_adult=false`

// traemos las peliculas
  fetch(searchPeliculas)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data.results);
    let peliculas= data.results
    let contenido = ""
    if (data.results.length == 0) {
      pelicula.style.display = 'none'
    }
    else{
      for (let i = 0; i < data.results.length; i++) {
        contenido += 
          `<article class="fondo">
            <img src="https://image.tmdb.org/t/p/w500/${peliculas[i].poster_path} " width="200" height="250" alt="Poster de: ${peliculas[i].title}">
            <p class="textoindex"> <b> ${peliculas[i].title}</b> <br>
            Fecha de estreno: ${peliculas[i].release_date} </p>
            <a href="./detail-movie.html?id=${peliculas[i].id}" class="img">Ver Mas</a>
          </article>` 
        pelicula1.innerHTML = contenido
      }
    }
      
  })
  .catch(function(error) {
    console.log("Error: " + error);
  })

//traemos las series
  fetch(searchSeries)
  .then(function(response) {
    return response.json()
})
  .then(function(data) {
      console.log(data.results);
      let series= data.results
      let contenido1 = ""
      if (data.results.length == 0) {
        series.style.display = 'none'
      }
      else{
        for (let i = 0; i < data.results.length; i++) {
          contenido1 += 
          `<article class="fondo">
            <img src="https://image.tmdb.org/t/p/w500/${series[i].poster_path} " width="200" height="250" alt="Poster de: ${series[i].original_name}">
            <p class="textoindex"> <b> ${series[i].original_name}</b> <br>
            Fecha de estreno: ${series[i].first_air_date} </p>
            <a href="./detail-serie.html?id=${series[i].id}" class="img">Ver Mas</a>
          </article>` 
            serie1.innerHTML = contenido1
      }
    }
      
  })
  .catch(function(error) {
    console.log("Error: " + error);
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

