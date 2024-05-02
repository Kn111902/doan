import axios from 'axios';
import queryString from 'query-string';
const apiConfig = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: function (params) {
    return queryString.stringify(params, { arrayFormat: 'brackets' });
  },
});

apiConfig.interceptors.response.use((res) => {
  return res.data;
});

export default apiConfig;
