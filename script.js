$.getJSON("movies.json", loadMovieData)

function loadMovieData(data) {
    console.log("data from json", data)
    let movies = data.movies;
    let genres = data.genres;
    console.log("genres", genres)
    console.table( movies)
    displayMovies(movies) //parametri actuali


}

function displayMovies(movies) { //parametri formali
    for(let i = 0; i < movies.length; i++) {
        insertMovie(movies[i])
    }
}


function insertMovie(movie) {
    let div = $("<div class='col-md-2 col-lg-3 col-sm-6 my-2'></div>")
    let button = $("<button type='button' data-bs-toggle='modal' data-bs-target='#exampleModal'></button>")
    let img = $("<img class='img-fluid rounded shadow'>")
    img.attr("src", movie.poster_path)
    button.append(img)
    div.append(button)
    $("#movies-div").append(div)
}

