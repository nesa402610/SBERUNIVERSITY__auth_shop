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

  async uploadProduct(options) {
    return await axios.post(this.baseUrl + '/products', options);
  }

  async likeProduct(_id) {
    return await axios.put(this.baseUrl + 'products/likes/' + _id);
  }

  async dislikeProduct(_id) {
    return await axios.delete(this.baseUrl + 'products/likes/' + _id);
  }

  async addReview(_id) {
    return await axios.delete(this.baseUrl + 'review/' + _id);
  }

  async removeReview(_id) {
    return await axios.delete(this.baseUrl + 'review/' + _id);
  }

  getUserData() {
    return axios.get(this.baseUrl + '/v2/' + this.groupId + '/users/me');
  }

  async updateUserData(data) {
    return await axios.patch(this.baseUrl + '/v2/' + this.groupId + '/users/me', data);
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