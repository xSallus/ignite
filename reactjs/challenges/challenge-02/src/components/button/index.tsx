import { Icon } from 'components/Icon';

import style from './style.module.scss';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  selected: boolean;
}

export function Button({ iconName, title, selected, ...rest }: ButtonProps) {
  return (
    <button
		  type="button"
			className={`${style.button} ${selected ? style.selected : ''}`}
			{...rest}
		>
      <Icon name={iconName} color={selected ? '#FAE800' : '#FBFBFB'} />
      {title}
    </button>
  );
}
