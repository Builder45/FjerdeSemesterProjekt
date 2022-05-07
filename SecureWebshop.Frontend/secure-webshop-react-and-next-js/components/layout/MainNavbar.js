import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import Logo from './Logo';
import classes from './MainNavbar.module.css';

function MainNavbar() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const logoutHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  let authElement = <li><Link href='/login'>Login</Link></li>;
  if (isAuthenticated) {
    authElement = (
      <>
        <li><Link href='/user/profile'>Profile</Link></li>
        <li><a onClick={logoutHandler}>Logout</a></li>
      </>
    );
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          {authElement}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavbar;