interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface	Rating {
	Source: string;
	Value: string;
}
  
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Rating[];
  Runtime: string;
}


type IMovie = MovieProps & {
  Year: string;
  Rated: string;
  Released: string;
	Genre: string;
  Director: string;
  Writer: string;
	Actors: string;
	Plot: string;
  Language: string
  Country: string;
  Awards: string;
  Production: string;
}

interface SideBarProps {
  genres: GenreResponseProps[];
	handleClick: (id:number) => void;
  selected: number;
}

interface ContentProps {
  movies: MovieProps[];
  title: string;
}

export interface IContextProps {
  genres: GenreResponseProps[] | undefined;
  movies: IMovie[] | undefined;
  selectedGenre: GenreResponseProps;
  selectedGenreId: number | null;
  handleClickButton: (id: number) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface ProviderProps {
	children: ReactNode;
}

export type IAxiosResponse<T> = {
	data: {
		[key:string]: T
	};
}

export {
	GenreResponseProps,
	MovieProps,
	IMovie,
	SideBarProps,
	ContentProps
};
