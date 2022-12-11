import axios from "axios";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.baseURL = 'https://api.react-learning.ru';

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

  updatePost(postID, data) {
    return axios.patch('/v2/' + this.groupId + '/posts/' + postID, data);
  }

  deletePost(postID) {
    return axios.delete('/v2/' + this.groupId + '/posts/' + postID);

  }

  likePost(postID) {
    return axios.put('/v2/' + this.groupId + '/posts/likes/' + postID);
  }

  dislikePost(postID) {
    return axios.delete('/v2/' + this.groupId + '/posts/likes/' + postID);
  }

  uploadProduct(options) {
    return axios.post('/products', options);
  }

  likeProduct(_id) {
    return axios.put('products/likes/' + _id);
  }

  dislikeProduct(_id) {
    return axios.delete('products/likes/' + _id);
  }

  addReview(_id) {
    return axios.delete('review/' + _id);
  }

  removeReview(_id) {
    return axios.delete('review/' + _id);
  }

  getUserData() {
    return axios.get('/v2/' + this.groupId + '/users/me');
  }

  updateUserData(data) {
    return axios.patch('/v2/' + this.groupId + '/users/me', data);
  }

  updateUserAvatar(data) {
    return axios.patch('/v2/' + this.groupId + '/users/me/avatar', data);
  }

  resetPassword(email) {
    return axios.post('/password-reset', email);
  }

  updatePassword(data) {
    return axios.post('/password-reset/' + data.userID + '/' + data.token);
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