//***********************************************************************************************
// AUTOR: Ricardo Erick Rebêlo
// Objetivo: consome a API de retorno de JSON com o resultado da fórmula de Bhaskara
// Alterações:
// 0.1   29/12/2023 - primeira implementação

const tn1 = window.document.getElementById("txtn1")
const tn2 = window.document.getElementById("txtn2")
const tn3 = window.document.getElementById("txtn3")
const resultado = window.document.getElementById("res")
const botao = window.document.getElementById("botao")

botao.addEventListener("click", (evt) => {
    var txt_a = tn1.value;
    var txt_b = tn2.value;
    var txt_c = tn3.value;
    txt_a = txt_a.replace(/,/g, ".");
    txt_b = txt_b.replace(/,/g, ".");
    txt_c = txt_c.replace(/,/g, ".");
    txt_a = txt_a.replace(/ /g, "");
    txt_b = txt_b.replace(/ /g, "");
    txt_c = txt_c.replace(/ /g, "");
    var num_a = Number.parseFloat( txt_a);
    var num_b = Number.parseFloat( txt_b);
    var num_c = Number.parseFloat( txt_c);

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
