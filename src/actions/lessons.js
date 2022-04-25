import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js';
import * as api from '../api';

//Action creators
export const getLessons = () => async (dispatch) => {

  try {
    const { data } = await api.fetchLessons();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createLesson = (lesson) => async (dispatch) => {
  try {
    const { data } = await api.createLesson(lesson);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateLesson = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateLesson(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLesson = (id) => async (dispatch) => {
  try {
    await api.deleteLesson(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const markFavouriteLesson = (id) => async (dispatch) => {
  try {
    const { data } = await api.markFavouriteLesson(id);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
