let newsList = [];
let news = '';
let targetCode = '';
let targetCategory = '';
let countryCode = document.querySelectorAll('.navLink');
let category = document.querySelectorAll('.dropdown-item');
let navbar = document.querySelector('#navbarNavDropdown');
let myHttp = new XMLHttpRequest();
// complete your code here
navbar.addEventListener('click' , function(){
    for(let i = 0; i < countryCode.length; i++)
    {
        countryCode[i].addEventListener('click', function(eventInfo){
            targetCode = eventInfo.target.getAttribute('countryCode');
            getNews(targetCode, targetCategory);
            console.log(targetCode);
        })
    }
    for(let i = 0; i < category.length; i++)
    {
        category[i].addEventListener('click', function(eventInfo){
            targetCategory = eventInfo.target.getAttribute('category');
            getNews(targetCode, targetCategory);
            console.log(targetCode);
        })
    }
})

// Get News From News API
function getNews(countryCode = 'eg', category = 'business'){
    myHttp.open('GET', `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=2cafced6873940df97567247716a4169`);
    myHttp.send();
    myHttp.addEventListener('readystatechange' , function(){
    if(myHttp.readyState === 4)
    {
        newsList = JSON.parse(myHttp.response).articles; 
        displayNews(newsList);
    }
});
};

// display News
function displayNews(arr)
{
    for(let i = 0; i < arr.length; i++)
    {
        news += `<div class="col-md-3">
        <div class="item">
            <img class="w-100" src="${arr[i].urlToImage}">
            <h2>${arr[i].title}</h2>
            <p>author: ${arr[i].source.name}</p>
            <h5>News Source: ${arr[i].author} </h5>
            <p>${arr[i].description}</p>
            <p><a href="${arr[i].url}" target="_blank">Source Website</a></p>
            <p>${arr[i].content}</p>
            <p>${arr[i].publishedAt}</p>
        </div>
    </div>`
    }
    document.querySelector('#rowData').innerHTML = news;
}