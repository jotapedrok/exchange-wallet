const fetchApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  return response.ok ? Promise.resolve(result) : Promise.reject(result);
};

export default fetchApi;
