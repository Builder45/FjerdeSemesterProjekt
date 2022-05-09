import { useState } from "react";

export default function useForm(initialState = {}, validations = []) {
  const {isValid: initialIsValid, errors: initialErrors} = validate(validations, initialState);
  const [input, setInput] = useState(initialState);
  const [isValid, setIsValid] = useState(initialIsValid);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});

  const changeHandler = event => {
    const newInput = { ...input, [event.target.id]: event.target.value };
    const { isValid, errors } = validate(validations, newInput);
    setInput(newInput);
    setIsValid(isValid);
    setErrors(errors);
  }

  const blurHandler = event => {
    setTouched(prevState => {
      return {
        ...prevState, [event.target.id]: true
      };
    });
  };

  return { input, changeHandler, blurHandler, isValid, errors, touched };
}

function validate(validations, input) {
  let errors = {};
  for (const validation of validations) {
    const { isValid, error } = validation.method(input);
    if (!isValid) {
      errors = {
        ...errors,
        [validation.id]: error
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}