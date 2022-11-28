
const container = document.getElementById("container")
const input = document.getElementById("input")
const findfimtxt = document.getElementById("findfilm")
const searchsec = document.getElementById("searchsection")
const watchlistBtn = document.getElementById("watchlistbtn")
let whachlistID = []

async function getMovieId(userinput){
    let idList = []
    try{
        const res = await fetch(`http://www.omdbapi.com/?s=${userinput}&apikey=d868482e`)
        const data = await res.json()
        for (item of data.Search){
            idList.push(item.imdbID)  
        }
        return idList

    }catch(error){
        console.log(error)
    }
}


async function getByTitle(idlists){
    let generatelist = []
    for (item of idlists){
        const resBasedID = await fetch(`http://www.omdbapi.com/?i=${item}&apikey=d868482e`)
        const basedID = await resBasedID.json()
        generatelist.push(basedID)       
    }
    return generatelist 
}


document.getElementById("search").addEventListener("click",function(){
    (async () => {
        const listOfId = await getMovieId(input.value)
        
        if(listOfId){
           const fullDetails = await getByTitle(listOfId)
            container.innerHTML = render(fullDetails)
        }else{
        
            container.innerHTML = `
            <div class="notfound" id="notfound">
               Unable to find what you're looking for.Please try another search
            </div> 
            `
        }
    })()
})   

 

document.addEventListener("click",function(e){
   let id = e.target.id
    if (id[0]==="t"&&id[1]==="t"){
        whachlistID.push(e.target.id)
    }   
    
})

function render(list){
    let html = ""
    if (list.Poster != "N/A"){
        for (item of list){
            html += ` 
                    <div class="itemWarpper">
                                
                        <div class="mainimage">
                            <img id ="mainimg"src="${item.Poster}" alt="Poster">
                        </div>                             
                        <div class="informations">
                            <div class="title">
                                <h1 id="title">${item.Title}</h1>
                                <div><img src="star.png" alt="star"></div>
                                <p id="rating">${item.imdbRating}</p>
                            </div>
                            <div class="info">
                                <p id="runtime">${item.Runtime}</p>
                                <p id = "genre">${item.Genre}</p>
                                <div class="watchlist">
                                    <img class = "watchlist" src="add.png" alt="add to watchlist" id="${item.imdbID}">
                                    <p>Watchlist</p>
                                </div>
                            </div>
                            <p id="plot">${item.Plot}</p>

                        </div>
                    </div>`
        }
    }
    
   return html
}


watchlistBtn.addEventListener("click",function(){
    (async () => {
        if(whachlistID){
            findfimtxt.textContent="Here is your Watchlist"
            searchsec.style.display = "none"
            watchlistBtn.textContent = ""

           const fullDetails = await getByTitle(whachlistID)
            container.innerHTML = render(fullDetails)

        }else{
        
            container.innerHTML = `
            <div class="notfound" id="notfound">
               Unable to find what you're looking for.Please try another search
            </div> 
            `
        }
    })()
})


