import fetch from '../utils/fetch';

export default {
  getValue: () => {
    return fetch.get('/values/5');
  },
};
