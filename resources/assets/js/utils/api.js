import axios from 'axios';

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': Laravel.csrfToken,
};

export const Api = {
  get: (url, config = {}) => axios.get(url, config.data)
    .then(config.onSuccess)
    .catch(config.onError),

  post: (url, config = {}) => axios.post(url, config.data)
    .then(config.onSuccess)
    .catch(config.onError),
};

export default Api;
