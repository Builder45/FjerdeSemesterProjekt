import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SignupFormEmail from "../../components/auth/signup/SignupFormEmail";
import SignupFormInformation from "../../components/auth/signup/SignupFormInformation";
import SignupFormPassword from "../../components/auth/signup/SignupFormPassword";

const defaultSignupData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: ""
};

function UserSignupPage() {
  const [ signupData, setSignupData ] = useState(defaultSignupData);
  const [ signupStep, setSignupStep ] = useState(1);
  const { isAuthenticated, authStatus } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/user');
  }
  if (authStatus === 'loading') {
    return <LoadingSpinner/>
  }

  const nextStepHandler = () => {
    setSignupStep(prevState => prevState + 1);
  }

  const previousStepHandler = () => {
    setSignupStep(prevState => prevState - 1);
  }

  const signupDataChangeHandler = newData => {
    setSignupData(prevData => {
      return {
        ...prevData,
        ...newData
      }
    });
  }

  console.log(signupData);
  
  switch (signupStep) {
    case 1:
      return <SignupFormEmail onClickContinue={nextStepHandler} signupData={signupData} onDataChange={signupDataChangeHandler}/>
    case 2: 
      return <SignupFormInformation onClickContinue={nextStepHandler} onClickBack={previousStepHandler} signupData={signupData} onDataChange={signupDataChangeHandler}/>
    case 3:
      return <SignupFormPassword onClickBack={previousStepHandler} signupData={signupData} onDataChange={signupDataChangeHandler}/>
    default:
      return <SignupFormEmail />
  }
}

export default UserSignupPage;
