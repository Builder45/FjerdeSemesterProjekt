import axios from "axios";
import { signIn, signOut } from "next-auth/react";

function Login() {
  const loginHandler = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email: 'test@mail.com', 
      password: 'Password123' 
    });

    console.log(result);
  };
  const logoutHandler = () => {
    signOut();
  };
  return (
    <div>
      <button onClick={loginHandler}>Login</button>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Login;
