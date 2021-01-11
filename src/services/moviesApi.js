import axios from 'axios';

const API_KEY = '17d25d7529f46edf5ccecd0f8718d8fc';
const BASE_URL = 'https://api.themoviedb.org/3/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-Us',
};

const fetchTrendingMovies = async () => {
  try {
    const config = {
      url: `/trending/movie/week`,
    };

    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error('No response');
  }
};

async function fetchMovieDetails(movie_id) {
  try {
    const config = {
      url: `movie/${movie_id}`,
    };

    const { data } = await axios(config, movie_id);
    return data;
  } catch (error) {
    new Error('No response');
  }
}

async function fetchMovieCast(movie_id) {
  try {
    const config = {
      url: `movie/${movie_id}/credits`,
    };

    const { data } = await axios(config, movie_id);
    return data.cast;
  } catch (error) {
    new Error('No response');
  }
}

async function fetchMovieReviews(movie_id) {
  try {
    const config = {
      url: `movie/${movie_id}/reviews`,
    };

    const { data } = await axios(config, movie_id);
    return data.results;
  } catch (error) {
    new Error('No response');
  }
}

async function fetchMoviesByQuery(query) {
  try {
    const config = {
      url: `search/movie`,
      params: {
        query,
      },
    };

    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error('No response');
  }
}

const api = {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
  fetchMoviesByQuery,
};

export default api;
