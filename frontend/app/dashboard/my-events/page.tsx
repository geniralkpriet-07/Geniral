'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, AlertTriangle, Check, X, ChevronLeft, LayoutDashboard } from 'lucide-react';
import { getMyEvents } from '@/lib/api';
import type { Event } from '@/types';
import Link from 'next/link';

const STATUS_BADGE: Record<string, { label: string; cls: string; Icon: React.ElementType }> = {
    pending: { label: 'Pending Approval', cls: 'bg-gray-100 text-gray-600', Icon: Clock },
    approved: { label: 'Approved', cls: 'bg-gray-100 text-gray-600', Icon: Check },
    rejected: { label: 'Rejected', cls: 'bg-gray-100 text-gray-700', Icon: X },
};

export default function MyEventsPage() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        getMyEvents(token)
            .then(setEvents)
            .catch((err) => setError(err.message || 'Failed to load your events'))
            .finally(() => setLoading(false));
    }, [router]);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-2 transition-colors">
                        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-black text-black">My Submitted Events</h1>
                    <p className="text-gray-500 text-sm">Track the status of events you&apos;ve created.</p>
                </div>
                <Link
                    href="/events/create"
                    className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-bold transition-colors text-center"
                >
                    Create New Event
                </Link>
            </div>

            {error && (
                <div className="mb-6 text-sm text-gray-700 bg-gray-50 border border-gray-300 px-4 py-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
                </div>
            )}

            {loading ? (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-black/5">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 font-medium">You haven&apos;t submitted any events yet.</p>
                    <Link href="/events/create" className="text-black underline font-bold mt-2 inline-block">
                        Start by creating one!
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {events.map((ev) => {
                        const badge = STATUS_BADGE[ev.status || 'pending'];
                        const BadgeIcon = badge.Icon;
                        return (
                            <div key={ev._id} className="bg-white border border-black/5 rounded-2xl p-5 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.cls}`}>
                                                <BadgeIcon className="w-3 h-3" /> {badge.label}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{ev.category?.replace(/_/g, ' ')}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-black truncate">{ev.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-4">
                                            <span>{ev.venue || 'TBD'}</span>
                                            <span>•</span>
                                            <span>{ev.eventDate ? new Date(ev.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Date TBD'}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`/events/${ev._id}`}
                                            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                                        >
                                            View Page
                                        </Link>
                                    </div>
                                </div>
                                {ev.status === 'rejected' && (
                                    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 text-xs text-gray-700">
                                        <p className="font-bold mb-0.5">Note from Admin:</p>
                                        <p>Your event was not approved. Please review our guidelines or contact support.</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
