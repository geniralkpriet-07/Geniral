'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Shield } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

interface RewardData {
  rewardTitle: string;
  rewardDescription: string;
  icon: string;
  color: string;
  isActive: boolean;
  verifiedAt: string | null;
  createdAt: string;
  userId: { name: string; email: string; department: string };
}

export default function VerifyQrPage() {
  const params = useParams();
  const qrToken = params?.qrToken as string;
  const [reward, setReward] = useState<RewardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!qrToken) return;
    fetch(`${API_URL}/api/vip/verify/${qrToken}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.valid) {
          setValid(true);
          setReward(data.reward);
        } else {
          setError(data.message || 'Invalid or expired VIP card');
        }
      })
      .catch(() => setError('Could not connect to verification server'))
      .finally(() => setLoading(false));
  }, [qrToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !reward) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm w-full">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Invalid QR Code</h2>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-sm w-full">
        {/* Status banner */}
        <div className={`rounded-2xl p-4 mb-4 flex items-center gap-3 ${valid && reward.isActive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          {valid && reward.isActive
            ? <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />
            : <XCircle className="w-8 h-8 text-red-500 shrink-0" />
          }
          <div>
            <p className={`font-bold text-sm ${valid && reward.isActive ? 'text-green-700' : 'text-red-700'}`}>
              {valid && reward.isActive ? '✅ Valid VIP Card' : '❌ Inactive / Expired'}
            </p>
            <p className="text-xs text-gray-500">
              {reward.verifiedAt ? `Already verified on ${new Date(reward.verifiedAt).toLocaleString()}` : 'First scan'}
            </p>
          </div>
        </div>

        {/* Card */}
        <div className={`rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br ${reward.color} text-white`}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-widest opacity-80">KaiCampus VIP</span>
            </div>
            <div className="text-4xl mb-3">{reward.icon}</div>
            <h2 className="text-xl font-bold mb-1">{reward.rewardTitle}</h2>
            <p className="text-sm opacity-80 mb-6">{reward.rewardDescription}</p>
            <div className="border-t border-white/20 pt-4">
              <p className="text-xs opacity-70">Card Holder</p>
              <p className="font-semibold text-lg">{reward.userId?.name}</p>
              <p className="text-sm opacity-70">{reward.userId?.email}</p>
              <p className="text-sm opacity-70">{reward.userId?.department}</p>
            </div>
            <p className="text-xs opacity-50 mt-4">
              Issued: {new Date(reward.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Powered by KaiCampus · Organizer Verification Portal
        </p>
      </div>
    </div>
  );
}
