import { FC, MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import styles from './header.module.scss';

const Header: FC = () => {
  const router = useRouter();

  const handleGoHome: MouseEventHandler<HTMLButtonElement> = () => {
    const { pathname } = router;

    if (pathname === '/') return;

    router.push('/');
  };

  return (
    <header className={styles['header-container']}>
      <button type="button" onClick={handleGoHome}>
        <img src="/logo.svg" alt="logo" />
      </button>
    </header>
  );
};

export { Header };
