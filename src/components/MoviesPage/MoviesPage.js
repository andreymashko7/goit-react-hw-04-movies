import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import moviesApi from '../../services/moviesApi.js';
import noImg from '../../img/noImg.jpg';
import s from './moviesPage.module.css';

export default function MoviePage() {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');
  const [request, setRequest] = useState('');

  const location = useLocation();
  const { url } = useRouteMatch();
  const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

  const handleInputChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return toast.info('Please enter something');
    }

    setRequest(query);
    setQuery('');
  };

  useEffect(() => {
    moviesApi.fetchMoviesByQuery(request).then(setMovies);
  }, [request]);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search films"
          value={query}
          className={s.SearchFormInput}
          onChange={handleInputChange}
        />
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
      {movies && (
        <ul className={s.list}>
          {movies.map(({ title, id, poster_path }) => (
            <li key={id} className={s.item}>
              <NavLink
                to={{
                  pathname: `${url}/${id}`,
                  state: { location },
                }}
              >
                <img
                  src={poster_path ? POSTER_URL + poster_path : noImg}
                  alt=""
                  width="300"
                  height="450"
                />
                <h2 className={s.colorCards}>{title}</h2>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
