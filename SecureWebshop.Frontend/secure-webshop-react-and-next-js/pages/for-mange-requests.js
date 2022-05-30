import Card from "../components/ui/containers/Card";

export default function TooManyRequestsPage() {
  return (
    <Card>
      <h1>Du sender mange anmodninger til serveren</h1>
      <p>Vent et par minutter og prøv igen!</p>
    </Card>
  );
}