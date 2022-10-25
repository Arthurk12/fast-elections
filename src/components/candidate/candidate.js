import React from 'react';
import './candidate.css';

const Candidate = ({ candidate }) => {
  const name = candidate.name;
  const vice = candidate.vice;
  const coalition = candidate.coalition;
  const number = candidate.number;
  const validVotes = candidate.validVotes;
  const validVotesPercentage = candidate.validVotesPercentage;
  const result = candidate.result;

  return (
    <div className='candidateWrapper'>
      <div className='candidateInfo'>

        <div className='candidateNameNumber'>
          <div className='candidateName'>
            {name}
          </div>

          <div>{number}</div>

        </div>

        <div>
          {validVotesPercentage}%

          {result !== '' ? (
            ` - (${result})`
          ) : null}
        </div>

        <div className='candidateSubInfo'>
          {vice}
          <div className='candidateCoalition'>{coalition.split(' ')[0]}</div>
        </div>

        <div className='candidateValidVotes'>
          Votos Válidos: {validVotes}
        </div>
        
      </div>

      <div className='candidateBackground'>
        <div className='candidateProgressBar' style={{
          width: `${validVotesPercentage}%`,
        }} ></div>
      </div>
    </div>
  )
}

export default Candidate;
