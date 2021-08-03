//INITIAL DATA

let square = {
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
};

let player = '';
let warning = '';
let playing = false;

reset();


//EVENTS
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick);
});

//FUNCTIONS
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        tooglePlayer();
    }
}

function reset(){
    //LIMPA O AVISO
    warning = '';    
    //GERANDO UM NÚMERO ENTRE '0' E '1.99'ALEATORIO COM UMA FORMULA QUE ARREDONDA PARA BAIXO PARA FICAR SEMPRE ENTRE 0 OU 1 
    let random = Math.floor(Math.random() * 2);    
    //ESCOLHENDO ENTRE 'x' OU 'o'
    player = (random === 0) ? 'x' : 'o';    
    //ZERAR TABULEIRO
    for(let i in square){
        square[i] = '';
    }
    playing = true;
    renderSquare();
    renderInfo();
}


 //Pega o que tem no square e mostra na tela
function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
}



function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}


//Troca o Jogador
function tooglePlayer(){
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}


//Verifica o andamento do jogo com base nas posibilidades de vitoria definindo um vencedor ou empate 
function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu!';
        playing = false;
    } else if(checkWinnerFor('o')){
        warning = 'O "o" venceu!';
        playing = false;
    } else if(isFull()){
        warning = 'O Jogo Empatou';
        playing = false;
    } 
}


//Algoritmo de Possibilidade de Vitoria as sequencias que podem ter um vencendor
function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',         
        'c1,c2,c3',             

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);//Se esse player atende a todos os itens da sequencia
        if(hasWon){
            return true;
        }
    }
    return false;
}



function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}