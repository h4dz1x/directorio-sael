export interface Contact {
  id: string;
  nombre: string;
  apellido_1: string;
  apellido_2: string;
  num_corto: string;
  num_largo: string;
  mail: string;
  puesto: string;
  servicio: string;
  foto: string;
  created_at?: string;
}

export type ContactInsert = Omit<Contact, 'id' | 'created_at'>;

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
}

export const SERVICIOS = [
  'Recursos Humanos',
  'Jurídico',
  'Formación',
  'Dirección',
  'Económico',
  'Contratación proyectos y facturas',
  'Protección de Datos',
  'Otro',
] as const;
