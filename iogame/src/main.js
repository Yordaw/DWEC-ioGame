import "./style/style.scss"
import { router } from "./router.js";

//eslint-disable-next-line
import * as bootstrap from 'bootstrap';

//importar y registrar Web Components
import './components/gameBoard.js';
import './components/login.js';
import './components/registro.js';
import './components/home.js';
import './components/profile.js';

//importar header y footer
import { renderHeader } from "./components/header";
import { renderFooter } from "./components/footer";

document.addEventListener("DOMContentLoaded", () => {
  const mainDiv = document.querySelector('#main');
  const headerDiv = document.querySelector('#header');
  const footerDiv = document.querySelector('#footer');
  
  //renderizar header y footer
  headerDiv.replaceChildren(renderHeader());
  footerDiv.innerHTML = renderFooter();
 
  //usar router para navegación
  router(window.location.hash, mainDiv);
  
  //escuchar cambios de ruta
  window.addEventListener("hashchange", () => {
    router(window.location.hash, mainDiv);
  });
})