export {renderContentForOne}

//variables globales TEMPORALES hacer objeto PARTIDA!
let turno = 1;
let contador=1;
let numUno;
let numDos;
let tempI;
let tempJ;
let puntosPlayer1=0;
let puntosPlayer2=0;

//Funcion Principal 
function renderContentForOne(titTablero){
  
  //se crea otro div dentro del padre
  const areaTablero = document.createElement("div");
  areaTablero.setAttribute('id','areaTablero');

  //se crea el area que muestra los puntos
  const areaPuntos = document.createElement('div');
  areaPuntos.setAttribute('id','areaPuntos');
  //se crea el titulo de ese area
  const tituloPuntos = document.createElement('h2');
  tituloPuntos.setAttribute('id','tituloPuntos');
  tituloPuntos.innerHTML=' Puntos ';
  //se crean los titulos de los puntos de cada jugador
  const puntos1 = document.createElement("h2");
  puntos1.setAttribute('class','puntos');
  puntos1.setAttribute('id','puntos1');
  puntos1.innerHTML=`Player 1: 0`;
  const puntos2 = document.createElement("h2");
  puntos2.setAttribute('class','puntos');
  puntos2.setAttribute('id','puntos2');
  puntos2.innerHTML=`Player 2: 0`;
  //los insertamos todos en areaPuntos
  areaPuntos.append(tituloPuntos);
  areaPuntos.append(puntos1);
  areaPuntos.append(puntos2);

  //se crea otro div para el tablero del jugador
  const tablero = document.createElement("div");
  
  //añado atributos a esos tableros
  tablero.setAttribute('class','tablero');
  tablero.setAttribute('id','tablUno');
  
  //Se crean los titulos de todo y se le da contenido
  const tituloTablero1 = document.createElement("h2");
  tituloTablero1.setAttribute('id','tituloTablero1');
  tituloTablero1.innerHTML= `Player 1`;

  //metemos los titulos de los tableros dentro del tablero que le toca
  tablero.append(tituloTablero1);

  //creamos otros div que será el juego1 y juego2
  const juego1 = document.createElement("div");

  //damos atributos
  juego1.setAttribute('class','juego');

  //metemos los divs de los juegos dentro de su tablero
  tablero.append(juego1);

  areaTablero.append(areaPuntos);
  //metemos los tableros dentro del area de tableros
  areaTablero.append(tablero);

  //llamamos a la función que genera el array
  crearArray(6,juego1,tituloTablero1);
  
  return areaTablero;

}

//Función que genera el array SIN ASPECTO!
function crearArray(tamano, juego1,tituloTablero1) {
  const filas = tamano;
  const columnas = tamano;

  //array con cada numero 2 veces
  const arrayNumeros = [];
  for (let i = 0; i < 18; i++) {
    arrayNumeros.push(i, i);
  }

  //barajamos los numeros
  for (let i = arrayNumeros.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayNumeros[i], arrayNumeros[j]] = [arrayNumeros[j], arrayNumeros[i]];
  }

  //hacer el array de 6x6
  const matriz = [];
  let indice = 0;
  for (let i = 0; i < filas; i++) {
    const fila = [];
    for (let j = 0; j < columnas; j++) {
      fila.push(arrayNumeros[indice]);
      indice++;
    }
    matriz.push(fila);
  }

  console.table(matriz); //para verlo en console


  
  comenzarJuego();//Si respondemos que SI comienza el juego, sino, vuelve a HOME
  //al final llamamos a la funcion que le da aspecto
  crearCeldasFlip(matriz, juego1,contador,numUno,numDos,tituloTablero1);
  
}

//Funcion que crea el array CON ASPECTO en el DOM
function crearCeldasFlip(matriz,juego1,contadorClick,numUno,numDos,tituloPlayer){
  setTurno(tituloPlayer);

  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {

      //Crear el contenedor del flip
      let flipContainer = document.createElement("div");
      flipContainer.setAttribute('class', 'flip-container');
    
      //Crear la carta flip
      let flipCard = document.createElement("div");
      flipCard.setAttribute('class', 'flip-card');
      
      //Cara delantera
      let flipFront = document.createElement("div");
      flipFront.setAttribute('class', 'flip-front');
      let textoFront = document.createElement("h2");
      textoFront.setAttribute('class', 'textoCeldas');
      textoFront.innerHTML = '?';
      flipFront.appendChild(textoFront);
      
      //Cara trasera
      let flipBack = document.createElement("div");
      flipBack.setAttribute('class', 'flip-back');
      let textoBack = document.createElement("h2");
      textoBack.setAttribute('class', 'textoCeldas');
      
      //Contenido de la celda de la matriz la añadimos a la vista
      textoBack.innerHTML = matriz[i][j];
      flipBack.appendChild(textoBack);
      
      //poner las caras a la carta
      flipCard.appendChild(flipFront);
      flipCard.appendChild(flipBack);
      
      //metemos la carta en su contenedor flip
      flipContainer.appendChild(flipCard);
           
      setTimeout(()=>{
        mostrarCeldasUnaVez(flipContainer);
      },500)
    
      
      //el evento que voltea + la logica del juego... INTENTAR EXTERNALIZAR LA LOGICA!
      flipContainer.addEventListener('click', function() {
        //si la tarjeta tiene "locked" pasamos de ella
        if (flipContainer.dataset.locked === "true") return;
        //si la tarjeta no tiene el "locked" le damos la vuelta a la tarjeta y sigue con la logica      
        flipContainer.classList.toggle('flipped');
        
        //Logica del juego empieza hacia abajo!
        if(contadorClick>2){//si el contador pasa de 2, hacemos "Reset" de algunas variables
          contadorClick=1;
          numUno=undefined;
          numDos=undefined;

          //console.log(`RESET-> Contador: ${contador}, NumUno: ${numUno}, NumDos: ${numDos}, Turno: ${turno}`);
        };

        if(contadorClick === 1){
          numUno = matriz[i][j];        
          //console.log(`Contador: ${contador}, NumUno: ${numUno}, NumDos: ${numDos}, Turno: ${turno}`);
          //Nos guardamos las posiciones de la matriz en las que se ha clickado la primera vez porque lo necesitamos más abajo
          tempI=i;
          tempJ=j;

          contadorClick++;
        }else if(contadorClick === 2){
          numDos = matriz[i][j];
          //console.log(`Contador: ${contador}, NumUno: ${numUno}, NumDos: ${numDos}, Turno: ${turno}`);
          
          contadorClick++;
          if(numUno.textContent === numDos.textContent && numUno !== numDos){//nos aseguramos de que no se haga click 2 veces en la misma celda
            //console.log('Acierto!');
            
            if(turno===1){
              let puntos1 = document.querySelector('#puntos1');
              let puntos2 = document.querySelector('#puntos2');

              matriz[i][j]='X';
              matriz[tempI][tempJ]='X';console.table(matriz); //para verlo en console
              
              puntosPlayer1++;
              puntos1.innerHTML=`Player 1: ${puntosPlayer1}`;
              puntos2.innerHTML=`Player 2: ${puntosPlayer2}`;
              alert('Bien Hecho! +1 punto!');
            }else if(turno ===2){
              let puntos1 = document.querySelector('#puntos1');
              let puntos2 = document.querySelector('#puntos2');

              matriz[i][j]='O';
              matriz[tempI][tempJ]='O';console.table(matriz); //para verlo en console

              puntosPlayer2++;
              puntos1.innerHTML=`Player 1: ${puntosPlayer1}`;
              puntos2.innerHTML=`Player 2: ${puntosPlayer2}`;
              alert('Bien Hecho! +1 punto!');
            }

            checkPuntos(puntosPlayer1,puntosPlayer2);

            //Los que ya han sido acertados, los bloqueo  textoBack.innerHTML = matriz[i][j];
            numUno.dataset.locked = 'true';
            numUno.classList.add('locked');
            
            numDos.dataset.locked = 'true';
            numDos.classList.add('locked');
          }else{
            console.log('Casi!');
            setTimeout(()=>{
              numUno.classList.toggle('flipped');
              numDos.classList.toggle('flipped');
            },500)

            //Una vez falla uno de los dos turnos, pasa al siguiente.
            if(turno===1){
              turno=2;
            }else if(turno ===2){
              turno=1;
            }
            setTimeout(()=>{
              setTurno(tituloPlayer); 
            },500)
            
          }
        }
            

      });
      
      //Asignar el contenedor a la matriz
      matriz[i][j] = flipContainer;
      juego1.appendChild(flipContainer);
      
    }
  }
  
}

//funcion que comprueba el turno
function setTurno(tituloPlayer){
  if(turno===1){
    tituloPlayer.innerHTML='Player 1';
  }else if(turno ===2){
    tituloPlayer.innerHTML='Player 2';
  }
}

function comenzarJuego(){
  let respuesta = confirm('Comenzar el juego?');
  
  if(respuesta!==true){
    window.location.hash = '#';
  }
}

//Funcion que muestra las celdas una vez al principio del juego para poder verlas antes de empezar
function mostrarCeldasUnaVez(flipContainer){
  
  flipContainer.classList.toggle('flipped');
  setTimeout(() => {
    flipContainer.classList.toggle('flipped');
  }, 2500);

}




function checkPuntos(puntosPlayer1,puntosPlayer2){
  //El maximo de puntos al final debe ser ->18
  const maxPuntos = 18;
  
  if(puntosPlayer1+puntosPlayer2 >= maxPuntos){
    console.log('Fin del Juego');
    alert('El juego ha acabado!!');
    if(confirm('Quieres jugar de nuevo?')){
      resetTodo();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }else{
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    }
    
  }

}

function resetTodo(){
   turno = 1;
   contador=1;
   numUno;
   numDos;
   puntosPlayer1=0;
   puntosPlayer2=0;
}

function logicaGame(){
  //Logica del juego hacia abajo... algún dia
  
  
  
}

















































/*
//Funcion que muestra un popup
function mostrarMensaje(texto, duracion = 2000) {
  const msg = document.getElementById('mensaje');
  msg.textContent = texto;
  msg.classList.add('show');
  setTimeout(() => msg.classList.remove('show'), duracion);
}
//Llamada al popup
mostrarMensaje("Flip bloqueado 😎", 1500);
*/