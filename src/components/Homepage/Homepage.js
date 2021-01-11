import s from './homepage.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moviesApi from '../../services/moviesApi.js';
import Loading from '../Loader/Loader.js';

export default function Homepage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesApi.fetchTrendingMovies().then(response => setTrendMovies(response));
  }, []);

  return (
    <>
      {trendMovies.length < 1 && <Loading />}
      <h1 className={s.mainTitle}>Trending today</h1>
      <ul className={s.list}>
        {trendMovies.map(({ title, id, poster_path }) => (
          <li key={id} className={s.item}>
            <Link to={`/movies/${id}`}>
              <img
                src={`${POSTER_URL}${poster_path}`}
                alt=""
                width="300"
                height="450"
              />
              <h2 className={s.colorCards}>{title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
