let qs = location.search; //la qs captura toda la url con location que tiene la propiedad search(que acorta la url y me manda el qs)
let qsObj = new URLSearchParams(qs); //la transformamos en objeto literal para poder manipularla
let idPelicula = qsObj.get('id'); //me da el id 

//api key y el endpoint de detalle de peliculas
api_key = '3d4602582547bc4afa8f74ef23bb1e57'
let detallePelicula = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${api_key}&language=en-US`
let recoPelicula = `https://api.themoviedb.org/3/movie/${idPelicula}/recommendations?api_key=${api_key}&language=en-US&page=1`
let provPelicula = `https://api.themoviedb.org/3/movie/${idPelicula}/watch/providers?api_key=${api_key}`
let trailerPelicula = `https://api.themoviedb.org/3/movie/${idPelicula}/videos?api_key=${api_key}&language=en-US`
let reviewsPelicula = `https://api.themoviedb.org/3/movie/${idPelicula}/reviews?api_key=${api_key}&language=en-US&page=1`


// capturando elementos del dom
let titulo = document.querySelector('.titledetailmovie')
let calificacion = document.querySelector('.calificacion')
let estreno = document.querySelector('.estreno')
let duracion = document.querySelector('.duracion')
let poster = document.querySelector('.movieposterdetailmovie')
let sinopsis = document.querySelector('.sinopsis')
let generos = document.querySelector('.listsdetailmovie')
let reco = document.querySelector('.reco')
let recobutton = document.querySelector('.buttongetrecommendations')
let botonfav = document.querySelector(".clicfav")
let listaprov = document.querySelector('.listaprov')
let trailer = document.querySelector('.trailerdetailmovie')
let listareviews = document.querySelector('.listareviews')



fetch(detallePelicula)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        titulo.innerHTML = data.original_title;
        calificacion.innerHTML = `${data.vote_average}/10`;
        estreno.innerHTML = data.release_date;
        duracion.innerHTML = `${data.runtime} min`
        poster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        sinopsis.innerHTML = data.overview;

        if (data.genres.length == 0 || data.genres == null || data.genres == undefined) {
            generos.innerHTML = `<p class=pnohayfav>La pelicula no tiene generos</p>`
        }
        else {
            for (let index = 0; index < data.genres.length; index++) {
                generos.innerHTML += ` <li class="itemlista1detailmovie"> <a class="linknavdetailmovie"
        href="./detail-genres.html?id=${data.genres[index].id}&type=pelicula">${data.genres[index].name}</a></li>`
            }
        }

        return data

    })
    .catch(function (errores) {
        console.log(errores);
    })


// Fetch Trailer
fetch(trailerPelicula)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let datavideos = data.results;
        console.log(datavideos)
        let contenidotrailer = "";

        if (datavideos == null || datavideos.length == 0 || datavideos == undefined) {
            contenidotrailer = ` <p class=pnohayfav>La pelicula no tiene trailer disponible</p>`
        }
        else {
            for (let i = 0; i < datavideos.length; i++) {
                if (datavideos[i].type == "Trailer") {
                    contenidotrailer = ` <h2 class="trailertitledetailmovie">Trailer:</h2>
                           <iframe width="100%" height="315" src="https://www.youtube.com/embed/${datavideos[i].key}"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>`
                }
            }
            if (contenidotrailer == "") {
                contenidotrailer = ` <p class=pnohayfav>La pelicula no tiene trailer disponible</p>`
            }
        }

        trailer.innerHTML = contenidotrailer;
        return data
    })
    .catch(function (error) {
        console.log(error);
    })


// Fetch de Recommendations
fetch(recoPelicula)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        let datos = data.results;

        let contenido = "";
        for (let i = 0; i < 3; i++) {
            contenido += `<article class="fondo fondoreco">
                        <img src="https://image.tmdb.org/t/p/w500/${datos[i].poster_path}" width="200" height="250" alt="imagen b99">
                        <p class="textoindex"> <b>${datos[i].title}</b> <br>
                        Fecha de estreno: ${datos[i].release_date}</p>
                        <a href="./detail-movie.html?id=${datos[i].id}" class="img">Ver Mas</a>
                    </article>`
        }
        reco.innerHTML = contenido;

        return data
    })

    .catch(function (errores) {
        console.log(errores);
    })

// seccion de recomendaciones
let sectRecomendaciones = false
recobutton.addEventListener("click", function (e) {
    e.preventDefault();

    if (sectRecomendaciones == false) {
        reco.style.display = 'flex';
        recobutton.innerText = 'Esconder Recomendaciones';
        sectRecomendaciones = true;
    }
    else {
        reco.style.display = 'none';
        recobutton.innerText = 'Ver Recomendaciones';
        sectRecomendaciones = false

    }
})


// Fetch Providers
fetch(provPelicula)
    .then(function (response) {
        return response.json()
    })

    .then(function (data1) {
        let datosprov = data1.results;
        console.log(data1.results);
        let contenidoprov = ""

        // elijo en US
        if (datosprov.US && datosprov.US.buy) {
            console.log(datosprov.US.buy);
            let provarray = datosprov.US.buy

            for (let i = 0; i < provarray.length; i++) {
                contenidoprov += `<li>
                                        <h4>${provarray[i].provider_name}</h4>
                                        <img class="imgprov" src="https://image.tmdb.org/t/p/w500/${provarray[i].logo_path}" alt="${provarray[i].provider_name} Icono">
                                    </li>`
            }
            listaprov.innerHTML = contenidoprov;
        }
        else {
            listaprov.innerText = "No hay proveedores en los Estados Unidos "
        }

    })

//Reviews
fetch(reviewsPelicula)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.results);
        let reviews = data.results
        let contenidoReviews = ""
        if (reviews.length > 0) {
            for (let i = 0; i < reviews.length; i++) {
                contenidoReviews += `<li>
                <h4> Autor: ${reviews[i].author}</h4>
                <p> "${reviews[i].content}"</p>
            </li>`
            }
            listareviews.innerHTML = contenidoReviews
        }
        else {
            listareviews.innerText = "No hay reviews disponibles de esta pelicula "
        }
        return data

    })
    .catch(function (errores) {
        console.log(errores);
    })



//Favoritos
let favPeliculas = [];
let recuperoStorage = localStorage.getItem("favPeliculas")

if (recuperoStorage != null) {
    favPeliculas = JSON.parse(recuperoStorage)
}
if (favPeliculas.includes(idPelicula)) {
    botonfav.innerText = "Quitar de favoritos"
}

botonfav.addEventListener("click", function (e) {
    e.preventDefault()

    if (favPeliculas.includes(idPelicula)) {
        let indice = favPeliculas.indexOf(idPelicula)
        favPeliculas.splice(indice, 1);
        botonfav.innerText = " Agregar a Favoritos"
    }
    else {
        favPeliculas.push(idPelicula);
        botonfav.innerText = "Quitar de Favoritos"
    }

    let favpeliculasstr = JSON.stringify(favPeliculas);
    localStorage.setItem("favPeliculas", favpeliculasstr)
})




//FORMULARIO 

let formulario = document.querySelector(".formulario");
let campo = document.querySelector("[name=busquedacodigo]");

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    if (campo.value == "") {
        alert("El campo de busqueda esta vacio")
    } else if (campo.value.length < 3) {
        alert("Su búsqueda debe tener al menos tres caracteres")
    } else {
        this.submit()
    }


})