const container = document.getElementById("container")
const input = document.getElementById("input")
const notfind = document.getElementById("notfound")

document.getElementById("search").addEventListener("click",function(){

    (async () => {
        if(await searchData(input.value)){
            container.innerHTML = await searchData(input.value)
        }else{
            notfind.innerHTML = `Unable to find what you're looking for.Please try another search`
        }
        
            
    })()
})   

  async function searchData(userinput){
    let generatelist = []
    let idList = []
    html = ""
    try{
        const res = await fetch(`http://www.omdbapi.com/?s=${userinput}&apikey=d868482e`)
        const data = await res.json()
        for (item of data.Search){
            idList.push(item.imdbID)  
        }
        for (id of idList){
            const resBasedID = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=d868482e`)
            const basedID = await resBasedID.json()
            generatelist.push(basedID)
            if (basedID.Poster!= "N/A"){
            html += ` 
                        <div class="itemWarpper">
                                    
                            <div class="mainimage">
                                <img id ="mainimg"src="${basedID.Poster}" alt="Poster">
                            </div>                             
                            <div class="informations">
                                <div class="title">
                                    <h1 id="title">${basedID.Title}</h1>
                                    <div><img src="star.png" alt="star"></div>
                                    
                                    <p id="rating">${basedID.imdbRating}</p>
                                </div>
                                <div class="info">
                                    <p id="runtime">${basedID.Runtime}</p>
                                    <p id = "genre">${basedID.Genre}</p>
                                    <div class="watchlist">
                                        <img src="add.png" alt="">
                                        <p>Watchlist</p>
                                    </div>
                                </div>
                                <p id="plot">${basedID.Plot}</p>
    
                            </div>
                        </div>`
            }
           
        }
        
    return html
    

    }catch(error){
        

    }
    
   
    

}
