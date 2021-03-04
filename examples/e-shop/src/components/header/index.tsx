import React from "react"
import { AppBar, Toolbar, IconButton, Typography, SwipeableDrawer, makeStyles, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { Receipt, Storefront, Menu } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import { Path } from "../../router-paths";

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
	const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

	const toggleDrawer = (isOpen: boolean) => {
		console.log({ isOpen });
		setIsDrawerOpen(isOpen);
	};

	const _navigateTo = (localPath: string) => (): void => {
		history.push(localPath);
		setIsDrawerOpen(false);
	}

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)}>
						<Menu />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Transactions
         			 </Typography>
				</Toolbar>
			</AppBar>
			<SwipeableDrawer
				anchor="left"
				open={isDrawerOpen}
				onClose={() => toggleDrawer(false)}
				onOpen={() => toggleDrawer(true)}
			>
				<List className={classes.list}>
					<ListItem button onClick={_navigateTo(Path.Index)}>
						<ListItemIcon><Storefront /></ListItemIcon>
						<ListItemText primary={"Store"} />
					</ListItem>
					<ListItem button onClick={_navigateTo(Path.OrderHistory)}>
						<ListItemIcon><Receipt /></ListItemIcon>
						<ListItemText primary={"Order history"} />
					</ListItem>
				</List>
			</SwipeableDrawer>
		</>
	)
}