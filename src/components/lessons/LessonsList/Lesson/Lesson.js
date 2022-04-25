import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {Delete, StarBorder, Star} from '@material-ui/icons';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';
import {useHistory, useLocation} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch} from 'react-redux';
import {deleteLesson, markFavouriteLesson} from '../../../../actions/lessons';
// import {motion} from 'framer-motion/dist/framer-motion'
// import moment from "moment";

const isValidYoutubeLink = (url) => {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined
        ? [true, url[2].split(/[^0-9a-z_\\-]/i)[0]]
        : false;
};

const isImgLink = (url) => {
    return (
        url.match(
            /(http[s]*:\/\/)([a-z\-_0-9/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_/.~:?#[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/gim,
        ) !== null
    );
};


export const Lesson = ({lesson, setCurrentId}) => {
    const {title, description, createdAt, tags, source, _id, favourite} =
        lesson;
    const [cardMediaBackground, setCardMediaBackground] = useState('');
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isImgLink(source)) {
            setCardMediaBackground(source);
        } else if (isValidYoutubeLink(source)[0]) {
            setCardMediaBackground(
                `https://img.youtube.com/vi/${
                    isValidYoutubeLink(source)[1]
                }/maxresdefault.jpg`,
            );
        }
    }, [lesson, source]);

    return (

        <Card
            className={`${classes.card} ${
                location.pathname === '/create' ? classes.lessonPreview : null
            }`}
        >
            <div className={classes.mediaContainer}>
                {cardMediaBackground === '' ? (
                    <div className={classes.media}/>
                ) : (
                    <CardMedia
                        className={classes.media}
                        title={title}
                        image={cardMediaBackground}
                    />
                )}
                <div className={classes.overlay}>
                    <Typography className={classes.date} variant="body1">
                        {createdAt
                            ? new Date(createdAt).toLocaleString()
                            : new Date().toLocaleString()}
                    </Typography>

                    {/*{_id && <Button style={{color: 'white'}} size="small" onClick={() => {*/}
                    {/*    setCurrentId(_id)*/}
                    {/*    history.push('/create')*/}
                    {/*}}>*/}
                    {/*    <EditIcon fontSize="medium"/>*/}
                    {/*</Button>}*/}
                </div>
            </div>
            <div className={classes.details}>
                {tags.length > 0 && (
                    <Typography
                        className={classes.tags}
                        variant="body2"
                        color="textSecondary"
                    >
                        {tags.map((tag) => `#${tag} `)}
                    </Typography>
                )}
            </div>
            <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom>
                    {title ? title : 'Add Title'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {description ? description : 'Add Description'}
                </Typography>
            </CardContent>
            {_id && (
                <CardActions className={classes.cardActions}>
                    <Button
                        className={classes.cardBtn}
                        size="small"
                        color="primary"
                        onClick={() => dispatch(markFavouriteLesson(_id))}
                    >
                        &nbsp; {favourite ? <Star/> : <StarBorder/>} &nbsp; ADD FAVOURITE
                    </Button>
                    <div className={classes.btnSeparator}></div>
                    <Button
                        color="primary"
                        size="small"
                        onClick={() => {
                            setCurrentId(_id);
                            history.push('/create');
                        }}
                    >
                        {' '}
                        &nbsp; <EditIcon fontSize="medium"/> &nbsp; EDIT
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(deleteLesson(_id))}
                    >
                        &nbsp; <Delete/> &nbsp; DELETE
                    </Button>
                </CardActions>
            )}
        </Card>

    );
};
