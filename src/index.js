import { Notify } from 'notiflix/build/notiflix-notify-aio';
const apiKey = '40046214-79f7646e04c4ec5b23e077d8e';
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
    searchImages(searchQuery);
  }
});

loadMoreButton.addEventListener('click', () => {
  const searchQuery = searchForm.searchQuery.value;
  if (searchQuery.trim() !== '') {
    page++;
    searchImages(searchQuery, page);
  }
});

async function searchImages(query, page = 1) {
  const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`);
  const data = await response.json();

  if (data.hits.length > 0) {
    data.hits.forEach((image) => {
      const photoCard = document.createElement('div');
      photoCard.className = 'photo-card';
      photoCard.innerHTML = `
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${image.likes}</p>
          <p class="info-item"><b>Views:</b> ${image.views}</p>
          <p class="info-item"><b>Comments:</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
      `;
      gallery.appendChild(photoCard);
    });

    totalHits = data.totalHits;

    if (totalHits > page * 20) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
    }
  } else {
    gallery.innerHTML = '';
    loadMoreButton.style.display = 'none';
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
}
