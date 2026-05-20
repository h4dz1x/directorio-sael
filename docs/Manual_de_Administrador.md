# Manual de Administrador — Directorio SAEL

**Aplicación**: Directorio SAEL  
**Perfil**: Administrador (ADMIN)  
**Versión**: 1.0  
**Fecha**: Mayo 2026

---

## 1. Introducción

Este manual describe las funcionalidades exclusivas del perfil de Administrador (ADMIN) en la aplicación Directorio SAEL.

El administrador dispone de todas las funcionalidades del usuario estándar (consulta, búsqueda, filtrado, comunicación) y, adicionalmente, puede gestionar los contactos del directorio: crear nuevos registros, modificar los existentes y eliminar los que ya no sean necesarios (operaciones CRUD completas).

---

## 2. Identificación del perfil Admin

Al iniciar sesión con una cuenta de administrador, se pueden identificar las siguientes diferencias respecto al perfil de usuario:

- **Etiqueta "Admin"**: aparece una etiqueta amarilla con el texto "Admin" junto al email en la barra de navegación superior.
- **Botón "+ Nuevo"**: aparece un botón azul en la cabecera de la lista de contactos para crear nuevos registros.
- **Botones "Editar" y "Eliminar"**: aparecen en la parte inferior de la pantalla de detalle de cada contacto.

---

## 3. Asignación del rol de administrador

El rol de administrador se asigna desde la base de datos Supabase. Para promover un usuario registrado a administrador:

1. Acceda al panel de Supabase: **supabase.com/dashboard**
2. Vaya a **SQL Editor**.
3. Ejecute la siguiente consulta, sustituyendo el email:

```sql
SELECT make_admin('email-del-usuario@example.com');
```

4. El usuario debe **cerrar sesión y volver a iniciar sesión** para que el cambio surta efecto.

> Solo un usuario con acceso al panel de Supabase puede asignar el rol de administrador. Esto garantiza la seguridad del sistema.

---

## 4. Crear un nuevo contacto

1. En la lista de contactos, pulse el botón **+ Nuevo** (azul, esquina superior derecha).
2. Se abrirá el formulario de creación con los siguientes campos:

| Campo | Obligatorio | Descripción |
|-------|:-----------:|-------------|
| Nombre | Si | Nombre de pila del contacto |
| Primer apellido | Si | Primer apellido |
| Segundo apellido | No | Segundo apellido |
| Extensión | No | Número corto interno (ej. 45115) |
| Teléfono largo | No | Número completo (ej. 956551905) |
| Email | No | Dirección de correo electrónico |
| Puesto | No | Cargo o puesto (ej. Técnico, Administrativo) |
| Servicio | No | Departamento al que pertenece (seleccionar del desplegable) |
| URL de la foto | No | Enlace directo a una imagen del contacto |

3. Rellene los campos necesarios.
4. Pulse **Crear contacto**.
5. Si la operación es exitosa, será redirigido a la pantalla de detalle del nuevo contacto.
6. En caso de error, se mostrará un mensaje de notificación en la parte superior.

### Servicios disponibles

El desplegable de servicio incluye las siguientes opciones:
- Recursos Humanos
- Jurídico
- Formación
- Dirección
- Económico
- Contratación proyectos y facturas
- Protección de Datos
- Otro

---

## 5. Editar un contacto existente

1. Acceda a la pantalla de detalle del contacto que desea modificar (pulse sobre su tarjeta en la lista).
2. Pulse el botón **Editar** (azul, en la parte inferior).
3. Se abrirá el formulario de edición con los datos actuales del contacto precargados.
4. Modifique los campos que necesite.
5. Pulse **Guardar cambios**.
6. Si la operación es exitosa, será redirigido a la pantalla de detalle con los datos actualizados.

### Notas importantes

- Los campos obligatorios (nombre y primer apellido) no pueden quedar vacíos.
- Los cambios se reflejan inmediatamente para todos los usuarios de la aplicación.
- Para cancelar la edición sin guardar, pulse **Cancelar** o el enlace **Volver**.

---

## 6. Eliminar un contacto

1. Acceda a la pantalla de detalle del contacto que desea eliminar.
2. Pulse el botón **Eliminar** (rojo, en la parte inferior).
3. Se mostrará un cuadro de diálogo de confirmación: **"¿Eliminar a [nombre del contacto]?"**
4. Pulse **Aceptar** para confirmar la eliminación, o **Cancelar** para abortar.
5. Si la eliminación es exitosa, será redirigido a la lista de contactos y se mostrará una notificación de confirmación.

> **Advertencia**: La eliminación es permanente y no se puede deshacer. Asegúrese de que desea eliminar el contacto antes de confirmar.

---

## 7. Gestión de la base de datos

### 7.1 Acceso al panel de Supabase

1. Vaya a [supabase.com/dashboard](https://supabase.com/dashboard).
2. Seleccione el proyecto **directorio-sael**.
3. En **Table Editor** puede ver y gestionar directamente las tablas:
   - `contactos`: todos los registros del directorio
   - `user_roles`: roles asignados a los usuarios registrados

### 7.2 Consultas útiles en SQL Editor

**Ver todos los contactos:**
```sql
SELECT * FROM contactos ORDER BY apellido_1;
```

**Ver todos los usuarios y sus roles:**
```sql
SELECT u.email, r.role, r.created_at
FROM auth.users u
LEFT JOIN user_roles r ON u.id = r.user_id
ORDER BY r.role, u.email;
```

**Cambiar un admin a usuario normal:**
```sql
UPDATE user_roles SET role = 'user'
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'email@example.com');
```

**Contar contactos por servicio:**
```sql
SELECT servicio, count(*) as total
FROM contactos
GROUP BY servicio
ORDER BY total DESC;
```

---

## 8. Seguridad (Row Level Security)

La aplicación utiliza Row Level Security (RLS) de Supabase para garantizar que:

- **Usuarios (USER)**: solo pueden leer los contactos (`SELECT`).
- **Administradores (ADMIN)**: pueden leer, crear, modificar y eliminar contactos (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
- **Roles**: cada usuario solo puede ver su propio rol.

Estas políticas se aplican a nivel de base de datos, lo que significa que incluso si alguien intenta manipular la aplicación desde el navegador, la base de datos rechazará las operaciones no autorizadas.

---

## 9. Flujo completo de trabajo del administrador

```
Inicio de sesión (con credenciales admin)
    │
    ├── Ver lista de contactos (igual que USER)
    │     ├── Buscar / Filtrar
    │     ├── Exportar CSV
    │     └── + Nuevo → Formulario de creación → Guardar
    │
    └── Ver detalle de contacto
          ├── Llamar / Email / WhatsApp / Meet
          ├── Editar → Formulario de edición → Guardar cambios
          └── Eliminar → Confirmación → Eliminado
```

---

## 10. Solución de problemas

| Problema | Solución |
|----------|----------|
| No veo el botón "+ Nuevo" ni "Editar/Eliminar" | Su cuenta no tiene rol de administrador. Pida a alguien con acceso a Supabase que ejecute `SELECT make_admin('su-email')`. Luego cierre sesión y vuelva a entrar. |
| Error al crear/editar contacto | Verifique que los campos obligatorios (nombre, primer apellido) están rellenos. |
| Error al eliminar contacto | Compruebe su conexión a internet e inténtelo de nuevo. |
| Los cambios no aparecen para otros usuarios | Los cambios son inmediatos. Si otro usuario no ve los cambios, debe recargar la página. |
| No puedo acceder al panel de Supabase | Solo el propietario del proyecto Supabase tiene acceso al dashboard. Contacte con el responsable técnico. |
