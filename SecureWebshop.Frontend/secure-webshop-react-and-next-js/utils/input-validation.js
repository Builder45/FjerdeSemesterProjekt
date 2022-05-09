const errorBadTypeFormat = "Der er sket en fejl med formattet.";
const errorBadEmailFormat = "Skriv en gyldig email.";
const errorBadPhoneNumberFormat = "Skriv et gyldigt telefon nr.";
const errorWeakPassword = "Kodeordet du har valgt er ikke stærkt nok.";
const errorEmpty = "Feltet skal udfyldes!"

const errorTooShort = minLength => `Du skal mindst bruge ${minLength} tegn.`
const errorTooLong = maxLength => `Du kan maks bruge ${maxLength} tegn.`

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
// Skal have et @ og mindst ét tegn på hver side af det
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
  const output = validateText(password, 8, 100);
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
    if (/[a-zæøå]/.test(char)) {
      charCounter.lower++;
    }
    else if (/[A-ZÆØÅ]/.test(char)) {
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
  passwordStrength += charCounter.lower ? 0 : 1;
  passwordStrength += charCounter.upper ? 0 : 1;
  passwordStrength += charCounter.digit ? 0 : 1;
  passwordStrength += charCounter.special ? 0 : 1;

  if (passwordStrength > 2) {
    return { isValid: true };
  }
  else {
    return { isValid: false, error: errorWeakPassword }
  }
}