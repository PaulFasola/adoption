import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Receipt, Storefront, Menu, Favorite } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Path } from '../../router-paths';
import { useRecoilState } from 'recoil';
import { headerState } from '../../atoms';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

export const Header: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const [header] = useRecoilState(headerState);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const _navigateTo = (localPath: string) => (): void => {
    history.push(localPath);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {header.title}
          </Typography>
          {header.sideComponent}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      >
        <List className={classes.list}>
          <ListItem button onClick={_navigateTo(Path.Index)}>
            <ListItemIcon>
              <Storefront />
            </ListItemIcon>
            <ListItemText primary={'Store'} />
          </ListItem>
          <ListItem button onClick={_navigateTo(Path.OrderHistory)}>
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary={'Order history'} />
          </ListItem>
          <ListItem button onClick={_navigateTo(Path.Donate)}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary={'Donate'} />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
};
