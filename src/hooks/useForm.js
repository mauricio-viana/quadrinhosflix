import { useState } from 'react';

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function setValue(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValue(name, value);
  }

  function clearForm() {
    setValues(initialValues);
  }

  return { values, handleChange, clearForm };
}
