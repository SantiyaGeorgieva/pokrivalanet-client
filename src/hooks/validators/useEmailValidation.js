import { useState } from 'react';

const useEmailValidation = () => {
  const [emailValue, setEmailValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(value);

    setIsValidEmail(isValid);
    setEmailValue(value);
  };

  return {
    emailValue,
    isValidEmail,
    validateEmail,
  };
};
export default useEmailValidation;
