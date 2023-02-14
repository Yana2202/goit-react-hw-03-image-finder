import axios from 'axios';
const API_KEY = '33065712-8c4d2f0a7929f23e4bb7b3bb7';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const searchImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
