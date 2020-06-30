const API_KEY = '03feddc6c6834cacae2825190c984ed2';

// Primeiro conteudo, noticias do Brasil
window.onload = executaPesquisa(1);

function readLocalStorage() {
  let stringData = localStorage.getItem('db');
  let newLocalStorage = {
    savedSearchs: [],
  };

  if (stringData) {
    return JSON.parse(stringData);
  } else {
    saveOnLocalStorage(newLocalStorage);
    return JSON.parse(localStorage.getItem('db'));
  }
}

function saveOnLocalStorage(data) {
  localStorage.setItem('db', JSON.stringify(data));
}

// Renderiza noticias no main
function exibeNoticias() {
  let divTela = document.getElementById('listNews');
  let texto = '';

  // Montar texto HTML das noticias
  let dados = JSON.parse(this.response);
  for (i = 0; i < dados.articles.length; i++) {
    let noticia = dados.articles[i];
    let data = new Date(noticia.publishedAt);

    texto =
      texto +
      `
      <li>
        <img
        src="${noticia.urlToImage}"
        alt="">
        <a href="${noticia.url}" target="blank">
          <div class="info">

          <div class="cabecalho">
            <h2>${noticia.title}</h2>
            <span>${data.toLocaleDateString()} -
             ${noticia.source.name} -
             ${noticia.author}
            </span>
          </div>

          <p>${noticia.content}</p>

          </div>
        </a>
      </li>
`;
  }

  // Preencher a DIV com o texto HTML
  divTela.innerHTML = texto;
}

function search(savedSearch) {
  let inputSearch = document.getElementById('textSearch').value;
  let query = savedSearch ? savedSearch : inputSearch;

  if (query === '') return null;

  let xhr = new XMLHttpRequest();
  xhr.onload = exibeNoticias;
  xhr.open(
    'GET',
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`,
  );
  xhr.send();

  event.preventDefault();

  if (!savedSearch) saveSearchs(query);
}

function saveSearchs(search) {
  let db = readLocalStorage();

  db.savedSearchs.push(search);

  saveOnLocalStorage(db);

  loadPreviusSearchs();
}

function loadPreviusSearchs() {
  let db = readLocalStorage();

  if (!db) return null;

  let ulSearch = document.getElementById('savedSearchs');
  let textResponse = '';

  if (db.savedSearchs.length === 0) return null;

  db.savedSearchs.forEach(search => {
    textResponse += `
      <li onclick="search('${search}')">${search}</li>
    `;
  });

  ulSearch.innerHTML = textResponse;
}

// Retorna dados da API
function executaPesquisa(prop) {
  let country = prop === 1 ? 'br' : 'us';
  let xhr = new XMLHttpRequest();
  xhr.onload = exibeNoticias;
  xhr.onerror = error;
  xhr.open(
    'GET',
    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`,
  );
  xhr.send();

  loadPreviusSearchs();
}

// Retorna dados da API
function executaPesquisaCategoria(prop) {
  let xhr = new XMLHttpRequest();
  xhr.onload = exibeNoticias;
  xhr.onerror = error;
  xhr.open(
    'GET',
    `https://newsapi.org/v2/top-headlines?country=br&category=${prop}&apiKey=${API_KEY}`,
  );
  xhr.send();
}

// Exibe o erro se houver falha na requisição
function error(err) {
  alert(`Erro: ${err}`);
}
