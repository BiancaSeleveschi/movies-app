$.getJSON("movies.json", loadMovieData)

function loadMovieData(data) {

    let movies = data.movies;
    let genres = data.genres;
    displayMovies(movies)
    displayAGenresInDropdown()
    $("#movieModal").on("show.bs.modal", updateMovieModal)
    $("#all-movies").click(() => displayMovies(movies));
    $("#search-button").click(searchMovie)
    $(".dropdown-item").click(displayMoviesByGenre);

    function displayMovies(movies) {
        $("#movies-div").html("");
        for (let i = 0; i < movies.length; i++) {
            insertMovie(movies[i])
        }
    }

    function insertMovie(movie) {
        let div = $("<div class='movie-div col-md-2 col-lg-3 col-sm-6 my-2'></div>")
        let button = $(`<button class='btn' type='button' data-bs-toggle='modal' data-bs-target='#movieModal' data-bs-movie='${movie.id}'> </button>`)
        let img = $("<img class='img-fluid rounded shadow'>")
        img.attr("src", movie.poster_path)
        button.append(img)
        div.append(button)
        $("#movies-div").append(div)
    }


    function displayAGenresInDropdown() {
        for (let i = 0; i < genres.length; i++) {
            let a = $('<a class="dropdown-item"  href="#" ></a>').text(genres[i].name)
            a.attr("data-genre", genres[i].id)
            let li = $('<li></li>')
            li.append(a)
            $(".dropdown-menu").append(li)
        }
    }

    function updateMovieModal(event) {
        const movieButton = event.relatedTarget
        const movieId = movieButton.getAttribute('data-bs-movie');
        let movie = getMovieById(movieId);
        $("#movie-title-h1").text(movie.title)
        $("#description").text(movie.overview)
        $("#rating-span").text(movie.vote_average)
        $("#bookmark-button").attr('data-bs-movie', movieId)
        $("#img-id").attr('src', movie.poster_path)
    }

    function displayMoviesByGenre(event) {
        const li = event.target
        const movieGenreId = li.getAttribute('data-genre');
        $("#movies-div").html("")
        for (let i = 0; i < movies.length; i++) {
            for (let j = 0; j < movies[i].genre_ids.length; j++) {
                if (movies[i].genre_ids[j] == movieGenreId) {
                    insertMovie(movies[i]);
                }
            }
        }
    }

    function getMovieById(movieId) {
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === parseInt(movieId)) {
                return movies[i]
            }
        }
    }

    function searchMovie(event) {
        event.preventDefault()
        $("#movies-div").empty()
        let value = $("#search-input").val();
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].title.toLowerCase().includes(value.toLowerCase())) {
                insertMovie((movies[i]))
            }
        }
    }


}

