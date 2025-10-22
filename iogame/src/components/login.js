export { renderLogin };

function renderLogin() {
    const formulario = document.createElement('div');
    formulario.innerHTML = 
   `
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title text-center">Iniciar Sesión</h2>
                        <form>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Ingresa tu email">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña">
                            </div>
                            <button type="submit" class="btn btn-primary w-100" id="botonEnviarLogin">Entrar</button>
                            <br>
                            <br>
                            <a href="#registro" class="btn btn-warning btn-lg" data-link >Registrarse</a>
                        </form>
                    </div>
                </div>
                <h2 class="card-title text-center" id="resultadoLogin"></h2>
            </div>
        </div>
    </div>
    `;
   
    const mensajeLogin = formulario.querySelector('#resultadoLogin');
    const botonEnviar = formulario.querySelector('#botonEnviarLogin');
    //La clave supabase
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnJnYWpodW1udGNyYWZzY3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDkzMzksImV4cCI6MjA3NjE4NTMzOX0.2lA4EV1xtMtsAB1weI_DJZ6c2F5QaD-q30pmMn03Ldg';
    //El acces token
    let access_token = '';

    botonEnviar.addEventListener('click',async()=>{
        //Datos necesarios para crear el objeto
        const email = formulario.querySelector('#email').value;
        const password = formulario.querySelector('#password').value;

        //Creacion del objeto
        const signUpObject = {
            "email": email,
            "password": password
        }

        //Comunicacion con supabase para hacer login
        let response = await fetch('https://csnrgajhumntcrafsctc.supabase.co/auth/v1/token?grant_type=password',{
            method: 'post',
            headers: {
                "apiKey": SUPABASE_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpObject)
        });
        let data = await response.json();
        
        //El objeto data
        console.log(data);
        
        //Si se ha logeado correctamente
        if(response.status===200){
            console.log('Logeado correctamente!');
            
            window.location.hash = '#';
            access_token=data.access_token;
            localStorage.setItem('access_token',access_token);

            //Disparar evento para actualizar el header
            window.dispatchEvent(new Event('authStateChanged'));
        }else{//Si hay un error al registrarse lo mostramos y a los 2seg hace reload
            console.log('Login Incorrecto!');

            mensajeLogin.innerHTML = `
            Error al iniciar sesión.
            Intentelo de nuevo...
            `;
            
            setTimeout(() => {
                mensajeLogin.innerHTML = '';
            },2000);
            
        }
    });
    return formulario;
}

