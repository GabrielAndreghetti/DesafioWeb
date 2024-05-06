document.addEventListener('DOMContentLoaded', function() {
    const nome = document.querySelector("#firstName");
    const nomeHelp = document.querySelector("#firstNameHelp");
    const ano = document.querySelector("#birthYear");
    const anoHelp = document.querySelector("#birthYearHelp");
    const email = document.querySelector("#email");
    const emailHelp = document.querySelector("#emailHelp");
    const senha = document.querySelector("#password");
    const senhaHelp = document.querySelector("#passwordHelp");
    const meter = document.querySelector("#passStrengthMeter");

    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário antes de validar
        if (validateForm()) {
            this.submit(); // Se a validação for verdadeira, envia o formulário
        }
    });
    
    function validateForm() {
        let valid = true;
        valid &= validarNome();
        valid &= validarAno();
        valid &= validarEmail();
        valid &= validarSenha();

        return valid; // Retorna verdadeiro se todas as validações passarem
    }

    function validarNome() {
        const regexNome = /^[A-Za-z ]{7,}$/;
        if (!regexNome.test(nome.value.trim())) {
            nomeHelp.textContent = "O nome deve conter apenas letras e ter no mínimo 7 caracteres.";
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
            anoHelp.textContent = "O ano de nascimento deve ser entre 1900 e 2022.";
            anoHelp.style.color = "red";
            return false;
        } else {
            anoHelp.textContent = "";
            return true;
        }
    }

    function validarEmail() {
        const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.(com|br|net|org)$/;
        if (!regexEmail.test(email.value.trim())) {
            emailHelp.textContent = "O email deve ter um formato válido (ex: usuario@exemplo.com).";
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

        const valorSenha = senha.value.trim();
        const temCaractereEspecial = regexCaractereEspecial.test(valorSenha);
        const temNumero = regexNumero.test(valorSenha);
        const temLetra = regexLetra.test(valorSenha);
        const temLetraMaiuscula = regexLetraMaiuscula.test(valorSenha);

        if (valorSenha.length < 6 || valorSenha.length > 20 || !temCaractereEspecial || !temNumero || !temLetra) {
            senhaHelp.textContent = "Senha deve conter entre 6-20 caracteres, incluindo números, letras e caracteres especiais.";
            senhaHelp.style.color = "red";
            meter.value = 0;
            return false;
        }

        let forca = 0;
        let color = "red";
        if (valorSenha.length >= 8 && temCaractereEspecial && temNumero && temLetraMaiuscula) {
            forca = 20;
            color = "orange";
            if (valorSenha.length > 12 && regexCaractereEspecial.test(valorSenha)) {
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
});
