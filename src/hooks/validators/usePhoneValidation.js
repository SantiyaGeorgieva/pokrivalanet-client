import { useState } from 'react';

const usePhoneValidation = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const validatePhoneNumber = (value) => {
    const phoneRegex = /[+0-9]{1,4}[ ][0-9]{9}/g
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
