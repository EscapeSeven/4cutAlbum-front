import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://port-0-cutalbum-back-jvpb2alnz8cuvj.sel5.cloudtype.app',
  timeout: 8000,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
});

export { instance };
