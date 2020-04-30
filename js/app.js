/*
  Please add all Javascript code to this file.
*/

var url = 'http://newsapi.org/v2/top-headlines?' +
  'country=us&' +
  'apiKey=' + newsAPIKey;

var req = new Request(url);
fetch(req)
.then(function(response) {
  return response.json();
}).then((data) => {
  console.log(data);

  updateSourcesList(data);
  updateArticleMenu(data);
  addClickEvents(data);

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

  $('.source-list li a').click((e) => {
    let clickedSource = e.currentTarget.innerHTML
    if (sources.includes(clickedSource)) {
      console.log('true');
    }

  });


  console.log(sources);
  console.log(uniqueSources);

}

// Updates article menu with titles, url, etc
const updateArticleMenu = (data) => {

  for (let i=0;i<data.articles.length;i++) {
    const title = data.articles[i].title;
    const formatTitle = title.split(' - ')[0];
    const source = data.articles[i].source.name;
    const image = data.articles[i].urlToImage;
    const views = (Math.random(100) * 10000).toFixed(0);

    const articleHTML = `
    <section class="featuredImage">
      <img src=${image} alt="" />
    </section>
    <section class="articleContent" id=${i} >
      <a href='#'><h3>${formatTitle}</h3></a>
      <h6>${source}</h6>
    </section>
    <section class="impressions">
      ${views}
    </section>
    <div class="clearfix"></div>
    `

    $('#main').append('<article class="article"></article>')

    let $article = $('.article')[i]
    $article.innerHTML = articleHTML;

  }
}



//Attach click event to article class to toggle pop-up
const addClickEvents = (data) => {

  $('.articleContent').click((e) => {
    const id = e.currentTarget.id;
    const title = data.articles[id].title;
    const formatTitle = title.split(' - ')[0];
    const description = data.articles[id].description;
    const url = data.articles[id].url;

    $('div.container h1').text(formatTitle);
    $('.container p').text(description);
    $('a.popUpAction').attr(`ahref, ${url}`)

  $('#popUp').removeClass('hidden loader');
    // .appendTo( $(`#${id}.articleContent`) );
  });

  $('.closePopUp').click(() => {
    $('#popUp').addClass('hidden');
  });
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