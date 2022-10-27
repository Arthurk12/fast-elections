import React from 'react';
import './footer.css';

const API_TSE = "https://www.tse.jus.br/eleicoes/eleicoes-2022/interessados-na-divulgacao-de-resultados-2022";

const Footer = () => (
  <div className='footer'>
    <div>Dados disponibilizados na <a target="_blank" rel="noopener noreferrer" href={API_TSE}>API oficial do TSE.</a></div>
  </div>
);

export default Footer;
