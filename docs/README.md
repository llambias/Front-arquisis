# Tutorial para Levantantar Aplicación Localmente

## Instalación y Ejecución

1. Clonar el repositorio
```bash
git clone [url-del-repositorio]
cd [nombre-del-repositorio]
```

2. Instalar dependencias
```bash
npm install
```

3. Configuración del Entorno

Crear un archivo `.env` en el directorio raíz con las siguientes variables:
```env
VITE_API_URL=http://localhost:3000  # URL del servicio api
VITE_AUTH_API_URL=http://localhost:3001  # URL del servicio auth
```

4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

Una vez adentro de la app, el usuario debe registrarse para poder acceder a las páginas privadas (stocks, solicitudes, recarga de billetera).

## Integración con API

La aplicación espera un servidor de api ejecutándose en la URL especificada en `VITE_API_URL` y un servidor de autenticación ejecutándose en la URL especificada en `VITE_AUTH_API_URL`.
