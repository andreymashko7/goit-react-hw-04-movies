import s from './Cast.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moviesApi from '../../services/moviesApi';
import noImg from '../../img/noImg.jpg';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesApi.fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <>
      {cast && (
        <>
          <ul className={s.container}>
            {cast.map(({ id, name, profile_path }) => (
              <li key={id} className={s.item}>
                <img
                  src={profile_path ? POSTER_URL + profile_path : noImg}
                  alt={name}
                  width="100"
                  height="150"
                />
                <span className={s.item}>{name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
