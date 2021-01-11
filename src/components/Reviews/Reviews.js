import s from './Reviews.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moviesApi from '../../services/moviesApi';

export default function Reviews() {
  const [reviews, SetReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    moviesApi.fetchMovieReviews(movieId).then(SetReviews);
  }, [movieId]);

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map((item, index) => (
            <li key={index}>
              <p className={s.title}>{item.author}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <span>Sorry we don't have reviews for this film</span>
      )}
    </>
  );
}
