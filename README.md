# MercadoAgro

**MercadoAgro** es una plataforma web que conecta pequeños y medianos agricultores con compradores finales, como supermercados y restaurantes, eliminando intermediarios y aumentando la competitividad del sector agrícola en Colombia. La aplicación está diseñada para ser accesible, fácil de usar y confiable, optimizando la experiencia tanto para agricultores como para compradores.

## Despliegue

El proyecto está desplegado en dos dominios principales:
- **Producción**: [mercadoagro.com.com](https://mercadoagro.com.com)  
- **Desarrollo**: [dev.mercadoagro.com.com](https://dev.mercadoagro.com.com)

La rama `main` se despliega automáticamente en el dominio de producción, mientras que la rama `dev` está vinculada al subdominio de desarrollo, permitiendo probar nuevas características antes de su publicación oficial.

## Tecnologías principales

- **Frontend**: [Next.js](https://nextjs.org/) y [Mantine](https://mantine.dev/)
- **Base de datos**: [Neon.tech](https://neon.tech/) (PostgreSQL)
- **Mensajería SMS**: [Twilio](https://www.twilio.com/)
- **Hosting**: [Vercel](https://vercel.com/)
- **Almacenamiento de imágenes**: [Cloudinary](https://cloudinary.com/)
- **Autenticación**: [NextAuth.js](https://next-auth.js.org/)

## Variables de entorno

Configura las siguientes variables en tu entorno local o en tu plataforma de despliegue para que la aplicación funcione correctamente. **No compartas estos valores públicamente.**

```env
# Base de datos
DATABASE_URL=postgresql://<USUARIO>:<CONTRASEÑA>@<HOST>/<NOMBRE_DB>?sslmode=require

# URL de la API
NEXT_PUBLIC_API_URL=https://mercadoagro.com.com/api

# Twilio (Mensajería SMS)
TWILIO_ACCOUNT_SID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_PHONE_NUMBER=+1XXXXXXXXXX
TWILIO_VERIFY_SERVICE_SID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Cloudinary (Almacenamiento de imágenes)
CLOUDINARY_URL=cloudinary://<API_KEY>:<API_SECRET>@<NOMBRE_CLOUD>

# Autenticación
AUTH_SECRET="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

# Características del proyecto

# Funcionalidades principales

	•	Registro simplificado para agricultores y compradores.
	•	Gestión de publicaciones de productos agrícolas.
	•	Conexión directa entre agricultores y compradores sin intermediarios.
	•	Soporte para mensajes de texto para la verificación de usuarios.
	•	Almacenamiento optimizado de imágenes en Cloudinary para publicaciones y productos.
	•	Alta optimización para dispositivos móviles, con énfasis en usabilidad.

# Scripts disponibles

# Ejecuta los siguientes scripts para trabajar con el proyecto:

# Desarrollo y construcción

	•	dev: Inicia el servidor en modo desarrollo.
	•	build: Genera el proyecto para producción.
	•	analyze: Analiza el tamaño de los paquetes generados.

# Pruebas y calidad de código

	•	typecheck: Verifica los tipos en TypeScript.
	•	lint: Ejecuta ESLint.
	•	prettier:check: Comprueba el formato del código.
	•	jest: Ejecuta las pruebas con Jest.
	•	test: Ejecuta todas las verificaciones (jest, prettier:check, lint, typecheck).

# Storybook

	•	storybook: Inicia el servidor de Storybook para componentes.
	•	storybook:build: Genera una versión estática de Storybook.

# Contribución

# El desarrollo sigue la metodología Scrum con despliegues continuos. Si deseas contribuir, por favor:
	1.	Crea una rama a partir de dev para tus cambios.
	2.	Realiza un pull request a la rama dev para revisión.
	3.	Sigue las guías de estilo y buenas prácticas definidas en los linters y configuraciones de Prettier.
