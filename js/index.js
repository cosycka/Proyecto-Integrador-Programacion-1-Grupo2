api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let peliculasPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`

let cajaPeliculas = document.querySelector(".caja_peliculas")

fetch(peliculasPopulares)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data.results)
    peliculas = data.results;
    let contenido = ""
    for (let i = 0; i < 5; i++) {
        contenido  += 
        `<article class="fondo">
            <img src="./img/MammaMiacover copy.webp" width="200" height="250" alt="${peliculas[i].title}">
            <p class="textoindex"> <b> ${peliculas[i].title}</b> <br>
            Fecha de estreno: ${peliculas[i].release_date} </p>
            <a href="./detail-movie.html" class="img">Ver Mas</a>
        </article>
        `
    
    }
    cajaPeliculas.innerHTML+=contenido
    return data;
  
})
.catch(function(error) {
    return error;
})