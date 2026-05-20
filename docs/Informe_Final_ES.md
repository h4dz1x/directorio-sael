# Informe Final — Directorio SAEL

**Asignatura**: Ingeniería de Software  
**Ejercicio**: Práctica Final  
**Autores**: Tarik Hadzimusovic  
**Profesor**: Antonio Jesús Sánchez Guirado  
**Fecha**: Mayo 2026

---

## 1. Descripción del proyecto

El proyecto consiste en el desarrollo de una aplicación de tipo agenda/directorio de contactos para el Servicio de Asistencia a Entidades Locales (SAEL) de la Diputación de Cádiz.

La aplicación permite consultar, buscar y gestionar los contactos del servicio. Funciona tanto desde un navegador web (accesible mediante URL) como desde un dispositivo móvil Android (mediante archivo APK instalable).

### Requisitos cumplidos

- Aplicación web accesible mediante URL
- Aplicación móvil instalable (APK Android)
- Dos perfiles de usuario: USER (consulta) y ADMIN (CRUD completo)
- Datos iniciales cargados desde el CSV proporcionado por el profesor
- Integración móvil: llamadas, email, WhatsApp y Google Meet
- Documentación completa: manual de usuario, manual de administrador e informe final

---

## 2. Investigación de tecnologías

Antes de comenzar el desarrollo, se evaluaron las siguientes alternativas gratuitas:

### 2.1 Opciones analizadas

| Tecnología | Ventajas | Desventajas |
|------------|----------|-------------|
| **Supabase** | PostgreSQL completo, autenticación integrada, API REST automático, plan gratuito generoso (2 proyectos, 500 MB), Row Level Security | Requiere conexión a internet |
| **ODOO** | ERP completo con módulos de contactos | Excesivamente complejo para una agenda simple, curva de aprendizaje elevada, no orientado a apps móviles |
| **GitHub Pages + JSON** | Totalmente gratuito, sin backend | No soporta autenticación ni operaciones de escritura (CRUD), datos estáticos |
| **Firebase** | Buena documentación, autenticación robusta | Base de datos NoSQL (menos adecuada para datos relacionales), modelo de precios menos predecible |

### 2.2 Elección: Supabase

Se eligió **Supabase** como backend por las siguientes razones:

1. **Base de datos PostgreSQL**: base de datos relacional completa, ideal para datos estructurados como contactos.
2. **Autenticación integrada**: sistema de registro e inicio de sesión listo para usar, con soporte para roles.
3. **Row Level Security (RLS)**: permite definir políticas de seguridad a nivel de base de datos, garantizando que los usuarios solo puedan realizar las operaciones permitidas por su rol.
4. **API REST automático**: Supabase genera automáticamente endpoints REST para todas las tablas, eliminando la necesidad de escribir código de servidor.
5. **Plan gratuito adecuado**: el plan gratuito incluye 2 proyectos, 500 MB de base de datos y 1 GB de almacenamiento, más que suficiente para este proyecto.
6. **Ecosistema moderno**: SDK oficial para JavaScript/TypeScript con excelente documentación.

---

## 3. Stack tecnológico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| **Frontend** | React 19 + TypeScript | Framework moderno, tipado estático para mayor fiabilidad |
| **Bundler** | Vite 8 | Arranque instantáneo en desarrollo, builds optimizados |
| **Estilos** | Tailwind CSS 4 | Desarrollo rápido de UI responsive, utilidad-first |
| **Backend** | Supabase (PostgreSQL) | BaaS gratuito con auth, API REST y RLS |
| **Routing** | React Router 7 | Navegación SPA con rutas protegidas |
| **Iconos** | Lucide React | Iconos SVG ligeros y consistentes |
| **Notificaciones** | React Hot Toast | Feedback visual para acciones del usuario |
| **Móvil** | Capacitor | Empaquetado de la web app como APK nativo |
| **Hosting** | Vercel | Despliegue gratuito con SSL y CDN global |

---

## 4. Arquitectura de la aplicación

### 4.1 Estructura general

```
┌─────────────────────────────────────────┐
│           Cliente (React SPA)           │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐  │
│  │  Login  │ │  Lista   │ │ Detalle │  │
│  │  Page   │ │Contactos │ │Contacto │  │
│  └─────────┘ └──────────┘ └─────────┘  │
│  ┌─────────────────────────────────┐    │
│  │      AuthContext (roles)        │    │
│  └─────────────────────────────────┘    │
└──────────────┬──────────────────────────┘
               │ HTTPS (API REST)
┌──────────────▼──────────────────────────┐
│         Supabase (Backend)              │
│  ┌──────────┐  ┌─────────────────────┐  │
│  │   Auth   │  │    PostgreSQL DB    │  │
│  │ (JWT)    │  │  ┌──────────────┐   │  │
│  └──────────┘  │  │  contactos   │   │  │
│                │  │  user_roles   │   │  │
│                │  └──────────────┘   │  │
│                │  ┌──────────────┐   │  │
│                │  │  RLS Policies │   │  │
│                │  └──────────────┘   │  │
│                └─────────────────────┘  │
└─────────────────────────────────────────┘
```

### 4.2 Modelo de datos

**Tabla `contactos`:**
- `id` (UUID, clave primaria)
- `nombre`, `apellido_1`, `apellido_2` (texto)
- `num_corto` (extensión), `num_largo` (teléfono completo)
- `mail` (correo electrónico)
- `puesto` (cargo), `servicio` (departamento)
- `foto` (URL de la imagen)
- `created_at` (fecha de creación)

**Tabla `user_roles`:**
- `id` (UUID, clave primaria)
- `user_id` (referencia a auth.users)
- `role` ('user' o 'admin')
- `created_at` (fecha de asignación)

### 4.3 Seguridad

Se implementaron 5 políticas de Row Level Security:
- `contactos_select`: todos los usuarios autenticados pueden leer
- `contactos_insert`: solo administradores pueden crear
- `contactos_update`: solo administradores pueden modificar
- `contactos_delete`: solo administradores pueden eliminar
- `roles_select_own`: cada usuario solo puede ver su propio rol

Un trigger automático asigna el rol 'user' a cada nuevo usuario registrado.

---

## 5. Funcionalidades implementadas

### 5.1 Perfil USER

| Funcionalidad | Descripción |
|---------------|-------------|
| Registro e inicio de sesión | Con email y contraseña |
| Lista de contactos | Vista en tarjetas con nombre, puesto y servicio |
| Búsqueda | Por nombre, apellido, email, teléfono, puesto o servicio |
| Filtrado | Por servicio/departamento mediante desplegable |
| Detalle del contacto | Vista completa con toda la información |
| Llamada directa | Enlace `tel:` que abre el marcador telefónico |
| Envío de email | Enlace `mailto:` que abre el cliente de correo |
| WhatsApp | Enlace directo a WhatsApp Web/App |
| Google Meet | Enlace para iniciar videollamada |
| Exportar CSV | Descarga de contactos filtrados en formato CSV |
| Tema oscuro/claro | Selección manual y detección automática del sistema |

### 5.2 Perfil ADMIN

Todas las funcionalidades del perfil USER, además de:

| Funcionalidad | Descripción |
|---------------|-------------|
| Crear contacto | Formulario completo con validación |
| Editar contacto | Formulario precargado con datos actuales |
| Eliminar contacto | Con diálogo de confirmación |

---

## 6. Mejoras implementadas

Además de los requisitos básicos, se implementaron las siguientes mejoras:

1. **Exportación a CSV**: permite descargar los contactos visibles (con filtros aplicados) en formato CSV compatible con Excel y Google Sheets.

2. **Tema oscuro/claro**: la aplicación detecta automáticamente la preferencia del sistema operativo y permite al usuario cambiar manualmente entre temas. La preferencia se guarda en localStorage.

3. **Diseño responsive (mobile-first)**: la interfaz se adapta a cualquier tamaño de pantalla, desde móviles pequeños hasta monitores de escritorio. Utiliza un sistema de grid que reorganiza las tarjetas según el espacio disponible.

4. **PWA (Progressive Web App)**: la aplicación incluye un manifest.json que permite instalarla como app desde el navegador móvil, sin necesidad de APK.

5. **Notificaciones toast**: feedback visual para todas las acciones (creación, edición, eliminación, errores) mediante notificaciones no intrusivas.

6. **Iniciales como avatar**: cuando un contacto no tiene foto, se muestran sus iniciales en un círculo de color como avatar.

---

## 7. Proceso de desarrollo

### 7.1 Fases del desarrollo

1. **Investigación** (Fase 1): Análisis comparativo de tecnologías gratuitas.
2. **Configuración** (Fase 2): Creación del proyecto, instalación de dependencias, configuración de Supabase.
3. **Desarrollo del backend** (Fase 3): Diseño del esquema de base de datos, políticas RLS, triggers y funciones.
4. **Desarrollo del frontend** (Fase 4): Implementación de componentes, páginas, autenticación y routing.
5. **Integración móvil** (Fase 5): Configuración de Capacitor para generación de APK.
6. **Despliegue** (Fase 6): Publicación en Vercel con configuración de variables de entorno.
7. **Documentación** (Fase 7): Redacción de manuales e informe final.

### 7.2 Herramientas de desarrollo

- **Editor**: Visual Studio Code
- **Control de versiones**: Git
- **Terminal**: zsh (macOS)
- **Navegador**: Chrome (con DevTools para depuración)
- **Diseño**: Tailwind CSS (desarrollo directo en código)

---

## 8. Despliegue

### 8.1 Web

La aplicación está desplegada en **Vercel** y es accesible en:

**https://agenda-contactos-xi.vercel.app**

Características del despliegue:
- SSL/HTTPS automático
- CDN global (baja latencia desde cualquier ubicación)
- Despliegue automático con cada actualización
- Variables de entorno configuradas de forma segura

### 8.2 Móvil

Se utilizó **Capacitor** para empaquetar la aplicación web como APK de Android:
- ID de la app: `es.dipucadiz.sael`
- Nombre: "Directorio SAEL"
- Esquema: HTTPS (seguro)

---

## 9. Conclusiones

El proyecto cumple con todos los requisitos especificados:

- Aplicación funcional tanto en web como en móvil
- Sistema de roles con dos perfiles diferenciados (USER y ADMIN)
- CRUD completo para administradores
- Integración móvil con llamadas, email, WhatsApp y Google Meet
- Tecnología gratuita y adecuada para el proyecto
- Documentación completa

La elección de Supabase como backend resultó ser acertada, ya que proporcionó todas las funcionalidades necesarias (base de datos, autenticación, seguridad) sin coste alguno y con una configuración mínima. La combinación con React y Capacitor permitió desarrollar una única base de código que funciona tanto en web como en dispositivos móviles.
