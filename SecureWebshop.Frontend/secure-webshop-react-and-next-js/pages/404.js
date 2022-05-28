import Card from "/components/ui/containers/Card";
import LinkText from "/components/ui/text/LinkText";

export default function Error404Page() {
  return (
    <Card>
      <h1>Vi kunne desværre ikke finde siden du leder efter!</h1>
      <LinkText href="/" text="Gå til forsiden?" />
    </Card>
  );
}