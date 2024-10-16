import React from 'react';
import { Pagination as MUIPagination } from '@mui/material'; 

function Pagination({ count, page, onChange }) {
  return (
    <MUIPagination
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
      showFirstButton
      showLastButton
    />
  );
}

export default Pagination;
