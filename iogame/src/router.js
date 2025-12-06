//router basado en Web Components para navegación
import { GameBoard } from './components/gameBoard.js';
import { LoginPage } from './components/login.js';
import { RegistroPage } from './components/registro.js';
import { HomePage } from './components/home.js';
import { ProfilePage } from './components/profile.js';

//mapa de rutas a Web Components
const routes = new Map([
  ['', HomePage],
  ['#', HomePage],
  ['#game', GameBoard],
  ['#login', LoginPage],
  ['#registro', RegistroPage],
  ['#perfil', ProfilePage]
]);

//renderiza un Web Component basado en la ruta
export function router(route, container) {
  const ComponentClass = routes.get(route);
  
  if (ComponentClass) {
    //crear instancia del Web Component
    const component = new ComponentClass();
    container.replaceChildren(component);
  } else {
    container.innerHTML = `<h2>404 - Página no encontrada</h2>`;
  }
}
