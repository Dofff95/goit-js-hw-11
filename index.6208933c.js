const e=document.getElementById("search-form"),t=document.querySelector(".gallery"),n=document.querySelector(".load-more");n.style.display="none";let a=1,s=0;async function i(e,a=1){const i=await fetch(`https://pixabay.com/api/?key=40046214-79f7646e04c4ec5b23e077d8e&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${a}`),o=await i.json();o.hits.length>0?(o.hits.forEach((e=>{const n=document.createElement("div");n.className="photo-card",n.innerHTML=`\n        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />\n        <div class="info">\n          <p class="info-item"><b>Likes:</b> ${e.likes}</p>\n          <p class="info-item"><b>Views:</b> ${e.views}</p>\n          <p class="info-item"><b>Comments:</b> ${e.comments}</p>\n          <p class="info-item"><b>Downloads:</b> ${e.downloads}</p>\n        </div>\n      `,t.appendChild(n)})),s=o.totalHits,n.style.display=s>20*a?"block":"none"):(t.innerHTML="",n.style.display="none",Notify.failure("Sorry, there are no images matching your search query. Please try again."))}e.addEventListener("submit",(async e=>{e.preventDefault(),a=1,s=0,t.innerHTML="";const n=e.target.searchQuery.value;""!==n.trim()&&i(n)})),n.addEventListener("click",(()=>{const t=e.searchQuery.value;""!==t.trim()&&(a++,i(t,a))}));
//# sourceMappingURL=index.6208933c.js.map
