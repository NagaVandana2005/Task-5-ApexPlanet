
const allItems = [
  { name: 'Rose Midi', price: 45, tags: ['casual'], img: 'https://source.unsplash.com/featured/?midi,dress' },
  { name: 'Blazer Top', price: 70, tags: ['formal'], img: 'https://source.unsplash.com/featured/?blazer,woman' },
  { name: 'Beach Gown', price: 120, tags: ['party'], img: 'https://source.unsplash.com/featured/?gown,fashion' },
  { name: 'Denim Set', price: 55, tags: ['casual'], img: 'https://source.unsplash.com/featured/?denim,set' },
  { name: 'Office Skirt', price: 48, tags: ['formal'], img: 'https://source.unsplash.com/featured/?skirt,office' },
  { name: 'Boho Chic', price: 95, tags: ['party'], img: 'https://source.unsplash.com/featured/?boho,woman' },
  { name: 'Winter Coat', price: 135, tags: ['formal'], img: 'https://source.unsplash.com/featured/?coat,woman' },
  { name: 'Casual Tee', price: 30, tags: ['casual'], img: 'https://source.unsplash.com/featured/?casual,tee' }
];

let currentPage = 1;
const perPage = 4;

function displayItems() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const price = document.getElementById('priceFilter').value;
  const tag = document.getElementById('tagFilter').value;

  let filtered = allItems.filter(item =>
    item.name.toLowerCase().includes(search) &&
    (tag === 'all' || item.tags.includes(tag)) &&
    (price === 'all' || (price === 'low' && item.price < 50) ||
     (price === 'mid' && item.price >= 50 && item.price <= 100) ||
     (price === 'high' && item.price > 100))
  );

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageItems = filtered.slice(start, end);

  document.getElementById('shop').innerHTML = pageItems.map(item => `
    <div class="card">
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">$${item.price}</p>
      <p class="tags">Tags: ${item.tags.join(', ')}</p>
      <button class="add">Add</button>
      <button class="buy">Buy</button>
    </div>`).join('');

  document.getElementById('pageNum').innerText = currentPage;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayItems();
  }
}

function nextPage() {
  currentPage++;
  displayItems();
}

['searchInput', 'priceFilter', 'tagFilter'].forEach(id =>
  document.getElementById(id).addEventListener('input', () => {
    currentPage = 1;
    displayItems();
  })
);

displayItems();
