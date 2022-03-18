import axios from 'axios';

const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`
export const api = axios.create({
  baseURL: endpoint,
});
