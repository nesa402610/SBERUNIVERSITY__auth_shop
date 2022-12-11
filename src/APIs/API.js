import axios from "axios";
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.baseURL = 'https://api.react-learning.ru'
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
    return axios.get('/products');
  }

  getPosts() {
    return axios.get('/v2/' + this.groupId + '/posts');
  }
  createPost(data) {
    return axios.post('/v2/' + this.groupId + '/posts', data);
  }
  likePost(postID) {
    return axios.put('/v2/' + this.groupId + '/posts/likes/' + postID);
  }
  dislikePost(postID) {
    return axios.delete('/v2/' + this.groupId + '/posts/likes/' + postID);
  }

  async uploadProduct(options) {
    return await axios.post('/products', options);
  }

  async likeProduct(_id) {
    return await axios.put('products/likes/' + _id);
  }

  async dislikeProduct(_id) {
    return await axios.delete('products/likes/' + _id);
  }

  async addReview(_id) {
    return await axios.delete('review/' + _id);
  }

  async removeReview(_id) {
    return await axios.delete('review/' + _id);
  }

  getUserData() {
    return axios.get('/v2/' + this.groupId + '/users/me');
  }

  async updateUserData(data) {
    return await axios.patch('/v2/' + this.groupId + '/users/me', data);
  }

  async updateUserAvatar(data) {
    return await axios.patch('/v2/' + this.groupId + '/users/me/avatar', data);
  }

// другие методы работы с API
}

export const api = new API({
  // //не используются, тк axios на дефолте меняет этр
  // baseUrl: 'https://api.react-learning.ru',
  // //не используются, тк axios на дефолте меняет этр
  // headers: {
  //   authorization: 'Bearer ' + localStorage.getItem('token'),
  //   'Content-Type': 'application/json'
  // },
  groupId: 'sm8'
});