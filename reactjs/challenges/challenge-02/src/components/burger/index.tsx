import { useMovies } from 'contexts/movies'
import style from './style.module.scss'

export function Burger() {
	const { isOpen, toggleSidebar } = useMovies()

	return (
		<button
			className={style.burger}
			onClick={toggleSidebar}
		>
		  <div
			  className={`${style.bar} ${isOpen ? style.active : ''}`}
			>.</div>
		</button>
	)
}
