let categories = [];
let filtered = [];

let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
const pageSize = 12; // items per page

document.title = "Interview QA";
document.querySelector("h2").textContent = "Select a Job Role";

async function loadCategories() {
  const res = await fetch("data/tech-jobs.json");
  categories = await res.json();
  filtered = categories; // default
  render();
}

function getPagedData() {
  const start = (currentPage - 1) * pageSize;
  return filtered.slice(start, start + pageSize);
}

function render() {
  const list = document.getElementById("category-list");
  list.innerHTML = "";

  const pageData = getPagedData();

  pageData.forEach(cat => {
    const div = document.createElement("div");
    div.className = "category";

    div.innerHTML = `
      <img loading="lazy" src="${cat.image}" alt="${cat.title}">
    `;

    div.onclick = () => {
      window.location.href = `categories.html?job=${cat.id}&title=${encodeURIComponent(cat.title)}`;
    };

    list.appendChild(div);
  });

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(filtered.length / pageSize);

  // page info display (optional)
   document.getElementById("page-info").textContent =`Page ${currentPage} of ${totalPages || 1}`;

  document.getElementById("prev").disabled = currentPage === 1;
  document.getElementById("next").disabled = currentPage === totalPages;
}

// pagination buttons
document.getElementById("prev").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    localStorage.setItem('currentPage', currentPage);
    render();
  }
};

document.getElementById("next").onclick = () => {
  const totalPages = Math.ceil(filtered.length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    localStorage.setItem('currentPage', currentPage);
    render();
  }
};

// search + reset to page 1
document.getElementById("search").addEventListener("input", (e) => {
  const text = e.target.value.toLowerCase();

  filtered = categories.filter(c =>
    c.title.toLowerCase().includes(text)
  );

  currentPage = 1;
  localStorage.setItem('currentPage', currentPage);
  render();
});

loadCategories();
