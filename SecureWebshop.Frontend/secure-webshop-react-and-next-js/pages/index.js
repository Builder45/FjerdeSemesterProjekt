import { useSession } from "next-auth/react";

function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      
    </div>
  )
}

export default Home;
