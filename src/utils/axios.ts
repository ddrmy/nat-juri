//src/utils/axios.ts
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Verifique se a porta corresponde à porta do seu servidor Node.js
});

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error.response && error.response.data) || 'Erro de conexão com o servidor'
);

const version = '/v1';
export const endpoints = {
  legis: {
    getAll: `${version}/get/legis`,
    getDate: `${version}/get/legis/date`,
    create: `${version}/create/legis`,
  },
};

export const executePythonScript = async () => {
  try {
    const response = await api.get('/run-python-script'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

// <- -- --- --------------------------------------------------------------------------------------------- --- -- ->

// CODIGOS // CODIGOS // CODIGOS // CODIGOS //

export const executeCodigoCivil = async () => {
  try {
    const response = await api.get('/run-codigo-civil'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

export const executeCodigoDefesaConsumidor = async () => {
  try {
    const response = await api.get('/run-codigo-defesa-consumidor'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

export const executeCodigoPenal = async () => {
  try {
    const response = await api.get('/run-codigo-penal'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

export const executeCodigoProcessoCivil = async () => {
  try {
    const response = await api.get('/run-codigo-processo-civil'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

export const executeCodigoProcessoPenal = async () => {
  try {
    const response = await api.get('/run-codigo-processo-penal'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

export const executeConsolidacaoLeisTrabalho = async () => {
  try {
    const response = await api.get('/run-consolidacao-leis-trabalho'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

// <- -- --- --------------------------------------------------------------------------------------------- --- -- ->


// CONSTITUICAO // CONSTITUICAO // CONSTITUICAO // CONSTITUICAO //

export const executeConstituicao = async () => {
  try {
    const response = await api.get('/run-constituicao'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

// <- -- --- --------------------------------------------------------------------------------------------- --- -- ->


// ESTATUTOS // ESTATUTOS // ESTATUTOS // ESTATUTOS //

export const executeEstatutoCriancaAdolescente = async () => {
  try {
    const response = await api.get('/run-estatuto-crianca-adolescente'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

export const executeEstatutoIdoso = async () => {
  try {
    const response = await api.get('/run-estatuto-idoso'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

export const executeEstatutoOAB = async () => {
  try {
    const response = await api.get('/run-estatuto-oab'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};

export const executeEstatutoPessoaDeficiencia = async () => {
  try {
    const response = await api.get('/run-estatuto-pessoa-deficiencia'); // Use o cliente Axios "api"
    console.log(response.data); // Deve imprimir "Script Python executado com sucesso"
  } catch (error) {
    console.error('Erro na chamada para o servidor:', error);
  }
};


// <- -- --- --------------------------------------------------------------------------------------------- --- -- -> 


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


