import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { Contact } from '../lib/types';
import {
  ArrowLeft, Phone, Mail, MessageCircle, Video, Pencil, Trash2, User, Building2, Hash,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useAuth();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
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
          setContact(data);
        }
        setLoading(false);
      });
  }, [id, navigate]);

  async function handleDelete() {
    if (!contact) return;
    if (!window.confirm(`¿Eliminar a ${contact.nombre} ${contact.apellido_1}?`)) return;
    setDeleting(true);
    const { error } = await supabase.from('contactos').delete().eq('id', contact.id);
    if (error) {
      toast.error('Error al eliminar');
    } else {
      toast.success('Contacto eliminado');
      navigate('/');
    }
    setDeleting(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!contact) return null;

  const fullName = [contact.nombre, contact.apellido_1, contact.apellido_2]
    .filter(Boolean)
    .join(' ');
  const initials = (contact.nombre?.[0] ?? '') + (contact.apellido_1?.[0] ?? '');

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition"
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-center">
          {contact.foto ? (
            <img
              src={contact.foto}
              alt={fullName}
              className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white/30 shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div
            className={`w-24 h-24 rounded-full bg-white/20 text-white flex items-center justify-center text-2xl font-bold mx-auto ${
              contact.foto ? 'hidden' : ''
            }`}
          >
            {initials || <User size={36} />}
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">{fullName}</h1>
          {contact.puesto && (
            <p className="text-primary-100 mt-1">{contact.puesto}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-700">
          {contact.num_largo ? (
            <a
              href={`tel:+34${contact.num_largo.replace(/\D/g, '')}`}
              className="flex flex-col items-center gap-1 py-4 bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 transition"
            >
              <Phone size={22} />
              <span className="text-xs font-medium">Llamar</span>
            </a>
          ) : (
            <div className="flex flex-col items-center gap-1 py-4 bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-600">
              <Phone size={22} />
              <span className="text-xs">Sin teléfono</span>
            </div>
          )}

          {contact.mail ? (
            <a
              href={`mailto:${contact.mail}`}
              className="flex flex-col items-center gap-1 py-4 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-600 dark:text-primary-400 transition"
            >
              <Mail size={22} />
              <span className="text-xs font-medium">Email</span>
            </a>
          ) : (
            <div className="flex flex-col items-center gap-1 py-4 bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-600">
              <Mail size={22} />
              <span className="text-xs">Sin email</span>
            </div>
          )}

          {contact.mail ? (
            <a
              href={`https://wa.me/?text=Hola%20${encodeURIComponent(contact.nombre)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 py-4 bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 transition"
            >
              <MessageCircle size={22} />
              <span className="text-xs font-medium">WhatsApp</span>
            </a>
          ) : (
            <div className="flex flex-col items-center gap-1 py-4 bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-600">
              <MessageCircle size={22} />
              <span className="text-xs">Sin chat</span>
            </div>
          )}

          {contact.mail ? (
            <a
              href={`https://meet.google.com/new?authuser=${contact.mail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 py-4 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition"
            >
              <Video size={22} />
              <span className="text-xs font-medium">Meet</span>
            </a>
          ) : (
            <div className="flex flex-col items-center gap-1 py-4 bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-600">
              <Video size={22} />
              <span className="text-xs">Sin Meet</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <DetailRow icon={<Building2 size={18} />} label="Servicio" value={contact.servicio} />
          <DetailRow icon={<Hash size={18} />} label="Extensión" value={contact.num_corto ? `Ext. ${contact.num_corto}` : ''} />
          <DetailRow icon={<Phone size={18} />} label="Teléfono" value={contact.num_largo} />
          <DetailRow icon={<Mail size={18} />} label="Email" value={contact.mail} />
        </div>

        {/* Admin actions */}
        {role === 'admin' && (
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={() => navigate(`/contacto/${contact.id}/editar`)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition font-medium"
            >
              <Pencil size={16} />
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium disabled:opacity-50"
            >
              <Trash2 size={16} />
              {deleting ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 dark:text-gray-500">{icon}</span>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-gray-900 dark:text-white font-medium">{value}</p>
      </div>
    </div>
  );
}
