import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

import { FaGithub } from 'react-icons/fa'
import style from './style.module.scss'

export const AuthButton = () => {
	const { data: session } = useSession()
	const [user, setUser] = useState<any>({})
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	function handleAuth() {
		if(isLoggedIn) {
			signOut()
		} else {
			signIn('github')
		}
	}

	useEffect(() => {
		if (session) {
			setIsLoggedIn(true)
			setUser(session?.user)
		} else {
			setIsLoggedIn(false)
			const empty = {}
			setUser(empty)
		}
	}, [session])

	return (
 		<button className={style["btn-login"]} onClick={handleAuth}>
			<FaGithub color={isLoggedIn ? '#04d361' : '#eba417'} />
			<span>{ isLoggedIn ? user?.login : 'Sign in' }</span>
    </button>
	)
}
