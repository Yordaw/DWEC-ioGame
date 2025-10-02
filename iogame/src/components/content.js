export {renderContent}

function renderContent(cantCuadricula){
   //recogida del div padre Main
  const divMain = document.querySelector("#main");
  
    //se crea otro div dentro del padre
  const areaTablero = document.createElement("div");
  areaTablero.setAttribute('id','areaTablero');
   //se crea otros 2 divs separados para cada tablero de jugador
  const tablero = document.createElement("div");
  const tablero2 = document.createElement("div");
   //añado atributos a esos tableros
  tablero.setAttribute('class','tablero');
  tablero.setAttribute('id','tablUno');
  tablero2.setAttribute('class','tablero');
  tablero2.setAttribute('id','tablDos');
   //Se crean los titulos de todo y se le da contenido
  const tituloPrincipal = document.createElement("h2");
  const tituloTablero1 = document.createElement("h2");
  const tituloTablero2 = document.createElement("h2");
  tituloPrincipal.innerHTML=`Memory Game Yordan`;
  tituloTablero1.innerHTML= `Player 1`;
  tituloTablero2.innerHTML= `Player 2`;
   //se añade atributos al titulo principal
  tituloPrincipal.setAttribute('id','tituloJuego');
   //metemos los titulos de los tableros dentro del tablero que le toca
  tablero.append(tituloTablero1);
  tablero2.append(tituloTablero2);

  //creamos otros div que será el juego1 y juego2
   const juego1 = document.createElement("div");
   const juego2 = document.createElement("div");

   //damos atributos
   juego1.setAttribute('class','juego');
   juego2.setAttribute('class','juego');

   //bucle para rellenar
   for (let i = 0; i < cantCuadricula; i++) {
      const celda1 = document.createElement("div");
      const celda2 = document.createElement("div");
      
      celda1.addEventListener('click',()=>{celda1.setAttribute('id','marcada')});
      celda1.addEventListener('dblclick',()=>{celda1.setAttribute('id','desmarcada')});

      juego1.append(celda1);
      juego2.append(celda2);

   }


   //metemos los divs de los juegos dentro de su tablero
   tablero.append(juego1);
   tablero2.append(juego2);

   //metemos los tableros dentro del area de tableros
  areaTablero.append(tablero);
  areaTablero.append(tablero2);

   //metemos el titulo principal y el areaTablero dentro del div padre Main
  divMain.append(tituloPrincipal);
  divMain.append(areaTablero);


}