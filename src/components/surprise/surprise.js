import React from 'react'
import ReactPlayer from 'react-player/youtube';
import './surprise.css';

const PRES_LINK = 'https://www.youtube.com/watch?v=Okga_uTq9Hc'
const GOV_LINK = 'https://www.youtube.com/watch?v=6G4wG46YkfA';

const ELECTED = 'Eleito'
const CANDIDATE_L = 'LULA'
const CANDIDATE_E = 'EDUARDO LEITE'

const getLink = (pres, gov) => {
  if(!pres && !gov) return null;
  return pres ? PRES_LINK : GOV_LINK;
}

const Surprise = ({candidates}) => {
  if (!candidates) return null;
  const checkCandidateElection = (name) => (candidates.some(candidate => candidate.result === ELECTED && candidate.name === name))
  const pres = checkCandidateElection(CANDIDATE_L);
  const gov = checkCandidateElection(CANDIDATE_E);
  if ((!pres && !gov)) return null;


  return (<ReactPlayer url={getLink(pres, gov)} playing volume={1} height='100%' width='100%' className='fullscreen' />);
};

export default Surprise;