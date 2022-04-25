import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FAVOURITE,
} from '../constants/actionTypes';

export default (lessons = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case DELETE:
      return lessons.filter((lesson) => lesson._id !== action.payload);
    case UPDATE:
    case FAVOURITE:
      return lessons.map((lesson) =>
        lesson._id === action.payload._id ? action.payload : lesson,
      );
    case CREATE:
      return [...lessons, action.payload];
    default:
      return lessons;
  }
};
