api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let generosPeliculas = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`
let generosSeries =`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=en-US`

let listaPelicula = document.querySelector(".generoPelis")
let listaSerie = document.querySelector(".generoSeries")

//GENERO PELICULA
fetch(generosPeliculas)
.then(function(response){
	return response.json();
})
.then(function(data){
	console.log(data);
    generos = data.genres;
    let contenido = ""
    for (let i = 0; i < 5; i++) {
        contenido  += 
        `<li class="genero-terror">
            <a class="linkgenerosseries" href="detail-genres.html">${generos[i].name}</a>
        </li>`
    } 
    listaPelicula.innerHTML=contenido
})
.catch(function(error){
	console.log('El error es: ' + error);
})

//GENERO SERIE
fetch(generosSeries)
.then(function(response){
	return response.json();
})
.then(function(data){
	console.log(data);
    generos = data.genres;
    let contenido = ""
    for (let i = 0; i < 5; i++) {
        contenido  += 
        `<li class="genero-terror">
            <a class="linkgenerosseries" href="detail-genres.html">${generos[i].name}</a>
        </li>`
        
    } 
    listaSerie.innerHTML=contenido
})
.catch(function(error){
	console.log('El error es: ' + error);
})
