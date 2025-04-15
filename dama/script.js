const VAZIO = 'V';
const tabuleiroMatriz = Array.from({length: 8}, () => new Array(8).fill(VAZIO));
const SELECIONAVEL = 'selecionavel';
const BRANCO = 'branco';
const BRANCO_CHAR = 'B';
const PRETO = 'preto';
const PRETO_CHAR = 'P';
let isSelecionado = false;
let pecaSelecionada = [];
let turno = PRETO;

function criarTabuleiro(){
    const tabuleiro = document.getElementsByClassName('tabuleiro')[0];
    let atual;
    for(let i = 0; i < 8; i++){
        if(i % 2 == 0) atual = PRETO
        else atual = BRANCO;
        for(let j = 0; j < 8; j++){
            const div = document.createElement('div');
            div.classList.add(atual)
            div.setAttribute('x', j);
            div.setAttribute('y', i);
            tabuleiro.appendChild(div);
            if(atual === BRANCO) atual = PRETO;
            else atual = BRANCO;
            div.addEventListener('click', _ => {
                if(div.classList.contains(SELECIONAVEL))
                    moverPeca(j, i);
                    
            })
        }
    }
}

function preencherTabuleiro(){
    const tabuleiro = document.querySelectorAll('.tabuleiro > *');
    let cor = BRANCO;
    let ajuste = 0;
    for(let i = 0; i < 64; i+= 2){
        if(i === 24){
            i = 40;
            cor = PRETO;
        } 
        const posicao = i + (parseInt(i / 8) ) % 2;
        const x  = parseInt(posicao % 8);
        const y = parseInt(posicao / 8);
        tabuleiro[posicao].appendChild(criarPeca(cor, x, y));
    }
    habilitarPecas();
}

function criarPeca(corPeca, x, y){
    const peca = document.createElement('button');
    tabuleiroMatriz[y][x] = corPeca === PRETO ? PRETO_CHAR : BRANCO_CHAR;
    peca.classList.add('peca', corPeca);
    if(corPeca === PRETO) peca.classList.add('contorno')
    peca.setAttribute('x', x);
    peca.setAttribute('y', y);
    peca.addEventListener('click', _ => {
        let atualX = parseInt(peca.getAttribute('x'));
        let atualY = parseInt(peca.getAttribute('y'));
        verificarMovimentos(
            atualX, atualY, corPeca)
        })
    return peca;
}

function verificarMovimentos(x, y, corPeca){
    if(isSelecionado){
        removerSelecionaveis();
        habilitarPecas();

    } else{
        const camposJogada = getMovimentosPossiveis(x, y, corPeca);
        renderizarPossiveisMovimentos(camposJogada);
        desabilitarPecas(x, y);
    }
    isSelecionado = !isSelecionado;
    pecaSelecionada = isSelecionado ? [x, y, corPeca] : [];
}

function getMovimentosPossiveis(x, y, corPeca){
    let movimento;
    let camposJogada = [];
    if(corPeca !== turno){
        console.log(corPeca, turno);
        return camposJogada;
    }

    if(corPeca === PRETO)
        movimento = -1;
    else
        movimento = 1;
    if(x < 7  && (0 <= y+movimento && y+movimento <= 7) && tabuleiroMatriz[y+movimento][x+1] === VAZIO){
        camposJogada.push([x+1, y + movimento]);
    }
    if(x > 0 && (0 <= y+movimento && y+movimento <= 7) && tabuleiroMatriz[y + movimento][x-1] === VAZIO){
        camposJogada.push([x-1, y + movimento]);
    }
    return camposJogada;
}


function desabilitarPecas(x, y){
    const pecas = document.querySelectorAll('.peca');
    for(let i = 0; i < pecas.length; i++){
        const peca = pecas[i];
        if(parseInt(peca.getAttribute('x')) !== x || parseInt(peca.getAttribute('y')) !== y){
            peca.setAttribute('disabled', true);
        }   
    }
}

function habilitarPecas(){
    const pecas = document.querySelectorAll('.peca');
    for(let i = 0; i < pecas.length; i++){
        const peca = pecas[i];
        const x = parseInt(peca.getAttribute('x'));
        const y = parseInt(peca.getAttribute('y'));
        const cor = peca.classList.contains(BRANCO) ? BRANCO : PRETO;
        peca.disabled = getMovimentosPossiveis(x, y, cor).length === 0;
    }
}

function renderizarPossiveisMovimentos(movimentos){
    for(let i = 0; i < movimentos.length; i++){
        const posicaoSelecionavel = document.querySelector(`.tabuleiro > div[x="${movimentos[i][0]}"][y="${movimentos[i][1]}"]`);
        posicaoSelecionavel.classList.add(SELECIONAVEL);
    }
}

function removerSelecionaveis(){
    const selecionaveis = document.querySelectorAll('.'+SELECIONAVEL);
    for(let i = 0; i < selecionaveis.length; i++){
        selecionaveis[i].classList.remove(SELECIONAVEL);
    }
}

function moverPeca(proximoX, proximoY){
    const [x, y, corPeca] = pecaSelecionada;
    const peca = document.querySelector(`.peca[x="${x}"][y="${y}"]`);
    const posicaoAtual = document.querySelector(`.tabuleiro > div[x="${x}"][y="${y}"]`);
    const posicaoFutura = document.querySelector(`.tabuleiro > div[x="${proximoX}"][y="${proximoY}"]`)
    
    posicaoAtual.removeChild(peca);
    peca.setAttribute('x', proximoX);
    peca.setAttribute('y', proximoY);
    posicaoFutura.appendChild(peca);

    tabuleiroMatriz[y][x] = VAZIO;
    tabuleiroMatriz[proximoY][proximoX] = corPeca === PRETO ? PRETO_CHAR : BRANCO_CHAR;

    isSelecionado = false;
    pecaSelecionada = [];
    turno = PRETO === turno ? BRANCO : PRETO;
    removerSelecionaveis();
    habilitarPecas();
}