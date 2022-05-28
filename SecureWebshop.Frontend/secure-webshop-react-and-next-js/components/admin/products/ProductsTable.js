import LinkText from "../../ui/text/LinkText";
import Table from "../../ui/table/Table";

import classes from './ProductsTable.module.css';
import EventText from "../../ui/text/EventText";
import { toggleProduct } from "../../../utils/api-service";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store";
import { useRouter } from "next/router";

const tableHeaders = [ "Produktnavn", "Status", "" ];

export default function ProductsTable({ products }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const productActivationHandler = id => {
    toggleProduct(id).then(response => {
      if (response) {
        router.reload();
      }
      else {
        dispatch(uiActions.setNotification("Fejl: der blev ikke foretaget ændringer."));
      }
    });
  };

  const productRows = products.map(product => 
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.status}</td>
      <td className={classes.links}>
        <LinkText href={`/admin/produkter/${product.id}`} text="Redigér"/>
        <EventText onClick={productActivationHandler.bind(null, product.id)} text={product.status === 'Aktiv' ? 'Deaktivér' : 'Aktivér'}/>
      </td>
    </tr>
  );
  
  return (
    <Table tableHeaders={tableHeaders}>
      {productRows}
    </Table>
  );
}