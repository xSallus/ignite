import { useMemo, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useMovies } from 'contexts/movies'
import { IMovie } from '@types'
import style from 'styles/movie-detailed.module.scss'

const Movie: NextPage = () => {
	const router = useRouter()
	const { movies } = useMovies()
	const [id, setId] = useState('')

	const movie = useMemo(() => {
		const item:IMovie = movies?.find((mv:any) => mv?.imdbID === id) as IMovie
    console.log(item)
		return item;
	}, [id])

	useEffect(() => {
		const idFromReq = `${router.query?.id}` as string;
    setId(idFromReq)
	}, [router])

	useEffect(() => {
	  const timeout = setTimeout(()=>{
			if (!movie?.Title) {
				router.push('/')
			}
		}, 2000)

		return ()=>clearTimeout(timeout)
	}, [movie])

	return (
		<>
			<header className={style.header}>
				<p>{movie?.Title}</p>
				<button onClick={()=>router.push('/')}>
					<img
						src="https://raw.githubusercontent.com/xSallus/igflix/main/public/go_back.svg"
						alt="Go back arrow"
					/>
				</button>
			</header>
			<main className={style.main}>
			  <div>
					<span>{movie?.Year}</span>
					<span>{movie?.Production}</span>
				</div>
        <p className={style.plot}>{movie?.Plot}</p>
				<div className={style.ratings}>
				  {movie?.Ratings.map((rating) => (
					 <div key={`${rating.Source.split(' ').join('_')}`}>
					   <p>{rating.Source}</p>
						 <p>{rating.Value}</p>
					 </div>
					))}
				</div>
				<div className={style.staff}>
					<div className={style.meta}>
						<p>
							<span>Actors:</span>
							{movie?.Actors}
						</p>
						<p>
							<span>Director:</span>
							{movie?.Director}
						</p>
						<p>
							<span>Writers:</span>
							{movie?.Writer}
						</p>
					</div>
					<img
						src={movie?.Poster}
						alt={`${movie?.Title.split(' ').join('_')}_Poster`}
					/>
				</div>
      </main>
		</>
	)
}

export default Movie
