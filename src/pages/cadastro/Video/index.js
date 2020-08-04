import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categories';

const initialValues ={
  titulo: '',
  categoria: '',
  imagem: '',
  cor: '#b6b101',
  link_extra: {
    text: '',
    url: '',
  },
}

export default function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);

  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm(initialValues);

  React.useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    });
  }, []);

  const handleSubmitForm = (event) => {
    console.log('submit executado');

    event.preventDefault();

    const categoriaEscolhida = categorias.find((categoria) => {
      return categoria.titulo === values.categoria;
    });

    videosRepository
      .create({
        titulo: values.titulo,
        url: values.url,
        categoriaId: categoriaEscolhida.id,
      })
      .then(() => {
        history.push('/');
      });
  };

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={handleSubmitForm}>
        <FormField
          label="Título"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Link do vídeo"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Link da imagem do vídeo"
          name="url"
          value={values.imagem}
          onChange={handleChange}
        />

        <FormField
          label="Escolha uma categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <FormField
            label="Descrição"
            type="textarea"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />

        <Button type="submit">Cadastrar</Button>
      </form>

      <br />
      <br />

      <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
    </PageDefault>
  );
}
