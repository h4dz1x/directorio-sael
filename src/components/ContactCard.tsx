import { Phone, Mail, MessageCircle, User } from 'lucide-react';
import type { Contact } from '../lib/types';

interface Props {
  contact: Contact;
  onClick: () => void;
}

export default function ContactCard({ contact, onClick }: Props) {
  const fullName = [contact.nombre, contact.apellido_1, contact.apellido_2]
    .filter(Boolean)
    .join(' ');

  const initials = (contact.nombre?.[0] ?? '') + (contact.apellido_1?.[0] ?? '');

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-3">
        {contact.foto ? (
          <img
            src={contact.foto}
            alt={fullName}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div
          className={`w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 flex items-center justify-center font-semibold text-sm flex-shrink-0 ${
            contact.foto ? 'hidden' : ''
          }`}
        >
          {initials || <User size={20} />}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
            {fullName}
          </h3>
          {contact.puesto && (
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {contact.puesto}
            </p>
          )}
          <span className="inline-block mt-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-2 py-0.5 rounded-full">
            {contact.servicio}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        {contact.num_largo && (
          <a
            href={`tel:+34${contact.num_largo.replace(/\D/g, '')}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-2 py-1 rounded-lg transition"
            title="Llamar"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">{contact.num_largo}</span>
          </a>
        )}
        {contact.num_corto && !contact.num_largo && (
          <a
            href={`tel:${contact.num_corto}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-2 py-1 rounded-lg transition"
            title="Llamar"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">Ext. {contact.num_corto}</span>
          </a>
        )}
        {contact.mail && (
          <a
            href={`mailto:${contact.mail}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-2 py-1 rounded-lg transition"
            title="Enviar email"
          >
            <Mail size={14} />
            <span className="hidden sm:inline">Email</span>
          </a>
        )}
        {contact.mail && (
          <a
            href={`https://wa.me/?text=Hola%20${encodeURIComponent(contact.nombre)}`}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-2 py-1 rounded-lg transition"
            title="WhatsApp / Chat"
          >
            <MessageCircle size={14} />
            <span className="hidden sm:inline">Chat</span>
          </a>
        )}
      </div>
    </div>
  );
}
