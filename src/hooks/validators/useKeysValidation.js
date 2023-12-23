const useKeysValidation = () => {
  const handleKeysInput = (e) => {
    if (e.which === 107 || e.which === 109 || e.which === 187 || e.which === 189 || e.which === 69) {
      e.preventDefault();
    }
  };

  return { handleKeysInput }
}

export default useKeysValidation;