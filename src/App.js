import { React, useState } from 'react';
import './App.css';
import useElectionDataFetch from './services/useElectionDataFetch';
import Status from './components/status/status';
import Candidates from './components/candidates/candidates';
import Surprise from './components/surprise/surprise';
import Footer from './components/footer/Footer';
import GithubCorner from './components/github-corner/GithubCorner';

function App() {
  const [election, setElection] = useState('pres');
  const data = useElectionDataFetch(election);

  return (
    <div>
      <GithubCorner/>
      
      <h1 className='centralizeText'>Apuração Eleições 2022</h1>
      <select className="selector" name="election" id="election" onChange={(e) => {setElection(e.target.value)}} >
        <option value="pres">Presidente</option>
        <option value="gov_rs">Governador - RS</option>
      </select> 

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
      <Footer/>
    </div>
  );
}

export default App;
