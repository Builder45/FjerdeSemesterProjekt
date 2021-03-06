import axios from "axios";

const errorBadTypeFormat = "Der er sket en fejl med formattet.";
const errorBadEmailFormat = "Skriv en gyldig email.";
const errorBadPhoneNumberFormat = "Skriv et gyldigt telefon nr.";
const errorBadPostalCodeFormat = "Skriv et gyldigt post nr.";
const errorWeakPassword = "Dit password opfylder ikke kravene.";
const errorPasswordMismatch = "Indholdet i begge felter skal matche.";
const errorEmpty = "Feltet skal udfyldes.";

const errorTooShort = minLength => `Du skal mindst bruge ${minLength} tegn.`;
const errorTooLong = maxLength => `Du kan maks bruge ${maxLength} tegn.`;
const errorNumberOutOfRange = (min, max) => `Tallet skal ligge mellem ${min} og ${max}.`;

const inputIsNumber = input => (typeof input === 'number');
const inputIsString = input => (typeof input === 'string');
const inputIsEmpty = input => input.trim().length === 0;
const inputIsTooShort = (input, minLength = 1) => input.trim().length < minLength;
const inputIsTooLong = (input, maxLength = 50) => input.trim().length > maxLength;

export function validateText(text, minLength, maxLength) {
  if (!inputIsString(text)) {
    return { isValid: false, error: errorBadTypeFormat };
  }

  if (inputIsEmpty(text)) {
    return { isValid: false, error: errorEmpty};
  }

  if (inputIsTooShort(text, minLength)) {
    return { isValid: false, error: errorTooShort(minLength) };
  }
  if (inputIsTooLong(text, maxLength)) {
    return { isValid: false, error: errorTooLong(maxLength) };
  }
  return { isValid: true };
}

export function validateNumber(number, min, max) {
  if (isNaN(+number)) {
    return { isValid: false, error: errorBadTypeFormat };
  }

  if (number < min || number > max) {
    return { isValid: false, error: errorNumberOutOfRange(min, max) };
  }

  return { isValid: true };
}

export function validatePhoneNumber(phoneNumber) {
  if (inputIsTooShort(phoneNumber, 8) || inputIsTooLong(phoneNumber, 8)) {
    return { isValid: false, error: errorBadPhoneNumberFormat };
  }

  if (isNaN(+phoneNumber)) {
    return { isValid: false, error: errorBadPhoneNumberFormat };
  }

  return { isValid: true };
}

// Emailkrav:
// 5-100 tegn lang
// Skal have et @ og mindst ??t tegn p?? hver side af det
export function validateEmail(email) {
  if (inputIsEmpty(email)) {
    return { isValid: false, error: errorEmpty};
  }

  const dividedEmail = email.split('@');

  if (dividedEmail.length !== 2) {
    return { isValid: false, error: errorBadEmailFormat };
  }

  if (dividedEmail[0].length === 0 || dividedEmail[1] < 2) {
    return { isValid: false, error: errorBadEmailFormat };
  }

  return { isValid: true };
}

export function validatePassword(password) {
  const output = validateText(password, 10, 100);
  if (!output.isValid) {
    return output;
  }

  const charCounter = {
    lower: 0,
    upper: 0,
    digit: 0,
    special: 0
  };

  for (const char of password) {
    if (/[a-z??????]/.test(char)) {
      charCounter.lower++;
    }
    else if (/[A-Z??????]/.test(char)) {
      charCounter.upper++;
    }
    else if (/^\d$/.test(char)) {
      charCounter.digit++;
    }
    else {
      charCounter.special++;
    }
  }

  let passwordStrength = 0;
  passwordStrength += charCounter.lower ? 1 : 0;
  passwordStrength += charCounter.upper ? 1 : 0;
  passwordStrength += charCounter.digit ? 1 : 0;
  passwordStrength += charCounter.special ? 1 : 0;

  if (passwordStrength > 2) {
    return { isValid: true };
  }

  return { isValid: false, error: errorWeakPassword };
}

export function validatePasswordMatch(password, repeatPassword) {
  if (password === repeatPassword) {
    return { isValid: true };
  }

  return { isValid: false, error: errorPasswordMismatch };
}

export function validatePostalCode(postalCode) {
  
  if (!postalCode || postalCode === NaN) {
    return { isValid: false, error: errorBadPostalCodeFormat };
  }

  const postalCodeNumber = Number(postalCode);
  if (postalCodeNumber < 1 || postalCodeNumber > 9999) {
    return { isValid: false, error: errorBadPostalCodeFormat };
  }

  return { isValid: true};
}