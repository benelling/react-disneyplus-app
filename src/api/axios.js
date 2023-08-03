import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '5973fdea30f7eef14f99ec7be5d65e55',
    language: 'ko-KR'
  }
})

export default instance;