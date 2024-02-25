const apikey = '298e2ee8ed604d5b9158205c2712a0a3'

const blog = document.getElementById('blog-container');

const searchfield = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function random(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response =await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Failed to fetch",error)
        return [];
    }
}

searchButton.addEventListener('click',async()=>{
    const query = searchfield.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            display(articles)
        }catch(error){
            console.log("Failed to fetch",error);
        }
    }
})

async function fetchNewsQuery(query) {
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response =await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Failed to fetch",error)
        return [];
    }
}

function display(articles){
    blog.innerHTML="";
    articles.forEach((article)=> {
           const blogCard = document.createElement("div");
           blogCard.classList.add("blog-card");
           const img = document.createElement("img");
           img.src = article.urlToImage;
           img.alt = article.title;
           const title = document.createElement("h2");

           const truncatedTitle = article.title.length>30?article.title.slice(0,30)+"......":article.title;

           title.textContent = truncatedTitle;

           const description = document.createElement("p")

           const truncatedDes = article.description.length>10 ?article.description.slice(0, 120)+".....":article.description;

           description.textContent = truncatedDes;

           blogCard.appendChild(img)
           blogCard.appendChild(title)
           blogCard.appendChild(description)
           blogCard.addEventListener("click",()=>{
               window.open(article.url,"_blank");
           })
           blog.appendChild(blogCard)
    })
}

(async()=>{
    try{
        const articles = await random();
        display(articles);
    }catch(error){
        console.error("error fetching",error);
    }
})();