import {
	useContext, useState, useEffect, createContext, ReactNode
} from 'react'
import { useQuery } from 'react-query'

import { api } from 'services/api'
import {
	GenreResponseProps,
	IMovie,
	IContextProps,
	ProviderProps,
	IAxiosResponse
} from '@types';

const staleTime = 24 * 60 * 60 * 1000
const MoviesContext = createContext({} as IContextProps)

function MoviesProvider({ children }: ProviderProps) {
	const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

	const [isOpen, setIsOpen] = useState(false)

	function toggleSidebar() {
		setIsOpen(prev => !prev)
	}

	const { data: movies } = useQuery('movies', async () => {
		const { data } = await api.get('movies')
			.catch(err => alert(err)) as IAxiosResponse<IMovie[]>

		return data.movies;
	}, { staleTime })

	const { data: genres } = useQuery('genres', async () => {
		const { data } = await api.get('genres')
			.catch(err => alert(err))  as IAxiosResponse<GenreResponseProps[]>

		return data.genres;
	}, { staleTime })

	function handleClickButton(id: number) {
		const isCurrentSelectedGenre = selectedGenreId === id

		if (isCurrentSelectedGenre) {
			setSelectedGenre({} as GenreResponseProps)
			setSelectedGenreId(0)
		} else {
			const genre = genres?.find(genre => genre.id === id) as GenreResponseProps
			setSelectedGenre(genre)
			setSelectedGenreId(id)
		}

		toggleSidebar()
	}

	useEffect(() => {
		handleClickButton(0)
	}, [])

	return (
		<MoviesContext.Provider value={{
			genres,
			movies,
			selectedGenre,
			selectedGenreId,
			handleClickButton,
			isOpen,
			toggleSidebar
		}}>
			{children}
		</MoviesContext.Provider>
	)
}

function useMovies() {
	return useContext(MoviesContext);
}

export { MoviesProvider, useMovies }
