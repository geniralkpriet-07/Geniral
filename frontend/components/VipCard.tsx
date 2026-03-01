'use client';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Shield, Star } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

interface VipReward {
  _id: string;
  rewardType: string;
  rewardTitle: string;
  rewardDescription: string;
  qrToken: string;
  isActive: boolean;
  icon: string;
  color: string;
  createdAt: string;
  userId: { name: string; email: string; department: string };
}

export default function VipCard() {
  const [reward, setReward] = useState<VipReward | null>(null);
  const [loading, setLoading] = useState(true);
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    fetchVipCard();
  }, []);

  const fetchVipCard = async () => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    try {
      const res = await fetch(`${API_URL}/api/vip/my-card`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.hasReward) setReward(data.reward);
        // Also count referrals
        await fetchReferralCount(token);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReferralCount = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/vip/my-referral-count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setReferralCount(data.count || 0);
      }
    } catch {}
  };

  const qrUrl = reward ? `${APP_URL}/verify/${reward.qrToken}` : '';

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-gray-100 rounded w-48 mb-4" />
        <div className="h-40 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  if (!reward) {
    const progress = Math.min((referralCount / 3) * 100, 100);
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-700">VIP Reward Card</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Refer 3 friends to unlock a surprise VIP reward!
        </p>
        <div className="mb-2 flex justify-between text-xs text-gray-500">
          <span>{referralCount} of 3 referrals</span>
          <span>{3 - referralCount > 0 ? `${3 - referralCount} more to go` : 'Almost there!'}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-black h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 fill-white" />
              <span className="text-xs font-semibold uppercase tracking-widest opacity-80">VIP Card</span>
            </div>
            <h2 className="text-xl font-bold">KaiCampus</h2>
          </div>
          <span className="text-4xl">{reward.icon}</span>
        </div>

        {/* Reward info */}
        <div className="mb-6">
          <p className="text-xs opacity-70 mb-1">Reward</p>
          <h3 className="text-lg font-bold">{reward.rewardTitle}</h3>
          <p className="text-sm opacity-80 mt-1">{reward.rewardDescription}</p>
        </div>

        {/* Holder info */}
        <div className="mb-6">
          <p className="text-xs opacity-70">Card Holder</p>
          <p className="font-semibold">{reward.userId?.name || 'Student'}</p>
          <p className="text-xs opacity-70">{reward.userId?.department}</p>
        </div>

        {/* QR + status */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs opacity-70 mb-1">Issued</p>
            <p className="text-sm font-medium">
              {new Date(reward.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${reward.isActive ? 'bg-green-300' : 'bg-red-300'}`} />
              <span className="text-xs">{reward.isActive ? 'Active' : 'Expired'}</span>
            </div>
          </div>
          {/* QR Code */}
          <div className="bg-white p-2 rounded-xl">
            <QRCodeSVG
              value={qrUrl}
              size={90}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
            />
          </div>
        </div>

        <p className="text-xs opacity-50 mt-3 text-center">
          Show this QR to the event organizer for verification
        </p>
      </div>
    </div>
  );
}
