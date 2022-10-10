import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  const { nbPages, page, handlePage, isDisabled, isLoading } =
    useGlobalContext();

  console.log(isDisabled);
  return (
    <div className='btn-container'>
      <button
        disabled={isLoading || isDisabled}
        onClick={() => handlePage('pageDown')}
      >
        prev
      </button>

      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage('pageUp')}>
        next
      </button>
    </div>
  );
};

export default Buttons;
