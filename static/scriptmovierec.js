// Sample movie data
const movies = [
    { id: 1, title: "Inception", rating:4.5 },
    { id: 2, title: "Interstellar", rating:4.5 },
    { id: 3, title: "The Matrix", rating:4.5 },
    { id: 4, title: "Avatar", rating:4.5},
    { id: 5, title: "Titanic", rating:4.5},
    { id: 6, title: "Gladiator", rating:4.5},
    { id: 7, title: "Joker", rating:4.5 },
    { id: 8, title: "The Lion King", rating:4.5}
  ];
  
  const movieContainer = document.getElementById('movie-container');
  const popup = document.getElementById('popup');
  const popupMovies = document.getElementById('popup-movies');
  const startBtn = document.getElementById('startBtn');
  const searchInput = document.getElementById('searchBar');
  const submitBtn = document.getElementById('submitBtn');
  const rateBtn = document.getElementById('enterBtn');
  const selectedMovies = new Set(); // Store selected movie IDs
  
  // Show Pop-up with movie selection
  startBtn.addEventListener('click', () => {
    const userId = document.getElementById('userId').value;
    if (!userId) {
      alert('Please enter a valid User ID.');
      return;
    }
    popup.style.display = 'flex';
    loadPopupMovies();
  });

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
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.rating}</p>
        <input style=" width:50px; align:left" type="number" class="rating-input" placeholder="Enter Rating" min="1" max="5" data-id="${movie.id}" /> <button id= "rateBtn">Rate</button>
      `;
      movieContainer.appendChild(card);
    });
  }
  
  // Initially display all movies
  document.addEventListener('DOMContentLoaded', () => {
    searchMovie(); // Call searchMovie without any input to load all movies
  });
  
  // Load Movies into Pop-up
  function loadPopupMovies() {
    popupMovies.innerHTML = '';
    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('movie-card');
      card.innerHTML = `
        <h3>${movie.title}</h3>
      `;
      card.onclick = () => toggleSelection(movie.id, card);
      popupMovies.appendChild(card);
    });
  }
  
  // Toggle selection
  function toggleSelection(movieId, card) {
    if (selectedMovies.has(movieId)) {
      selectedMovies.delete(movieId);
      card.classList.remove('selected');
    } else if (selectedMovies.size < 3) {
      selectedMovies.add(movieId);
      card.classList.add('selected');
    } else {
      alert('You can only select 3 movies!');
    }
  }
  
  // Submit selected movies
  submitBtn.addEventListener('click', () => {
    if (selectedMovies.size < 3) {
      alert('Please select exactly 3 movies.');
      return;
    }
    popup.style.display = 'none'; // Hide pop-up

    // Fetch Recommendations based on selections (API placeholder)
    fetchRecommendations(Array.from(selectedMovies));
  });
  
  // Display Recommendations
  function fetchRecommendations(selectedIds) {
    console.log('Selected Movies:', selectedIds); // Logs selected movies for backend use
    // Placeholder: Replace this with actual API call
    const recommendedMovies = movies.filter(movie => !selectedIds.includes(movie.id));
    displayMovies(recommendedMovies);
  }
  
  // Display movies on main page
  function displayMovies(data) {
    movieContainer.innerHTML = '';
    data.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('movie-card');
      card.innerHTML = `
        <h3>${movie.title}</h3>
        <h3>Rating: ${movie.rating}</h3>
        <input style=" width:50px; align:left" type="number" class="rating-input" placeholder="Enter Rating" min="1" max="5" data-id="${movie.id}" /> <button id= "rateBtn">Rate</button>
      `;
      movieContainer.appendChild(card);
    });
  }

    // Load all movies on page load
    document.addEventListener('DOMContentLoaded', () => searchMovie());
  
  // Load placeholder recommendations initially
  window.onload = () => displayMovies(movies);
  
