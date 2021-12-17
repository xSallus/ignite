interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
  
  interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
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

  export { GenreResponseProps, MovieProps, SideBarProps, ContentProps };