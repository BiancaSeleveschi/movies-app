$.getJSON("movies.json", loadMovieData)

function loadMovieData(data) {

    let movies = data.movies;
    let genres = data.genres;
    displayMovies(movies)
    displayAGenresInDropdown()
    $("#movieModal").on("show.bs.modal", updateMovieModal)
    $("#search-button").click(searchMovie)
    let favoriteMovie = [];

    function displayAGenresInDropdown() {
        for (let i = 0; i < genres.length; i++) {
            let a = $('<a class="dropdown-item"  href="#" ></a>').text(genres[i].name)
            a.attr("data-genre", genres[i].id)
            let li = $('<li></li>')
            li.append(a)
            $(".dropdown-menu").append(li)
        }
    }

    function displayMovies(movies) {
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

    function updateMovieModal(event) {
        const movieButton = event.relatedTarget //butonul pe care am apasat sa se deschida modalul = butonul filmului
        const movieId = movieButton.getAttribute('data-bs-movie'); //luam valoarea atriobutului data-bs-movie = avem id-ul filmului
        let movie = getMovieById(movieId);
        // $("#movie-title-h1").text(movie.title)
        $("#release-span").text(movie.release_date)
        $("#description").text(movie.overview)
        $("#rating-span").text(movie.vote_average)
        $("#bookmark-button").attr('data-bs-movie', movieId)
        //daca filmul este favorti (Adica se afla in array-ul de favorite) se afiseaza burtonul plin altfel butonul gol
        if (isFavorite(movie)) {
            $("#bookmark-button i").addClass("bi-bookmark-fill")
        } else {
            $("#bookmark-button i").addClass("bi-bookmark")
        }
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


    $("#bookmark-button").click(markFavorite);

    // $("#bookmark-button").click(markNonFavorite);
    let movieIsFavorite = false;

    function markFavorite() {
        //1. extragemn id-ul filmului pe care s-a apasat butnolu de bookmark din modal
        let movieId = $("#bookmark-button").attr('data-bs-movie');
        //2. gasim filmul dupa id
        let movie = getMovieById(movieId);
        //3. adaugam filmul la favorite
        $("#bookmark-button i").addClass("bi-bookmark")
        $("#bookmark-button i").removeClassz("bi-bookmark-fill")
        favoriteMovie.push(movie);
    }

    function displayFavoriteMovies() {
        for (let i = 0; i < movies.length; i++) {
            markFavorite(movies[i])
        }
    }

    $("#favorite-movies").click(markFavorite)
    $(".moviesss").click(displayMovies)

    function isFavorite() {
        let movieId = $("#bookmark-button").attr('data-bs-movie');
        for (let i = 0; i < favoriteMovie.length; i++) {
            if (movieId === favoriteMovie[i].id) {
                return true
            }
        }
        return false;
    }


    function getMovieById(movieId) {
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === parseInt(movieId)) {
                return movies[i]
            }
        }
    }

    $(".dropdown-item").click(displayMoviesByGenre);
}

