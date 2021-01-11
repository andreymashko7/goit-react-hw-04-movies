import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import NotfoundView from './Views/NotFoundView.js';
import AppBar from './components/AppBar';
import Container from './components/Container';
import Loading from './components/Loader';
import './App.css';

const Homepage = lazy(() =>
  import('./components/Homepage' /*webpackChunkName: "homePage" */),
);
const MoviesPage = lazy(() =>
  import('./components/MoviesPage' /*webpackChunkName: "moviesPage" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage' /*webpackChunkName: "moviesDetailsPage" */
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotfoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
