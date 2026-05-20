import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { Contact } from '../lib/types';
import ContactCard from '../components/ContactCard';
import { Search, Filter, Plus, Users, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactListPage() {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [servicioFilter, setServicioFilter] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contactos')
      .select('*')
      .order('apellido_1', { ascending: true });

    if (error) {
      toast.error('Error al cargar contactos');
      console.error(error);
    } else {
      setContacts(data ?? []);
    }
    setLoading(false);
  }

  const servicios = useMemo(() => {
    const set = new Set(contacts.map((c) => c.servicio).filter(Boolean));
    return Array.from(set).sort();
  }, [contacts]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return contacts.filter((c) => {
      const matchSearch =
        !q ||
        `${c.nombre} ${c.apellido_1} ${c.apellido_2}`.toLowerCase().includes(q) ||
        c.mail?.toLowerCase().includes(q) ||
        c.num_corto?.includes(q) ||
        c.num_largo?.includes(q) ||
        c.puesto?.toLowerCase().includes(q) ||
        c.servicio?.toLowerCase().includes(q);
      const matchServicio = !servicioFilter || c.servicio === servicioFilter;
      return matchSearch && matchServicio;
    });
  }, [contacts, search, servicioFilter]);

  function exportCSV() {
    const header = 'Nombre,Apellido 1,Apellido 2,Ext.,Teléfono,Email,Puesto,Servicio\n';
    const rows = filtered
      .map((c) =>
        [c.nombre, c.apellido_1, c.apellido_2, c.num_corto, c.num_largo, c.mail, c.puesto, c.servicio]
          .map((v) => `"${(v ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');
    const blob = new Blob(['﻿' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contactos_sael.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exportado');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users size={24} className="text-primary-600 dark:text-primary-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contactos
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({filtered.length})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
          >
            <Download size={16} />
            Exportar
          </button>
          {role === 'admin' && (
            <button
              onClick={() => navigate('/contacto/nuevo')}
              className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition"
            >
              <Plus size={16} />
              Nuevo
            </button>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar por nombre, email, teléfono, puesto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div className="relative">
          <Filter
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={servicioFilter}
            onChange={(e) => setServicioFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition appearance-none min-w-[200px]"
          >
            <option value="">Todos los servicios</option>
            {servicios.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No se encontraron contactos
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Prueba con otro término de búsqueda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onClick={() => navigate(`/contacto/${contact.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
