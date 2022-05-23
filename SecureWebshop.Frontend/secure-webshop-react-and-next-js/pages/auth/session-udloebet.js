import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Card from "/components/ui/containers/Card";
import LinkText from "/components/ui/LinkText";

export default function SessionExpiredPage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      signOut();
    }
  }, [session]);
  
  return (
    <Card>
      <h1>Din login session er udløbet.</h1>
      <LinkText href="/auth/login" text="Log ind på ny?"/>
    </Card>
  );
}