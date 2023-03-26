const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');



let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function startGame() {

  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[0]; 
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log({map, mapRows, mapRowCols});

  game.clearRect(0,0, canvasSize, canvasSize); //para eliminar el mapa desde la posicion 0, 0 hasta la que tenga definido el mapa

  mapRowCols.forEach( (row, rowIndex) => {
    row.forEach( (col, colIndex)=>{
      const emoji = emojis[col];
      const posX = elementsSize*(colIndex +1);
      const posY = elementsSize*(rowIndex +1);

      if(col == 'O'){
        if(!playerPosition.x && !playerPosition.y){
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log(playerPosition);
        }
      }

      game.fillText(emoji, posX, posY);
    })
  });

  movePlayer();

  // for (let row = 1; row <= 10; row++) {
  //   for(let col= 1; col <= 10; col++){
        
  //       game.fillText(emojis[mapRowCols[row-1][col-1]], elementsSize * col, elementsSize * row);
  //   }
  // }
  
}

function movePlayer(){
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}


window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);


function moveByKeys(event){
  console.log(event);
  if(event.key == "ArrowUp") moveUp();
  else if(event.key == "ArrowLeft") moveLeft();
  else if(event.key == "ArrowRight") moveRight();
  else if(event.key == "ArrowDown") moveDown();

}

function moveUp(){
  console.log('arriba');
  if((playerPosition.y - elementsSize) < 0){
    console.log('out');
  }else{
    playerPosition.y -= elementsSize;
    startGame();
  }
  
 
}

function moveLeft(){
  console.log('izq');
  if((playerPosition.x - elementsSize) < 0.5){
    console.log('out');
  }else{
    playerPosition.x -= elementsSize;
    startGame();
  }
}

function moveRight(){
  console.log('derecha');
  if((playerPosition.x + elementsSize) > canvasSize){
    console.log('out');
  }else{
    playerPosition.x += elementsSize;
    startGame();
  }
}

function moveDown(){
  console.log('abajo');
  if((playerPosition.y + elementsSize) > canvasSize){
    console.log('out');
  }else{
    playerPosition.y += elementsSize;
    startGame();
  }
}

function setCanvasSize(){
   
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.8;
    } else {
      canvasSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10;

    startGame();
}