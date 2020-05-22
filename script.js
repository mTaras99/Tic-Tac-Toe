const player = (symbol,name) => {
    let space = [];
    let score = 0;
    console.log(symbol);
    return {symbol,space,name,score};
};

const player1 = player("X","player1");
const player2 = player("O","player2");

const gameBoard = (() => {
    const tile = [];
    const gameStatus = 0;
    const win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    let currentPlayer = player1;
    function changeCurrentPlayer(){
        if(currentPlayer == player1)
            {
                currentPlayer = player2;
            }
        else
            {
                currentPlayer = player1;   
            }
    }
    function displayCurrentPlayer()
    {
        return currentPlayer;
    }
    function addSymbolToSpace(){
        tile[space]=symbol;
        
    }
    function displayWinner(){
        return win;
    }
    function addPointToScore(){
        let playername = currentPlayer.name;
        console.log(playername);
        let scorediv = document.querySelector("#"+playername);
        let scoreplus = gameBoard.displayCurrentPlayer().score += 1;
        console.log(scorediv);
        scorediv.innerHTML = scoreplus;
    }
    return {changeCurrentPlayer,displayCurrentPlayer,addSymbolToSpace,displayWinner,addPointToScore,currentPlayer};
})();
const clickerTile = (() => {
    const tiles = document.querySelector("#game-board").children;
    const tilesArr = Array.from(tiles);
    console.log(tilesArr);
    tilesArr.forEach(space => {  //idx
        space.addEventListener('click', e =>{
            console.log(space);
            if(e.target.textContent == "" && gameBoard.gameStatus == 1){
               gamePlay(e, tilesArr);
                e.target.textContent = gameBoard.displayCurrentPlayer().symbol;
                winCheck(space);
                removeActivePlayer();
                
                gameBoard.changeCurrentPlayer();
                addActivePlayer();
                changeArrow();
                console.log(gameBoard.tile);
                    
                }
            
        });
    });
})();
function gamePlay(e, borders){
    gameBoard.displayCurrentPlayer().space.push(borders.indexOf(e.target));
    console.log(gameBoard.displayCurrentPlayer().space);
}
function winCheck(space){
    
   const winner = gameBoard.displayWinner();
    
    let arrCheck = [];
    
        for(let i=0;i<winner.length;i++){
            for(let j=0;j<winner[i].length;j++){
               
                if(gameBoard.displayCurrentPlayer().space.includes(winner[i][j]) === true){
                    arrCheck.push('true');               
                }
                else{
                    arrCheck.push('false');
                }
                if (arrCheck.length == 3) {
                    if (arrCheck.includes('false') === false) {
                        console.log(gameBoard.displayCurrentPlayer().name + ' wins!');
                        gameBoard.gameStatus = 0;
                        gameBoard.addPointToScore();
                        console.log(gameBoard.displayCurrentPlayer().score);
                    } 
                    
                    arrCheck = [];
                }
        }
        }      console.log(arrCheck);
}
function startGame(){
    gameBoard.gameStatus = 1;
    console.log(gameBoard.gameStatus);
    gameBoard.tile = [];
    gameBoard.displayCurrentPlayer().space = [];
    gameBoard.changeCurrentPlayer();
    gameBoard.displayCurrentPlayer().space = [];
    gameBoard.changeCurrentPlayer();
    const clear = Array.from(document.querySelector("#game-board").children);
    console.log(clear);
    for(let el of clear)
        {
            el.textContent = "";
        }
    const arrow = document.querySelector("#strzalkanav");
    arrow.style.fontSize = "100px";
    changeArrow();
    console.log(gameBoard.tile);
    console.log(player.space);
}
function removeActivePlayer() {
    let playername = gameBoard.currentPlayer.name;
    let removeActive = document.querySelector(".active");
    
    removeActive.classList.remove("active");
    
}
function addActivePlayer(){
    let playername = gameBoard.displayCurrentPlayer().name;
    
    console.log(playername);
    let scorediv = document.querySelector("#"+playername);
    scorediv.classList.add("active");
}
function changeArrow(){
    const arrow = document.querySelector("#strzalkanav");
    if(gameBoard.displayCurrentPlayer().name == "player2" && gameBoard.gameStatus == 1)
        {
            arrow.innerHTML = "&rarr;";
        }
    else if(gameBoard.displayCurrentPlayer().name == "player1" && gameBoard.gameStatus == 1)
        {
            arrow.innerHTML = "&larr;";
            
        }
    else
    {
        gameBoard.changeCurrentPlayer();
        arrow.style.fontSize = "40px";
        arrow.innerHTML = 'wygrał '+gameBoard.displayCurrentPlayer().name;
        gameBoard.changeCurrentPlayer();
    }
    
    
}
//const tab2 = tab.sort();