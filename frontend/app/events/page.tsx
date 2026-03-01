'use client';
import { useEffect, useState, useMemo, Suspense } from 'react';
import type { ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import EventCard from '@/components/EventCard';
import { getEvents, getMyEvents } from '@/lib/api';
import { Event, EventCategory } from '@/types';

const CATEGORIES: { value: EventCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'paper_presentation', label: 'Paper Presentation' },
  { value: 'project_expo', label: 'Project Expo' },
  { value: 'quiz_competition', label: 'Quiz Competition' },
  { value: 'debate', label: 'Debate' },
  { value: 'coding_challenge', label: 'Coding Challenge' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'cultural_fest', label: 'Cultural Fest' },
  { value: 'sports_tournament', label: 'Sports Tournament' },
  { value: 'photography_contest', label: 'Photography Contest' },
  { value: 'business_plan_competition', label: 'Business Plan Competition' },
  { value: 'open_mic', label: 'Open Mic' },
];

const STATUS_BADGE: Record<string, { label: string; icon: ReactNode; cls: string }> = {
  pending: { label: 'Pending Approval', icon: <Clock className="w-3 h-3" />, cls: 'bg-gray-100 text-gray-600 border border-gray-300' },
  approved: { label: 'Approved – Live', icon: <CheckCircle className="w-3 h-3" />, cls: 'bg-gray-100 text-gray-600 border border-gray-300' },
  rejected: { label: 'Rejected', icon: <XCircle className="w-3 h-3" />, cls: 'bg-gray-100 text-gray-700 border border-gray-300' },
};

function EventsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submitted = searchParams.get('submitted') === '1';

  const [user, setUser] = useState<{ role?: string; name?: string } | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [myLoading, setMyLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<EventCategory>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    let parsedUser: { role?: string; name?: string } | null = null;
    if (stored) {
      parsedUser = JSON.parse(stored);
      setUser(parsedUser);
    }

    // Fetch public approved events
    getEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));

    // Fetch student's own submissions if logged in as student or admin
    if (token && (parsedUser?.role === 'student' || parsedUser?.role === 'campus_captain')) {
      setMyLoading(true);
      getMyEvents(token)
        .then(setMyEvents)
        .catch(console.error)
        .finally(() => setMyLoading(false));
    }

    // Auto-switch to "My Submissions" tab if redirected after create
    if (submitted && (parsedUser?.role === 'student' || parsedUser?.role === 'campus_captain')) {
      setActiveTab('mine');
    }
  }, [submitted]);

  const isEventCreator = user?.role === 'student' || user?.role === 'campus_captain';

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchCat = category === 'all' || e.category === category;
      const s = search.toLowerCase();
      const matchSearch =
        e.title.toLowerCase().includes(s) ||
        (e.venue || e.location || '').toLowerCase().includes(s) ||
        (e.description || '').toLowerCase().includes(s);
      return matchCat && matchSearch;
    });
  }, [events, search, category]);

  const filteredMine = useMemo(() => {
    return myEvents.filter((e) => {
      const matchCat = category === 'all' || e.category === category;
      const s = search.toLowerCase();
      const matchSearch =
        e.title.toLowerCase().includes(s) ||
        (e.venue || e.location || '').toLowerCase().includes(s) ||
        (e.description || '').toLowerCase().includes(s);
      return matchCat && matchSearch;
    });
  }, [myEvents, search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Success banner */}
      {submitted && (
        <div className="mb-8 flex items-center gap-3 bg-gray-50 border border-gray-300 rounded px-4 py-3 text-sm font-medium text-gray-700">
          <span className="shrink-0">✅</span>
          Event submitted! It is under review — you can track its status in <strong className="ml-1">My Submissions</strong>.
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black mb-2 text-black">Campus Events</h1>
          <p className="text-gray-600">Discover and register for events happening across campus.</p>
        </div>
        {isEventCreator && (
          <button
            onClick={() => router.push('/events/create')}
            className="shrink-0 flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        )}
      </div>

      {/* Tabs (only for event creators) */}
      {isEventCreator && (
        <div className="flex gap-1 bg-gray-100 p-1 w-fit mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 text-sm font-semibold transition-all ${activeTab === 'all' ? 'bg-white text-black' : 'text-gray-500 hover:text-black'}`}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveTab('mine')}
            className={`px-5 py-2 text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'mine' ? 'bg-white text-black' : 'text-gray-500 hover:text-black'}`}
          >
            My Submissions
            {myEvents.length > 0 && (
              <span className="bg-black text-white text-xs font-bold px-1.5 py-0.5">{myEvents.length}</span>
            )}
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search events by title, venue or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-gray-500 shrink-0" />
          <div className="flex gap-2 bg-gray-100 p-1 overflow-x-auto no-scrollbar max-w-full sm:max-w-md">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${category === c.value
                  ? 'bg-white text-black'
                  : 'text-gray-500 hover:text-black'
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MY SUBMISSIONS TAB ── */}
      {activeTab === 'mine' && isEventCreator && (
        <>
          {myLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredMine.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-lg font-semibold">No submissions yet</p>
              <p className="text-sm mb-6">Create your first event and it will appear here.</p>
              <button
                onClick={() => router.push('/events/create')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" /> Create Event
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-gray-500 text-sm">{filteredMine.length} submission{filteredMine.length !== 1 ? 's' : ''}</p>
              {filteredMine.map((e) => {
                const badge = STATUS_BADGE[e.status || 'pending'];
                return (
                  <div key={e._id} className="flex items-center justify-between bg-white border border-gray-200 p-5 gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-black text-base truncate">{e.title}</h3>
                      <p className="text-gray-500 text-sm mt-0.5">
                        {e.venue} · {e.eventDate ? new Date(e.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </p>
                      <p className="text-gray-400 text-xs mt-1 capitalize">{e.category?.replace(/_/g, ' ')}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 ${badge.cls}`}>
                      {badge.icon} {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── ALL EVENTS TAB ── */}
      {activeTab === 'all' && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-semibold">No events found</p>
              <p className="text-sm">
                {events.length === 0
                  ? 'No approved events yet. Check back soon or create one!'
                  : 'Try adjusting your search or category filter.'}
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-6">{filtered.length} event{filtered.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((e) => (
                  <EventCard key={e._id} event={e} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense>
      <EventsContent />
    </Suspense>
  );
}
