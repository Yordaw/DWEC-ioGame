import { obtenerPerfil, guardarPerfil } from '../services/profileService.js';


class ProfilePage extends HTMLElement {
  constructor() {
    super();
    this.perfil = null;
  }

  async connectedCallback() {
    //cargar datos del perfil antes de renderizar
    await this.cargarPerfil();
    this.render();
    this.hacerListeners();
  }

  async cargarPerfil() {
    //verificar que el usuario esté logeado
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.hash = '#';
      return;
    }

    try {
      //obtener perfil desde supabase
      const perfilCargado = await obtenerPerfil();
      if (perfilCargado) {
        this.perfil = perfilCargado;
        console.log('perfil cargado en component:', this.perfil);
      } else {
        //crear perfil vacio si no existe
        this.perfil = {
          username: '',
          full_name: '',
          website: ''
        };
      }
    } catch (error) {
      console.error('Error cargando perfil:', error);
      this.perfil = {
        username: '',
        full_name: '',
        website: ''
      };
    }
  }

  render() {
    //crear contenedor principal
    const container = document.createElement('div');
    container.setAttribute('class', 'container mt-5');

    //crear tarjeta personalizada
    const formContainer = document.createElement('div');
    formContainer.setAttribute('class', 'form-container mx-auto');
    formContainer.style.maxWidth = '500px';

    const formBox = document.createElement('div');
    formBox.setAttribute('class', 'form-box');

    const titulo = document.createElement('h2');
    titulo.setAttribute('class', 'form-title');
    titulo.innerHTML = 'Mi Perfil';

    //crear formulario
    const form = document.createElement('form');
    form.setAttribute('id', 'perfilForm');

    //campo username
    const username = this.crearGrupoCampo('Username', 'username', this.perfil?.username || '');
    
    //campo full name
    const fullName = this.crearGrupoCampo('Nombre Completo', 'full_name', this.perfil?.full_name || '');
    
    //campo website
    const website = this.crearGrupoCampo('Sitio Web', 'website', this.perfil?.website || '');

    form.append(username, fullName, website);

    //crear botones con clases del boostrap
    const botonesDiv = document.createElement('div');
    botonesDiv.setAttribute('class', 'mt-4 d-flex gap-2');

    const btnGuardar = document.createElement('button');
    btnGuardar.setAttribute('class', 'btn btn-primary');
    btnGuardar.setAttribute('type', 'submit');
    btnGuardar.setAttribute('id', 'btnGuardar');
    btnGuardar.innerHTML = 'Guardar Cambios';

    const btnVolver = document.createElement('button');
    btnVolver.setAttribute('class', 'btn btn-secondary');
    btnVolver.setAttribute('type', 'button');
    btnVolver.setAttribute('id', 'btnVolver');
    btnVolver.innerHTML = 'Volver';

    botonesDiv.append(btnGuardar, btnVolver);

    formBox.append(titulo, form, botonesDiv);
    formContainer.appendChild(formBox);
    container.appendChild(formContainer);

    this.innerHTML = '';
    this.appendChild(container);
  }

  hacerListeners() {
    //obtener elementos
    const form = this.querySelector('#perfilForm');
    const btnGuardar = this.querySelector('#btnGuardar');
    const btnVolver = this.querySelector('#btnVolver');

    //escuchar click en botón guardar
    if (btnGuardar) {
      btnGuardar.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSubmit(e);
      });
    }

    //evitar que form submit haga recarga
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
      });
    }

    //botón volver a home
    if (btnVolver) {
      btnVolver.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#';
      });
    }
  }

  crearGrupoCampo(label, nombre, valor) {
    //crear grupo de campo del formulario
    const grupo = document.createElement('div');
    grupo.setAttribute('class', 'mb-3');

    const labelEl = document.createElement('label');
    labelEl.setAttribute('class', 'form-label');
    labelEl.setAttribute('for', nombre);
    labelEl.innerHTML = label;

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'form-control');
    input.setAttribute('id', nombre);
    input.setAttribute('name', nombre);
    input.value = valor;

    grupo.append(labelEl, input);
    return grupo;
  }

  async handleSubmit(e) {
    //obtener valores del formulario
    const form = this.querySelector('#perfilForm');
    const campousername = this.querySelector('#username');
    const campofullName = this.querySelector('#full_name');
    const campowebsite = this.querySelector('#website');

    //armar objeto con datos del perfil
    const datos = {
      username: campousername?.value || '',
      full_name: campofullName?.value || '',
      website: campowebsite?.value || ''
    };

    try {
      //guardar perfil en supabase
      const resultado = await guardarPerfil(datos);
      
      if (resultado) {
        //bien - mostrar alerta y volver
        alert('Perfil guardado correctamente');
        setTimeout(() => {
          window.location.hash = '#';
        }, 500);
      } else {
        //error guardando perfil
        alert('Error al guardar el perfil');
      }
    } catch (error) {
      console.error('Error guardando perfil:', error);
      alert('Error al guardar el perfil: ' + error.message);
    }
  }
}

//registrar el Web Component
customElements.define('profile-page', ProfilePage);

export { ProfilePage };