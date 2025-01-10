const movieContainer = document.getElementById('movie-container');
const popup = document.getElementById('popup');
const popupMovies = document.getElementById('popup-movies');
const startBtn = document.getElementById('startBtn');
const searchInput = document.getElementById('searchBar');
const submitBtn = document.getElementById('submitBtn');
const selectedMovies = new Set(); // Store selected movie IDs

let movies = []; // Initialize an empty movies array
// Fetch movie data from the server
async function fetchMovies() {
  try {
    const response = await fetch('/recommendedmovies');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    movies = data; // Set the fetched data to the movies array
    displayMovies(movies); // Display the movies after fetching them
  } catch (error) {
    console.error('Error fetching movie list:', error);
  }
}

// Search functionality
function searchMovie() {
  const input = document.getElementById('searchbar').value.toLowerCase();
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = '';

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(input)
  );

  filteredMovies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
        <h3>${movie.title}</h3>`;
    movieContainer.appendChild(card);
  });
}

// Initially display all movies
document.addEventListener('DOMContentLoaded', () => {
  searchMovie(); // Call searchMovie without any input to load all movies
});


// Display movies on main page
function displayMovies(data) {
  movieContainer.innerHTML = '';
  data.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
        <h3>${movie.title}</h3>`;
    movieContainer.appendChild(card);
  });
}

// Load all movies on page load
document.addEventListener('DOMContentLoaded', () => searchMovie());

window.onload = () => fetchMovies();
