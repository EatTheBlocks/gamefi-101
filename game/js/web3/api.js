const axios = window.axios.default;

const BASE_URL = 'http://13.213.0.113/api/';

async function handleResponse(rs){
  if (rs.status !== 200)  throw Error('call api false');  
  const {data,  mess, code} = rs.data;
  return data;
}

async function getBalanceOf(address) {
  const rs = await axios.get(`${BASE_URL}getTicketBalance?address=${address}`);
  return await handleResponse(rs);
}

async function depositApi(address, amount, transaction_id) {
  const rs = await axios.post(`${BASE_URL}deposit`, {address, amount, transaction_id});
  return handleResponse(rs);
}

async function withdrawApi(address, amount) {
  const rs = await axios.post(`${BASE_URL}withdraw`, {address, amount});
  return handleResponse(rs);
}

async function startMatch(address) {
  const rs = await axios.get(`${BASE_URL}startMatch?address=${address}`);
  return await handleResponse(rs);
}

async function endMatch(address, id, point, matchData) {
  const rs = await axios.post(`${BASE_URL}endMatch`, {address, id, point, matchData});
  return await handleResponse(rs);
}