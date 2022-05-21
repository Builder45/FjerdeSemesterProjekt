import Card from "../../components/ui/containers/Card";

export default function UnauthorizedPage() {
  return (
    <Card>
      <h1>Du har ikke adgang til at tilgå denne side.</h1>
      <p>Du kan forsøge at logge ind med en anden konto</p>
    </Card>
  );
}