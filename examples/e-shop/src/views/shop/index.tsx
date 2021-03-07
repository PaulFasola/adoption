import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { basketState, headerState } from '../../atoms';
import { ArticleCard } from '../../components/articleCard';
import { IArticle } from '../../components/articleCard/IArticle';
import { Basket } from '../../components/basket';

import 'regenerator-runtime/runtime';

const LOCALSTORAGE_ARTICLES = 'doggos';

export const Shop: React.FC = () => {
  const [_, setHeader] = useRecoilState(headerState);

  const [basket] = useRecoilState<IArticle[]>(basketState);
  const [dogPortaits, setDogPortraits] = useState<{ loading: boolean; portraits: IArticle[] }>({
    loading: true,
    portraits: [],
  });

  useEffect(() => {
    setHeader({
      title: 'Da great doggo portraits shop',
      sideComponent: <Basket />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket]);

  useEffect(() => {
    const fetchRemote = async (): Promise<IArticle[]> => {
      try {
        const result = await axios('https://dog.ceo/api/breeds/image/random/30');

        if (Array.isArray(result.data.message)) {
          const portraits: IArticle[] = [];
          const images = result.data.message as string[];

          images?.forEach((imageUrl) => {
            const urlParts = imageUrl.split('/');
            const label = urlParts[urlParts.length - 2];

            portraits.push({
              image: imageUrl,
              label: `${label[0].toUpperCase()}${label.slice(1)}`,
              price: Math.floor(Math.random() * 600) + 1,
            });
          });

          // let's not stress that API too much.
          localStorage.setItem(LOCALSTORAGE_ARTICLES, JSON.stringify(portraits));

          return portraits;
        }
      } catch (ex) {
        console.error(ex);
      }

      return [];
    };

    const fetchData = async () => {
      const LSItem = localStorage.getItem(LOCALSTORAGE_ARTICLES);
      let portraits: IArticle[] = [];

      if (LSItem) {
        const localPortraits = JSON.parse(LSItem) as IArticle[];
        if (Array.isArray(localPortraits) && localPortraits.length > 0) {
          portraits = localPortraits;
        }
      }

      if (portraits.length === 0) {
        portraits = await fetchRemote();
      }

      setDogPortraits({ loading: false, portraits });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading, portraits } = dogPortaits;

  if (loading) {
    return <div>Loading our stock...</div>;
  }

  if (portraits.length === 0) {
    return <h2>Snap, no more dog portait to sell :(</h2>;
  }

  return (
    <>
      <Grid container direction='row' justify='center' alignItems='center' spacing={2}>
        {portraits.map((data, i) => (
          <Grid key={i} container item xl={3} xs={5}>
            <ArticleCard {...data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
