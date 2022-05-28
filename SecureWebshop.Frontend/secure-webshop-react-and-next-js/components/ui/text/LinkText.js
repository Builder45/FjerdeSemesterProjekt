import Link from "next/link";
import classes from './LinkText.module.css';

export default function LinkText({ href = '/', text = "text prop missing!" }) {
  return (
    <Link href={href} passHref>
      <a className={classes.link}>{text}</a>
    </Link>
  );
}