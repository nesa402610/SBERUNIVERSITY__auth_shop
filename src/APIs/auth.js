import axios from "axios";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');