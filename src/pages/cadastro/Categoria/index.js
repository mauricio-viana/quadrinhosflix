import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import '../../../components/Button/ButtonStyle.css';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categories';
import Table from '../../../components/Table';

const initialValues = {
  titulo: '',
  cor: '#FF8C00',
  descricao: '',
};

const initialEdit = {isEdit: false, id: 0};

export default function CadastroCategoria() {
  const { handleChange, values, clearForm, editForm } = useForm(initialValues);
  const [ edit, setEdit] = useState(initialEdit);
  const [ categorias, setCategorias] = useState([]);

  React.useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { isEdit, id } = edit;
      const { titulo, cor, descricao } = values;

      const categoria = isEdit 
      ? await categoriasRepository
      .update({ id, titulo, cor, descricao }) 
      : await categoriasRepository
      .create({ titulo, cor, descricao });

      const atualizarLista = isEdit
       ? categorias.filter((data) => data.id !== Number(id))
       : Object.assign([], categorias);

       setCategorias([...atualizarLista, categoria]);
       clearForm();
       setEdit(initialEdit);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    clearForm();
    setEdit(initialEdit);
  };

  const handleEdit =(event)=>{
    const {id} = event.target;
    const category = categorias.find((data)=> data.id === parseInt(id))
    
    setEdit({ isEdit: true, id})
    editForm(category)
  }

  const handleDelete = async(event)=>{
    const {id} = event.target;
     try {
        await categoriasRepository.remove(id);

        const atualizaCategorias = categorias.filter((data) => data.id !== parseInt(id))
        setCategorias(atualizaCategorias)
     } catch (error) {
        console.log(error)
     }
  }

  return (
    <PageDefault>
      <div style={{ padding: 50, paddingTop: 0 }}>
        <h1>{ edit.isEdit ? 'Alteração de Cadastro' : 'Cadastro de Categoria' }</h1>

        <form>
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

          <Button className="btn-save" onClick={handleSubmit}>
            Salvar
          </Button>
          <Button className="btn-clear" onClick={handleClear}>
            Limpar
          </Button>
        </form>

        {categorias.length === 0 && (
          <div>
            <span>Carregando...</span>
          </div>
        )}

        {categorias.length > 0 && (
          <Table
            data={categorias.map(({ id, titulo, descricao }) => {
              return {
                id,
                titulo,
                descricao,
                edit: <Link to="#!" id={id} className="btn-edit" onClick={handleEdit}>Editar</Link> ,
                remove: <Link to="#!" id={id} className={`btn-delete ${edit.isEdit && 'disabled'}`}  onClick={handleDelete}>Remover</Link>,
              };
            })}
            head={{
              titulo: 'Nome',
              descricao: 'Descrição',
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