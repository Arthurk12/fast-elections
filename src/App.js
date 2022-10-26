import React from 'react';
import './App.css';
import useElectionDataFetch from './services/useElectionDataFetch';
import Status from './components/status/status';
import Candidates from './components/candidates/candidates';
import ReactPlayer from 'react-player/youtube';

function App() {
  const data = useElectionDataFetch();
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

      {data.l ? <ReactPlayer url="https://www.youtube.com/watch?v=LwRSsy08nqA" playing={true} height='100%' width='100%' style={{position: 'absolute', top: '0', right: '0'}} /> : null}

      <Status
        result={data}
      />
      <Candidates candidates={data.payload}/>
    </div>
  );
}

export default App;
