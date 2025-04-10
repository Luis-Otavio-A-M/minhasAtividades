let valor1 = null;
let valor2 = null;
let resultado = null;
let operacao = "";
let valorAtual = "";

function limpar(){
    valor1 = null;
    valor2 = null;
    resultado = null;
    operacao = "";
    valorAtual = ""
    atualizarDisplay('0');
}

function digitarNumero(numero){
    if(numero === '.'){
        if(valorAtual.indexOf('.') > -1) return;
        if(valorAtual === '') valorAtual = '0';
    }
    if(numero === 0 && (valorAtual === '0' || valorAtual === '')) return;
    valorAtual += numero;
    atualizarDisplay(valorAtual);
}

function digitarOperador(operador){
    if(valor1 === null && valorAtual === '' || valor1 !== null && valorAtual !== '') return;
    valor1 = valorAtual !== '' ? parseFloat(valorAtual) : valor1;
    valorAtual = '';
    operacao = operador;
    atualizarDisplay(operador);
}

function calcularResultado(){
    if(valor1 === null || operacao === '' || valorAtual === '' && valor2 === null) return;
    valor2 = valorAtual !== '' ? parseFloat(valorAtual) : valor2;
    switch(operacao){
        case '+':
            resultado = valor1 + valor2;
            break;
        case '-':
            resultado = valor1 - valor2;
            break;
        case '*':
            resultado = valor1 * valor2;
            break;
        case '/':
            resultado = valor1 / valor2;
            break;
        case '%':
            resultado = valor1 % valor2;
            break;
    }
    valor1 = resultado;
    valorAtual = '';
    atualizarDisplay(resultado.toString());
}


function atualizarDisplay(label){
    document.getElementsByClassName("resultado")[0].innerHTML = formartarLabel(label);
}

function formartarLabel(label){
    [inteiro, decimal] = label.split('\.');
    let inteiroFormatado = '';
    let cont = 0;
    for(let i = inteiro.length - 1; i >= 0; i--){
        if(cont === 3){
            inteiroFormatado = '.' + inteiroFormatado;
            cont = 0;
        }
        inteiroFormatado = inteiro.charAt(i) + inteiroFormatado;
        cont++;
    }
    if(decimal != undefined){
        inteiroFormatado += ',' + decimal;
    }
    return inteiroFormatado;
}