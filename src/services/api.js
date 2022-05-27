const API = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  delete requestJson.USDT;
  return requestJson;
};

export default API;
