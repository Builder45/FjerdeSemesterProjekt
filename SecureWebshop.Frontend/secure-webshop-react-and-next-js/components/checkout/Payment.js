import { useRouter } from "next/router";
import { confirmOrder } from "../../utils/api-service";
import Button from "../ui/Button";
import Card from "../ui/containers/Card";

export default function Payment({ orderId }) {

  const router = useRouter();

  const paymentHandler = event => {
    confirmOrder(orderId).then(response => {
      if (response) {
        router.replace('/checkout/ordre-succes');
      }
      else {
        router.replace('/checkout/ordre-fejl');
      }
    })
  }

  return (
    <Card>
      <Button onClick={paymentHandler}>Simulér betaling</Button>
    </Card>
  );
}