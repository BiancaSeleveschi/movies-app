$.getJSON("movies.json", loadMovieData)

function loadMovieData(data) {

    console.log("ina interiorul functieri)")
    console.log("data from json", data)
    let movies = data.movies;
    let genres = data.genres;
    console.log("genres", genres)
    console.table(movies)
    displayMovies(movies) //parametri actuali
    displayAllGenreInDropdown()
    $("#movieModal").on("show.bs.modal", updateMovieModal)
    $("#search-button").click(getMovieWroteInInput) //scurtatura de jquery pt linia de jos
    // $("#search-button").on("click",getMovieWroteInInput)

    let favoriteMovie = [];

    //Tema: afisarea tuturor genurilor in Lista de genuri din navbar (toate genurile care exista, in json, adiica in array-ul genres)
    //pentru fiecare element de gen afisat in dropdown, la apasarea lui sa se afiseze filmele genului apsata
    //asta inseamna ca la fiecare li ....data-genre.....
    //functionalitate:  afisarea tuturor genurilor in dropdown si
    function displayAllGenreInDropdown() {
        for (let i = 0; i < genres.length; i++) {

            let a = $('<a class="dropdown-item"  href="#" ></a>').text(genres[i].name)
            a.attr("data-genre", genres[i].id)
            let li = $('<li></li>')
            li.append(a)
            $(".dropdown-menu").append(li)
        }
    }

    // pentru fiecare gen la apasarea lui sa imi afiseze filmele cu genul respectiv

    function displayMovies(movies) { //parametri formali
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

    function getMovieWroteInInput(event) {
        event.preventDefault()
        $("#movies-div").empty()
        let searchInput = $("#search-input").val();
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].title === searchInput) {
                insertMovie(movies[i])
            }
        }
    }

    ///Funtionalitate buton bookmark
    //LA apasarea butonului vreau sa se umple iconita si adaugam filmul in lista de filme favorite = array
    //1 la apsaraea butonului sa se adauge filmul in array
    //adaugam event listener pe butonul e bookmark care la apasarea lui sa se efectueze actiunea de a marca filmul ca favorit (Adica il adauga in arrayul de favorit)
    $("#bookmark-button").click(markFavorite);
    //$("#bookmark-button").click(markNonFavorite);

    //creeam functia markfavorit care adauga filmul pe care s-a abasat buton ul de bookmark din modal, in array-ul de favorites
    function markFavorite() {
        //1. extragemn id-ul filmului pe care s-a apasat butnolu de bookmark din modal
        let movieId = $("#bookmark-button").attr('data-bs-movie');
        //2. gasim filmul dupa id
        let movie = getMovieById(movieId);
        //3. adaugam filmul la favorite
        favoriteMovie.push(movie);
        $("#bookmark-button i").removeClass("bi-bookmark")
        $("#bookmark-button i").addClass("bi-bookmark-fill")
        //wayne dyer -piuterea intentiei

        //daca filmul nu e favorit si apasam pe butonul bookmark adaugam filmul la favorite si facem bookmarkul plin
        //iar daca filmul e favorit si apasam pe butonul de bookmark vrem sa facem bookmarkul gol si sa stergem din array-ul de favorite filmul
    }

    function markNonFavorite() {
        let movieId = $("#bookmark-button").attr('data-bs-movie');
        let movie = getMovieById(movieId);
        if (verifyIfMovieIsFavorite(movie)) {
            $("#bookmark-button i").removeClass("bi-bookmark-fill")
            $("#bookmark-button i").addClass("bi-bookmark")
            favoriteMovie.remove(movie)
        }
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
        if (verifyIfMovieIsFavorite(movie)) {
            $("#bookmark-button i").addClass("bi-bookmark-fill")
        } else {
            $("#bookmark-button i").addClass("bi-bookmark")
        }

        $("#img-id").attr('src', movie.poster_path)
    }

    function verifyIfMovieIsFavorite(movie) {
        for (let i = 0; i < favoriteMovie.length; i++) {
            if (movie.id === favoriteMovie[i].id) {
                return true
            }
        }
        return false;
    }

    e

    function getMovieById(movieId) {
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === parseInt(movieId)) {
                return movies[i]
            }
        }
    }

    $(".dropdown-item").click(displayMoviesByGenre);

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
}


//
//avem nevoie de o functie care sa actualizeze informatiile din modal fiecarui film
//trebuie sa transmitem informatiile despre film din butonul care deschide modalul


