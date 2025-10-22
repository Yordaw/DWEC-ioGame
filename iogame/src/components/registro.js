export { renderRegistro};

function renderRegistro() {

    const formulario = document.createElement('div');
    formulario.innerHTML = 
   `
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title text-center">Registro Nuevo Usuario</h2>
                        <form>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Ingresa tu email">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña">
                            </div>
                            <button type="submit" class="btn btn-primary w-100" id="botonEnviarRegistro">Registrarse</button>
                            <br>
                            <br>
                            <a href="#login" class="btn btn-danger btn-lg" data-link >Volver a Login</a>
                        </form>
                    </div>
                </div>
                <h2 class="card-title text-center" id="resultadoRegistro"></h2>
            </div>
        </div>
    </div>
    `;
 
    const mensajeRegistro = formulario.querySelector('#resultadoRegistro');
    const botonEnviar = formulario.querySelector('#botonEnviarRegistro');
    //La clave supabase
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnJnYWpodW1udGNyYWZzY3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDkzMzksImV4cCI6MjA3NjE4NTMzOX0.2lA4EV1xtMtsAB1weI_DJZ6c2F5QaD-q30pmMn03Ldg';
    
    botonEnviar.addEventListener('click',async()=>{
        //Datos necesarios para crear el objeto
        const email = formulario.querySelector('#email').value;
        const password = formulario.querySelector('#password').value;

        //Creacion del objeto
        const signUpObject = {
            "email": email,
            "password": password
        }

        //Comunicacion con supabase para registrar nuevos usuarios
        let response = await fetch('https://csnrgajhumntcrafsctc.supabase.co/auth/v1/signup',{
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
        
        //Si se ha registrado correctamente lo mostramos en un mensaje y a los 2seg nos lleva a hacer login
        if(response.status===200){
            
            mensajeRegistro.innerHTML = `
            Usuario registrado con exito.
            No olvides verificar tu correo!
            `;
            
            setTimeout(() => {
                window.location.hash = '#login';
            },2000);

        }else{//Si hay un error al registrarse lo mostramos y a los 2seg hace reload
            mensajeRegistro.innerHTML = 'Error al registrar el usuario';

            setTimeout(() => {
                window.location.reload();
            },2000);
            
        }

    });
    return formulario;
    
}

