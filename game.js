const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); //se le da contexto al canvas para acceder a sus metodos

window.addEventListener('load', setCanvasSize) //apenas termine de cargar el documento html va a ejecutar una accion. Util cuando hay video o imagenes pesadas
window.addEventListener('resize', setCanvasSize); //en dado caso que esteb cambiando el tamaño de la pantalla.

let canvasSize;
let elementSize;

function startGame(){
    // //game.fillRect(0,20, 100, 100);   //podemos dibujar el canvas para empezar se especifica donde va a inicar el trazo y donde va a terminar.
    // //game.clearRect(50,50, 50,50); //para borrar el rectangulo
    // //game.clearRect(0,0, 50,50); 

    // game.font = '25px Verdana' //no son metodos sino atributos por eso hay que ponerle valores
    // game.fillStyle = 'purple'; //se puede poner color al texto
    // game.textAlign = 'right'; //le indicamos donde debe tomar las coordenas de trazo si al inicio, izquierda o derecha.
    // game.fillText('platzi', 25,25); // se puede insetar texto pasandole como argumentos el texto y la posicion dodne debe iniciar

    
    // window.innerHeight //espacios o tamaños de la ventana del dispositivo
    // window.innerWidth //espacios o tamaños de la ventana del dispositivo
    
   

    console.log({canvasSize,elementSize,});


    game.font = elementSize + 'px Verdana'; // para que sea efectivo los px deben colocar la fuente
    game.textAlign = 'end';
    // for (let i =0; i<10; i++){
    //     game.fillText(emojis['X'], elementSize * i, elementSize);
    // }

    const map = maps[2];
    const mapRows = map.trim().split('\n'); //trim permite eliminar espacios de un string
    const mapRowCols = mapRows.map(row => row.trim().split('')) //obtenesmo el elemento que va en cada posicion

    for (let row = 1; row<=10; row++){
        for(let colum = 1; colum <=10; colum++){
            game.fillText(emojis[mapRowCols[row-1][colum-1]], elementSize *colum, elementSize * row );
        }
    }
}

function setCanvasSize(){
   
    
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = (canvasSize / 10)-1;

    startGame();
   
}