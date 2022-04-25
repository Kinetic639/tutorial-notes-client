import React, {useEffect, useState} from "react";
import { Switch, Route, useLocation} from 'react-router-dom'
import {LessonsList} from "./components/lessons/LessonsList/LessonsList";
import {Form} from "./components/Form/Form";
import {useDispatch} from "react-redux";
import {getLessons} from "./actions/lessons"
import {Layout} from "./components/layout/Layout";
import {Home} from "./components/Home/Home";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {indigo} from "@mui/material/colors";
import {Auth} from "./components/Auth/Auth";
// import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'


const theme = createTheme({

    palette: {
        primary: indigo,

    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                background: "#000"
            }
        }
    },
})

const App = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {
        dispatch(getLessons());
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
                <Layout location={location} key={location.key}>
                   <Switch>
                       <Route exact path="/" component={Home}/>
                       <Route exact path="/auth" component={Auth}/>

                       <Route exact path="/lessons">
                           <LessonsList setCurrentId={setCurrentId}/>
                       </Route>
                       <Route path="/create">
                           <Form currentId={currentId} setCurrentId={setCurrentId}/>
                       </Route>
                   </Switch>
                </Layout>
        </ThemeProvider>
    )
}
export default App;
