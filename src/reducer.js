import { ACTIONS } from './actions';

const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === ACTIONS.SET_LOADING) {
    return { ...state, isLoading: true };
  }

  if (type === ACTIONS.SET_STORIES) {
    const { hits, nbPages } = payload;
    return { ...state, hits, nbPages, isLoading: false };
  }

  if (type === ACTIONS.REMOVE_STORY) {
    const { id } = payload;
    const newHits = state.hits.filter((story) => story.objectID !== id);
    return { ...state, hits: newHits, isLoading: false };
  }

  if (type === ACTIONS.HANDLE_PAGE) {
    const { text } = payload;
    // console.log(state.page);
    if (text === 'pageUp') {
      if (state.page > state.nbPages) {
        return { ...state, page: 0 };
      } else if (state.page > -1) {
        return { ...state, page: state.page + 1, isDisabled: false };
      }
    } else if (text === 'pageDown') {
      if (state.page < 1) {
        return { ...state, page: 0, isDisabled: true };
      } else if (state.page < state.nbPages - 1) {
        return { ...state, page: state.page - 1, isDisabled: false };
      }
    }
  }

  if (type === ACTIONS.HANDLE_SEARCH) {
    const { query } = payload;

    return { ...state, query: query, page: 0 };
  }

  throw new Error('No matching action type');
};
export default reducer;
