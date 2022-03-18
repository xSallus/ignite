import { Button } from 'components/button';
import { SideBarProps } from "@types";
import { useMovies } from 'contexts/movies';

import style from './style.module.scss';

export function SideBar({genres, handleClick, selected}: SideBarProps) {
  const { isOpen } = useMovies()

  return (
    <nav
			className={`${style.sidebar} ${isOpen ? '' : style.hidden}`}
		>
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres?.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClick(genre.id)}
              selected={selected === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}
