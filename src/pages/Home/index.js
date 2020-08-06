import React, { useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import categoriesRepository from '../../repositories/categories';
import PageDefault from '../../components/PageDefault';

export default function Home() {
  const [initialData, setInitialData] = useState([]);

  React.useEffect(() => {
    categoriesRepository
      .getAllWithVideos()
      .then((data) => {
        setInitialData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PageDefault paddingAll={0}>
      {initialData.length === 0 && <div>Loading...</div>}

      {initialData.map((categories, indice) => {
        if (indice === 0) {
          return (
            <div key={categories.id}>
              <BannerMain
                videoTitle={initialData[0].videos[0].titulo}
                url={initialData[0].videos[0].url}
                videoDescription={initialData[0].videos[0].descricao}
              />
              <Carousel ignoreFirstVideo category={initialData[0]} />
            </div>
          );
        }

        return <Carousel key={categories.id} category={categories} />;
      })}
    </PageDefault>
  );
}
