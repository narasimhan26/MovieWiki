function getMovieDetails(){
    var id = window.location.search.split('?id=')[1];
    var url = 'https://www.omdbapi.com/?apikey=79f0b98a&&i='+id; // geting details of the movie using Movie id
    fetch(url)
    .then(function(response) {
     return response.json();
    })
    .then(function(myJson) {
    console.log(myJson);
    displayDetails(myJson);
    });
}

function goBack(){
    window.history.back();
}

function displayDetails(myJson){

    //displaying details to htmls using innerHTML

    document.getElementById('movie-img').src = myJson['Poster'];
    document.getElementById('imdb').innerText = "IMDb: "+ myJson['imdbRating'];
    document.getElementById('movie-title').innerHTML = myJson["Title"];
    document.getElementById('movie-year').innerHTML = myJson['Year']+" | "+myJson['Runtime']+" | "+myJson['Released'];
    document.getElementById('plot').innerHTML = myJson["Plot"];
    document.getElementById('directors').innerHTML = "<b>Director(s): </b>"+myJson['Director'];
    document.getElementById('writers').innerHTML = "<b>Writer(s): </b>" + myJson['Writer'];
    let genres = myJson['Genre'].split(", ");
    let htmls = [];
    genres.forEach(element => {
        var html = "<span class='genre'>"+element+"</span>";
        htmls.push(html);
    });
    //console.log(htmls);
    document.getElementById("genre-list").innerHTML = htmls.join("\n");
    htmls = [];
    let casts = myJson['Actors'].split(", ");
    casts.forEach(element =>{
        var html = "<li>"+element+"</li>";
        htmls.push(html);
    });
    document.getElementById("casts").innerHTML = htmls.join("\n");
}
