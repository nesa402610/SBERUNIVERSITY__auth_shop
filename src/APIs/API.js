import axios from "axios";

//дефолтом устанавливаем хедерсы авторизации и базовый урл
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.baseURL = 'https://api.react-learning.ru';

// класс API
class API {
  //конструктор, принимает options
  constructor(options) {
    //устанавливаем параметры из options, урл, хедерсы, групИД
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.groupId = options.groupId;
  }

//Получаем продукты
  getProducts() {
    return axios.get('/products');
  }

  getSearchedProducts(query) {
    return axios.get('/products/search?query=' + query);
  }

//Получаем посты
  getPosts() {
    return axios.get('/v2/' + this.groupId + '/posts');
  }

//Создание постов
  createPost(data) {
    return axios.post('/v2/' + this.groupId + '/posts', data);
  }

//обновляем пост
  updatePost(postID, data) {
    return axios.patch('/v2/' + this.groupId + '/posts/' + postID, data);
  }

//удаляем пост по ИД
  deletePost(postID) {
    return axios.delete('/v2/' + this.groupId + '/posts/' + postID);

  }

//создаем коммент к посту
  createComment(postID, data) {
    return axios.post('/v2/' + this.groupId + '/posts/comments/' + postID, data);
  }

//удаляем коммент у поста
  deleteComment(postID, commentID) {
    return axios.delete('/v2/' + this.groupId + '/posts/comments/' + postID + '/' + commentID);
  }

//лайкаем пост
  likePost(postID) {
    return axios.put('/v2/' + this.groupId + '/posts/likes/' + postID);
  }

//дизлайкаем пост
  dislikePost(postID) {
    return axios.delete('/v2/' + this.groupId + '/posts/likes/' + postID);
  }

//добавляем продукт
  uploadProduct(options) {
    return axios.post('/products', options);
  }

//лайкаем продукт
  likeProduct(_id) {
    return axios.put('products/likes/' + _id);
  }

//дизлайкаем продукт
  dislikeProduct(_id) {
    return axios.delete('products/likes/' + _id);
  }

//добавляем отзыв к продукту
  addReview(id, data) {
    return axios.post('products/review/' + id, data);
  }

//удаляем отзыв у товара, можно сразу принять ид, но я забыл
  removeReview(data) {
    return axios.delete('products/review/' + data.productID + '/' + data.reviewID);
  }

//удаляем продукт
  deleteProduct(_id) {
    return axios.delete('products/' + _id);
  }

//получаем данные пользователя
  getUserData() {
    return axios.get('/v2/' + this.groupId + '/users/me');
  }

//обновляем данные пользователя
  updateUserData(data) {
    return axios.patch('/v2/' + this.groupId + '/users/me', data);
  }

//обновляем аватар пользователя
  updateUserAvatar(data) {
    return axios.patch('/v2/' + this.groupId + '/users/me/avatar', data);
  }

//восстановить пароль, ссылка на почту
  resetPassword(email) {
    return axios.post('/password-reset', email);
  }

//обновляем пароль
  updatePassword(data) {
    return axios.post('/password-reset/' + data.userID + '/' + data.token);
  }
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