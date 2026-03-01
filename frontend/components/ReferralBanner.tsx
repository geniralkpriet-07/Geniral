'use client';
import { Gift, Users, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
  eventId: string;
  referralCode: string;
  reward?: string;
}

// Helper to decode JWT and get user ID
function getUserIdFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || payload.id || payload._id || null;
  } catch {
    return null;
  }
}

export default function ReferralBanner({ eventId, referralCode, reward = 'VIP Notes + Early Entry' }: Props) {
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get userId from token
    const token = localStorage.getItem('token');
    if (token) {
      const id = getUserIdFromToken(token);
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && referralCode && userId) {
      setLink(`${window.location.origin}/events/${eventId}?ref=${referralCode}-${userId}`);
      fetchReferralCount();
    }
  }, [eventId, referralCode, userId]);

  const fetchReferralCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/events/${eventId}/referrals/${userId}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setReferralCount(data.count || 0);
      }
    } catch (err) {
      console.error('Failed to fetch referral count:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progress = Math.min((referralCount / 3) * 100, 100);

  // Don't show if user is not logged in
  if (!userId && !loading) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white border-2 border-black p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center shrink-0">
          <Gift className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-black font-bold text-base mb-1 truncate" title={`Bring 3 Friends → Unlock ${reward}`}>
            Bring 3 Friends → Unlock {reward}
          </h4>
          <p className="text-gray-600 text-sm mb-4 leading-tight">
            Share your referral link. When 3 friends register using it, you automatically unlock exclusive perks. 100% transparent.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-[10px] sm:text-xs text-gray-800 font-mono truncate min-w-0">
              {link || 'Loading...'}
            </div>
            <button
              onClick={handleCopy}
              disabled={!link}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 text-xs font-bold transition-colors shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span className="shrink-0">{loading ? 'Loading...' : `${referralCount} of 3 friends referred`}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full ml-1 overflow-hidden">
              <div className="h-1.5 bg-black rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
