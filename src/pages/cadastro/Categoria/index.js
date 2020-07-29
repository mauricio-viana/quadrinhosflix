import React, { useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';

const INITIAL_VALUES = {
  name: '',
  description: '',
  color: '#000000',
};

export default function CadastroCategoria() {
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCategories([...categories, values]);
    setValues(INITIAL_VALUES);
  };

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.name}</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Nome da Categoria"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChangeInput}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="description"
          value={values.description}
          onChange={handleChangeInput}
        />

        <FormField
          label="Cor"
          type="color"
          name="color"
          value={values.color}
          onChange={handleChangeInput}
        />
        <button>Cadastrar</button>
      </form>

      <ul>
        {categories.map((category, index) => {
          return <li key={index}>{category.name}</li>;
        })}
      </ul>
      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}
