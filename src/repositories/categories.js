import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/categorias`;

function getAll() {
  return fetch(`${URL_CATEGORIES}`).then(async (respostaDoServidor) => {
    if (respostaDoServidor.ok) {
      const resposta = await respostaDoServidor.json();
      return resposta;
    }

    throw new Error('Não foi possível pegar os dados :(');
  });
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`).then(
    async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Não foi possível pegar os dados :(');
    }
  );
}

function create(data) {
  return fetch(URL_CATEGORIES, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (responseServer) => {
    if (responseServer.ok) {
      const response = await responseServer.json();
      return response;
    }

    throw new Error('Não foi possível cadastrar os dados');
  });
}

function remove(id) {
  return fetch(`${URL_CATEGORIES}/${id}`, {
    method: 'DELETE',
  })
}

function update(data){
  return fetch(`${URL_CATEGORIES}/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (responseServer) => {
    if (responseServer.ok) {
      const response = await responseServer.json();
      return response;
    }

    throw new Error('Não foi possível atualizar os dados');
  });
}

export default { getAllWithVideos, getAll, create, remove, update };
