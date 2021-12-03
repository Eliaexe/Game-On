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

            let url_string = window.location.href;
            let url = new URL(url_string);
            let c = url.searchParams.get("id");

            let id = String(c);

            let filtro = media.filter(i => i.id == id);
            let idPhot = filtro.map(i => i.photographerId);
            let fotografo = photographers.filter(i => i.id == filtro.map(i => i.photographerId));

            let allMedia = media.filter(i => i.photographerId == idPhot);
            let findMe = allMedia.findIndex(i => i.id == id);
            let element = document.getElementById("q2");

            var i = 0;
            let left = document.getElementById("left");
            let right = document.getElementById("right");
            let obj = allMedia[findMe + i];
            console.log(obj);

            /* function replaceImg (){
                 let str =`<video class="image" controls><source id="video" src="img/${fotografo.map(i => i.name)}/${obj["video"]}" type="video/mp4"></video>`
                 let replaceThis = document.getElementById("img")
                 replaceThis.outerHTML=str
             }*/

            if (obj["image"] == undefined) {
                element.innerHTML +=
                    `
            <video class="image" controls><source id="video" src="img/${fotografo.map(i => i.name)}/${obj["video"]}" type="video/mp4"></video>
            <p id="title" class="post-title">${filtro.map(i => i.title)}</p>
            `
            } else if (obj["video"] == undefined) {
                element.innerHTML +=
                    `
                <img id="img" src="img/${fotografo.map(i => i.name)}/${obj["image"]}">
                <p id="title" class="post-title">${filtro.map(i => i.title)}</p>
                `
            }

            left.addEventListener("click", function removeToI() {
                if (i > 0) {
                    i--;
                    document.getElementById("img").src = `img/${fotografo.map(i => i.name)}/${allMedia[findMe + i]["image"]}`;
                    document.getElementById("title").innerText = (allMedia[findMe + i]["title"]);
                } else {
                    i = allMedia.length - 1;
                    document.getElementById("img").src = `img/${fotografo.map(i => i.name)}/${allMedia[findMe + i]["image"]}`;
                    document.getElementById("title").innerText = (allMedia[findMe + i]["title"]);
                }
            });
            right.addEventListener("click", function removeToI() {

                if (i < allMedia.length - 1) {
                    i++;
                    document.getElementById("img").src = `img/${fotografo.map(i => i.name)}/${allMedia[findMe + i]["image"]}`;
                    document.getElementById("title").innerText = (allMedia[findMe + i]["title"]);
                } else {
                    i = 0;
                    document.getElementById("img").src = `img/${fotografo.map(i => i.name)}/${allMedia[findMe + i]["image"]}`;
                    document.getElementById("title").innerText = (allMedia[findMe + i]["title"]);
                }
            });


        })
}



fetchData();

/*
            if (obj["image"] == undefined) {
                console.log(filtro.map(i => i.video));
                console.log(i);
                left.addEventListener("click", function removeToI() {
                    if (i > 0) {
                        i--;
                        document.getElementById("video").src = `img/${fotografo.map(i => i.name)}/${allMedia[findMe + i]["video"]}`;
                        document.getElementById("title").innerText = (allMedia[findMe + i]["title"]);
                    } else {
                        i = allMedia.length - 1;
                        document.getElementById("video").src = `img/${fotografo.map(i => i.name)}/${allMedia[findMe + i]["video"]}`;
                        document.getElementById("title").innerText = (allMedia[findMe + i]["title"]);
                    }
                });
                right.addEventListener("click", function removeToI() {
                    if (i < allMedia.length - 1) {
                        i++;
                        document.getElementById("video").src = `img/${fotografo.map(i => i.name)}/${allMedia[findMe + i]["video"]}`;
                        document.getElementById("title").innerText = (allMedia[findMe + i]["title"]);
                    } else {
                        i = 0;
                        document.getElementById("video").src = `img/${fotografo.map(i => i.name)}/${allMedia[findMe + i]["video"]}`;
                        document.getElementById("title").innerText = (allMedia[findMe + i]["title"]);
                    }
                });

                let element = document.getElementById("q2");
                element.innerHTML +=
                    `
                    <video class="image" controls><source id="video" src="img/${fotografo.map(i => i.name)}/${obj["video"]}" type="video/mp4"></video>
                        <p id="title" class="post-title">${filtro.map(i => i.title)}</p>
                `
            }
*/