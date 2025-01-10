  // Search movie
  function searchMovies(query)
   const results = movieData.filter(movie => movie.tolowercase().include(query.toLowerCase()))
  
  // Display search results
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = '';

  //No search results
  if (results.length === 0) {
    else {
      results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.textContent = movie;
        movieContainer.appendChild(movieElement)
      });
    }}

    searchBtn.addEventListener('click', function (){
      const query = searchInput.value;
      searchMovies()
    });
    