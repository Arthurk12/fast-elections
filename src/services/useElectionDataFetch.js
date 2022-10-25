import { useEffect, useState } from "react";

const FIRST_TURN = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json"
const SECOND_TURN = "https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json"


const API_URL = SECOND_TURN;

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

const useElectionDataFetch = (fetchPeriodically) => {
  const [result, setResult] = useState({
    status: 'loading',
    payload: [],
  })

  let interval;

  const fetchData = () => {
    const controller = new window.AbortController();
    fetch(API_URL, { signal: controller.signal })
    .then(response => {
      if (response.ok) {
        return response.json();
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
        controller.abort();
    })
    .catch(error => setResult({status: 'error', error}));
  }

  useEffect(() => {
    fetchData();

    if (fetchPeriodically) interval = setInterval(fetchData, 10*1000);

    return () => {
      if(fetchPeriodically) clearInterval(interval);
    }
  }, []);

  return result;
}

export default useElectionDataFetch;