import { Star, Clock } from 'react-feather'
import { useRouter } from 'next/router'

import style from './style.module.scss'

interface MovieCardProps {
  title: string;
  poster: string;
  rating: string;
  runtime: string;
  imdb: string;
}

export function MovieCard(props: MovieCardProps) {
  const router = useRouter()

  function redirect() {
    router.push(`/movie?id=${props.imdb}`)
  }

  return (
    <div
      className={style.movieCard}
      onClick={redirect}
    >
      <img
        src={props.poster}
        alt={`${props.title.split(' ').join('_')}`}
      />

      <div className={style.movieInfo}>
        <span>{props.title}</span>
        <div className={style.meta}>
          <div>
            <Star /> {props.rating}
          </div>

          <div>
            <Clock /> {props.runtime}
          </div>
        </div>
      </div>
    </div>
  )
}
