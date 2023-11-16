//src/utils/axios.ts
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Verifique se a porta corresponde à porta do seu servidor Node.js
});

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error.response && error.response.data) || 'Erro de conexão com o servidor'
);

export const executePythonScript = async () => {
  try {
    const response = await api.get('/run-python-script'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

export const executePythonCodigo = async () => {
  try {
    const response = await api.get('/run-python-codigo'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

// Obtenha o GET usando o fetcher - obter requisições do Axios
export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const response = await api.get(url, { ...config });

  return response.data;
};

const version = '/v1';

export const endpoints = {
  legis: {
    getAll: `${version}/get/legis`,
    getDate: `${version}/get/legis/date`,
    create: `${version}/create/legis`,
  },
};
