import React from 'react';
import './App.css';
import useElectionDataFetch from './services/useElectionDataFetch';
import Status from './components/status/status';
import Candidates from './components/candidates/candidates';

function App() {
  const data = useElectionDataFetch(true);
  return (
    <div>
      <h1>Apuração Eleições 2022</h1>
      <div className='clearSection'>
        {data.apuratedSessions}% das seções apuradas
      </div>
      <div className='updateContainer'>
        <span>Última informação: {data.lastUpdate}</span>
        <span className='pullTextRight'>Atualizado: {data.lastFetch}</span>
      </div>



      <Status
        result={data}
      />
      <Candidates candidates={data.payload}/>
    </div>
  );
}

export default App;
