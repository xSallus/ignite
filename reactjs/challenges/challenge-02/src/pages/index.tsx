import { NextPage } from 'next';

import { SideBar } from 'components/sidebar';
import { Content } from 'components/content';

import { useMovies } from 'contexts/movies'

const App: NextPage =  () => {
	const {
		genres, selectedGenreId, handleClickButton
	} = useMovies()

  return (
    <div className="home">
      <SideBar
        genres={genres ?? []}
        handleClick={handleClickButton}
        selected={selectedGenreId ?? 0}
      />
      <Content />
    </div>
  )
}

export default App;
