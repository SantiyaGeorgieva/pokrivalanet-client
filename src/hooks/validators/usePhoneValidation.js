import { useState } from 'react';

const usePhoneValidation = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\+?[0-9-() ]{6,}$|^\+?[0-9-() ]{6,}$/gi;
    setIsValidPhoneNumber(phoneRegex.test(value));
    setPhoneNumber(value);
  };

  return {
    phoneNumber,
    isValidPhoneNumber,
    validatePhoneNumber,
  };
};

export default usePhoneValidation;
