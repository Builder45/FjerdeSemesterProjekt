import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

function SessionExpiredPage() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      signOut();
    }
  }, [session]);
  return (
    <h1>Your login session has expired. Please login again!</h1>
  );
}

export default SessionExpiredPage;