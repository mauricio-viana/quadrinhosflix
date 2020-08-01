import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categories';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://techflix-backend.herokuapp.com/categorias';

    fetch(URL).then(async (respostaDoServidor) => {
      const resposta = await respostaDoServidor.json();
      setCategorias(resposta);
    });
  }, []);

  return (
    <PageDefault>
      <div style={{ padding: 50, paddingTop: 0 }}>
        <h1>
          Cadastro de Categoria:
          {values.titulo}
        </h1>

        <form
          onSubmit={function handleSubmit(infosDoEvento) {
            infosDoEvento.preventDefault();

            categoriasRepository.createCategory(values);

            setCategorias([...categorias, values]);

            clearForm();
          }}
        >
          <FormField
            label="Nome da Categoria"
            type="text"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
          />

          <FormField
            label="Descrição"
            type="textarea"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />

          <FormField
            label="Cor"
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
          />

          <Button>Cadastrar</Button>
        </form>

        {categorias.length === 0 && (
          <div>
            <span>Carregando...</span>
          </div>
        )}

        <ul>
          {categorias.map((categoria) => (
            <li key={`${categoria}${categoria.id}`}>{categoria.titulo}</li>
          ))}
        </ul>

        <Link to="/">Ir para home</Link>
      </div>
    </PageDefault>
  );
}

export default CadastroCategoria;
