const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); //se le da contexto al canvas para acceder a sus metodos
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

window.addEventListener('load', setCanvasSize) //apenas termine de cargar el documento html va a ejecutar una accion. Util cuando hay video o imagenes pesadas
window.addEventListener('resize', setCanvasSize); //en dado caso que esteb cambiando el tamaño de la pantalla.

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
}


const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemiesPositions = [];

function setCanvasSize(){
   
    
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7;
    }else{
        canvasSize = window.innerHeight * 0.7;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = (canvasSize / 10)-1;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
   
}

function startGame(){
     
   

    console.log({canvasSize,elementSize,});


    game.font = elementSize + 'px Verdana'; // para que sea efectivo los px deben colocar la fuente
    game.textAlign = 'end';
    
    const map = maps[level];

    if(!map){
        gameWinAndSetRecord();
        return; //para que n ejecute el resto del codigo de la funsion statGame
    }

    if(!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100 );
        showRecord();
    }

    const mapRows = map.trim().split('\n'); //trim permite eliminar espacios de un string
    const mapRowCols = mapRows.map(row => row.trim().split('')) //obtenesmo el elemento que va en cada posicion

    showLives();

    enemiesPositions = [];
    game.clearRect(0,0, canvasSize, canvasSize);


    mapRowCols.forEach((row,rowIndex) => {
        row.forEach((colum, columIndex) => {
            const emoji = emojis[colum];
            const posX = elementSize * (columIndex + 1.3);
            const posY = elementSize * (rowIndex + 1);

            if(colum == 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log(playerPosition);
                }
            }else if(colum == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if(colum == 'X'){
                enemiesPositions.push({
                    x: Math.floor(posX),
                    y: Math.floor(posY),
                })
            }

            game.fillText(emoji, posX, posY);            
        });
    });

    movePlayer();
    
}

function movePlayer(){
    const giftColitionEnX = Math.floor(playerPosition.x) == Math.floor(giftPosition.x);
    const giftColitionEnY = Math.floor(playerPosition.y) == Math.floor(giftPosition.y); 
    const giftColision = giftColitionEnX && giftColitionEnY;

    if(giftColision){
        //console.log('subiste de nivel');
        levelWin();

    }

    const enemyCollision = enemiesPositions.find(enemy =>{
        const enemycollisionX = Math.floor(enemy.x) == Math.floor(playerPosition.x);
        const enemycollisionY = Math.floor(enemy.y) == Math.floor(playerPosition.y);
        return enemycollisionX && enemycollisionY;
    })

    if(enemyCollision){
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
    console.log('subiste de nivel');
    level++;
    startGame();

}

function levelFail(){
    console.log('choco con bomba');
    lives--;
   
    
    
   console.log(lives);
   if(lives <= 0){
       level = 0;
       lives = 3;
       timeStart = undefined;
   }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();

}

function gameWinAndSetRecord(){
    console.log('terminaste el juego');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time')
    const playerTime = Date.now() - timeStart;

    if(recordTime){
        
        if(recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'supero el record';
          
        }else{
            pResult.innerHTML = 'no supero el record';
            
        }
    }else{
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Primer Record';
        
    }
    console.log({recordTime, playerTime});
}


function showLives(){
    const heartsArray = Array(lives).fill(emojis['HEART']); //super prototipo donde podemos crear arrays con ese superprototipo
    
    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart));

   
}

function showTime(){
    spanTime.innerHTML = Date.now() - timeStart;

}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time');
}


window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);



function moveByKeys(event){
    if(event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight') moveRight();
    else if(event.key == 'ArrowDown') moveDown();
    
}

function moveUp(){
    console.log('mover hacia arriba');
    if((playerPosition.y - elementSize) < 0.5){
        console.log('out')
    }else{
        playerPosition.y -= elementSize;
        startGame();
    }
    
}

function moveLeft(){
    console.log('mover hacia izquierda');
    if((playerPosition.x - elementSize) < elementSize){
        console.log('out')
    }else{
        playerPosition.x -= elementSize;
        startGame();
    }
}

function moveRight(){
    console.log('mover hacia derecha');
    if((playerPosition.x + elementSize) > (canvasSize + elementSize)){
        console.log('out')
    }else{
        playerPosition.x += elementSize;
        startGame();
    }
}

function moveDown(){
    console.log('mover hacia abajo');
    if((playerPosition.y + elementSize) > canvasSize){
        console.log('out')
    }else{
        playerPosition.y += elementSize;
        startGame();
    }
}