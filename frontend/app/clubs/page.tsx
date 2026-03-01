'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Search, ChevronRight } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

const DEPARTMENTS = [
  'All',
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
  president?: string;
  memberCount?: number;
  whatsappLink?: string;
  telegramLink?: string;
  discordLink?: string;
  websiteLink?: string;
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/clubs`)
      .then((r) => r.json())
      .then((d) => setClubs(d.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = clubs.filter((c) => {
    const matchDept = selectedDept === 'All' || c.department === selectedDept;
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    return matchDept && matchSearch;
  });

  // Group by department for count badges
  const countByDept = clubs.reduce<Record<string, number>>((acc, c) => {
    acc[c.department] = (acc[c.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-black mb-1">Clubs</h1>
          <p className="text-gray-500 text-sm">Discover and explore campus clubs by department</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar — department filter */}
          <aside className="md:w-56 flex-shrink-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Department</p>
            <ul className="space-y-1">
              {DEPARTMENTS.map((dept) => (
                <li key={dept}>
                  <button
                    onClick={() => setSelectedDept(dept)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex justify-between items-center transition-colors ${
                      selectedDept === dept ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="truncate">{dept}</span>
                    {dept !== 'All' && countByDept[dept] ? (
                      <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${selectedDept === dept ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'}`}>
                        {countByDept[dept]}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clubs…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black text-black placeholder-gray-400"
              />
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5 animate-pulse">
                    <div className="w-full h-36 bg-gray-100 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No clubs found</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((club) => (
                  <Link
                    key={club._id}
                    href={`/clubs/${club._id}`}
                    className="group border border-gray-200 rounded-xl overflow-hidden hover:border-black hover:shadow-md transition-all"
                  >
                    {/* Poster */}
                    <div className="relative w-full h-40 bg-gray-100">
                      {club.posterUrl ? (
                        <Image src={club.posterUrl} alt={club.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Users className="w-10 h-10 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 mb-1">{club.department}</p>
                      <h3 className="font-bold text-black text-base mb-1 group-hover:underline">{club.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{club.description}</p>
                      <div className="flex items-center justify-between">
                        {(club.memberCount ?? 0) > 0 && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" /> {club.memberCount} members
                          </span>
                        )}
                        <span className="ml-auto text-xs font-semibold text-black flex items-center gap-0.5">
                          View <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
