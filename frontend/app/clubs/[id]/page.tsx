'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Users, Globe, MessageCircle, Send, Crown } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

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
  memberCount?: number;
  whatsappLink?: string;
  telegramLink?: string;
  discordLink?: string;
  websiteLink?: string;
  createdAt: string;
}

export default function ClubDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/clubs/${id}`)
      .then((r) => r.json())
      .then((d) => setClub(d.data || null))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-4">
        <div className="h-6 bg-gray-100 rounded w-32" />
        <div className="h-64 bg-gray-100 rounded-xl" />
        <div className="h-8 bg-gray-100 rounded w-64" />
        <div className="h-4 bg-gray-100 rounded w-full" />
      </div>
    );
  }

  if (!club) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-400">
        <p className="text-lg font-semibold">Club not found</p>
        <Link href="/clubs" className="text-sm text-black underline mt-2 inline-block">← Back to Clubs</Link>
      </div>
    );
  }

  const roles = [
    { label: 'Founder', value: club.founder },
    { label: 'President', value: club.president },
    { label: 'Vice President', value: club.vicePresident },
    { label: 'Dept. President', value: club.departmentPresident },
    { label: 'Treasurer', value: club.treasurer },
    { label: 'Joint Treasurer', value: club.jointTreasurer },
  ].filter((r) => r.value);

  const socialLinks = [
    { label: 'WhatsApp', href: club.whatsappLink, icon: MessageCircle, color: 'bg-green-500' },
    { label: 'Telegram', href: club.telegramLink, icon: Send, color: 'bg-blue-500' },
    { label: 'Discord', href: club.discordLink, icon: MessageCircle, color: 'bg-indigo-600' },
    { label: 'Website', href: club.websiteLink, icon: Globe, color: 'bg-black' },
  ].filter((s) => s.href);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link href="/clubs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Clubs
        </Link>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: poster */}
          <div className="md:col-span-2">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              {club.posterUrl ? (
                <Image src={club.posterUrl} alt={club.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-300" />
                </div>
              )}
            </div>

            {/* Stats */}
            {(club.memberCount ?? 0) > 0 && (
              <div className="mt-4 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xl font-black text-black">{club.memberCount}</p>
                  <p className="text-xs text-gray-500">Total Members</p>
                </div>
              </div>
            )}

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="mt-4 space-y-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg text-white text-sm font-semibold ${s.color} hover:opacity-90 transition-opacity`}
                  >
                    <s.icon className="w-4 h-4" />
                    Join on {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className="md:col-span-3">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{club.department}</span>
            <h1 className="text-3xl font-black text-black mt-1 mb-3">{club.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-8">{club.description}</p>

            {/* Leadership */}
            {roles.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <h2 className="text-lg font-bold text-black">Leadership</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {roles.map((r) => (
                    <div key={r.label} className="border border-gray-200 rounded-lg px-4 py-3">
                      <p className="text-xs text-gray-400 mb-0.5">{r.label}</p>
                      <p className="font-semibold text-black text-sm">{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
