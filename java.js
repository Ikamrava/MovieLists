const container = document.getElementById("container")

async function searchData(){
    let generatelist = []
    let idList = []
    html = ""
    const res = await fetch("http://www.omdbapi.com/?s=Blade runner&apikey=d868482e")
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

}

(async () => {
    console.log(await searchData())
    container.innerHTML = (await searchData())
    
  })()


  
// const resId = await fetch(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=d868482e`)
// const dataBasedOnID = resId.json()