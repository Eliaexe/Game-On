// DOM Elements
const modalbg = document.querySelector(".bground");
const formData = document.querySelectorAll(".formData");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseButton = document.querySelector(".close"); // X close modal button
const succBtn = document.getElementById('success-button');
const submitBtn = document.getElementsByClassName('btn-submint'); // submit button
// All the form item 
const prenom = document.getElementById('first');
const nom = document.getElementById('last');
const email = document.getElementById('email');
const form = document.getElementById('form');
const birth = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const checkbox = document.getElementById('checkbox1');
// Radio Button
const el1 = document.getElementById("location1")
const el2 = document.getElementById("location2")
const el3 = document.getElementById("location3")
const el4 = document.getElementById("location4")
const el5 = document.getElementById("location5")
const el6 = document.getElementById("location6")
    // Regex pattern
const firstSecondNamePattern = /^([a-zA-Z ]){2,30}$/;
const emailPattern = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,})$/;
const quantityPattern = /^[1-9]+$/;
const datePattern = /^((19|2[0-9])[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

//Game Played
['change', 'click', 'keyup'].forEach(e => quantity.addEventListener(e,
    function controllQ() {
        if (quantityPattern.test(quantity.value)) {
            el1.disabled = false;
            el2.disabled = false;
            el3.disabled = false;
            el4.disabled = false;
            el5.disabled = false;
            el6.disabled = false;
            succes++
        } else {
            el1.disabled = true;
            el2.disabled = true;
            el3.disabled = true;
            el4.disabled = true;
            el5.disabled = true;
            el6.disabled = true;
            el1.checked = false;
            el2.checked = false;
            el3.checked = false;
            el4.checked = false;
            el5.checked = false;
            el6.checked = false;
            succes++
        }
    }))

//Function of validation
modalbg.addEventListener('submit', (e) => {
    e.preventDefault();

    let succes = 0;
    document.getElementById('prenomError').innerText = "";

    let prenomErrors = [];
    let nomErrors = [];
    let emailErrors = [];
    let birthErrors = [];
    let quantityErrors = [];
    let checkBoxErrors = [];
    let checkBoxSingleErrors = [];

    const errPrenom = 'Entrer 2 caractères ou plus pour le champ du prenom.';
    const errNom = 'Entrer 2 caractères ou plus pour le champ du nom.';
    const errEmail = 'Veuillez entrer votre email valide';
    const errQuantity = 'Vous devez entrer la quantitè de partie joue';
    const errDate = 'Vous devez entrer votre date de naissance';

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let today6 = (yyyy - 5) + '-' + mm + '-' + dd;
    let yesterday95 = (yyyy - 95) + '-' + mm + '-' + dd;

    function controll(pattern, campo, errore, messaggio) {
        if (pattern.test(campo.value)) {
            succes++
        } else {
            errore.push(messaggio)
        }
    }



    controll(firstSecondNamePattern, prenom, prenomErrors, errPrenom)
    controll(firstSecondNamePattern, nom, nomErrors, errNom)
    controll(emailPattern, email, emailErrors, errEmail)

    //Birthday
    if (birth.value > today6) {
        birthErrors.push("Vous êtes trop jeune pour participer")
    } else if (birth.value === "") {
        birthErrors.push("Veuillez entrer votre date de naissance")
    } else if (birth.value < yesterday95) {
        birthErrors.push("Vous êtes trop vieux pour participer")
    } else {
        controll(datePattern, birth, birthErrors, errDate)
    }

    //City
    var radios = document.getElementsByName('location');
    cnt = 0;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            succes++;
            break;
        } else if (!radios.checked && !quantityPattern.test(quantity.value)) {
            succes++;
            break
        } else if (!radios[i].checked && quantityPattern.test(quantity.value)) {
            cnt++
            if (cnt == 6) {
                checkBoxErrors.push('Vous devez choisir une option.')
            }
        }
    }

    //Condition
    if (checkbox.checked) {
        succes++
    } else {
        checkBoxSingleErrors.push('Vous devez accepter les conditions')
    }

    if (succes == 6) {
        closeModal();
        openSuccess();
    }

    console.log(succes)

    //Error messages     
    document.getElementById('prenomError').innerText = prenomErrors;
    document.getElementById('nomError').innerText = nomErrors;
    document.getElementById('emailError').innerText = emailErrors;
    document.getElementById('birthError').innerText = birthErrors;
    document.getElementById('quantityError').innerText = quantityErrors
    document.getElementById('checkBoxError').innerText = checkBoxErrors;
    document.getElementById('checkBox-single').innerText = checkBoxSingleErrors;
})

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
    modalbg.style.display = "block";

}

modalCloseButton.addEventListener("click", closeModal); //Whaiting che click on the X modal button
function closeModal() {
    modalbg.style.display = "none"; //Closing the modal
}
//Open Success
function openSuccess() {
    document.getElementById("success-container").style.display = "block";
    [prenom, nom, email, birth, quantity, checkbox, modalbg].forEach(e => e.value = "")

}
//Closing success 
function closeSucces() {
    document.getElementById("success-container").style.display = "none";
}