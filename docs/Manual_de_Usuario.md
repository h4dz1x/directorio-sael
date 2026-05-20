# Manual de Usuario — Directorio SAEL

**Aplicación**: Directorio SAEL  
**Perfil**: Usuario (USER)  
**Versión**: 1.0  
**Fecha**: Mayo 2026

---

## 1. Introducción

El Directorio SAEL es una aplicación web y móvil que permite consultar la agenda de contactos del Servicio de Asistencia a Entidades Locales de la Diputación de Cádiz.

Como usuario con perfil USER, puede visualizar, buscar y filtrar los contactos del directorio, así como comunicarse directamente con ellos a través de llamada telefónica, correo electrónico, WhatsApp o Google Meet.

---

## 2. Acceso a la aplicación

### 2.1 Desde el navegador web

1. Abra su navegador (Chrome, Firefox, Safari, Edge).
2. Acceda a la URL: **https://agenda-contactos-xi.vercel.app**
3. Se mostrará la pantalla de inicio de sesión.

### 2.2 Desde el móvil (APK)

1. Instale el archivo APK proporcionado en su dispositivo Android.
2. Abra la aplicación "Directorio SAEL" desde el cajón de aplicaciones.

### 2.3 Instalación como PWA (Progressive Web App)

1. Acceda a la URL desde Chrome en su móvil.
2. Pulse en el menú (tres puntos) y seleccione "Añadir a pantalla de inicio".
3. La aplicación se instalará como una app nativa.

---

## 3. Registro e inicio de sesión

### 3.1 Registro de nueva cuenta

1. En la pantalla de inicio de sesión, pulse **"¿No tienes cuenta? Regístrate"**.
2. Introduzca su correo electrónico y una contraseña (mínimo 6 caracteres).
3. Pulse **Registrarse**.
4. Si el registro es exitoso, será redirigido automáticamente a la lista de contactos.

### 3.2 Inicio de sesión

1. Introduzca su correo electrónico y contraseña.
2. Pulse **Entrar**.
3. Si las credenciales son correctas, accederá a la lista de contactos.

### 3.3 Cerrar sesión

1. Pulse el icono de flecha (salir) en la esquina superior derecha de la barra de navegación.
2. Será redirigido a la pantalla de inicio de sesión.

---

## 4. Lista de contactos

Al iniciar sesión, se muestra la pantalla principal con todos los contactos del directorio organizados en tarjetas.

Cada tarjeta muestra:
- **Nombre completo** del contacto
- **Puesto** que ocupa
- **Servicio** al que pertenece (etiqueta de color)
- **Iconos de acción rápida**: teléfono, email y chat

En la parte superior se muestra:
- El título **"Contactos"** con el número total entre paréntesis
- El botón **Exportar** para descargar los contactos en formato CSV

---

## 5. Búsqueda y filtrado

### 5.1 Búsqueda por texto

1. Utilice el campo de búsqueda con el icono de lupa.
2. Escriba cualquier término: nombre, apellido, email, teléfono, puesto o servicio.
3. La lista se filtra en tiempo real mientras escribe.
4. Para limpiar la búsqueda, borre el texto del campo.

### 5.2 Filtrado por servicio

1. Utilice el desplegable junto al campo de búsqueda.
2. Seleccione un servicio específico (Jurídico, Formación, Dirección, etc.).
3. Solo se mostrarán los contactos de ese servicio.
4. Seleccione "Todos los servicios" para ver todos los contactos.

Ambos filtros se pueden combinar: por ejemplo, buscar "María" dentro del servicio "Jurídico".

---

## 6. Detalle del contacto

Pulse sobre cualquier tarjeta de contacto para ver su información completa.

La pantalla de detalle muestra:
- **Foto** del contacto (si está disponible) o sus iniciales
- **Nombre completo**
- **Puesto**
- **Servicio**
- **Extensión** (número corto interno)
- **Teléfono** (número largo)
- **Email**

### 6.1 Botones de acción

En la parte superior del detalle aparecen cuatro botones de acción:

| Botón | Función |
|-------|---------|
| **Llamar** | Inicia una llamada telefónica al número del contacto |
| **Email** | Abre su cliente de correo con la dirección del contacto |
| **WhatsApp** | Abre WhatsApp para enviar un mensaje al contacto |
| **Meet** | Abre Google Meet para iniciar una videollamada |

> En dispositivos móviles, estos botones lanzan directamente las aplicaciones correspondientes (teléfono, Gmail, WhatsApp, etc.).

### 6.2 Volver a la lista

Pulse el enlace **"Volver"** en la parte superior izquierda para regresar a la lista de contactos.

---

## 7. Exportar contactos

1. En la lista de contactos, pulse el botón **Exportar**.
2. Se descargará un archivo CSV (`contactos_sael.csv`) con los contactos actualmente visibles.
3. Si tiene un filtro activo, solo se exportarán los contactos filtrados.
4. El archivo CSV se puede abrir en Excel, Google Sheets o cualquier hoja de cálculo.

---

## 8. Tema oscuro / claro

1. Pulse el icono de sol/luna en la barra de navegación superior.
2. La aplicación alternará entre tema claro y oscuro.
3. La preferencia se guarda automáticamente para futuras sesiones.
4. Por defecto, la aplicación detecta la preferencia del sistema operativo.

---

## 9. Solución de problemas

| Problema | Solución |
|----------|----------|
| No puedo iniciar sesión | Verifique que el email y contraseña son correctos. La contraseña debe tener al menos 6 caracteres. |
| No se muestran los contactos | Compruebe su conexión a internet. Recargue la página. |
| Los botones de llamada/email no funcionan | En el navegador web, se abre la aplicación predeterminada del sistema. En móvil, asegúrese de tener instaladas las apps correspondientes. |
| La página aparece en blanco | Limpie la caché del navegador o pruebe en modo incógnito. |
