const API_KEY = '03feddc6c6834cacae2825190c984ed2';

// Primeiro conteudo, noticias do Brasil
window.onload = executaPesquisa(1);

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
