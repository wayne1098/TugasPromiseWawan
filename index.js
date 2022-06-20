axios.get('https://newsapi.org/v2/top-headlines?country=id&apiKey=10b07017fe314da1ba834e02b205b90c&i')
    .then(respon => {
        const news = respon.data.articles;
        let card = "";
        news.forEach(s => card += render(s));
        const newsContainer = document.querySelector('.news-container');
        newsContainer.innerHTML = card;
    })
    .catch(err =>{
        card.innerHTML = msg(err.message);
    })
    .finally(() => {
    });
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function(){ 
        const inputKeyword = document.querySelector('.input-keyword');
        const ambilData = await getAmbilData(inputKeyword.value);
        updateUi(ambilData);
});
const card = document.querySelector('.loading');
card.innerHTML = msg('Loading....');
function getAmbilData(keyword){
    return axios.get('https://newsapi.org/v2/everything?from=2022-06-06&to=2022-06-06&sortBy=popularity&apiKey=10b07017fe314da1ba834e02b205b90c&q=' + keyword)
    .then(respon => respon.data.articles);
}
function updateUi(ambilData){
    let card = "";
    ambilData.forEach(s => card += render(s));
    const newsContainer = document.querySelector('.news-container')
    newsContainer.innerHTML = card;
}
function render(s){
    return `<div class="col-md-4 ">
                        <div class="card-fluid mt-4 px-2 pb-2 " style="width: 20rem;">
                            <img src="${s.urlToImage}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${s.title}</h5>   
                                <h6 class="card-subtitle mb-2 text-muted mt-2">${s.author} - ${s.publishedAt}</h6>
                                <p class="card-text mt-3">${s.description}</p>
                                <a href="${s.url}" target="blank" class="btn btn-success">Lihat detail</a>
                            </div>
                        </div>
                    </div>`;
}

function msg(p){
    return '<p style="text-align: center; background-color: grey; color: blue; font-size: 20px;">' + p + '</p>';
}
