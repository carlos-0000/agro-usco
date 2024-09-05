# Mercado Agro

**Mercado Agro** es una plataforma desarrollada para conectar agricultores directamente con clientes, distribuidores y transformadores de materia prima. Este proyecto tiene como objetivo mejorar la competitividad de los agricultores facilitando la venta directa y la negociación de sus productos en el mercado.

Este proyecto fue creado por estudiantes de la Universidad Surcolombiana (USCO) como parte de la materia Proyecto Integrador IV.

![Passkey demo](/passKeyAgro.gif)

## Descripción del Proyecto

Mercado Agro ofrece una experiencia segura y amigable para los usuarios mediante la autenticación Passkey, utilizando tecnologías modernas para garantizar un acceso sencillo y sin contraseñas. Además de la funcionalidad de autenticación, la plataforma incluye características clave para la gestión de productos y la comunicación directa con compradores potenciales.

## Tecnologías Utilizadas

- **Frontend y Backend**: Next.js alojado en Vercel.
- **Autenticación**: Hanko Passkey API para una experiencia de inicio de sesión sin contraseñas.
- **Base de Datos**: Supabase, utilizando PostgreSQL para almacenamiento de datos.
- **DNS y CDN**: Cloudflare, manejando la configuración del dominio y mejorando el rendimiento de la plataforma.
- **Envío de Correos**: Resend, utilizado para la gestión y envío de correos electrónicos.
- **Dominio**: Gestionado a través de Cloudflare, utilizando el dominio `mercadoagro.com.co`.
- **Otros**: Prisma para la interacción con la base de datos y Shadcn UI para componentes de interfaz de usuario.

## Configuración y Despliegue

1. **Clonar el repositorio**:

    ```bash
    git clone https://github.com/carlos-0000/agro-usco.git
    ```

2. **Configurar las variables de entorno**:

   Crea un archivo `.env` en el directorio raíz y agrega las siguientes variables:

    ```sh
    NEXTAUTH_SECRET=random-string
    NEXTAUTH_URL=http://localhost:3000

    GITHUB_ID=
    GITHUB_SECRET_ID=

    # Configuración del servicio de correos
    EMAIL_SERVER_USER=resend
    EMAIL_SERVER_PASSWORD=your-resend-api-key
    EMAIL_SERVER_HOST=smtp.resend.com
    EMAIL_SERVER_PORT=465
    EMAIL_FROM=onboarding@mercadoagro.com.co

    DATABASE_URL=your-db-url

    PASSKEYS_API_KEY=your-hanko-passkey-api-key
    NEXT_PUBLIC_PASSKEYS_TENANT_ID=your-hanko-passkey-tenant-id
    ```

   Asegúrate de reemplazar los valores de `PASSKEYS_API_KEY` y `NEXT_PUBLIC_PASSKEYS_TENANT_ID` con los datos reales de Hanko Passkey API.

3. **Instalar dependencias**:

   Utiliza tu gestor de paquetes preferido (ej. `npm`, `pnpm`, `yarn`). Para este proyecto, usamos `pnpm`:

    ```bash
    pnpm install
    ```

4. **Iniciar el servidor de desarrollo**:

    ```bash
    pnpm dev
    ```

## Uso

1. **Iniciar la aplicación**:

   - Accede a la aplicación navegando a `http://localhost:3000` en tu navegador.

2. **Registro e inicio de sesión**:

   - Regístrate usando email o GitHub.
   - Registra una passkey para tu usuario.

3. **Iniciar sesión con passkey**:

   - En la página de inicio de sesión, selecciona la opción para iniciar sesión con una passkey.

## Contribución

Este proyecto ha sido desarrollado por estudiantes de la Universidad Surcolombiana (USCO) para la materia Proyecto Integrador IV. Agradecemos tu interés y cualquier contribución para mejorar la plataforma.
