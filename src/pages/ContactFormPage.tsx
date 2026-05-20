import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { ContactInsert } from '../lib/types';
import { SERVICIOS } from '../lib/types';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const emptyContact: ContactInsert = {
  nombre: '',
  apellido_1: '',
  apellido_2: '',
  num_corto: '',
  num_largo: '',
  mail: '',
  puesto: '',
  servicio: '',
  foto: '',
};

export default function ContactFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useAuth();
  const isEditing = Boolean(id);
  const [form, setForm] = useState<ContactInsert>(emptyContact);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      return;
    }
    if (id) {
      supabase
        .from('contactos')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error || !data) {
            toast.error('Contacto no encontrado');
            navigate('/');
          } else {
            setForm({
              nombre: data.nombre ?? '',
              apellido_1: data.apellido_1 ?? '',
              apellido_2: data.apellido_2 ?? '',
              num_corto: data.num_corto ?? '',
              num_largo: data.num_largo ?? '',
              mail: data.mail ?? '',
              puesto: data.puesto ?? '',
              servicio: data.servicio ?? '',
              foto: data.foto ?? '',
            });
          }
          setFetching(false);
        });
    }
  }, [id, role, navigate]);

  function update(field: keyof ContactInsert, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.apellido_1) {
      toast.error('Nombre y primer apellido son obligatorios');
      return;
    }
    setLoading(true);

    if (isEditing) {
      const { error } = await supabase.from('contactos').update(form).eq('id', id!);
      if (error) {
        toast.error('Error al actualizar');
      } else {
        toast.success('Contacto actualizado');
        navigate(`/contacto/${id}`);
      }
    } else {
      const { data, error } = await supabase.from('contactos').insert(form).select().single();
      if (error) {
        toast.error('Error al crear');
      } else {
        toast.success('Contacto creado');
        navigate(`/contacto/${data.id}`);
      }
    }
    setLoading(false);
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(isEditing ? `/contacto/${id}` : '/')}
        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition"
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {isEditing ? 'Editar contacto' : 'Nuevo contacto'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Nombre *" value={form.nombre} onChange={(v) => update('nombre', v)} />
            <Field label="Primer apellido *" value={form.apellido_1} onChange={(v) => update('apellido_1', v)} />
            <Field label="Segundo apellido" value={form.apellido_2} onChange={(v) => update('apellido_2', v)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Extensión" value={form.num_corto} onChange={(v) => update('num_corto', v)} />
            <Field label="Teléfono largo" value={form.num_largo} onChange={(v) => update('num_largo', v)} />
          </div>

          <Field label="Email" value={form.mail} onChange={(v) => update('mail', v)} type="email" />
          <Field label="Puesto" value={form.puesto} onChange={(v) => update('puesto', v)} />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Servicio
            </label>
            <select
              value={form.servicio}
              onChange={(e) => update('servicio', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="">Seleccionar servicio</option>
              {SERVICIOS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <Field
            label="URL de la foto"
            value={form.foto}
            onChange={(v) => update('foto', v)}
            type="url"
            placeholder="https://..."
          />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isEditing ? 'Guardar cambios' : 'Crear contacto'}
            </button>
            <button
              type="button"
              onClick={() => navigate(isEditing ? `/contacto/${id}` : '/')}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = 'text', placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
      />
    </div>
  );
}
