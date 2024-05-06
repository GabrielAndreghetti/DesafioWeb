document.addEventListener('DOMContentLoaded', function() {
    let nome = document.querySelector("#firstName");
    let nomeHelp = document.querySelector("#firstNameHelp");
    let ano = document.querySelector("#birthYear");
    let anoHelp = document.querySelector("#birthYearHelp");
    let email = document.querySelector("#email");
    let emailHelp = document.querySelector("#emailHelp");
    let senha = document.querySelector("#password");
    let senhaHelp = document.querySelector("#passwordHelp");
    let meter = document.querySelector("#passStrengthMeter");

    nome.addEventListener('focusout', validarNome);
    ano.addEventListener('focusout', validarAno);
    email.addEventListener('focusout', validarEmail);
    senha.addEventListener('focusout', validarSenha);
});

function validarNome() {
    const regexNome = /^[a-zA-Z ]{7,}$/;
    if (!regexNome.test(nome.value)) {
        nomeHelp.textContent = "O nome deve conter apenas letras e ter no mínimo 7 caracteres";
        nomeHelp.style.color = "red";
        return false;
    } else {
        nomeHelp.textContent = "";
        return true;
    }
}

function validarAno() {
    const valorAno = parseInt(ano.value, 10);
    if (isNaN(valorAno) || valorAno < 1900 || valorAno > 2022) {
        anoHelp.textContent = "O ano de nascimento deve ser entre 1900 e 2022";
        anoHelp.style.color = "red";
        return false;
    } else {
        anoHelp.textContent = "";
        return true;
    }
}

function validarEmail() {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.(com|br|net|org)$/;
    if (!regexEmail.test(email.value)) {
        emailHelp.textContent = "O email deve ter um formato válido (ex: usuario@exemplo.com)";
        emailHelp.style.color = "red";
        return false;
    } else {
        emailHelp.textContent = "";
        return true;
    }
}

function validarSenha() {
    const regexCaractereEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const regexNumero = /\d/;
    const regexLetra = /[a-zA-Z]/;
    const regexLetraMaiuscula = /[A-Z]/;

    const temCaractereEspecial = regexCaractereEspecial.test(senha.value);
    const temNumero = regexNumero.test(senha.value);
    const temLetra = regexLetra.test(senha.value);
    const temLetraMaiuscula = regexLetraMaiuscula.test(senha.value);

    if (senha.value.length < 6 || senha.value.length > 20 || !temCaractereEspecial || !temNumero || !temLetra) {
        senhaHelp.textContent = "Senha deve conter entre 6-20 caracteres, incluindo números, letras e caracteres especiais";
        senhaHelp.style.color = "red";
        meter.value = 0;
        return false;
    }

    let forca = 0;
    let color = "red";
    if (senha.value.length >= 8 && temCaractereEspecial && temNumero && temLetraMaiuscula) {
        forca = 20;
        color = "orange";
        if (senha.value.length > 12 && regexCaractereEspecial.test(senha.value)) {
            forca = 30;
            color = "green";
        }
    }

    meter.value = forca;
    meter.style.backgroundColor = color;
    senhaHelp.textContent = forca === 10 ? "Senha Fraca" : forca === 20 ? "Senha Moderada" : "Senha Forte";
    senhaHelp.style.color = color;
    return true;
}
