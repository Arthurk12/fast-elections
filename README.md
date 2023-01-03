# Fast Elections

Projeto para apuração em tempo real das eleições de 2022 utilizando dados disponibilizados na [API oficial do TSE]( https://www.tse.jus.br/eleicoes/eleicoes-2022/interessados-na-divulgacao-de-resultados-2022)

------------


#### Anotações pra daqui 4 anos
 - Durante a apuração, a API do TSE passou a responder às requisições sem o header: `Access-Control-Allow-Origin`. Quando este header não esta presente, os navegadores bloqueiam a requisição.

 	- ~~Uma possível solução seria armazenar os dados localmente para não depender da API do TSE, que durante a apuração pode ficar malucona.~~
 	- ~~Outra ideia é rodar um servidor backend que consulta a API do TSE e serve o front end com os dados.~~
   - https://corsproxy.github.io/
