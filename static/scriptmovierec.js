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
    const response = await fetch('/movielist');
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

let user = []; //Initialize empty array
async function fetchUser() {
  try {
    const response = await fetch('/user');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    user = data; // Set the fetched data to the movies array
  } catch (error) {
    console.error('Error fetching movie list:', error);
  }
}
fetchUser();

// Show Pop-up with movie selection
let userId = null;
startBtn.addEventListener('click', () => {
  userId = document.getElementById('userId').value;
  if (!userId) {
    alert('Please enter a valid User ID.');
    return;
  }

  console.log("Hello")

  //Check if user exists
  if (userExists(userId)) {
    console.log("In")
    // Send a html form
    async function postUserData(userId) {
      try {
        response = await fetch("/selectedmovies_existing", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userId),
        });

        const responseData = await response.json();

        if (response.ok && responseData.redirect_url) {
          // If a redirect URL is included in the response, redirect the user
          window.location.href = responseData.redirect_url;
        } else {
          console.log('Error: No redirect URL received');
        }
      } catch (e) {
        console.error(e);
      }
    }
    postUserData(userId);

  } else {
    //Prompt user to choose favourite movie
    popup.style.display = 'flex';
    loadPopupMovies();
  }

});

function userExists(userId) {
  return user.some(user => user.id == userId);
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
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.rating}</p>
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
  } else {
    selectedMovies.add(movieId);
    card.classList.add('selected');
  }
}

// Submit selected movies
submitBtn.addEventListener('click', () => {
  if (selectedMovies.size < 3) {
    alert('Please select at least 3 movies.');
    return;
  }
  popup.style.display = 'none'; // Hide pop-up

  // Send a html form
  const postData = async () => {
    try {
      ratedMovie = [];
      counter = 0;
      let timestamp = Math.floor(Date.now() / 1000);
      selectedMovies.forEach(movieId => {
        ratedMovie.push({
          userId: parseInt(userId),
          movieId: movieId,
          rating: 5.0,
          timestamp: timestamp
        });
        counter += 1;
      });

      response = await fetch("/selectedmovies", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratedMovie),
      });

      const responseData = await response.json();

      if (response.ok && responseData.redirect_url) {
        // If a redirect URL is included in the response, redirect the user
        window.location.href = responseData.redirect_url;
      } else {
        console.log('Error: No redirect URL received');
      }
    } catch (e) {
      console.error(e);
    }
  }

  postData();
});

// Display movies on main page
function displayMovies(data) {
  movieContainer.innerHTML = '';
  data.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
        <h3>${movie.title}</h3>
        <h3>Rating: ${movie.rating}</h3> `;
    movieContainer.appendChild(card);
  });
}

// Load all movies on page load
document.addEventListener('DOMContentLoaded', () => searchMovie());

window.onload = () => fetchMovies();
