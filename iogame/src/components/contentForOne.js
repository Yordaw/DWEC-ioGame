export {renderContentForOne}

//Funcion Principal 
function renderContentForOne(titTablero){
  //se crea otro div dentro del padre
  const areaTablero = document.createElement("div");
  areaTablero.setAttribute('id','areaTablero');
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


  //al final llamamos a la funcion que le da aspecto
  crearCeldasFlip(matriz, juego1,contador,numUno,numDos,tituloTablero1);
  
}

//Funcion que crea el array CON ASPECTO en el DOM
function crearCeldasFlip(matriz,juego1,contador,numUno,numDos,tituloPlayer){
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
        //si no lo tiene le damos la vuelta a la tarjeta y sigue con la logica      
        flipContainer.classList.toggle('flipped');
        
        //Logica del juego hacia abajo
        if(contador>2){//si el contador pasa de 2, hacemos "Reset" de algunas variables
          contador=1;
          numUno=undefined;
          numDos=undefined;

          console.log(`RESET-> Contador: ${contador}, NumUno: ${numUno}, NumDos: ${numDos}, Turno: ${turno}`);
        };

        if(contador === 1){
          numUno = matriz[i][j];        
          console.log(`Contador: ${contador}, NumUno: ${numUno}, NumDos: ${numDos}, Turno: ${turno}`);
          
          contador++;
        }else if(contador === 2){
          numDos = matriz[i][j];
          console.log(`Contador: ${contador}, NumUno: ${numUno}, NumDos: ${numDos}, Turno: ${turno}`);

          contador++;
          if(numUno.textContent === numDos.textContent && numUno !== numDos){//nos aseguramos de que no se haga click 2 veces en la misma celda
            console.log('Acierto!');
            
            if(turno===1){ //POR DONDE IBAMOS? HAY QUE HACER QUE EN EL ARRAY(SIN FRONTEND) SE MARQUE UNA "X o O" EN LAS ACERTADAS SEGUN EL PLAYER
              matriz[i][j]='X';console.table(matriz); //para verlo en console
              puntosPlayer1++;
              
              alert(
              `
              Bien Hecho! +1 punto!
              Puntos Totales: ${puntosPlayer1}
              `);
            }else if(turno ===2){
              matriz[i][j]='O';console.table(matriz); //para verlo en console
              puntosPlayer2++;
              
              alert(
              `
              Bien Hecho! +1 punto!
              Puntos Totales: ${puntosPlayer2}
              `);
            }
            checkPuntos(puntosPlayer1,puntosPlayer2);

            //Los que ya han sido acertados, los bloqueo
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

//Funcion que muestra las celdas una vez al principio del juego
function mostrarCeldasUnaVez(flipContainer){
 
  flipContainer.classList.toggle('flipped');
  setTimeout(() => {
    flipContainer.classList.toggle('flipped');
  }, 2500);

}

//variables globales TEMPORALES
let turno = 1;
let contador=1;
let numUno;
let numDos;
let puntosPlayer1=0;
let puntosPlayer2=0;


function checkPuntos(puntosPlayer1,puntosPlayer2){
  const maxPuntos = 3;

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
  //Logica del juego hacia abajo
  
  
  
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