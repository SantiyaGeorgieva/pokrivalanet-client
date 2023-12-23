import { useState } from 'react';

const useNamesValidation = () => {
  const [namesValue, setNamesValue] = useState('');
  const [isValidNames, setIsValidNames] = useState(false);

  const validateNames = (value) => {
    const nameRegex = /^(?!.*'[A-Za-z]+')\s*[A-Z]+(?:['-]?[a-z]+)*(?:\s*[a-z]*)*$/gi;
    const isValid = nameRegex.test(value);

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
