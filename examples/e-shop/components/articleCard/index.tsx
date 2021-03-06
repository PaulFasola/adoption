import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  makeStyles,
} from '@material-ui/core';
import { IArticle } from './IArticle';
import { basketState } from '../../atoms';
import { constants } from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 450,
    width: 800,
  },
  media: {
    height: 300,
  },
  actionButtons: {
    flexDirection: 'row-reverse',
  },
}));

export const ArticleCard: React.FC<IArticle> = ({ loading, label, price, image }) => {
  const [basket, setBasket] = useRecoilState<IArticle[]>(basketState);
  const classes = useStyles();

  const _handleBasketAdd = (): void => {
    // Note: this is not a good way to feed the basket
    //       but hopefully, this is a demo \o/.
    setBasket([
      ...basket,
      {
        label,
        price,
        image,
      },
    ]);
  };

  if (loading) {
    return (
      <Card className={classes.root}>
        <CardActionArea disabled>
          <CardMedia className={classes.media}>
            <Skeleton variant='rect' width={300} height={300} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              <Skeleton variant='text' width={150} height={45} />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actionButtons}>
          <Skeleton variant='text' width={180} height={45} />
        </CardActions>
      </Card>
    );
  }

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        <CardMedia className={classes.media} image={image} title='This is a doggo portait' />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actionButtons}>
        <Button size='small' color='primary' onClick={_handleBasketAdd}>
          Add to basket ({price} {constants.coin})
        </Button>
      </CardActions>
    </Card>
  );
};
