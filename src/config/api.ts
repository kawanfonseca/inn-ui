import axios from 'axios';

export const api = axios.create({ baseURL: 'https://inn-api.vercel.app/api' });
