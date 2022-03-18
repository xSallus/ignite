import { useMemo } from 'react'

import { MovieCard } from "components/movie_card";
import { Burger } from 'components/burger'

import { useMovies } from 'contexts/movies'

import style from './style.module.scss';

export function Content() {
	const { selectedGenre, selectedGenreId, movies } = useMovies()

	const filter = useMemo(()=>{
		setTimeout(()=>{}, 2000)
		
		if (!!selectedGenreId) {
		return movies?.filter(mv => mv?.Genre_id === selectedGenreId)
		}

		return movies
	},[selectedGenreId])

  return (
    <div className={style.container}>
        <header className={style.header}>
          <span className={style.category}>
					  Categoria:<span> {selectedGenre?.title ?? 'All'}</span>
					</span>
					<Burger />
        </header>

        <main className={style.main}>
          <div className={style.moviesList}>
            {filter ? filter?.map(movie => (
              <MovieCard
								key ={movie.imdbID}
								title={movie.Title}
								poster={movie.Poster}
								runtime={movie.Runtime}
								rating={movie.Ratings[0].Value}
								imdb={movie.imdbID}
							/>
            )) :  movies?.map(movie => (
              <MovieCard
								key ={movie.imdbID}
								title={movie.Title}
								poster={movie.Poster}
								runtime={movie.Runtime}
								rating={movie.Ratings[0].Value}
								imdb={movie.imdbID}
							/>
            ))}
          </div>
        </main>
      </div>
  );
}
