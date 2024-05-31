async function searchMovies() {
    const apiKey = '8eb71febd8mshe7e5aeafef375b0p135d2fjsneacbd9a32dc0';
    const searchInput = document.getElementById('searchInput').value.trim();

    if (searchInput === '') {
        alert('Please enter a movie title.');
        return;
    }

    const url = `https://moviedatabase8.p.rapidapi.com/Search/${searchInput}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'moviedatabase8.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data && data.length > 0) {
            const movie = data[0];
            const releaseDate = new Date(movie.release_date);
            const formattedReleaseDate = releaseDate.toLocaleDateString();
            const movieInfo = document.getElementById('movieInfo');

            // Displaying movie information
            movieInfo.innerHTML = `
            <h2>${movie.title}</h2>
            <p>Release Date: ${formattedReleaseDate}</p>
            <p>Overview: ${movie.overview}</p>
       
        `;
        } else {
            const movieInfo = document.getElementById('movieInfo');
            movieInfo.innerHTML = '<p>No movie found.</p>';
        }
    } catch (error) {
        console.error(error);
        const movieInfo = document.getElementById('movieInfo');
        movieInfo.innerHTML = '<p>Error fetching data.</p>';
    }
}
