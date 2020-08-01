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
  descricao: '',
  cor: '',
};

export default function CadastroCategoria() {
  const { handleChange, values, clearForm } = useForm(INITIAL_VALUES);

  const [categorias, setCategorias] = useState([]);

  React.useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
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
        {console.log(categorias)}
        {categorias.length > 0 && (
          <Table
            data={categorias.map(({ id, titulo, link_extra }) => {
              const { text } = link_extra;
              return { id, titulo, text };
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
