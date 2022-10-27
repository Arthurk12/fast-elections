import { useEffect, useState } from "react";
import axios from 'axios';

// TSE api docs: https://www.tse.jus.br/eleicoes/eleicoes-2022/interessados-na-divulgacao-de-resultados-2022
const API_BASE_URL = "https://resultados.tse.jus.br/oficial/";

const PRES_FIRST_TURN = "ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json"
const PRES_SECOND_TURN = "ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json"
const GOV_RS_SECOND_TURN = "ele2022/547/dados-simplificados/rs/rs-c0003-e000547-r.json"

const ELECTION_TYPE_PRESIDENT = 'Presidente'
const ELECTION_TYPE_GOVERNOR = 'Governador - RS'


const FIELDS = {
  candidates: 'cand',
  time: 'ht',
  apurated_sessions: 'psa',
  candidate_fields: {
    name: 'nm',
    coalition: 'cc',
    vice: 'nv',
    number: 'n',
    valid_votes: 'vap',
    valid_votes_percentage: 'pvap',
    result: 'st',
  },
}

const convertDecimalStringToNumber = (stringNumber) => {
  return Number(stringNumber.replace(',','.'));
}

const convertToNumber = (stringNumber) => {
  return Number(stringNumber).toLocaleString('pt-BR');
}

const getCurrentHourMinuteSecond = () => {
  return new Date().toLocaleDateString("pt-BR", {hour: '2-digit', minute: '2-digit', second: '2-digit'}).split(" ")[1];
}

const useElectionDataFetch = (presElection) => {
  const [result, setResult] = useState({
    status: 'loading',
    payload: [],
  })

  const getApiPath = () => (presElection === ELECTION_TYPE_PRESIDENT ? PRES_SECOND_TURN : GOV_RS_SECOND_TURN);
  
  const fetchData = () => {
    axios.get(API_BASE_URL + getApiPath())
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
      throw response;
    })
    .then(data => {
      const candidates = [];
      const candidateInfo = FIELDS.candidate_fields;
      data[FIELDS.candidates].forEach((candidate, index) => {
        candidates.push({
          index: index,
          name: candidate[candidateInfo.name],
          vice: candidate[candidateInfo.vice],
          coalition: candidate[candidateInfo.coalition],
          number: candidate[candidateInfo.number],
          validVotes: convertToNumber(candidate[candidateInfo.valid_votes]),
          validVotesPercentage: convertDecimalStringToNumber(candidate[candidateInfo.valid_votes_percentage]),
          result: candidate[candidateInfo.result],
        })
      })

        setResult({status: 'loaded', apuratedSessions: data[FIELDS.apurated_sessions], lastUpdate: data[FIELDS.time], lastFetch: getCurrentHourMinuteSecond(), payload: candidates});
    })
    .catch(error => setResult({status: 'error', error}));
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10*1000);

    return () => {
      clearInterval(interval);
    }
  }, [presElection]);

  return result;
}

export default useElectionDataFetch;