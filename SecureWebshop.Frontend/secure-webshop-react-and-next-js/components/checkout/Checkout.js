import Card from "../ui/containers/Card";

export default function Checkout({ userData }) {
  console.log(userData);
  const { firstName, lastName, addresses } = userData;

  const addressOptions = addresses.map(address => 
    <option key={address.title} value={address.title}>
      {address.street} {address.postalCode}
    </option>
  );

  const selectElement = <select>{addressOptions}</select>;

  return (
    <Card>
      <p>{firstName} {lastName}</p>

      <form>
        {selectElement}
      </form>
    </Card>
  );
}