import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoginForm from "../components/auth/LoginForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  if (status === 'loading') {
    return <LoadingSpinner/>
  }
  
  return (
    <LoginForm/>
  )
}

export default Login;
