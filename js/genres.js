api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let generosPeliculas = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`
let generosSeries =`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=en-US` //JSON es un formato de texto que entiende java script, te convierte de un json a un dato manipulable en javascript

let listaPelicula = document.querySelector(".generoPelis") 
let listaSerie = document.querySelector(".generoSeries")

//GENERO PELICULA
fetch(generosPeliculas) //retornaba una promesa
//utiliza la url de la api
.then(function(response){
    //captura el fetch y lo procesa
	return response.json(); //json: cada objeto que tira la api lo convierte en el tipo de dato que es
})
.then(function(data){
    // recibe la funcion anterior y la procesa, aca es donde voy a editar el html
	console.log(data);
    generos = data.genres;
    let contenido = ""
    for (let i = 0; i < 5; i++) {
        contenido  += 
        `<li class="genero-terror">
            <a class="linkgenerosseries" href="detail-genres.html?id=${generos[i].id}">${generos[i].name}</a>
        </li>`
    } 
    listaPelicula.innerHTML=contenido //para que se edite todo el html
    return data;
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
            <a class="linkgenerosseries" href="detail-genres.html?id=${generos[i].id}">${generos[i].name}</a>
        </li>`
        
    } 
    listaSerie.innerHTML=contenido
})
.catch(function(error){
	console.log('El error es: ' + error);
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
