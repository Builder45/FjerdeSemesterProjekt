import LinkText from "../../ui/text/LinkText";
import SignupForm from "./SignupForm";

export default function SignupFormError() {
  return (
    <SignupForm title="Fejl med oprettelse" description="Der opstod en ukendt fejl..">
      <LinkText href="/auth/ny-bruger" text="Prøv igen"/>
    </SignupForm>
  );
}