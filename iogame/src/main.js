import "./style/style.scss"
import {router} from "./router.js";

//eslint-disable-next-line
import * as bootstrap from 'bootstrap';

import { renderHeader } from "./components/header";
import { renderContentForOne } from "./components/contentForOne";
import { renderFooter } from "./components/footer";

 
 document.addEventListener("DOMContentLoaded",()=>{
   const mainDiv = document.querySelector('#main');
   const headerDiv = document.querySelector('#header');
   const footerDiv = document.querySelector('#footer');
   
   headerDiv.replaceChildren(renderHeader());
   footerDiv.innerHTML = renderFooter();
  
   router(window.location.hash, mainDiv);
   window.addEventListener("hashchange", () => {
      router(window.location.hash, mainDiv);
   });

 });

 

 