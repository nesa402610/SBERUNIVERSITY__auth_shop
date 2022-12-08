import axios from "axios";

class API {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.groupId = options.groupId;
  }

  getInitialPost() {
// ...
  }

  getProducts() {
    return axios.get(this.baseUrl + '/products');
  }


  getUserData() {
    return axios.get(this.baseUrl + '/v2/' + this.groupId + '/users/me');
  }

// другие методы работы с API
}

export const api = new API({
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  },
  groupId: 'sm8'
});