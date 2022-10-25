import React from 'react';

const ERROR_STATUS = 'error';
const LOADING_STATUS = 'loading';

const Status = ({ result }) => {
  if(result.status === LOADING_STATUS) return <p>Carregando...</p>;
  if(result.status === ERROR_STATUS) return <p style={{ backgroundColor: 'red' }}>Erro: {result.error.message} </p>
  return null
}

export default Status;