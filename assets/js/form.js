const emailOwner = "saepudinasep86@gmail.com"

let nameUser = document.getElementById('input-name');
let email = document.getElementById('input-email');
let phone = document.getElementById('input-phone');
let chose = document.getElementById('input-subject');
let skills = document.querySelector('.skills');
let message = document.getElementById('input-message');


function submitData() {
    nameUser = nameUser.value;
    email = email.value;
    phone = phone.value;
    chose = chose.value;
    message = message.value;
    skills = skills.checked;


    if (nameUser === "" || email === "" || phone == "" || chose === "" || message === "") {
        return alert("Anda harus melengkapi data ini!")
    }

    let a = document.createElement('a');
    a.href = `mailto: ${emailOwner}?subject=${chose}&body=Halo nama saya, ${nameUser} pesan saya ${message}, skill anda ${skills}`;
    a.click()
}