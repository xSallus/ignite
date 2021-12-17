import { Button } from './Button';
import { SideBarProps } from "../@types";

import '../styles/sidebar.scss';

export function SideBar({genres, handleClick, selected}: SideBarProps) {
  // Complete aqui

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
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