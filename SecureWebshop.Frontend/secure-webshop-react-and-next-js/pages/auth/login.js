import { useRouter } from "next/router";
import LoginForm from "../../components/auth/LoginForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { isAuthenticated, authStatus } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/');
  }

  if (authStatus === 'loading') {
    return <LoadingSpinner/>
  }
  
  return (
    <LoginForm/>
  )
}
