import { React, useState } from 'react';
import './App.css';
import useElectionDataFetch from './services/useElectionDataFetch';
import Status from './components/status/status';
import Candidates from './components/candidates/candidates';
import Surprise from './components/surprise/surprise';

function App() {
  const [election, setElection] = useState('Presidente');
  const data = useElectionDataFetch(election);

  return (
    <div>
        <select name="election" id="election" onChange={(e) => {setElection(e.target.value)}} >
          <option value="Presidente">Presidente</option>
          <option value="Governador - RS">Governador - RS</option>
        </select> 

      <h1>Apuração Eleições 2022 - {election}</h1>
      <div className='clearSection'>
        {data.apuratedSessions}% das seções apuradas
      </div>
      <div className='updateContainer'>
        <span>Última informação: {data.lastUpdate}</span>
        <span className='pullTextRight'>Atualizado: {data.lastFetch}</span>
      </div>
      <Surprise candidates={data.payload}/>
      <Status
        result={data}
      />
      <Candidates candidates={data.payload}/>
    </div>
  );
}

export default App;
