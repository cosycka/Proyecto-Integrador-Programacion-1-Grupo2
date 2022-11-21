let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idSerie = qsObj.get('id');

//api key y el endpoint de detalle de peliculas
api_key= '3d4602582547bc4afa8f74ef23bb1e57'
let detalleSerie= `https://api.themoviedb.org/3/tv/${idSerie}?api_key=${api_key}&language=en-US`
let recoSerie= `https://api.themoviedb.org/3/tv/${idSerie}/recommendations?api_key=${api_key}&language=en-US&page=1`
let provSerie= `https://api.themoviedb.org/3/tv/${idSerie}/watch/providers?api_key=${api_key}`
let trailerSerie = `https://api.themoviedb.org/3/tv/${idSerie}/videos?api_key=${api_key}&language=en-US`
let reviewsSerie = `https://api.themoviedb.org/3/tv/${idSerie}/reviews?api_key=${api_key}&language=en-US&page=1`

// capturando elementos del dom
let titulo = document.querySelector('.titledetailserie')
let calificacion = document.querySelector('.calificacion')
let estreno = document.querySelector('.estreno')
let episodes = document.querySelector('.episodecountseries')
let poster = document.querySelector('.movieposterdetailserie')
let sinopsis = document.querySelector('.sinopsis')
let generosseries = document.querySelector('.listsdetailserie')
let reco = document.querySelector('.reco')
let recobutton = document.querySelector('.buttongetrecommendationsserie')
let botonfav = document.querySelector(".clicfavserie")
let listaprov = document.querySelector('.listaprovserie')
let trailer = document.querySelector('.trailerdetailserie')
let listareviews = document.querySelector('.listareviewsserie')



fetch(detalleSerie)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);

    titulo.innerHTML = data.name;
    calificacion.innerHTML = `${data.vote_average}/10`;
    estreno.innerHTML = data.first_air_date;
    episodes.innerHTML = data.number_of_episodes;
    poster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    sinopsis.innerHTML = data.overview

    if(data.genres.length ==0 || data.genres == null || data.genres == undefined){
        generosseries.innerHTML = `<p class=pnohayfav>La Serie no tiene generos</p>`
    }
    else{
        for (let index = 0; index < data.genres.length; index++) {
            generosseries.innerHTML += `<li class="itemlista1detailmovie"> <a class="linknavdetailmovie"
            href="./detail-genres.html?id=${data.genres[index].id}&type=serie">${data.genres[index].name}</a></li>`
        }
    }

    return data

})
.catch(function(error){
    console.log(error);
})


// Fetch Trailer
fetch(trailerSerie)
.then(function(response){
    return response.json();
})
.then(function(data){
    let datavideos = data.results;
    console.log(datavideos)
    let contenidotrailer = "";
    
    if (datavideos == null || datavideos.length ==0 ||datavideos == undefined){
        contenidotrailer = ` <p class=pnohayfav>La pelicula no tiene trailer disponible</p>`
    }
    else{
        for (let i = 0; i < datavideos.length; i++) {
            if (datavideos[i].type == "Trailer"){
                contenidotrailer=` <h2 class="trailertitledetailmovie trailerdetailserie">Trailer:</h2>
                           <iframe width="100%" height="315" src="https://www.youtube.com/embed/${datavideos[i].key}"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>`
            }
        }
        if (contenidotrailer == ""){
            contenidotrailer = ` <p class=pnohayfav>La pelicula no tiene trailer disponible</p>`
        }
    }

    trailer.innerHTML = contenidotrailer;
    return data
})
.catch(function(error){
    console.log(error);
})


// Fetch de Recommendations
fetch(recoSerie)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)
    datareco = data.results
    contenido = ""

    for (let i = 0; i < 3; i++) {
        contenido += `<article class="fondo fondoreco">
                        <img src="https://image.tmdb.org/t/p/w500/${datareco[i].poster_path}" width="200" height="250" alt="imagen b99">
                        <p class="textoindex"> <b>${datareco[i].name}</b> <br>
                        Fecha de estreno: ${datareco[i].first_air_date}</p>
                        <a href="./detail-serie.html?id=${datareco[i].id}" class="img">Ver Mas</a>
                    </article>`
    }
    reco.innerHTML = contenido;

    return data
})
.catch(function(error){
    console.log(error)
})


// seccion de recomendaciones
let sectRecomendacionesseries = false
recobutton.addEventListener("click", function (e) {
    e.preventDefault();

    if (sectRecomendacionesseries == false) {
        reco.style.display = 'flex';
        recobutton.innerText = 'Esconder Recomendaciones';
        sectRecomendacionesseries = true;
    }
    else {
        reco.style.display = 'none';
        recobutton.innerText = 'Ver Recomendaciones';
        sectRecomendacionesseries = false

    }
})


// Fetch Providers
fetch(provSerie)
    .then(function (response) {
        return response.json()
    })

    .then(function (data) {
        let datosprovserie = data.results;
        console.log(data.results);
        let contenidoprovseries = ""

        // elijo en US
        if (datosprovserie.US && datosprovserie.US.buy) {
            console.log(datosprovserie.US.buy);
            let provarray = datosprovserie.US.buy
            
            for (let i = 0; i < provarray.length; i++) {
                contenidoprovseries += `<li>
                                        <h4>${provarray[i].provider_name}</h4>
                                        <img class="imgprov" src="https://image.tmdb.org/t/p/w500/${provarray[i].logo_path}" alt="${provarray[i].provider_name} Icono">
                                    </li>`
            }
            listaprov.innerHTML = contenidoprovseries
        }
        else {
            listaprov.innerText = "No hay proveedores en los Estados Unidos "
        }

    })

//Reviews
fetch(reviewsSerie)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.results);
         let reviews = data.results
         let contenidoReviews = ""
         if (reviews.length>0){
         for (let i = 0; i < reviews.length; i++) {
           contenidoReviews+= `<li>
                <h4> Autor: ${reviews[i].author}</h4>
                <p> "${reviews[i].content}"</p>
            </li>`
         }
         listareviews.innerHTML = contenidoReviews
        }
         else {
            listareviews.innerText = "No hay reviews disponibles de esta serie "
        }
        return data

    })
    .catch(function (errores) {
        console.log(errores);
    })


//Favoritos
let favSeries= [];
let recuperoStorage = localStorage.getItem("favSeries")

if (recuperoStorage != null) {
    favSeries = JSON.parse(recuperoStorage)
}
if (favSeries.includes(idSerie)) {
    botonfav.innerText = "Quitar de favoritos"
}

botonfav.addEventListener("click", function(e) {
    e.preventDefault()

    if (favSeries.includes(idSerie)) {
       let indice = favSeries.indexOf(idSerie)
       favSeries.splice(indice, 1);
       botonfav.innerText = " Agregar a Favoritos"
    }
    else{
        favSeries.push(idSerie);
        botonfav.innerText = "Quitar de Favoritos"
    }

    let favSeriesstr = JSON.stringify(favSeries);
    localStorage.setItem("favSeries", favSeriesstr)
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