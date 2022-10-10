import React, { useContext, useEffect, useReducer } from 'react';

import { ACTIONS } from './actions';
import reducer from './reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
  isDisabled: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: ACTIONS.SET_LOADING });

    try {
      const response = await fetch(url);
      const data = await response.json();

      dispatch({
        type: ACTIONS.SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeStory = (id) => {
    dispatch({ type: ACTIONS.REMOVE_STORY, payload: { id } });
  };

  const handlePage = (text) => {
    dispatch({ type: ACTIONS.HANDLE_PAGE, payload: { text } });
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
    const query = e.target.value;
    dispatch({ type: ACTIONS.HANDLE_SEARCH, payload: { query } });
  };

  useEffect(() => {
    const url = `${API_ENDPOINT}query=${state.query}&page=${state.page}`;
    fetchStories(url);
  }, [state.page, state.query]);

  const value = { ...state, removeStory, handlePage, handleSearchForm };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
