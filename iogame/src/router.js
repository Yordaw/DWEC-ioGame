import { renderContentForOne } from "./components/contentForOne.js";
import { renderLogin } from "./components/login.js";
import { renderRegistro } from "./components/registro.js";
import { renderHome } from "./components/home.js";

export { router };
const routes = new Map([
    ['', renderHome],
    ['#', renderHome],
    ['#game', renderContentForOne],
    ['#login', renderLogin],
    ['#registro', renderRegistro]
]);

function router(route,container){
    if(routes.has(route)){
        container.replaceChildren(routes.get(route)());
    }
    else {
        container.innerHTML = `<h2>404 - Página no encontrada</h2>`
    }
}