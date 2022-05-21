import LinkText from "../../ui/LinkText";
import SignupForm from "./SignupForm";

export default function SignupFormComplete() {
  return (
    <SignupForm title="Bruger oprettet!" description="">
      <LinkText href="/auth/login" text="Tryk her for at logge ind"/>
    </SignupForm>
  );
}