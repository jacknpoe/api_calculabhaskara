//***********************************************************************************************
// AUTOR: Ricardo Erick Rebêlo
// Objetivo: consome a API de retorno de JSON com o resultado da fórmula de Bhaskara
// Alterações:
// 0.1   29/12/2023 - primeira implementação
// 0.2   30/12/2023 - aceita apenas núneros, - e "," nos inputs
// 0.3   30/12/2023 - verifica isNaN e simplificado o código para coversão em float
// 0.4   30/12/2023 - funciona no mobile a limitação

const tn1 = window.document.getElementById("txtn1")
const tn2 = window.document.getElementById("txtn2")
const tn3 = window.document.getElementById("txtn3")
const resultado = window.document.getElementById("res")
const botao = window.document.getElementById("botao")

botao.addEventListener("click", (evt) => {
    // converte em float, trocando vírgula por ponto antes
    var num_a = Number.parseFloat( tn1.value.replace(",", "."));
    var num_b = Number.parseFloat( tn2.value.replace(",", "."));
    var num_c = Number.parseFloat( tn3.value.replace(",", "."));

    // avalia se a, b e c são realmente números, para não travar o script
    if( isNaN(num_a)) {
        alert("O valor de a não é um número!");
        tn1.focus();
        return;
    }

    if( isNaN(num_b)) {
        alert("O valor de b não é um número!");
        tn2.focus();
        return;
    }

    if( isNaN(num_c)) {
        alert("O valor de c não é um número!");
        tn3.focus();
        return;
    }

    // dados enviados para a API (a, b, c)
    const dados = {
        valor_a: num_a,
        valor_b: num_b,
        valor_c: num_c
    }

    // cabeçalho indica que é post e os dados no corpo
    const cabecalho = {
        method: "post",
        body: JSON.stringify(dados)
    }

    // chama a API
    fetch("api_calculabhaskara.php", cabecalho)
    .then(res => res.json())
    .then(res => {
        resultado.innerHTML = `Resultado: ${res}`;
    })
})

// constantes e funções que impedem digitar letras, entre outros
const permitidas = "0123456789,-";

function mascara(valor){
    let resultado = "";
    const tamanho = valor.length;
    for(let i = 0; i < tamanho; i++){
        if(permitidas.includes(valor[i])){
            resultado += valor[i];
        }
    }
    return resultado;
}

tn1.addEventListener("input", (evt) => {
    tn1.value = mascara(tn1.value)  ;
})

tn2.addEventListener("input", (evt) => {
    tn2.value = mascara(tn2.value)  ;
})

tn3.addEventListener("input", (evt) => {
    tn3.value = mascara(tn3.value)  ;
})
