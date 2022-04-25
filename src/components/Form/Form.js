import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import {Button, Paper, TextField, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {createLesson, updateLesson} from '../../actions/lessons';
import {useHistory} from 'react-router-dom';
import {Lesson} from '../lessons/LessonsList/Lesson/Lesson';

//Get current id of lesson

export const Form = ({currentId, setCurrentId}) => {
    const lesson = useSelector((state) =>
        currentId ? state.lessons.find((lesson) => lesson._id === currentId) : null,
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [lessonData, setLessonData] = useState({
        title: '',
        description: '',
        tags: '',
        source: '',
        favourite: false,
    });
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (lesson) {
            setLessonData(lesson);
        }
        // else {
        //     setLessonData({
        //         title: 'Add Title',
        //         description: 'Add Description',
        //         source: 'Add Source Link',
        //         tags: '',
        //         favourite: false
        //     })
        // };
    }, [lesson]);

    const clear = () => {
        setCurrentId(0);
        setLessonData({
            title: '',
            creatorId: '',
            name: '',
            description: '',
            tags: '',
            source: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createLesson({...lessonData, creatorId: user?.result?._id, name: user?.result?.name}));
            clear();
        } else {
            dispatch(updateLesson(currentId, {...lessonData, name: user?.result?.name}));
            clear();
        }
        history.push('/lessons');
    };

    if (!user?.result.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create Lessons.
                </Typography>
            </Paper>
        )
    }
    // const handleClear = () => {};

    return (
        <Paper className={classes.paper}>
            <Lesson lesson={lessonData} className={classes.lessonPreview}/>
            <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? `Edit Lesson` : `Create New Lesson`}
                </Typography>
                <TextField
                    className={classes.textField}
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={lessonData.title}
                    onChange={(e) =>
                        setLessonData({...lessonData, title: e.target.value})
                    }
                />
                <TextField
                    className={classes.textField}
                    name="description"
                    variant="outlined"
                    label="Description"
                    fullWidth
                    value={lessonData.description}
                    onChange={(e) =>
                        setLessonData({...lessonData, description: e.target.value})
                    }
                />
                <TextField
                    className={classes.textField}
                    name="source"
                    variant="outlined"
                    label="Source"
                    fullWidth
                    value={lessonData.source}
                    onChange={(e) =>
                        setLessonData({...lessonData, source: e.target.value})
                    }
                />
                <TextField
                    className={classes.textField}
                    name="tags"
                    variant="outlined"
                    label="Tags separated by comma..."
                    fullWidth
                    value={lessonData.tags}
                    onChange={(e) =>
                        setLessonData({...lessonData, tags: e.target.value.split(',')})
                    }
                />
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    {currentId ? `Save changes` : `Add Lesson`}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};
