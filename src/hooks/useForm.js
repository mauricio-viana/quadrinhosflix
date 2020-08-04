import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function setValue(nameField, value) {
    setValues({ ...values, [nameField]: value });
  }

  function handleChange(event) {
    setValue(
      event.target.getAttribute('name'),
      event.target.value
    );
  }

  function clearForm() {
    setValues(initialValues);
  }

  function editForm(editionValues) {
    setValues(editionValues);
  }

  return {
    values,
    handleChange,
    clearForm,
    editForm,
  };
}

export default useForm;
