-- ============================================
-- DIRECTORIO SAEL – Esquema de base de datos
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- 1. Tabla de contactos
create table if not exists public.contactos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido_1 text not null,
  apellido_2 text default '',
  num_corto text default '',
  num_largo text default '',
  mail text default '',
  puesto text default '',
  servicio text default '',
  foto text default '',
  created_at timestamptz default now()
);

-- 2. Tabla de roles de usuario
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique not null,
  role text check (role in ('user', 'admin')) default 'user',
  created_at timestamptz default now()
);

-- 3. Activar Row Level Security
alter table public.contactos enable row level security;
alter table public.user_roles enable row level security;

-- 4. Políticas para contactos
-- Cualquier usuario autenticado puede leer
create policy "contactos_select" on public.contactos
  for select to authenticated
  using (true);

-- Solo admins pueden insertar
create policy "contactos_insert" on public.contactos
  for insert to authenticated
  with check (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- Solo admins pueden actualizar
create policy "contactos_update" on public.contactos
  for update to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- Solo admins pueden eliminar
create policy "contactos_delete" on public.contactos
  for delete to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- 5. Políticas para user_roles
-- Cada usuario puede leer su propio rol
create policy "roles_select_own" on public.user_roles
  for select to authenticated
  using (user_id = auth.uid());

-- 6. Función para asignar rol admin desde SQL
-- Uso: select make_admin('email@example.com');
create or replace function public.make_admin(user_email text)
returns void
language plpgsql
security definer
as $$
declare
  uid uuid;
begin
  select id into uid from auth.users where email = user_email;
  if uid is null then
    raise exception 'Usuario no encontrado: %', user_email;
  end if;
  insert into public.user_roles (user_id, role)
  values (uid, 'admin')
  on conflict (user_id) do update set role = 'admin';
end;
$$;

-- 7. Trigger para asignar rol 'user' automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
