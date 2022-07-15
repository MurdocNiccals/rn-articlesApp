import axios from 'axios';
import {api_key} from '@env';

export const GetAllDataApi = async (page = 0) => {
  let data;
  const requestOne = axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${page}&api-key=${api_key}`,
  );
  const requestTwo = axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${
      page + 1
    }&api-key=${api_key}`,
  );
  await axios
    .all([requestOne, requestTwo])
    .then(response => {
      console.log('API SUCCESFULL');
      data = [
        ...response[0].data.response.docs,
        ...response[1].data.response.docs,
      ];
    })
    .catch(error => console.error('API CALL FAILED', error));
  return data;
};

export const SearchApi = async (term, page = 0) => {
  let data;
  const requestOne = axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&page=${page}&api-key=${api_key}`,
  );
  const requestTwo = axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&page=${
      page + 1
    }&api-key=${api_key}`,
  );
  await axios
    .all([requestOne, requestTwo])
    .then(response => {
      console.log('API SUCCESFULL');
      data = [
        ...response[0].data.response.docs,
        ...response[1].data.response.docs,
      ];
    })
    .catch(error => console.error('API CALL FAILED', error));
  return data;
};
