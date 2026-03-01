'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, X, Users, ChevronRight, ChevronDown } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

const DEPARTMENTS = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'MBA',
  'MCA',
  'Other',
];

interface Club {
  _id: string;
  name: string;
  description: string;
  department: string;
  posterUrl?: string;
  founder?: string;
  president?: string;
  vicePresident?: string;
  departmentPresident?: string;
  treasurer?: string;
  jointTreasurer?: string;
  memberCount: number;
  whatsappLink?: string;
  telegramLink?: string;
  discordLink?: string;
  websiteLink?: string;
}

const emptyForm = {
  name: '', description: '', department: DEPARTMENTS[0],
  founder: '', president: '', vicePresident: '', departmentPresident: '',
  treasurer: '', jointTreasurer: '', memberCount: '',
  whatsappLink: '', telegramLink: '', discordLink: '', websiteLink: '',
};

type FormState = typeof emptyForm;

export default function AdminClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Club | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => { fetchClubs(); }, []);

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/clubs`);
      const data = await res.json();
      setClubs(data.data || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setPosterFile(null);
    setPosterPreview('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (club: Club) => {
    setEditing(club);
    setForm({
      name: club.name, description: club.description, department: club.department,
      founder: club.founder || '', president: club.president || '',
      vicePresident: club.vicePresident || '', departmentPresident: club.departmentPresident || '',
      treasurer: club.treasurer || '', jointTreasurer: club.jointTreasurer || '',
      memberCount: String(club.memberCount ?? ''),
      whatsappLink: club.whatsappLink || '', telegramLink: club.telegramLink || '',
      discordLink: club.discordLink || '', websiteLink: club.websiteLink || '',
    });
    setPosterFile(null);
    setPosterPreview(club.posterUrl || '');
    setError('');
    setShowModal(true);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPosterFile(f);
    setPosterPreview(URL.createObjectURL(f));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) {
      setError('Name and description are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (posterFile) fd.append('poster', posterFile);

      const url = editing ? `${API_URL}/api/clubs/${editing._id}` : `${API_URL}/api/clubs`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setShowModal(false);
      fetchClubs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this club?')) return;
    await fetch(`${API_URL}/api/clubs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchClubs();
  };

  // Group by department
  const grouped = DEPARTMENTS.reduce<Record<string, Club[]>>((acc, dept) => {
    const deptClubs = clubs.filter((c) => c.department === dept);
    if (deptClubs.length > 0) acc[dept] = deptClubs;
    return acc;
  }, {});

  const inp = 'w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-black">Clubs Portal</h1>
            <p className="text-gray-500 text-sm mt-0.5">{clubs.length} clubs across {Object.keys(grouped).length} departments</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Club
          </button>
        </div>

        {/* Department accordion */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-white rounded-xl border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No clubs yet. Add the first one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(grouped).map(([dept, deptClubs]) => (
              <div key={dept} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Department header */}
                <button
                  onClick={() => setExpandedDept(expandedDept === dept ? null : dept)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-black">{dept}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{deptClubs.length} club{deptClubs.length > 1 ? 's' : ''}</span>
                  </div>
                  {expandedDept === dept ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                </button>

                {/* Clubs in department */}
                {expandedDept === dept && (
                  <div className="border-t border-gray-100 divide-y divide-gray-100">
                    {deptClubs.map((club) => (
                      <div key={club._id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                        {/* Poster thumbnail */}
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {club.posterUrl ? (
                            <Image src={club.posterUrl} alt={club.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-gray-300" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-black text-sm">{club.name}</p>
                          <p className="text-xs text-gray-400 truncate">{club.description}</p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Users className="w-3.5 h-3.5" />
                          {club.memberCount ?? 0}
                        </div>

                        <div className="flex items-center gap-2 ml-2">
                          <button
                            onClick={() => openEdit(club)}
                            className="p-1.5 border border-gray-200 rounded-lg hover:border-black text-gray-500 hover:text-black transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(club._id)}
                            className="p-1.5 border border-gray-200 rounded-lg hover:border-red-400 text-gray-500 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-black text-black text-lg">{editing ? 'Edit Club' : 'Add Club'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
              {error && <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-lg px-4 py-2">{error}</p>}

              {/* Poster upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Club Poster</label>
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-black transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  {posterPreview ? (
                    <div className="relative w-full h-44">
                      <Image src={posterPreview} alt="preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm gap-2">
                      <Plus className="w-6 h-6" />
                      Click to upload poster
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </div>

              {/* Basic info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Club Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={inp} placeholder="e.g. CSEA Club" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description *</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className={inp + ' resize-none'} rows={3} placeholder="About the club…" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Department *</label>
                  <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inp}>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Members</label>
                  <input type="number" min="0" value={form.memberCount} onChange={(e) => setForm({ ...form, memberCount: e.target.value })} className={inp} placeholder="0" />
                </div>
              </div>

              {/* Leadership */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Leadership</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ['Founder', 'founder'],
                    ['President', 'president'],
                    ['Vice President', 'vicePresident'],
                    ['Dept. President', 'departmentPresident'],
                    ['Treasurer', 'treasurer'],
                    ['Joint Treasurer', 'jointTreasurer'],
                  ].map(([label, key]) => (
                    <div key={key}>
                      <label className="block text-xs text-gray-400 mb-1">{label}</label>
                      <input
                        value={form[key as keyof FormState]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className={inp}
                        placeholder={`${label} name`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Community Links</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ['WhatsApp Link', 'whatsappLink', 'https://chat.whatsapp.com/…'],
                    ['Telegram Link', 'telegramLink', 'https://t.me/…'],
                    ['Discord Link', 'discordLink', 'https://discord.gg/…'],
                    ['Website', 'websiteLink', 'https://…'],
                  ].map(([label, key, ph]) => (
                    <div key={key}>
                      <label className="block text-xs text-gray-400 mb-1">{label}</label>
                      <input
                        type="url"
                        value={form[key as keyof FormState]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className={inp}
                        placeholder={ph as string}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-60 transition-colors">
                  {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Club'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
