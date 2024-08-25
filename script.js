const textArea = document.querySelector(".text__area");
const mensagem = document.querySelector(".mensagem");
const mensagemContainer = document.querySelector(".mensagem__container"); 

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function verificarAcentos(texto) {
    return /[\u0300-\u036f]/.test(texto);
}

function botaoEncriptar() {
    let texto = textArea.value;
    if (verificarAcentos(texto)) {
        alert("O texto não pode conter acentos. Por favor, digite novamente.");
        textArea.value = ""; 
        mensagem.value = "";
        return;
    }
    let textoSemAcentos = removerAcentos(texto);
    const textcriptografado = criptografar(textoSemAcentos); 
    mensagem.value = textcriptografado;
    textArea.value = ""; 
    esconderImagem(); 
}

function criptografar(stringcriptografar) {
    let codigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]; 
    stringcriptografar = stringcriptografar.toLowerCase(); 

    for(let i = 0; i < codigo.length; i++) {
        if (stringcriptografar.includes(codigo[i][0])) {
            stringcriptografar = stringcriptografar.replaceAll(codigo[i][0], codigo[i][1]);
        }
    }
     return stringcriptografar; 
}

function botaoDesencriptar() {
    let texto = textArea.value;
    if (verificarAcentos(texto)) {
        alert("O texto não pode conter acentos. Por favor, digite novamente.");
        textArea.value = ""; 
        mensagem.value = "";
        return;
    }

    let textoSemAcentos = removerAcentos(texto);
    const textdesencriptografado = desencriptografar(textoSemAcentos); 
    mensagem.value = textdesencriptografado;
    textArea.value = " ";
    esconderImagem(); 
}

function desencriptografar(stringdesencriptografar) {
    let codigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]; 
    stringdesencriptografar = stringdesencriptografar.toLowerCase(); 

    for(let i = 0; i < codigo.length; i++) {
        if (stringdesencriptografar.includes(codigo[i][1])) {
            stringdesencriptografar = stringdesencriptografar.replaceAll(codigo[i][1], codigo[i][0]);
        }
    }
     return stringdesencriptografar; 
}

function botaoCopiar() {
    const textoParaCopiar = mensagem.value;
    copiarTexto(textoParaCopiar);
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto copiado com sucesso!");
            mensagem.value = "";
            esconderImagem();
        })
        .catch(err => {
            console.error('Erro ao copiar o texto: ', err);
        });
}

function esconderImagem() {
    if (mensagem.value.trim() !== "") {
        mensagem.style.backgroundImage = "none";
    } else {
        mensagem.style.backgroundImage = "url(/image/fundo-rosa.png)"; 
    }
}
mensagem.addEventListener("input", esconderImagem);