import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  LOAD_BOOK,
  ERROR_LOADING_BOOK,
} from '../actions/types';

const initalState = {
  profile: null,
  profiles: [],
  loading: true,
  loadingBook: true,
  error: {},
  book: null,
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case LOAD_BOOK:
      return {
        ...state,
        book: payload,
        loadingBook: false,
      };
    case ERROR_LOADING_BOOK:
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
