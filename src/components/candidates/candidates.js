import React from 'react';
import Candidate from '../candidate/candidate';

const Candidates = ({ candidates }) => {
  if(!candidates) return (<h2>Nenhum candidato para mostrar</h2>);;
  if(candidates.length === 0) return null;

  return (
    candidates.map((candidate, i) => (
      <Candidate
        candidate={candidate}
        key={i}
      />
    ))
  );
}

export default Candidates;
