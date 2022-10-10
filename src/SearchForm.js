import React from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
  const { query, handleSearchForm } = useGlobalContext();

  return (
    <>
      <form className='search-form'>
        <h2>Search hacker news</h2>
        <input
          type='text'
          className='form-input'
          value={query}
          onChange={handleSearchForm}
        />
      </form>
    </>
  );
};

export default SearchForm;
