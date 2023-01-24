import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://www.rawaa.somee.com/',
  headers: { 'Access-Control-Allow-Origin': '*' },
});
