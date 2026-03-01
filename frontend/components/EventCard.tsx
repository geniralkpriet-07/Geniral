import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Event } from '@/types';

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  return (
    <Link href={`/events/${event._id}`}>
      <div className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-400 rounded overflow-hidden transition-all cursor-pointer">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={event.posterUrl || event.imageUrl || '/placeholder-event.jpg'}
            alt={event.title}
            fill
            className="object-cover"
          />
          {event.featured && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1">
              Featured
            </span>
          )}
          {(event.registrationDeadline
            ? new Date(event.registrationDeadline) < new Date()
            : new Date(event.eventDate) < new Date()) && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Registration Closed</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2 py-0.5 border border-gray-300 text-gray-600 capitalize">
              <Tag className="w-3 h-3 inline mr-1" />{event.category?.replace(/_/g, ' ')}
            </span>
          </div>
          <h3 className="text-black font-bold text-lg leading-tight line-clamp-2 mb-3">
            {event.title}
          </h3>
          <div className="flex flex-col gap-1.5 text-gray-500 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 shrink-0" />
              {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : (event.startDate || '—')} · {event.startTime || ''}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 shrink-0" />
              {event.venue || event.location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
