import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  
});

api.interceptors.response.use((res) => res, (error) => Promise.reject(error.response && error.response.data) || 'Erro de conexão com o servidor');


export default api;

//obter o get através do fetcher - obter requisiões do axios
export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];
    const response = await api.get(url, {...config});

    return response.data;
}

const version = '/v1';

export const endpoints = {
    legis : {
        getAll: `${version}/get/legis`,
        create: `${version}/create/legis`,
    },
}