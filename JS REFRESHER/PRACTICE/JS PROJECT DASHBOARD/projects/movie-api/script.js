let searchInput = document.querySelector("#movieSearch");
let BtnSearch = document.querySelector(".BtnSearch");

const movieTitle = document.querySelector(".movieTitle");
const movieDetails = document.querySelector(".movieDetails");

let key = "2b65b40a";

BtnSearch.addEventListener("click", () => {
  let movieName = searchInput.value.trim();

  if (movieName !== "") {
    getMovie(movieName);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    BtnSearch.click();
  }
});

function safe(value){
  return value !== "N/A" ? value : "Not Available";
}

async function getMovie(movie){

  movieTitle.innerHTML = "Loading...";
  movieDetails.innerHTML = "";

  try{

    const res = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${key}`
    );

    const data = await res.json();

    if(data.Response === "True"){

      const poster = data.Poster !== "N/A"
      ? data.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

      movieTitle.innerHTML = data.Title;

      movieDetails.innerHTML = `
      <img class="movieImage" src="${poster}" alt="movie poster"/>

      <div class="movieExtraDetails">

      <p><strong>Genre:</strong> ${safe(data.Genre)}</p>
      <p><strong>Actors:</strong> ${safe(data.Actors)}</p>
      <p><strong>Plot:</strong> ${safe(data.Plot)}</p>
      <p><strong>IMDB Rating:</strong> ${safe(data.imdbRating)}</p>
      <p><strong>Released:</strong> ${safe(data.Released)}</p>
      <p><strong>Runtime:</strong> ${safe(data.Runtime)}</p>
      <p><strong>Director:</strong> ${safe(data.Director)}</p>
      <p><strong>Language:</strong> ${safe(data.Language)}</p>
      <p><strong>Box Office:</strong> ${safe(data.BoxOffice)}</p>

      </div>
      `;

      searchInput.value = "";

    }else{

      movieTitle.innerHTML = "Movie Not Found";
      movieDetails.innerHTML = "";

    }

  }catch(error){

    movieTitle.innerHTML = "Something went wrong";
    movieDetails.innerHTML = "";
    console.error(error);

  }

}