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

function getMovie(movie) {

  fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${key}`)
    .then(res => res.json())
    .then(data => {

      if (data.Response === "True") {

        movieTitle.innerHTML = `${data.Title}`;

        const poster = data.Poster !== "N/A"
          ? data.Poster
          : "https://via.placeholder.com/300x450?text=No+Image";

        movieDetails.innerHTML = `
        <img class="movieImage" src="${poster}" alt="movie poster"/>

        <div class="movieExtraDetails">

        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
        <p><strong>Released:</strong> ${data.Released}</p>
        <p><strong>Runtime:</strong> ${data.Runtime}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Language:</strong> ${data.Language}</p>
        <p><strong>Box Office:</strong> ${data.BoxOffice}</p>

        </div>
        `;

      } else {

        movieTitle.innerHTML = "Movie Not Found";
        movieDetails.innerHTML = "";

      }

    })
    .catch(err => {
      console.log("API Error:", err);
    });

}