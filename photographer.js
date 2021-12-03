function fetchData() {
    fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                throw Error('ERROR');
            }
            return response.json();
        })
        .then(data => {
            let photographers = data.photographers;
            let media = data.media;

            let url_string = window.location.href
            let url = new URL(url_string);
            let c = url.searchParams.get("id");

            let id = String(c);

            let filto = photographers.filter(item => item.id == id)
            let nome = filto.map(i => i.name)
            let città = filto.map(i => i.city)
            let paese = filto.map(i => i.country)
            let messaggio = filto.map(i => i.tagline)
            let immagine = filto.map(i => i.portrait)
            let tags = filto.map(i => i.tags)
            let prezzo = filto.map(i => i.price)

            let filto2 = media.filter(item => item.photographerId == id)
            let img = filto2.map(i => i.image)
            let titles = filto2.map(i => i.title)
            let likes = filto2.map(i => i.likes)
            let somma = 0;

            for (let i = 0; i < likes.length; i++) {
                somma += likes[i];
            }
            let filto3 = media.filter(item => item.id == 2523434634);
            createPhotographerPage(nome, città, paese, messaggio, immagine, somma, prezzo);

            filto2.forEach(element => {
                if (element.image == undefined) {
                    let pos = document.getElementById("here");
                    pos.innerHTML +=
                        `<div class="post">
                    <a href="singlePhoto.html?id=${element.id}"><video class="image" controls><source src="img/${nome}/${element.video}" type="video/mp4"></video></a>
                    <div class="image-under">
                    <p class="post-title">porco${element.title}</p>
                    <div class="like">
                        <p>${element.likes}</p>
                        <i class="fas fa-heart"></i>
                    </div></div></div>`
                }
                let pos = document.getElementById("here");
                pos.innerHTML +=
                    `<div class="post">
                <a href="singlePhoto.html?id=${element.id}"><img  src="img/${nome}/${element.image}" class="image"></img></a>
                <div class="image-under">
                    <p class="post-title">${element.title}</p>
                    <div class="like">
                        <p>${element.likes}</p>
                        <i class="fas fa-heart"></i>
                    </div>
                </div></div>`
            });
        })
}

function createPhotographerPage(nome, città, paese, messaggio, immagine, somma, prezzo) {
    let place = document.getElementById("q");

    place.innerHTML +=
        `<div class="presentation-3">
        <div class="colonna-1">
        <div class="presentation-3__block">
        <h1>${nome}</h1> 
        <p class="presentation-1__position">${città} , ${paese}</p> 
        <p class="presentation-1__message">${messaggio}</p> 
        </div> 
        </div> 
        <div class="colonna-2"><div class="button"><p>Contactez-moi</p></div></div> 
        <img class="colonna-3" src="img/Photographers ID Photos/${immagine}"></div> 
        <div class="filter"><label>Tier par</label><div class="button"><p>Popularité</p></div></div> 
        <div class="image-container" id="here"> </div> 
        <div class="fixed"> 
        <p>${somma} like</p> 
        <p>${prezzo}€ /jour</p> 
        </div>`
}

fetchData();