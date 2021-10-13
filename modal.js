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
const patterns = {
    first: /^[a-z]{2,}$/i,
    last: /^[a-z]{2,}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{3})$/,
    birthdate: /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    quantity: /^[1-9]+$/,
}
const firstSecondNamePattern = /^[a-z]{1,10}$/
const datePattern = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/
const emailPattern = /^(a-zA-Z0-9\._]+)@(a-zA-Z0-9])+.([a-z]{3})$/


//Event Listener

const inputs = document.querySelectorAll('input');

function validate(field, regex) {
    if (regex.test(field.value)) {
        console.log('BRAVOH')
    } else {
        console.log(field.value)
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        validate(e.target, patterns[e.target.attributes.name.value])
    })
})

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
    } else if (pre > 0 && pre < 2) {
        prenomErrors.push('Veuillez entrer 2 caractères ou plus pour le champ du prenom.')
    } else {
        succes++;
    }

    //Nom
    if (no === 0) {
        nomErrors.push('Entrer le nom')
    } else if (no > 0 && no < 2) {
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
        succesMessages.push("Merci ! Votre réservation a été reçue");
        closeModal();

        openSuccess.style.display = "block";
        /*setTimeout(function() {
            openSuccess.style.display = "none";;
        }, 4000);*/
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