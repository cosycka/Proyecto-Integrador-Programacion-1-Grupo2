api_key= '3d4602582547bc4afa8f74ef23bb1e57'
api = `https://api.themoviedb.org/3/movie/550?api_key=${api_key}`

fetch(api)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
    return data;
  
})
.catch(function(error) {
    return error;
})