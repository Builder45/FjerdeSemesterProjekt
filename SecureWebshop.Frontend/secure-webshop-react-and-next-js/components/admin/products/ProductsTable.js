import LinkText from "../../ui/LinkText";
import classes from './ProductsTable.module.css';

export default function ProductsTable({ products }) {

  const productRows = products.map(product => 
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.status}</td>
      <td><LinkText href={`/admin/produkter/${product.id}`} text="Redigér"/></td>
    </tr>
  );
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Produktnavn</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
  );
}