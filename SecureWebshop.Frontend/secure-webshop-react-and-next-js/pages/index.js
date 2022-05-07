import { useSession } from "next-auth/react";

function Home() {
  const { data: session } = useSession();
  console.log(session?.error);
  return (
    <div>
      {session &&
      <><p>{session.accExpiry}</p>
      <p>{session.dateNow}</p></>
      }
    </div>
  )
}

export default Home;
