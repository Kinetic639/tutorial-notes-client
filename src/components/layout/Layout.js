import React from 'react';
import useStyles from './styles';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useHistory} from 'react-router-dom';
import {AddCircleOutline} from '@mui/icons-material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import {Navbar} from "./NavBar/Navbar";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {motion} from 'framer-motion/dist/framer-motion'

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const lessonsMenuItems = [
    {
        desc: 'Home',
        icon: <HomeOutlinedIcon color="primary"/>,
        path: '/',
    }, {
        desc: 'Lessons',
        icon: <SchoolOutlinedIcon color="primary"/>,
        path: '/lessons',
    },
    {
        desc: 'Create Lesson',
        icon: <AddCircleOutline color="primary"/>,
        path: '/create',
    },
];

const accountMenuItems = [
    {
        desc: 'Profile',
        icon: <PermIdentityIcon color="primary"/>,
        path: '/profile',
    },
    {
        desc: 'Settings',
        icon: <SettingsOutlinedIcon color="primary"/>,
        path: '/settings',
    },
];

const notesMenuItems = [
    {
        desc: 'Notes',
        icon: <ArticleOutlinedIcon color="primary"/>,
        path: '/notes',
    },
];

const animations = {
    initial: {opacity: 0, y: 50},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -50},
}

export const Layout = ({children}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);

    };

    return (
        <Box sx={{display: 'flex'}} className={classes.main}>
            <CssBaseline/>
            <Navbar handleDrawerOpen={handleDrawerOpen} open={open}/>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon/>
                        ) : (
                            <ChevronLeftIcon/>
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {lessonsMenuItems.map(({desc, icon, path}) => (
                        <ListItemButton
                            key={desc}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => history.push(path)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={desc} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    ))}
                </List>
                <Divider/>
                <List>
                    {notesMenuItems.map(({desc, icon, path}) => (
                        <ListItemButton
                            key={desc}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => history.push(path)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={desc} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    ))}
                </List>
                <Divider/>
                <List>
                    {accountMenuItems.map(({desc, icon, path}) => (
                        <ListItemButton
                            key={desc}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => history.push(path)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={desc} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{width: `calc(100% - ${open ? drawerWidth : 64}px)`}}
                style={{
                    transition: theme.transitions.create('all', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                {' '}
                >
                <DrawerHeader/>
                <motion.div variants={animations} initial="initial" animate="animate" exit="exit"
                            className={classes.page}>{children}</motion.div>
            </Box>
        </Box>
    );
};
