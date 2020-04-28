/*
  Please add all Javascript code to this file.
*/

// import {newsAPIKey} from './keys';

// console.log(newsAPIKey);

var url = 'http://newsapi.org/v2/top-headlines?' +
  'country=us&' +
  'apiKey=a2a6c013d07142f1a1a9ff2268829094';

var req = new Request(url);
fetch(req)
.then(function(response) {
  return response.json();
}).then((data) => {
  console.log(data);

  updateSourcesList(data);
  updateArticleMenu(data);
  

});

// Updates sources list in drop down menu by creating new li w/ a
const updateSourcesList = (data) => {

  let sources = [];

  for (let i=0;i<data.articles.length;i++) {
    let source = data.articles[i].source.name
    sources.push(source);
  }

  let uniqueSources = Array.from(new Set(sources));
  uniqueSources = uniqueSources.slice(0, 10)

  for (let i=0;i<uniqueSources.length;i++) {
    $('.source-list').append(`<li><a href="#">${uniqueSources[i]}</a></li>`);
  }


  console.log(sources);
  console.log(uniqueSources);

}

// Updates article menu


const updateArticleMenu = (data) => {

  for (let i=0;i<data.articles.length;i++) {
    const title = data.articles[i].title;
    const formatTitle = title.split(' - ')[0];
    const source = data.articles[i].source.name;
    const url = data.articles[i].url;
    const image = data.articles[i].urlToImage;
    const content = data.articles[i].content;

    const articleHTML = `
    <section class="featuredImage">
      <img src=${image} alt="" />
    </section>
    <section class="articleContent">
      <a href=${url} target='_blank'><h3>${formatTitle}</h3></a>
      <h6>${source}</h6>
    </section>
    <section class="impressions">
      526
    </section>
    <div class="clearfix"></div>
    `

    $('#main').append('<article class="article"></article>')

    let $article = $('.article')[i]
    $article.innerHTML = articleHTML;

    


  }
}







// const sources = [
//   {
//     name: 'Hacker news',
//     url: 'http://thedailywtf.com/api/articles/2015/12'

//   },
//   {name: 'Daily WTF',
//   url: 'example.com/query'
// }
// ]

// $('header nav a').click(() => {

// });


// fetch daily wtf
  // fetch('https://cors-anywhere.herokuapp.com/http://thedailywtf.com/api/articles/2020/04')
  // .then((response) => {
  //   return response.json();
  // })
  // .then((data) => {
  //   console.log(data);
  // });