let categories = [];
let filtered = [];

let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
const pageSize = 12; // items per page

const params = new URLSearchParams(window.location.search);
const job = params.get("job") || "android";
const title = params.get("title") || job;

document.title = title;
document.querySelector("h2").textContent = title;

async function loadCategories() {
  if (job === "android") {
    const res = await fetch("data/android.json");
    categories = await res.json();
  }

  if (job === "ai-ml-engineer") {
    const res = await fetch("data/ai-ml.json");
    categories = await res.json();
  }

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
      // open details in fullscreen modal with back button and history support
      (() => {
        history.pushState({ modal: true }, '', window.location.href);

        const modal = document.createElement('div');
        Object.assign(modal.style, {
          position: 'fixed',
          inset: '0',
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
        });

        const topBar = document.createElement('div');
        Object.assign(topBar.style, {
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          background: 'transparent',
        });

        const backBtn = document.createElement('button');
        backBtn.textContent = '← Back';
        Object.assign(backBtn.style, {
          color: '#fff',
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
        });

        const title = document.createElement('div');
        title.textContent = cat.title;
        Object.assign(title.style, { color: '#fff', marginLeft: '8px', fontSize: '16px', fontWeight: '600' });

        topBar.appendChild(backBtn);
        topBar.appendChild(title);

        const iframe = document.createElement('iframe');
        iframe.src = `detail.html?job=${job}&id=${cat.id}`;
        Object.assign(iframe.style, {
          flex: '1 1 auto',
          border: '0',
          width: '100%',
          height: '100%',
          background: '#fff',
        });

        modal.appendChild(topBar);
        modal.appendChild(iframe);
        document.body.appendChild(modal);

        const cleanup = () => {
          if (modal.parentNode) document.body.removeChild(modal);
          window.removeEventListener('popstate', onPop);
        };

        function onPop() {
          cleanup();
        }

        window.addEventListener('popstate', onPop);

        backBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          history.back();
        });

        modal.addEventListener('click', (ev) => {
          if (ev.target === modal) history.back();
        });
      })();
    };

    list.appendChild(div);
  });

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(filtered.length / pageSize);

  // page info display (optional)
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${totalPages || 1}`;

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
