import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { createUser } from "../../utils/api-service";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SignupFormEmail from "../../components/auth/signup/SignupFormEmail";
import SignupFormInformation from "../../components/auth/signup/SignupFormInformation";
import SignupFormPassword from "../../components/auth/signup/SignupFormPassword";
import SignupFormError from "../../components/auth/signup/SignupFormError";
import SignupFormComplete from "../../components/auth/signup/SignupFormComplete";

const defaultSignupData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: ""
};

export default function UserSignupPage() {
  const [ signupData, setSignupData ] = useState(defaultSignupData);
  const [ inputIsValid, setInputIsValid ] = useState(false);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ signupStep, setSignupStep ] = useState(1);

  const { isAuthenticated, authStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(signupData);
    if (inputIsValid && !isProcessing) {
      setIsProcessing(true);
      createUser(signupData)
        .then(response => {
          setSignupStep(4);
        })
        .catch(error => {
          setSignupStep(5);
        });
    }
  }, [signupData, inputIsValid]);

  if (isAuthenticated) {
    router.push('/bruger');
  }

  if (authStatus === 'loading' || (isProcessing && signupStep === 3)) {
    return <LoadingSpinner/>
  }

  const nextStepHandler = () => {
    setSignupStep(prevState => prevState + 1);
  };

  const previousStepHandler = () => {
    setSignupStep(prevState => prevState - 1);
  };

  const signupDataChangeHandler = newData => {
    setSignupData(prevData => {
      return {
        ...prevData,
        ...newData
      };
    });
  };

  const createUserHandler = () => {
    setSignupData(prevData => {
      return {
        ...prevData,
        phoneNumber: +prevData.phoneNumber
      };
    });
    setInputIsValid(true);
  };
  
  switch (signupStep) {
    case 1:
      return <SignupFormEmail onClickContinue={nextStepHandler} signupData={signupData} onDataChange={signupDataChangeHandler}/>;
    case 2: 
      return <SignupFormInformation onClickContinue={nextStepHandler} onClickBack={previousStepHandler} signupData={signupData} onDataChange={signupDataChangeHandler}/>;
    case 3:
      return <SignupFormPassword onClickBack={previousStepHandler} onDataChange={signupDataChangeHandler} onClickFinish={createUserHandler}/>;
    case 4:
      return <SignupFormComplete />;
    case 5:
      return <SignupFormError />;
    default:
      return <SignupFormEmail />;
  }
}