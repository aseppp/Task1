// Function button submit pada from
function submitData() {

    // Get element menggunakan metode getElementByID
    let nameUser = document.getElementById('input-name');
    let email = document.getElementById('input-email');
    let phone = document.getElementById('input-phone');
    let chose = document.getElementById('input-subject');
    let message = document.getElementById('input-message');

     // Variable untuk email pemilik/owner
     const emailOwner = "saepudinasep86@gmail.com"

    // Untuk mengidentifikasi element yang berisi value dari input
    nameUser = nameUser.value;
    email = email.value;
    phone = phone.value;
    chose = chose.value;
    message = message.value;


    // Kondisi untuk checkbox
    // Variable untuk element checkbox
    let html = document.getElementById('html');
    let css = document.getElementById('css');

    // Untuk mengidentifikasi element yang berisi value dari input
    html = html.checked;
    css = css.checked;

    if (html) {
        html = (document.getElementById('html').value)
    } else {
        html = ""
    }

    if (css) {
        css = (document.getElementById('css').value);
    } else {
        css = ""
    }


    // Kondisi untuk check form sudah terisi semua atau belum
    if (nameUser == '') {
        alert("Anda harus mengisi nama")
    } else if (email == ''){
        alert("Anda harus mengisi email")
    } else if (phone == '') {
        alert("Anda harus mengisi nomor telepon")
    } else if (chose == '') {
        alert("Anda harus mengisi subject")
    } else if (message == '') {
        alert("Anda harus memberikan pesan")
    } else {
        let a = document.createElement('a');
        a.href = `mailto: ${emailOwner}?subject=${chose}&body=Halo nama saya, ${nameUser}, pesan saya ${message}, skill yang dibutuhkan ${html} ${css}`;
        a.click()
    }
}