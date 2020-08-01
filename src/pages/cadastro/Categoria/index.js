import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categories';
import Table from '../../../components/Table';

const INITIAL_VALUES = {
  titulo: '',
  cor: '#b6b101',
  descricao: '',
};

export default function CadastroCategoria() {
  const { handleChange, values, clearForm } = useForm(INITIAL_VALUES);

  const [categorias, setCategorias] = useState([]);

  React.useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    categoriasRepository
      .create({
        titulo: values.titulo,
        cor: values.cor,
        descricao: values.descricao,
      })
      .then(() => {
        setCategorias([...categorias, values]);
        clearForm();
      });
  };

  return (
    <PageDefault>
      <div style={{ padding: 50, paddingTop: 0 }}>
        <h1>Cadastro de Categoria</h1>

        <form onSubmit={handleSubmit}>
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

          <Button>Salvar</Button>
        </form>

        {categorias.length === 0 && (
          <div>
            <span>Carregando...</span>
          </div>
        )}

        {categorias.length > 0 && (
          <Table
            data={categorias.map(({ id, titulo, descricao }) => {
              return { id, titulo, descricao };
            })}
            head={{
              titulo: 'Nome',
              edit: 'Editar',
              remove: 'Remover',
            }}
          />
        )}

        <Link to="/">Ir para home</Link>
      </div>
    </PageDefault>
  );
}
