import "./style/style.scss"

//eslint-disable-next-line
import * as bootstrap from 'bootstrap';
import { renderHeader } from "./components/header";
import { renderFooter } from "./components/footer";
import { renderContent } from "./components/content";

 function doHeader(renderHeader){
  const divHeader = document.querySelector("#header");
  const header = renderHeader();
  divHeader.innerHTML= header;
 }

 function doMain(cantCuadricula){
   renderContent(cantCuadricula);  
 }
 
 function doFooter(renderFooter){
  const divFooter = document.querySelector("#footer");
  const footer = renderFooter();
  divFooter.innerHTML=footer;
 }
 

 document.addEventListener("DOMContentLoaded",()=>{
    doHeader(renderHeader);
    doMain(25); //el numero es las cuadriculas que queremos que tenga el tablero
    doFooter(renderFooter);
 });