//service para gestionar perfiles en supabase

const SUPABASE_URL = 'https://csnrgajhumntcrafsctc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnJnYWpodW1udGNyYWZzY3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDkzMzksImV4cCI6MjA3NjE4NTMzOX0.2lA4EV1xtMtsAB1weI_DJZ6c2F5QaD-q30pmMn03Ldg';


//NOTA: TODA ESTA PARTE CON EL PERFIL DEL USUARIO, OBTENER Y GUARDAR NO HABIA MANERA DE HACER FUNCIONAR TODO BIEN, ME DABA ERRORES ETC... Y SE HA HECHO CON MUCHA AYUDA DE LA IA


//obtener id del usuario del token
function obtenerUserIdDelToken() {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  
  try {
    const partes = token.split('.');
    const payload = JSON.parse(atob(partes[1]));
    return payload.sub;
  } catch (error) {
    console.error('error al decodificar token:', error);
    return null;
  }
}

//obtener perfil del usuario
export async function obtenerPerfil() {
  const token = localStorage.getItem('access_token');
  const userId = obtenerUserIdDelToken();
  
  console.log('obtenerPerfil - userId:', userId);
  
  if (!token || !userId) {
    console.error('no hay token o id de usuario');
    return null;
  }

  try {
    const url = `${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=*`;
    console.log('GET url:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apiKey': SUPABASE_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('GET status:', response.status);
    const datos = await response.json();
    console.log('GET response:', datos);

    if (response.ok) {
      return datos.length > 0 ? datos[0] : null;
    } else {
      console.error('error en GET:', datos);
      return null;
    }
  } catch (error) {
    console.error('error en obtenerPerfil:', error);
    return null;
  }
}

//guardar o actualizar perfil
export async function guardarPerfil(perfilData) {
  const token = localStorage.getItem('access_token');
  const userId = obtenerUserIdDelToken();
  
  console.log('guardarPerfil - userId:', userId, 'datos:', perfilData);
  
  if (!token || !userId) {
    console.error('no hay token o id de usuario');
    throw new Error('No hay token o id de usuario');
  }

  try {
    //primero intentar obtener el perfil
    const perfilExistente = await obtenerPerfil();
    console.log('perfil existente:', perfilExistente);
    
    if (perfilExistente) {
      //actualizar - no incluir id en el body para UPDATE
      console.log('modo: ACTUALIZAR');
      const datosActualizar = {
        username: perfilData.username || null,
        full_name: perfilData.full_name || null,
        website: perfilData.website || null,
        updated_at: new Date().toISOString()
      };

      console.log('body PATCH:', datosActualizar);
      
      const url = `${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': SUPABASE_KEY,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosActualizar)
      });

      console.log('PATCH response status:', response.status);
      const responseText = await response.text();
      console.log('PATCH response body:', responseText);

      if (response.ok || response.status === 204) {
        console.log('perfil actualizado correctamente');
        return true;
      } else {
        console.error('error PATCH:', response.status, responseText);
        throw new Error(`Error PATCH: ${response.status}`);
      }
    } else {
      //crear nuevo
      console.log('modo: CREAR');
      const datosCrear = {
        id: userId,
        username: perfilData.username || null,
        full_name: perfilData.full_name || null,
        website: perfilData.website || null,
        updated_at: new Date().toISOString()
      };

      console.log('body POST:', datosCrear);
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': SUPABASE_KEY,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosCrear)
      });

      console.log('POST response status:', response.status);
      const responseText = await response.text();
      console.log('POST response body:', responseText);

      if (response.ok || response.status === 201) {
        console.log('perfil creado correctamente');
        return true;
      } else {
        console.error('error POST:', response.status, responseText);
        throw new Error(`Error POST: ${response.status}`);
      }
    }
  } catch (error) {
    console.error('error en guardarPerfil:', error);
    throw error;
  }
}
