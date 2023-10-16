import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
import { searchImages } from "./API";

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
loadMoreButton.style.display = 'none';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  page = 1;
  totalHits = 0;
  gallery.innerHTML = '';

  const searchQuery = e.target.searchQuery.value;
  if (searchQuery.trim() !== '') {
    searchImagesAndDisplay(searchQuery);
  }
});

loadMoreButton.addEventListener('click', () => {
  const searchQuery = searchForm.searchQuery.value;
  if (searchQuery.trim() !== '') {
    page++;
    searchImagesAndDisplay(searchQuery, page); 
  }
});

async function searchImagesAndDisplay(query, page = 1) {
  try {
    const data = await searchImages(query, page);

    if (data.hits.length > 0) {
      data.hits.forEach((image) => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.innerHTML = `
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="img-item" />
        <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
        `;
        gallery.appendChild(photoCard);
      });
      
      // totalHits = data.totalHits;
      
      // if (totalHits > page * 20) {
      //   loadMoreButton.style.display = 'block';
      // } else {
      //   loadMoreButton.style.display = 'none';
      // }
      const totalHits = data.totalHits;
      const totalPage = Math.ceil(totalHits / 40); // 20 images per page
      
      if (page < totalPage) {
        loadMoreButton.style.display = 'block';
      } else {
        loadMoreButton.style.display = 'none';
      }
    } else {
      gallery.innerHTML = '';
      loadMoreButton.style.display = 'none';
      Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
  } catch (error) {
    console.error('An error occurred:', error);
    Notify.failure("Failed to fetch images. Please try again later.");
  }
}