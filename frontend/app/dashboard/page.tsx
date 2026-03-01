'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar, Users, BarChart3, TrendingUp, LogOut, ClipboardList,
  Building2, ChevronRight, Check, X, Clock, AlertTriangle, ArrowLeft,
  UserCircle, FileText, Layers
} from 'lucide-react';
import {
  getDashboard, getAdminAllEvents, getAdminEventRegistrations,
  approveEvent, rejectEvent, adminCreateStudent,
} from '@/lib/api';
import type { DashboardStats, Event, Registration } from '@/types';
import StatsWidget from '@/components/StatsWidget';
import { UserPlus, User } from 'lucide-react';

const DEPARTMENTS = ['All', 'CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIDS', 'AIML', 'CSD', 'Other'];

const STATUS_BADGE: Record<string, { label: string; cls: string; Icon: React.ElementType }> = {
  pending: { label: 'Pending', cls: 'bg-gray-100 text-gray-600', Icon: Clock },
  approved: { label: 'Approved', cls: 'bg-gray-100 text-gray-600', Icon: Check },
  rejected: { label: 'Rejected', cls: 'bg-gray-100 text-gray-700', Icon: X },
};

interface EventDetail {
  event: Event & { createdBy?: { _id: string; name: string; email: string; department: string } };
  registrations: Registration[];
  stats: { total: number; totalSlots: number; filledSlots: number; teamCount: number };
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<{ email: string; role?: string; name?: string } | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Create Student form state
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', password: '', department: 'CSE' });
  const [createLoading, setCreateLoading] = useState(false);

  // Student/User states
  const [myRegistrations, setMyRegistrations] = useState<Registration[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [nonAdminLoading, setNonAdminLoading] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem('token');
    const stored = localStorage.getItem('user');
    if (!t) { router.push('/login'); return; }
    const u = stored ? JSON.parse(stored) : null;
    setUser(u);

    if (u?.role !== 'campus_captain') {
      import('@/lib/api').then(({ getMyRegistrations, getMyEvents }) => {
        setNonAdminLoading(true);
        const calls: any[] = [getMyRegistrations(t)];
        if (u?.role === 'student') calls.push(getMyEvents(t));

        Promise.all(calls)
          .then(([regs, events]) => {
            setMyRegistrations(regs);
            if (events) setMyEvents(events);
          })
          .catch(console.error)
          .finally(() => {
            setNonAdminLoading(false);
            setLoading(false);
          });
      });
      return;
    }

    Promise.all([
      getDashboard(t),
      getAdminAllEvents(t),
    ])
      .then(([dashData, eventsData]) => {
        setStats(dashData);
        setAllEvents(eventsData);
      })
      .catch(() => setError('Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, [router]);

  const loadEventDetail = useCallback(async (eventId: string) => {
    const t = localStorage.getItem('token');
    if (!t) return;
    setDetailLoading(true);
    setSelectedEventId(eventId);
    setEventDetail(null);
    try {
      const data = await getAdminEventRegistrations(eventId, t);
      setEventDetail(data as unknown as EventDetail);
    } catch {
      setError('Failed to load event details.');
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const handleApprove = async (eventId: string) => {
    const t = localStorage.getItem('token');
    if (!t) return;
    setActionLoading(true);
    try {
      await approveEvent(eventId, t);
      setAllEvents((prev) => prev.map((e) => e._id === eventId ? { ...e, status: 'approved' } : e));
      setEventDetail((d) => d ? { ...d, event: { ...d.event, status: 'approved' } } : d);
    } catch { setError('Approve failed.'); }
    finally { setActionLoading(false); }
  };

  const handleReject = async (eventId: string) => {
    const t = localStorage.getItem('token');
    if (!t) return;
    setActionLoading(true);
    try {
      await rejectEvent(eventId, t);
      setAllEvents((prev) => prev.map((e) => e._id === eventId ? { ...e, status: 'rejected' } : e));
      setEventDetail((d) => d ? { ...d, event: { ...d.event, status: 'rejected' } } : d);
    } catch { setError('Reject failed.'); }
    finally { setActionLoading(false); }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = localStorage.getItem('token');
    if (!t) return;
    setCreateLoading(true);
    setError('');
    setSuccess('');
    try {
      await adminCreateStudent(t, studentForm);
      setSuccess('Student account created and email sent!');
      setStudentForm({ name: '', email: '', password: '', department: 'CSE' });
      setShowCreateStudent(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create student account');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
    router.push('/login');
  };

  const filteredEvents = allEvents.filter((e) => {
    if (selectedDept === 'All') return true;
    const dept = (e.department || 'Other').toUpperCase();
    return dept.includes(selectedDept.toUpperCase());
  });

  const deptCounts = DEPARTMENTS.reduce<Record<string, number>>((acc, d) => {
    acc[d] = d === 'All'
      ? allEvents.length
      : allEvents.filter((e) => (e.department || 'Other').toUpperCase().includes(d.toUpperCase())).length;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-6">
        <div className="h-8 w-48 bg-gray-100 rounded-lg animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (user?.role !== 'campus_captain') {
    const isStudent = user?.role === 'student';

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-black mb-1">My Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, {user?.name || user?.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 text-gray-600 hover:text-black text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {nonAdminLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
            <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Registrations Card */}
            <div className="bg-white border border-gray-200 p-8 flex flex-col items-center text-center">
              <ClipboardList className="w-12 h-12 text-black mb-4" />
              <h2 className="text-xl font-black text-black">My Registrations</h2>
              <p className="text-gray-500 text-sm mt-2 mb-6">
                You have registered for <strong>{myRegistrations.length}</strong> events.
              </p>
              <button
                onClick={() => router.push('/dashboard/my-events?tab=registrations')}
                className="w-full py-3 bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                View Registrations
              </button>
            </div>

            {/* Event Creation / Promo Card */}
            {isStudent ? (
              <div className="bg-white border border-gray-200 p-8 flex flex-col items-center text-center">
                <Calendar className="w-12 h-12 text-black mb-4" />
                <h2 className="text-xl font-black text-black">Event Management</h2>
                <p className="text-gray-500 text-sm mt-2 mb-6">
                  You have submitted <strong>{myEvents.length}</strong> events for review.
                </p>
                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={() => router.push('/events/create')}
                    className="w-full py-3 bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                  >
                    Create New Event
                  </button>
                  <button
                    onClick={() => router.push('/events?submitted=1')}
                    className="w-full py-3 border border-gray-200 text-black text-sm font-bold hover:bg-gray-50 transition-colors"
                  >
                    Track Submissions
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 p-8 flex flex-col items-center text-center">
                <Users className="w-12 h-12 text-gray-400 mb-4" />
                <h2 className="text-xl font-black text-gray-400">Event Creator</h2>
                <p className="text-gray-500 text-sm mt-2 mb-6">
                  Want to organize events? Contact an admin to upgrade your account to a Student Event Creator.
                </p>
                <button
                  onClick={() => router.push('/events')}
                  className="w-full py-3 border border-gray-300 text-gray-500 text-sm font-bold cursor-not-allowed"
                  disabled
                >
                  Discovery Mode Only
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  const statItems = stats ? [
    { label: 'Total Events', value: stats.totalEvents, icon: Calendar, color: 'text-black' },
    { label: 'Pending Approvals', value: stats.pendingApprovals, icon: AlertTriangle, color: 'text-gray-500' },
    { label: 'Registrations', value: stats.totalRegistrations, icon: TrendingUp, color: 'text-gray-500' },
    { label: 'Total Students', value: stats.totalUsers, icon: Users, color: 'text-gray-500' },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <BarChart3 className="w-7 h-7 text-black" />
            <h1 className="text-3xl font-black text-black">Admin Panel</h1>
          </div>
          <p className="text-gray-500 text-sm">Signed in as <span className="font-semibold text-black">{user?.email}</span></p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 text-gray-600 hover:text-black text-sm transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {error && (
        <div className="mb-6 text-sm text-gray-700 bg-gray-50 border border-red-300 rounded px-4 py-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" /> {error}
          <button className="ml-auto text-xs underline" onClick={() => setError('')}>Dismiss</button>
        </div>
      )}

      {success && (
        <div className="mb-6 text-sm text-green-700 bg-green-50 border border-green-300 rounded px-4 py-3 flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0 text-green-500" /> {success}
          <button className="ml-auto text-xs underline" onClick={() => setSuccess('')}>Dismiss</button>
        </div>
      )}

      {stats && <StatsWidget stats={statItems} />}

      <div className="mt-10 flex flex-col lg:flex-row gap-6">

        <aside className="lg:w-56 shrink-0">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> Departments
          </h2>
          <div className="flex lg:flex-col gap-2 flex-wrap">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => { setSelectedDept(dept); setSelectedEventId(null); setEventDetail(null); setShowCreateStudent(false); }}
                className={`flex items-center justify-between px-3 py-2 text-sm font-semibold transition-colors w-full text-left ${selectedDept === dept && !showCreateStudent
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <span className="truncate">{dept}</span>
                <span className={`ml-2 shrink-0 text-xs px-1.5 py-0.5 ${selectedDept === dept && !showCreateStudent ? 'bg-white/20 text-white' : 'bg-black/5 text-gray-500'}`}>
                  {deptCounts[dept] ?? 0}
                </span>
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200 lg:w-full">
              <button
                onClick={() => { setShowCreateStudent(true); setSelectedEventId(null); setEventDetail(null); }}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-bold transition-colors w-full text-left ${showCreateStudent ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Student</span>
              </button>
            </div>
          </div>
        </aside>

        {!selectedEventId && !showCreateStudent && (
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-black mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-black" />
              Events — <span className="text-black">{selectedDept}</span>
              <span className="text-gray-400 text-sm font-normal ml-1">({filteredEvents.length} total)</span>
            </h2>

            {filteredEvents.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-black/5 text-gray-400">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No events for this department.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEvents.map((ev) => {
                  const badge = STATUS_BADGE[ev.status ?? 'pending'];
                  const BadgeIcon = badge.Icon;
                  const creator = typeof ev.createdBy === 'object' && ev.createdBy !== null ? ev.createdBy as { name: string; email: string } : null;
                  return (
                    <button
                      key={ev._id}
                      onClick={() => loadEventDetail(ev._id)}
                      className="w-full text-left flex items-center gap-4 p-4 bg-white border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${badge.cls}`}>
                            <BadgeIcon className="w-3 h-3" /> {badge.label}
                          </span>
                          <span className="text-xs text-gray-400 uppercase tracking-wide">{ev.category?.replace(/_/g, ' ')}</span>
                        </div>
                        <p className="font-bold text-black truncate">{ev.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {ev.venue} · {ev.department || '—'} ·{' '}
                          {ev.eventDate ? new Date(ev.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                        </p>
                        {creator && <p className="text-xs text-gray-400 mt-0.5">by {creator.name} ({creator.email})</p>}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 shrink-0 transition-colors" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {showCreateStudent && (
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-black mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-black" />
              Create New Student Account
            </h2>

            <form onSubmit={handleCreateStudent} className="max-w-md space-y-4 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-black"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">College Email</label>
                <div className="relative">
                  <ClipboardList className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-black"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Initial Password</label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Set a password"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-black"
                    value={studentForm.password}
                    onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Department</label>
                <select
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-black appearance-none"
                  value={studentForm.department}
                  onChange={(e) => setStudentForm({ ...studentForm, department: e.target.value })}
                >
                  {DEPARTMENTS.filter(d => d !== 'All').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateStudent(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-black text-sm font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="flex-1 px-4 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-bold transition-colors disabled:opacity-60 disabled:cursor-wait"
                >
                  {createLoading ? 'Creating account...' : 'Create Student & Send Email'}
                </button>
              </div>
            </form>
          </div>
        )}

        {selectedEventId && (
          <div className="flex-1 min-w-0">
            <button
              onClick={() => { setSelectedEventId(null); setEventDetail(null); }}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </button>

            {detailLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-2xl animate-pulse" />)}
              </div>
            ) : eventDetail ? (
              <>
                <div className="rounded-2xl border border-black/5 bg-white p-6 mb-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      {(() => {
                        const badge = STATUS_BADGE[eventDetail.event.status ?? 'pending'];
                        const BadgeIcon = badge.Icon;
                        return (
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${badge.cls}`}>
                            <BadgeIcon className="w-3 h-3" /> {badge.label}
                          </span>
                        );
                      })()}
                      <h2 className="text-2xl font-black text-black mb-1">{eventDetail.event.title}</h2>
                      <p className="text-sm text-gray-500">
                        {eventDetail.event.category?.replace(/_/g, ' ')} · {eventDetail.event.venue} · {eventDetail.event.department || '—'}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {eventDetail.event.eventDate
                          ? new Date(eventDetail.event.eventDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                          : '—'}
                      </p>
                      {eventDetail.event.createdBy && (
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <UserCircle className="w-3.5 h-3.5" />
                          Created by {eventDetail.event.createdBy.name} · {eventDetail.event.createdBy.email}
                        </p>
                      )}
                      {eventDetail.event.description && (
                        <p className="text-sm text-gray-600 mt-3 leading-relaxed">{eventDetail.event.description}</p>
                      )}
                    </div>

                    {eventDetail.event.status === 'pending' && (
                      <div className="flex gap-2 flex-wrap shrink-0">
                        <button
                          disabled={actionLoading}
                          onClick={() => handleApprove(eventDetail.event._id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-bold transition-colors disabled:opacity-60"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                        <button
                          disabled={actionLoading}
                          onClick={() => handleReject(eventDetail.event._id)}
                          className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 hover:border-black text-gray-700 text-sm font-bold transition-colors disabled:opacity-60"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                  {[
                    { label: 'Registrations', value: eventDetail.stats.total, icon: ClipboardList, color: 'text-black' },
                    { label: 'Total Slots', value: eventDetail.stats.totalSlots, icon: Layers, color: 'text-gray-500' },
                    { label: 'Filled Slots', value: eventDetail.stats.filledSlots, icon: TrendingUp, color: 'text-gray-500' },
                    { label: 'Team Entries', value: eventDetail.stats.teamCount, icon: Users, color: 'text-gray-500' },
                  ].map((s) => {
                    const SIcon = s.icon;
                    return (
                      <div key={s.label} className="bg-white border border-gray-200 p-4">
                        <SIcon className={`w-5 h-5 mb-2 ${s.color}`} />
                        <p className="text-2xl font-black text-black">{s.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-black/5 overflow-hidden shadow-sm">
                  <div className="px-5 py-4 bg-gray-50 flex items-center gap-2 border-b border-gray-200">
                    <ClipboardList className="w-4 h-4 text-black" />
                    <h3 className="font-black text-black text-sm">Registered Students</h3>
                    <span className="ml-auto text-xs text-gray-400">{eventDetail.registrations.length} students</span>
                  </div>
                  {eventDetail.registrations.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No registrations yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Student</th>
                            <th className="px-4 py-3">Team Leader</th>
                            <th className="px-4 py-3">Team Members</th>
                            <th className="px-4 py-3">Size</th>
                            <th className="px-4 py-3">Registered</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventDetail.registrations.map((reg, i) => {
                            const s = typeof reg.student === 'object' ? reg.student : null;
                            const leader = (reg as unknown as { teamLeader?: { name: string; email: string; rollNumber: string; department: string } }).teamLeader;
                            return (
                              <tr key={reg._id} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                                <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                                <td className="px-4 py-3">
                                  <p className="font-semibold text-black text-xs">{s?.name ?? '—'}</p>
                                  <p className="text-gray-500 text-xs">{s?.email ?? '—'}</p>
                                  {s?.department && <p className="text-gray-400 text-xs">{s.department}</p>}
                                </td>
                                <td className="px-4 py-3">
                                  {leader ? (
                                    <div>
                                      <p className="font-semibold text-black text-xs">{leader.name}</p>
                                      <p className="text-gray-500 text-xs">{leader.rollNumber}</p>
                                      {leader.email && <p className="text-gray-400 text-xs">{leader.email}</p>}
                                      {leader.department && <p className="text-gray-400 text-xs">{leader.department}</p>}
                                    </div>
                                  ) : <span className="text-gray-400 text-xs">—</span>}
                                </td>
                                <td className="px-4 py-3">
                                  {reg.teamMembers && reg.teamMembers.length > 0 ? (
                                    <div className="space-y-1">
                                      {reg.teamMembers.map((m, mi) => (
                                        <div key={mi} className="text-xs border-b border-gray-100 pb-1 last:border-0 last:pb-0">
                                          <span className="font-semibold text-black">{m.name}</span>
                                          {m.rollNumber && <span className="text-gray-500"> · {m.rollNumber}</span>}
                                          {(m as unknown as { department?: string }).department && <span className="text-gray-400"> · {(m as unknown as { department?: string }).department}</span>}
                                        </div>
                                      ))}
                                    </div>
                                  ) : <span className="text-gray-400 text-xs">—</span>}
                                </td>
                                <td className="px-4 py-3 text-gray-600 text-xs">{reg.teamSize ?? 1}</td>
                                <td className="px-4 py-3 text-gray-400 text-xs">
                                  {reg.registeredAt ?? reg.createdAt
                                    ? new Date((reg.registeredAt ?? reg.createdAt)!).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })
                                    : '—'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
