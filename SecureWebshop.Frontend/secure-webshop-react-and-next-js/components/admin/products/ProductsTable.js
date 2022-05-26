import LinkText from "../../ui/LinkText";
import Table from "../../ui/table/Table";

const tableHeaders = [ "Produktnavn", "Status", "" ];

export default function ProductsTable({ products }) {

  const productRows = products.map(product => 
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.status}</td>
      <td>
        <LinkText href={`/admin/produkter/${product.id}`} text="Redigér"/>
        <LinkText href={`/admin/produkter/${product.id}`} text={product.status === 'Aktiv' ? 'Deaktivér' : 'Aktivér'}/>
      </td>
    </tr>
  );
  
  return (
    <Table tableHeaders={tableHeaders}>
      {productRows}
    </Table>
  );
}