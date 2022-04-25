import React, {useEffect, useState} from 'react'
import {Avatar, Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import useStyles from "./styles";
import {styled} from '@mui/material/styles';
import MuiAppBar from "@mui/material/AppBar";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";

const ShowCenter = () => {
    const classes = useStyles();
    // const location = useLocation()
    // if (location.pathname == '/') {
    //     return (
    //         <Search>
    //             <SearchIconWrapper>
    //                 <SearchIcon/>
    //             </SearchIconWrapper>
    //             <StyledInputBase
    //                 placeholder="Search…"
    //                 inputProps={{'aria-label': 'search'}}
    //
    //             />
    //         </Search>
    //
    //     )
    // } else {
    return (
        <Typography className={classes.dateText}>
            {new Date().toLocaleDateString()}
        </Typography>
    );
    // }
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Navbar = ({open, handleDrawerOpen}) => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        // const token = user?.token
        // JWT
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => {
                        handleDrawerOpen()
                    }}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && {display: 'none'}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <ShowCenter/>
                <Toolbar>
                    {user ? (
                        <div className={classes.profile}>
                            <Typography className={classes.username}>{user.result.name}</Typography>
                            <Avatar
                                alt={user.result.name}
                                src={user.result.imageUrl}
                                className={classes.avatar}
                            />
                            <Button variant='contained' className={classes.logout} color='secondary'
                                    onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to={'/auth'} variant='contained' color='secondary'>Sign In</Button>
                    )}
                </Toolbar>

            </Toolbar>
        </AppBar>
    )
}
