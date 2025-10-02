export {renderContentForOne}

function renderContentForOne(cantCuadricula){
   //recogida del div padre Main
  const divMain = document.querySelector("#main");
  
    //se crea otro div dentro del padre
  const areaTablero = document.createElement("div");
  areaTablero.setAttribute('id','areaTablero');
   //se crea otro div para el tablero del jugador
  const tablero = document.createElement("div");
  
   //añado atributos a esos tableros
  tablero.setAttribute('class','tablero');
  tablero.setAttribute('id','tablUno');
  
   //Se crean los titulos de todo y se le da contenido
  const tituloPrincipal = document.createElement("h2");
  const tituloTablero1 = document.createElement("h2");

  tituloPrincipal.innerHTML=`Memory Game Yordan`;
  tituloTablero1.innerHTML= `Player 1`;

   //se añade atributos al titulo principal
  tituloPrincipal.setAttribute('id','tituloJuego');
   //metemos los titulos de los tableros dentro del tablero que le toca
  tablero.append(tituloTablero1);

  //creamos otros div que será el juego1 y juego2
   const juego1 = document.createElement("div");

   //damos atributos
   juego1.setAttribute('class','juego');

  //////////////////////////////////////////////////////////////////////////////
  crearArray(5,5,juego1);

  //////////////////////////////////////////////////////////////////////////////
  /*
   //bucle para rellenar
   for (let i = 0; i < cantCuadricula; i++) {
      const celda1 = document.createElement("div");
      
      celda1.addEventListener('click',()=>{celda1.setAttribute('id','marcada')});
      celda1.addEventListener('dblclick',()=>{celda1.setAttribute('id','desmarcada')});

      juego1.append(celda1);

   }
  */
   //metemos los divs de los juegos dentro de su tablero
   tablero.append(juego1);

   //metemos los tableros dentro del area de tableros
  areaTablero.append(tablero);

   //metemos el titulo principal y el areaTablero dentro del div padre Main
  divMain.append(tituloPrincipal);
  divMain.append(areaTablero);


}

/*
function crearArray(ancho,alto,juego1){
  let filas = ancho;
  let columnas = alto;
  let matriz = Array.from({ length: filas }, () => Array(columnas).fill(0));
  
  console.log(matriz);

  for(let i=0; i < matriz.length; i++){
    for(let j=0; j < matriz.length; j++){
      let divCelda = document.createElement("div");
      let textoCeldas = document.createElement("h2");
      textoCeldas.setAttribute('class','textoCeldas');
      textoCeldas.innerHTML = '?';
      divCelda.append(textoCeldas);
      divCelda.setAttribute('class','divCelda');

      matriz[i][j]= divCelda;
      juego1.append(divCelda);
      
    }

  }

}
*/

function crearArray(ancho, alto, juego1) {
  let filas = ancho;
  let columnas = alto;
  let matriz = Array.from({ length: filas }, () => Array(columnas).fill(0));
  
  console.log(matriz);

  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      // Crear el contenedor del flip
      let flipContainer = document.createElement("div");
      flipContainer.setAttribute('class', 'flip-container');
      
      // Crear la carta flip
      let flipCard = document.createElement("div");
      flipCard.setAttribute('class', 'flip-card');
      
      // Crear la cara frontal
      let flipFront = document.createElement("div");
      flipFront.setAttribute('class', 'flip-front');
      let textoFront = document.createElement("h2");
      textoFront.setAttribute('class', 'textoCeldas');
      textoFront.innerHTML = '?';
      flipFront.appendChild(textoFront);
      
      // Crear la cara trasera
      let flipBack = document.createElement("div");
      flipBack.setAttribute('class', 'flip-back');
      let textoBack = document.createElement("h2");
      textoBack.setAttribute('class', 'textoCeldas');
      // Aquí puedes poner el contenido que quieras en el dorso, por ejemplo un número o un emoji
      textoBack.innerHTML = 'X'; // Ejemplo
      flipBack.appendChild(textoBack);
      
      // Añadir las caras a la carta
      flipCard.appendChild(flipFront);
      flipCard.appendChild(flipBack);
      
      // Añadir la carta al contenedor
      flipContainer.appendChild(flipCard);
      
      // Añadir evento de clic para voltear
      flipContainer.addEventListener('click', function() {
        this.classList.toggle('flipped');
      });
      
      // Asignar el contenedor a la matriz
      matriz[i][j] = flipContainer;
      juego1.appendChild(flipContainer);
    }
  }
}