function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const modalCloseButton = document.querySelector(".close"); // X close modal button


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

const openSuccess = document.querySelector('.success-container');


let submitBtn = document.getElementsByClassName('btn-submint'); // submit button

// All the form item 
const prenom = document.getElementById('first');
const nom = document.getElementById('last');
const email = document.getElementById('email');
const form = document.getElementById('form');
const birth = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const checkbox = document.getElementById('checkbox1');

//Letter counter
function counting(v) {
    let str = v.value;
    return str.length
}

//Email Pattern
const emailPattern = /^(a-zA-Z0-9\._]+)@(a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/

//Function of validation
modalbg.addEventListener('submit', function(e) {
    e.preventDefault()

    let succes = 0;

    let prenomErrors = [];
    let nomErrors = [];
    let emailErrors = [];
    let birthErrors = [];
    let quantityErrors = [];
    let checkBoxErrors = [];
    let checkBoxSingleErrors = [];
    let succesMessages = [];

    let pre = counting(prenom);
    let no = counting(nom);

    //Prenom
    if (pre === 0) {
        prenomErrors.push('Entrer le prenom')
    } else if (pre > 0 && pre < 3) {
        prenomErrors.push('Veuillez entrer 2 caractères ou plus pour le champ du prenom.')
    } else {
        succes++;
    }

    //Nom
    if (no === 0) {
        nomErrors.push('Entrer le nom')
    } else if (no > 0 && no < 3) {
        nomErrors.push('Veuillez entrer 2 caractères ou plus pour le champ du nom.')
    } else {
        succes++;
    }

    //Email
    function ValidateEmail(email) {
        if (emailPattern.test(myForm.emailAddr.value)) {
            console.log('email valid');
        } else {
            console.log('emial invalid');
        }
    }

    if (counting(email) == 0) {
        emailErrors.push('Veuillez entrer votre email valide')
    } else if (counting(email) < 4) {
        succes++;
    }

    //Birth
    if (birth.value == "") {
        birthErrors.push('Vous devez entrer votre date de naissance.')
    } else {
        succes++;
    }

    //Partecipation number
    if (quantity.value == "") {
        quantityErrors.push('Vous devez entrer la quantitè de partie joue')
    } else {
        succes++;
    }

    //City
    var radios = document.getElementsByName('location');
    cnt = 0;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            succes++;
            break;
        } else if (!radios[i].checked) {
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
        console.log(succes);
        succesMessages.push("C'est parfait");
        closeModal();

        openSuccess.style.display = "block";
        setTimeout(function() {
            openSuccess.style.display = "none";;
        }, 4000);
    }



    //Error messages 
    document.getElementById('prenomError').innerText = prenomErrors;
    document.getElementById('nomError').innerText = nomErrors;
    document.getElementById('emailError').innerText = emailErrors;
    document.getElementById('birthError').innerText = birthErrors;
    document.getElementById('quantityError').innerText = quantityErrors
    document.getElementById('checkBoxError').innerText = checkBoxErrors;
    document.getElementById('checkBox-single').innerText = checkBoxSingleErrors;
    document.getElementById('succes').innerText = succesMessages;


})