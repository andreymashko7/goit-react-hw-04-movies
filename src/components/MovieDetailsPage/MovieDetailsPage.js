import s from './MovieDetailsPage.module.css';
import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  useParams,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import moviesApi from '../../services/moviesApi';
import Loading from '../Loader';

const Cast = lazy(() => import('../Cast' /*webpackChunkName:"cast" */));
const Reviews = lazy(() =>
  import('../Reviews' /*webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isVisibleCast, setIsVisibleCast] = useState(false);
  const [isVisibleReviews, setIsVisibleReviews] = useState(false);

  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const POSTER_URL = 'https://image.tmdb.org/t/p/w500';
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    moviesApi.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const makeVisibleCast = () => {
    if (isVisibleReviews === true) {
      setIsVisibleReviews(false);
    }
    setIsVisibleCast(true);
  };

  const makeVisibleReviews = () => {
    if (isVisibleCast === true) {
      setIsVisibleCast(false);
    }

    setIsVisibleReviews(true);
  };

  const goBack = () => {
    history.push(location?.state?.from ?? '/movies');
  };

  return (
    <>
      <button type="button" onClick={goBack} className={s.Button}>
        Go back
      </button>

      {movie && (
        <>
          <div className={s.movieCard}>
            <img src={`${POSTER_URL}${movie.backdrop_path}`} alt="" />
            <div className={s.info}>
              <h2>{movie.title}</h2>
              <span>User Score : {movie.vote_average * 10}%</span>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <hr />
          <span>Additional information</span>
          <ul className={s.container}>
            <li className={s.item}>
              <NavLink
                className={s.link}
                activeClassName={s.activeLink}
                to={`${url}/cast`}
                onClick={makeVisibleCast}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.item}>
              <NavLink
                to={`${url}/reviews`}
                className={s.link}
                activeClassName={s.activeLink}
                onClick={makeVisibleReviews}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Suspense fallback={<Loading />}>
            <Route path={`${path}/:cast`}>
              {movie && isVisibleCast && <Cast />}
            </Route>

            <Route path={`${path}/:reviews`}>
              {movie && isVisibleReviews && <Reviews />}
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
