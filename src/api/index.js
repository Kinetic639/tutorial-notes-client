import axios from 'axios';

const API = axios.create({baseURL: 'https://tutorial-notes.herokuapp.com/'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchLessons = () => API.get('/lessons');

export const createLesson = (newLesson) => API.post('/lessons', newLesson);
export const markFavouriteLesson = (id, updatedLesson) =>
    API.patch(`/lessons/${id}/markFavouriteLesson`, updatedLesson);
export const updateLesson = (id, updatedLesson) =>
    API.patch(`/lessons/${id}`, updatedLesson);
export const deleteLesson = (id) => API.delete(`/lessons/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
