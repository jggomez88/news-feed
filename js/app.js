/*
  Please add all Javascript code to this file.
*/

const url = 'http://newsapi.org/v2/top-headlines?' +
  'country=us&' +
  'apiKey=' + newsAPIKey;

const sources = [];

var req = new Request(url);
fetch(req)
.then(function(response) {
  return response.json();
}).then((data) => {
  console.log(data);

  updateSourcesList(data);
  updateArticleMenu(data);
  addClickEvents(data);
  filterDataSource(data);

});

// Updates sources list in drop down menu by creating new li w/ a
const updateSourcesList = (data) => {

  for (let i=0;i<data.articles.length;i++) {
    let source = data.articles[i].source.name
    sources.unshift(source);
  }

  let uniqueSources = Array.from(new Set(sources));

  for (let i=0;i<12;i++) {
    $('.source-list').append(`<li><a href="#">${uniqueSources[i]}</a></li>`);
  }
  // Adds view all to end of source menu
  $('.source-list').append(`<li><a href="#">VIEW ALL</a></li>`);

}

// Updates article menu with titles, url, etc
const updateArticleMenu = (data) => {

  const articleData = data.articles;

  for (let key in articleData) {
    const title = articleData[key].title;
    const formatTitle = title.split(' - ')[0];
    const source = articleData[key].source.name;
    const image = articleData[key].urlToImage;
    const views = (Math.random(100) * 10000).toFixed(0);

    const articleHTML = `
    <section class="featuredImage">
      <img src=${image} alt="" />
    </section>
    <section class="articleContent" >
      <a href='#'><h3>${formatTitle}</h3></a>
      <h6>${source}</h6>
    </section>
    <section class="impressions">
      ${views}
    </section>
    <div class="clearfix"></div>
    `

    $('#main').append(`<article id=${key} class="article"></article>`)

    let $article = $(`#${key}.article`);
    $article[0].innerHTML = articleHTML;

  }
}



//Attach click event to article class to toggle pop-up
const addClickEvents = (data) => {

  $('.articleContent').click((e) => {
    const id = e.currentTarget.parentNode.attributes.id.value;
    const title = data.articles[id].title;
    const formatTitle = title.split(' - ')[0];
    const description = data.articles[id].description;
    const url = data.articles[id].url;

    $('div.container h1').text(formatTitle);
    $('.container p').text(description);
    $('a.popUpAction').attr('href', url);

  $('#popUp').removeClass('hidden loader');
  });

  $('.closePopUp').click(() => {
    $('#popUp').addClass('hidden');
  });

}


 // Filters data based on selected source via dropdown click and search submit
const filterDataSource = (data) => {

  const articleData = data.articles;
  const $search = $('#search');

  // Activates search bar on search image click and filters data on search submit

  $('#search a img').click(() => {

    const filterData = {articles:{}}

    $search.toggleClass('active');
    const $searchInput = $('#search input');

    $searchInput.on('change', (e) => {
      let userSearch = e.target.value

      for (let key in articleData) {
        if(articleData[key].source.name === userSearch) {
          filterData.articles[key] = articleData[key]
          $('.article').remove();
          updateArticleMenu(filterData);
          addClickEvents(filterData);
        }
        if(userSearch === '') {
          $('.article').remove();
          updateArticleMenu(data);
          addClickEvents(data);
          $search.removeClass('active');
        }
    }

    });

  });

// filters data on source dropdown menu click
   $('.source-list li a').click((e) => {

    $('.article').remove();

    const filterData = {articles:{}}

    let clickedSource = e.currentTarget.innerHTML;

    for (let key in articleData) {
      if(articleData[key].source.name === clickedSource) {
        filterData.articles[key] = articleData[key]
    }
  }

  if(clickedSource === 'VIEW ALL') {
    $('.drop-down a span').text('VIEW ALL');
    updateArticleMenu(data);
    addClickEvents(data);
  } else {
    $('.drop-down a span').text(clickedSource);
    updateArticleMenu(filterData);
    addClickEvents(filterData);
  }

  });


}



// Parking Lot

// let $articleSources = $('.articleContent h6').text();


// $articleSources.filter(function() {
//   if ($(this).text() !== clickedSource) {
//     $(this).parentsUntil('#main').css("visibility", "hidden");
//   }
// });


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