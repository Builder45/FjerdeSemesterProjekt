import Card from "../ui/containers/Card";
import LinkText from "../ui/text/LinkText";

import classes from './AdminMenu.module.css';

export default function AdminMenu() {
  return (
    <Card className={classes.adminMenu}>
      <h2>Admin Menu</h2>
      <LinkText href='/admin/produkter' text='Redigér produkter'/>
      <LinkText href='/admin/produkter/opret-nyt' text='Opret nyt produkt'/>
    </Card>
  );
}