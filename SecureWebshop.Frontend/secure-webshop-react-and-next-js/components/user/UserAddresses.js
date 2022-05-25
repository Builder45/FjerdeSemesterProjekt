import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store";
import { removeUserAddress } from "../../utils/api-service";
import Card from "../ui/containers/Card";
import Table from "../ui/table/Table";

import classes from './UserAddresses.module.css';

const tableHeaders = [ "Titel", "Vej", "Postnr", "" ];

export default function UserAddresses({ addresses = [] }) {
  const dispatch = useDispatch();
  const router = useRouter();

  if (addresses.length === 0) return null;

  const deleteAddressHandler = title => {
    removeUserAddress(title).then(response => {
      if (!response) {
        dispatch(uiActions.setNotification("Fejl: adressen blev ikke slettet."));
      }
      else {
        router.reload();
      }
    });
  };

  const addressRows = addresses.map(address => 
    <tr key={address.title}>
      <td>{address.title}</td>
      <td>{address.street}</td>
      <td>{address.postalCode}</td>
      <td><p className={classes.deleteAddress} onClick={deleteAddressHandler.bind(null, address.title)}>Fjern</p></td>
    </tr>
  );

  return (
    <Card className={classes.userAddresses}>
      <h2>Mine adresser</h2>
      <Table tableHeaders={tableHeaders}>
        {addressRows}
      </Table>
    </Card>
  );
}