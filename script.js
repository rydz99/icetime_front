const base_url = 'https://protected-brushlands-34522.herokuapp.com/ice'
const myrank_url = 'https://protected-brushlands-34522.herokuapp.com/ice/myrank'
const submit = document.querySelector('.submit')
const row = document.querySelector('.row')
const searchBtn = document.querySelector('.search-btn')
const searchForm = document.querySelector('.search-form')
const veganCheck = document.getElementById('flexSwitchCheckDefault')
const myrankBtn = document.querySelector('.myrank')
let iceData
let vegan

function getIceCreams(url) {
    fetch(url, {
        credentials: "include"
    })
    .then((response) => {
        return response.json()
    })
    .then(data=> {
        iceData = data
        displayIceModels(data)
        // console.log(data)
    })
}

function displayIceModels(data) {
    row.innerHTML = '' 
    data.forEach(ice_cream => {
        const {brand, flavour, description, result, image, review, isVegan} = ice_cream
        const ice_cream_div = document.createElement('div')
        ice_cream_div.classList.add('col-12')
        ice_cream_div.classList.add('col-md-6')
        ice_cream_div.classList.add('col-lg-4')
        let styleBar = result*10

        if(isVegan) vegan = `<img class="vegan-img"src="./vegan.png" alt="">`
        else vegan = ''

        ice_cream_div.innerHTML =        
        `<div class="card card shadow p-3 mb-5 bg-body rounded">
            <h4 class='result'>${result}/10</h4>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${styleBar}" aria-valuemin="0" aria-valuemax="100" style="width: ${styleBar}%"></div>
            </div>
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                ${vegan}
                <h2 class="card-title">${brand}  </h2>
                <h5 class="card-title">${flavour}</h5>
                <p class="card-text">${description}</p>
                <div class="overview">
                    <h4>opinia:</h4>
                    <p>${review}</p>
                    <h4>składniki odżywcze:</h4>
                    <p>brak danych</p>    
                </div>                  
            </div>
        </div> `     
            // hide vegan card when vegan option is on
            if(veganCheck.classList.length == 2 && isVegan == false) {}
            else row.appendChild(ice_cream_div)  
    })
}

window.onload = getIceCreams(base_url)

veganCheck.addEventListener('click', () => {
    veganCheck.classList.toggle('im-vegan')
    displayIceModels(iceData)  
})

myrankBtn.addEventListener('click', () => {
    getIceCreams(myrank_url)
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const searchReq = searchForm.value 
    const custom_url = base_url + '/d=' + searchReq
    getIceCreams(custom_url)  
})

  