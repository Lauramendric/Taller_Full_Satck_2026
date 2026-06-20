# 🌐 Taller Full Stack 2026  
## Aplicación Web: Frontend + Backend + MySQL


# Tecnohogar 🏠💻

Proyecto desarrollado como parte del taller Full Stack — tienda online de productos tecnológicos para el hogar.

# Integrantes:   Laura Adriana Mendoza Rincón
             └── Jose Luis Marenco Hernández


## 📌 Descripción del proyecto

Tecnohogar es una aplicación web que simula una tienda en línea donde los usuarios pueden explorar un catálogo de productos, contactar al soporte, y contactar ayuda y soporte de la tienda. Cuenta además con un panel de administración para gestionar el inventario de productos, conectado a una base de datos MySQL.

 # Funcionalidades

- Página principal (index.html): portada de la tienda con sección de bienvenida, categorías y tarjetas informativas.
- Centro de ayuda (ayuda.html): preguntas frecuentes en formato acordeón de Bootstrap.
- Formulario de contacto (contacto.html): envío de mensajes que se almacenan en MySQL.
- Catálogo de productos (productos.html): visualización de productos tecnológicos, combinando productos fijos de ejemplo con productos cargados dinámicamente desde MySQL.
- Administración de productos (admin-productos.html): CRUD completo (crear, listar, editar, eliminar) conectado a la base de datos.
- Login administrativo (login.html): autenticación básica de usuarios contra la tabla usuarios en MySQL.
- Protección de rutas: el panel administrativo solo es accesible si existe una sesión activa; de lo contrario redirige al login.
- Cierre de sesión: botón que elimina la sesión y regresa al login.
---

## 🧱 Stack tecnológico

| Componente                 | Tecnología                        |
|----------------------------|-----------------------------------|
| Frontend                   | HTML, CSS, JavaScript, Bootstrap 5|
| IA                         | codex                             |
| Backend                    | Node.js + Express                 |
| Base de datos              | MySQL                             |
| Comunicación               | Fetch API, HTTP y JSON            |
| Editor recomendado         | Visual Studio Code                |
| Servidor local frontend    | Live Server                       |

---

## 📁 Estructura del proyecto

```bash
TALLER_FULL_STACK_2026/ Tienda de Tecnologia Tecnohogar

├── backend/
│   ├── agents.md
├── ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── node_modules/        
│   
├── frontend/
│   ├── index.html
│   ├── productos.html
│   ├── contacto.html
│   ├── ayuda.html
│   ├── login.html
│   ├── admin-productos.html
│   ├── css/
│   ├── js/
│       ├── auth.js
│       ├── login.js
│       ├── productos.js
│       ├── script.js
│   ├── img/
│   └── video/
│
├── .gitignore
├── Documentacion.pdf
└── README.md
```

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, se procedio a instalar los siguientes programas: 

- Node.js  
- npm  
- MySQL  
- MySQL Workbench, recomendado para administrar la base de datos  
- Visual Studio Code  
- Extensión Live Server  
- Git, que nos sirvio para clonar el repositorio  

---
🏗️ Arquitectura

El proyecto sigue una arquitectura cliente-servidor de 3 capas:

|      Capa                 |      Tecnología            |    Responsabilidad 
|---------------------------|----------------------------|------------------------
|1. Presentación            | HTML, CSS, Bootstrap, JS   |  Interfaz visual, captura datos del usuario, envía solicitudes mediante fetch()
|2. Lógica de negocio       | Node.js + Express          |  Valida login, procesa formularios, gestiona el CRUD de productos, responde en formato JSON
|3. Datos                   | MySQL                      |  Almacena la información persistente (contactos, productos, usuarios)

Usuario → Navegador → Frontend → fetch/HTTP → Backend (Express) → MySQL → Respuesta JSON → Pantalla actualizada

## 🔧 Instalación del proyecto

### 1. Clonar el repositorio

Para descargar el proyecto desde GitHub, ejecutamos el siguiente comando:

```bash
git clone https://github.com/USUARIO/TALLER_FULL_STACK_2026.git
```

Luego ingresar a la carpeta del proyecto:

```bash
cd TALLER_FULL_STACK_2026
```

> Reemplazamos el `USUARIO` por el nombre del usuario donde se alojo el repositorio.

---
# Se creo el archivo Agents.md para guiar a Codex.

## 🖥️ Configuración y ejecución del backend

El backend se encuentra en la carpeta `backend`.

### 1. Ingresamos a la carpeta del backend

```bash
cd backend
```

### 2. Instalamos las dependencias del proyecto

```bash
npm install
```

Este comando instalo las librerías necesarias definidas en el archivo `package.json`.

### 3. Ejecutamos el servidor

```bash
node server.js
```

Todo quedo correctamente configurado, apareciendo un mensaje igual a:

```bash
Servidor en: http://localhost:3000
```

---

## 🗄️ Luego se procedio a configurar la base de datos en MySQL

Para este proyecto utilizamos una base de datos llamada `contactos_db`.

En MySQL Workbench o en la consola de MySQL, ejecutamos las siguientes instrucciones:

```sql
CREATE DATABASE contactos_db;
USE contactos_db;

-- Tabla de mensajes de contacto
CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    asunto VARCHAR(150) NOT NULL,
    mensaje TEXT NOT NULL
);

-- Tabla de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    stock INT DEFAULT 0,
    imagen VARCHAR(255)
);

-- Tabla de usuarios (login administrativo)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(50) DEFAULT 'admin'
);

-- Usuario administrador de prueba
INSERT INTO usuarios (nombre, correo, password, rol)
VALUES ('Administrador', 'admin@tienda.com', '12345', 'admin');


Esta tabla permitirá almacenar los datos enviados desde el formulario del frontend.

---

## 🔌 Configuración de la conexión en Node.js

La conexión con MySQL la configuramos en el archivo:

```bash
backend/server.js
```

Dentro del archivo revisamos la siguiente sección:

```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", 
  database: "contactos_db"
});
```
Cambiamos usuario y la contraseña para que coincidieran con la configuración local de MySQL en el computador.

En la consola se vio así:

Conectado a MySQL
Servidor en http://localhost:3000

---

## 🎨 Ejecución del frontend

El frontend se encuentra en la carpeta `frontend`.

Para ejecutarla:

1. Abrimos el proyecto en Visual Studio Code.
2. Ingresamos a la carpeta `frontend`.
3. Abrimos el archivo `index.html`.
4. Se hizo clic derecho sobre el archivo.
5. Seleccionamos la opción **Open with Live Server**.

El navegador abrio la pagina web de manera local.

http://127.0.0.1:5500/frontend/index.html

---

 # Endpoints del backend

| Método |     Ruta         |         Descripción                      |
|--------|------------------|------------------------------------------|
|GET     | /                |   Verifica que el servidor está activo   |
|POST    | /guardar         |   Guarda un mensaje de contacto          |
|POST    | /login           |   Valida correo y contraseña del usuario |
|GET     | /productos       |   Lista todos los productos              |
|POST    | /productos       |   Registra un nuevo producto             | 
|PUT     | /productos/:id   |   Actualiza un producto existente        |
|DELETE  | /productos/:id   |   Elimina un producto                    |
---


## 🔄 Flujo de funcionamiento de la aplicación

El funcionamiento general del proyecto es el siguiente:

```text
Formulario HTML
      ↓
JavaScript con Fetch API
      ↓
Backend con Node.js y Express
      ↓
Base de datos MySQL
      ↓
Respuesta al usuario
```

### Explicación del flujo

1. El usuario diligencia el formulario en el frontend.
2. JavaScript captura los datos ingresados.
3. La función `fetch()` envía la información al backend.
4. Node.js recibe los datos mediante una ruta de Express.
5. El backend inserta la información en la tabla `contactos`.
6. MySQL almacena los datos.
7. El backend devuelve una respuesta al frontend.

---
# Flujo de autenticación

login.html
   ↓
login.js
   ↓
fetch POST /login
   ↓
server.js
   ↓
MySQL - tabla usuarios
   ↓
Respuesta JSON
   ↓
localStorage
   ↓
admin-productos.html

# Explicación:

1. El usuario escribe su correo y contraseña en login.html.
2. login.js captura esos datos y los envía al backend mediante fetch().
3. server.js recibe la solicitud en POST /login y consulta la tabla usuarios en MySQL.
4. Si el usuario existe, el backend responde con ok: true. login.js guarda al usuario en localStorage (clave usuario) y redirige a admin-productos.html.
5. Si las credenciales son incorrectas, se muestra un mensaje de error sin redirigir.
6. admin-productos.html está protegida por auth.js, que verifica si existe la clave usuario en localStorage. Si no existe, redirige automáticamente a login.html.
7. El botón Cerrar sesión elimina la clave usuario de localStorage y regresa a login.html.
---


 # Identificadores importantes (no modificar)

Estos id son requeridos por los scripts JS y no deben cambiarse:

|  Página                  |     Elemento           |      id           |
|--------------------------|------------------------|-------------------|
|contacto.html             |  Formulario            |    formulario     |
|contacto.html             |  Campo nombre          |   nombre          |
|contacto.html             |  Campo correo          |   correo          |
|contacto.html             |  Campo mensaje         |   mensaje         |
|contacto.html             |  Mensaje de respuesta  |   respuesta       |
|login.html                |  Formulario            |   formLogin       |
|login.html                |  Campo correo          |   correo          |
|login.html                |  Campo contraseña      |   password        |
|login.html                |  Mensaje al usuario    |   mensaje         |
|Loginadmin-productos.html |  Botón cerrar sesión   |   btnCerrarSesion |


# Pruebas realizadas

|   Prueba                                |        Resultado esperado                          |
|-----------------------------------------|----------------------------------------------------|
|1. Abrir index.html                      |    Carga la página principal de la tienda          |
|2. Abrir ayuda.html                      |    Carga el centro de ayuda                        |
|3. Abrir contacto.html                   |    Carga el formulario y guarda en MySQL           |
|4. Abrir productos.html                  |    Muestra catálogo fijo + productos de MySQL      |
|5. Abrir login.html                      |    Carga el formulario de ingreso                  |
|6. Login con datos correctos             |    Redirige a admin-productos.html                 |
|7. Login con datos incorrectos           |    Muestra mensaje de error                        |
|8. Abrir admin-productos.html sin sesión |    Redirige a login.html                           |
|9. Cerrar sesión                         |    Cierra la sesión y regresa al login             |
|10. Crear / editar / eliminar producto   |    Se refleja correctamente en MySQL y en la tabla |
|11. Menú de navegación                   |    Navega correctamente entre todas las páginas    |
|12. Responsive                           |    Se adapta a pantallas pequeñas                  |


## 🧪 Prueba del proyecto

Para verificar que el proyecto funciona correctamente:

1. Ejecutar el backend con:

```bash
node server.js
```

2. Abrir el frontend con Live Server.

3. Navegar entre páginas.

4. Llenar el formulario desde la página web.

5. Enviar los datos.

6. Verificar en MySQL que la información fue almacenada:

```sql
SELECT * FROM contactos;
```

Si la información aparece en la tabla, significa que la conexión entre frontend, backend y base de datos funciona correctamente.

---

## ⚠️ Problemas comunes y posibles soluciones

|    Problema                                 |         Posible solución                                   |
|---------------------------------------------|------------------------------------------------------------|
| Error de conexión con MySQL                 | Revisar usuario, contraseña y nombre de la base de datos   |
| El servidor no inicia                       | Verificar que Node.js esté instalado correctamente         |
| Puerto ocupado                              | Cambiar el puerto en el archivo `server.js`                |
| Error CORS                                  | Verificar que el backend tenga configurado `cors()`        |
| No se guardan los datos                     | Revisar la consola del backend y la consulta SQL           |
| El frontend no se comunica con el backend   | Verificar la URL usada en `fetch()`                        |
| Se subió la carpeta `node_modules` a GitHub | Revisar que esté incluida en el archivo `.gitignore`       |

---

# Problemas comunes 

1. ERR_CONNECTION_REFUSED al guardar contacto/producto → el backend no está corriendo. Ejecutar node server.js.
2. 400 Bad Request - Datos incompletos → revisar que los id del HTML coincidan exactamente con los que lee el JS.
3. Productos no aparecen en productos.html → verificar que el div#listaProductos esté fuera del div.row de productos fijos, y que el backend esté activo.
4. Imágenes con error 404 → revisar que la ruta en el campo imagen coincida exactamente con el nombre del archivo en img/ (cuidado con tildes y mayúsculas).
5. Campos NULL rompen la tabla del administrador → asegurarse de llenar todos los campos del formulario antes de guardar.


---

## ✅ Resultado esperado

Al finalizar la configuración, se debe poder:

- Ejecutar el frontend desde Live Server.
- Ejecutar el backend con Node.js.
- Conectar el backend con MySQL.
- Enviar datos desde un formulario HTML.
- Guardar los datos en la base de datos.
- Consultar los registros almacenados en MySQL.

---


