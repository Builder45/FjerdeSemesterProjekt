import Card from "../ui/containers/Card";

export default function CheckoutStatus({ success = false }) {
  return (
    <Card>
      {success
        ? <h2>Ordren blev gennemført!</h2>
        : <h2>Ordren blev ikke gennemført..</h2>
      }
    </Card>
  );
}