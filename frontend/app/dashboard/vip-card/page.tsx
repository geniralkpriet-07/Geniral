'use client';
import VipCard from '@/components/VipCard';
import { Gift } from 'lucide-react';

export default function VipCardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-6 h-6 text-black" />
          <div>
            <h1 className="text-2xl font-bold text-black">My VIP Card</h1>
            <p className="text-sm text-gray-500">Refer 3 friends to unlock your exclusive reward</p>
          </div>
        </div>
        <VipCard />
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="font-semibold text-gray-700 mb-3">How it works</h2>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="font-bold text-black shrink-0">1.</span>Go to any event page and copy your unique referral link</li>
            <li className="flex items-start gap-2"><span className="font-bold text-black shrink-0">2.</span>Share it with 3 friends who register using your link</li>
            <li className="flex items-start gap-2"><span className="font-bold text-black shrink-0">3.</span>You automatically receive a random VIP reward card</li>
            <li className="flex items-start gap-2"><span className="font-bold text-black shrink-0">4.</span>Show the QR code on your card to the event organizer to claim your reward</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
