import Link from 'next/link';
import Logo from './Logo';
import classes from './MainNavbar.module.css';

function MainNavbar() {
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/login'>Login</Link>
          </li>
          <li>
            <Link href='/site2'>Site2</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavbar;