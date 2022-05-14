import { useRef } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';

import CartButton from './CartButton';
import Logo from './Logo';
import classes from './MainNavbar.module.css';
import SearchIcon from '../../assets/icons/search_light.png';
import Image from 'next/image';

export default function MainNavbar({ onToggleCart }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchRef = useRef();

  const logoutHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  const searchHandler = event => {
    event.preventDefault();
    router.push('/?search=' + searchRef.current.value);
  }

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
      <form className={classes.search} onSubmit={searchHandler}>
        <input type="text" ref={searchRef}></input>
        <button>
          <Image src={SearchIcon} width={"30px"} height={"30px"}/>
        </button>
      </form>
      <nav>
        <ul>
          {authElement}
          <li><CartButton onToggle={onToggleCart}/></li>
        </ul>
      </nav>
    </header>
  );
}