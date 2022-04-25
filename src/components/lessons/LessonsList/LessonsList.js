import React from 'react';
import {Lesson} from './Lesson/Lesson';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {CircularProgress, Paper, Typography} from '@material-ui/core';
import Masonry from '@mui/lab/Masonry';
import {motion} from 'framer-motion/dist/framer-motion'

const animations = {
    initial: {opacity: 0, y: 20},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -20},
}

export const LessonsList = ({setCurrentId}) => {
    const lessons = useSelector((state) => state.lessons);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user?.result.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to See Your Lessons.
                </Typography>
            </Paper>
        )
    }

    return !lessons.length ? (
        <CircularProgress/>
    ) : (
        <Masonry transition={{staggerChildren: .3}}
            sx={{margin: '0'}}
            className={classes.masonry}
            columns={{xs: 1, sm: 1, md: 2, lg: 3, xl: 4}}
            spacing={3}
        >
            {lessons.map((lesson, index) => (
                <motion.div transition={{delay: .1 + (index/20)}} variants={animations} initial="initial" animate="animate" exit="exit" key={lesson._id}>
                    <Lesson lesson={lesson} setCurrentId={setCurrentId}/>
                </motion.div>
            ))}
        </Masonry>
    );
};
