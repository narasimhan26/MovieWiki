var movies = [];
var page = 1;
function myFunction() {
    //document.getElementById("display").innerHTML = "";
    var searchValue = document.getElementById("search").value;
    searchValue = searchValue.trim().replace(' ','+');
    
    //getting search results from API 

    var url = 'https://www.omdbapi.com/?apikey=79f0b98a&&s='+searchValue+'&page='+page;
    //var url = "./sample.json";
    console.log(url);
    fetch(url)
        .then(function(response) {
        return response.json();
        })
        .then(function(myJson) {
        
        // appending serach results into html

        var search = myJson['Search'];
        if(search!=null){
            movies = [...movies,...search];
            var htmls = [];
            search.forEach((json, index) => {
            var html = "<div class='card' onclick=displayMovie('"+json['imdbID']+"')><img src=" + json['Poster']+" id='poster' style='width:100%'><div class='container'><h4><b>"+json['Title']+"</b></h4><p id='year'>"+json['Year']+"</p></div></div>";
            htmls.push(html);
            document.getElementById("display").innerHTML = htmls.join("\n");
            });

            // pagination

            if(movies.length!=myJson.totalResults){
                page++;
                document.getElementById("loadMore").classList.remove("invisible"); 
            }else{
                page++;
                document.getElementById("loadMore").classList.add("invisible"); 
            }
        }
        //console.log(htmls.length);        
        });
}

//moving to next page using movie id

function displayMovie(id){
    window.location.href = "movie.html?id="+id;
    console.log(history.forward());
}