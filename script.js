// NYT books
const API_KEY = 'ewOAsZyye7rBfMGPtZz7Mh3nmdazN7hM';
let last = `?api-key=${API_KEY}`;
let first = `https://api.nytimes.com/svc/books/v3/lists/`;
let urlOptions = {
  author: '',
  genre: '',
  query: '',
  page: 1,
  limit: 10
};

const getURL = (urlOptions) => {
  let url = Object.keys(urlOptions).reduce((url, option) => {
    if (urlOptions[option]) {
      url += `${urlOptions[option]}`;
    }
    return url;
  }, first);
  url += last;
  return url;
};

const getArticles = async () => {
  // document.getElementById("news-list").innerHTML = "L O A D I N G... ";
  let url = 'https://quote-garden.herokuapp.com/api/v3/quotes?limit=50';
  try {
    const response = await fetch(url);
    const data = await response.json();
    // newsList = data.articles;
    console.log(data);
    // renderSources(newsList);
    // renderArticles(newsList);
  } catch (error) {
    console.log(error);
  }
};

getArticles();