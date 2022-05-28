import { useRouter } from "next/router";
import { createDummyProduct } from "../../../utils/api-service";
import Button from "../../ui/Button";
import Card from "../../ui/containers/Card";

export default function NewProduct() {
  const router = useRouter();

  const productCreationHandler = () => {
    createDummyProduct().then(response => {
      if (response) {
        router.replace('/admin/produkter/' + response.data);
      }
    })
  }

  return (
    <Card>
      <Button onClick={productCreationHandler}>Opret nyt produkt</Button>
    </Card>
  );
}