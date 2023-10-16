import axios from "axios";

const apiKey = '40046214-79f7646e04c4ec5b23e077d8e';

async function searchImages(query, page = 1) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export {searchImages}