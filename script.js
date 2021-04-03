const API_KEY = "https://quote-garden.herokuapp.com/api/v3/quotes?";

let quoteList = [];

const urlOptions = {
  author: '',
  genre: '',
  query: '',
  page: 1,
  limit: 20,
};

let optionInit = {
  method: 'GET',
  headers: {
    'message': "Random quotes"
  },
  mode: 'cors',
  cache: 'default'
}

const getURL = (urlOptions) => {
  let url = Object.keys(urlOptions).reduce((url, option) => {
    if (urlOptions[option]) {
      url += `${option}=${urlOptions[option]}&`;
    }
    return url;
  }, `${API_KEY }`);
  return url;
};

const getArticles = async (addToList = false) => {
  let url = getURL(urlOptions);
  const response = await fetch(url, optionInit);
  const data = await response.json();
  quoteList = data.data;
  renderArticles(quoteList);
  renderAuthor(quoteList);
  console.log(quoteList);
};

const renderArticles = (quoteList) => {
  const quoteListHTML = quoteList
    .map((quote) => {
      return `
        <div class="detail__item">
          <div class="upper">
            <div class="upper__quote">
              <blockquote>"${quote.quoteText}"</blockquote>
              <a href="" class="author">${quote.quoteAuthor}</a>
            </div>
            <div class="upper__favorite">
              <button><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg></button>
            </div>
          </div>
          <div class="lower">
            <div class="cate">
              <button><span>${quote.quoteGenre}</span></button>
            </div>
            <div class="social">
              <a href=""><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" class="svg-inline--fa fa-facebook-f fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></a>
              <a href=""><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a>
              <a href=""><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" class="svg-inline--fa fa-linkedin-in fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></a>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  document.getElementById("detail").innerHTML = quoteListHTML;
};

const countingAuthors = (quoteList) => {
  const authorCounter = {};

  quoteList.forEach((element) => {
    if (!(element.quoteAuthor in authorCounter)) {
      authorCounter[element.quoteAuthor] = 1;
    } else {
      authorCounter[element.quoteAuthor] += 1;
    }
  });
  return authorCounter;
};

const renderAuthor = (quoteList) => {
  const authorCounter = countingAuthors(quoteList);
  const authorListHTML = Object.keys(authorCounter)
    .map(
      (author) =>
        `<li><button class="count" onclick="handleAuthorClicked('${author}')">${author}<span>${authorCounter[author]}</span></button></li>`
    )
    .join("");

  document.getElementById("authors").innerHTML = authorListHTML;
};

const handleAuthorClicked = (authorInput) => {
  if (authorInput == '') {
    renderArticles(quoteList);
  } else {
    let filterList = quoteList.filter((quote) => quote.quoteAuthor == authorInput);
    renderArticles(filterList);
  }
};

getArticles();