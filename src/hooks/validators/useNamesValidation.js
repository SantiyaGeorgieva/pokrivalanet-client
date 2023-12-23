import { useState } from 'react';

const useNamesValidation = () => {
  const [namesValue, setNamesValue] = useState('');
  const [isValidNames, setIsValidNames] = useState(false);

  const validateNames = (value) => {
    const nameRegex = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/gi;
    const isValid = nameRegex.test(value);
    // console.log('isValid', isValid);

    setIsValidNames(isValid);
    setNamesValue(value);
  };

  return {
    namesValue,
    isValidNames,
    validateNames,
  };
};
export default useNamesValidation;
