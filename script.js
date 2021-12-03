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

            for (let i = 0; i < photographers.length; i++) {
                createPhotographerCard(
                    photographers[i].portrait,
                    photographers[i].name,
                    photographers[i].city + "," + photographers[i].country,
                    photographers[i].tagline,
                    photographers[i].price,
                    photographers[i].id,
                    photographers[i].tags
                )
            }
        })
}

function createPhotographerCard(immagine, nome, posizione, messaggio, prezzo, id, tags) {
    let element = document.getElementById("q");
    element.classList.add('index-main')
    const photoLocation = "img/Photographers ID Photos/";
    let link = "photographer.html?id=";

    element.innerHTML +=
        `<div class="presentation-2 index-main__presentation">
        <a class="lnk" href="${link}${id}"><img src="${photoLocation}${immagine}" alt=""></a>
        <div class="presentation-2__text" id="presentation-2__text">
        <a class="lnk"><h2> ${nome} </h2></a>
        <p class="presentation-2__position"> ${posizione} </p>
        <p class="presentation-2__message"> ${messaggio} </p>
        <p class="price" id="qui"> ${prezzo} €/jour</p>
        </div></div>`
}

fetchData();