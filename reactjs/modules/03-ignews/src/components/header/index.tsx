import { useState } from 'react'
import { AuthButton } from 'components/login-button'
import style from './style.module.scss'

interface IHeaderProps { title: string }

export const Header = ({ title }: IHeaderProps) => {
	const [isHidden, setIsHidden] = useState(true)

	function toggle() {
		setIsHidden(prev => !prev)
	}

	return (
		<header className={style.header}>
    <h3>{ title }</h3>
    <div className={style.burger} onClick={toggle}>
      <div />
    </div>
    <nav className={`${style.nav} ${isHidden ? style.hide : ''}`}>
      <ul>
				<a href="/">Home</a>
				<a href="/posts">Posts</a>
				<a href="/about">About</a>
      </ul>
      <AuthButton />
      <button className={style.btnClose} onClick={toggle}>.</button>
    </nav>
	 </header>
	)
}
