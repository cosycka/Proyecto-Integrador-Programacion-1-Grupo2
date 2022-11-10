api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let generos = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`

let listaGenero = document.querySelector(".lista-generos")
//todavia no funciona!!!
fetch(generos)
.then(function(response){
	return response.json();
})
.then(function(data){
	console.log(data);
    generos = data;
    let contenido = ""
    for (let i = 0; i < 5; i++) {
        contenido  += 
        `<li class="genero-fantasia">
            <a class="linkgenerosseries" href="detail-genres.html">${generos[i].name}</a>
        </li>`
    } 
    listaGenero.innerHTML+=contenido
})
.catch(function(error){
	console.log('El error es: ' + error);
})
