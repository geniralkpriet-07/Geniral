'use client';
import { useState, useEffect } from 'react';
import { Shield, Gift, Trash2, Plus, Loader2, CheckCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

const REWARD_LABELS: Record<string, { title: string; icon: string }> = {
  EARLY_ENTRY: { title: 'Early Entry Access', icon: '🥈' },
  STUDY_NOTES: { title: 'Exclusive Study Notes', icon: '🥉' },
  PRIORITY_REGISTRATION: { title: 'Priority Registration', icon: '🏅' },
  NETWORKING_LOUNGE: { title: 'Networking Lounge Access', icon: '🏅' },
  DIGITAL_BADGE: { title: 'Campus Influencer Badge', icon: '🏅' },
  MERCHANDISE: { title: 'Event Merchandise Priority', icon: '🏅' },
  RESUME_BOOST: { title: 'Resume Boost Token', icon: '🏅' },
  INVITE_ONLY: { title: 'Exclusive Invite-Only Event', icon: '🏅' },
  LUNCH_PASS: { title: 'Free Sponsored Lunch Pass', icon: '🥇' },
  SURPRISE_BOX: { title: 'Mystery Surprise Reward', icon: '🏅' },
};

interface VipHolder {
  _id: string;
  userId: { _id: string; name: string; email: string; department: string };
  rewardType: string;
  rewardTitle: string;
  isActive: boolean;
  icon: string;
  createdAt: string;
  issuedBy: { name: string } | null;
  verifiedAt: string | null;
}

export default function AdminVipPanel() {
  const [holders, setHolders] = useState<VipHolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [issueModal, setIssueModal] = useState<{ userId: string; name: string } | null>(null);
  const [selectedReward, setSelectedReward] = useState('EARLY_ENTRY');
  const [notes, setNotes] = useState('');
  const [issuing, setIssuing] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/vip/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setHolders(data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleIssue = async () => {
    if (!issueModal) return;
    setIssuing(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/vip/admin/issue/${issueModal.userId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ rewardType: selectedReward, notes }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(`Reward issued to ${issueModal.name}`);
        setIssueModal(null);
        setNotes('');
        fetchAll();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) { console.error(err); }
    finally { setIssuing(false); }
  };

  const handleRevoke = async (rewardId: string) => {
    if (!confirm('Revoke this reward?')) return;
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/api/vip/admin/revoke/${rewardId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAll();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-black" />
            <div>
              <h1 className="text-2xl font-bold text-black">VIP Reward Management</h1>
              <p className="text-sm text-gray-500">{holders.length} total VIP card holders</p>
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            <CheckCircle className="w-4 h-4" /> {success}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : holders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No VIP reward holders yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Student</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Reward</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Issued</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Verified</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {holders.map((h) => (
                  <tr key={h._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{h.userId?.name}</p>
                      <p className="text-xs text-gray-500">{h.userId?.email}</p>
                      <p className="text-xs text-gray-400">{h.userId?.department}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{h.icon}</span>
                        <div>
                          <p className="font-medium text-gray-800">{h.rewardTitle}</p>
                          <p className="text-xs text-gray-500">{h.issuedBy ? `By admin` : 'Auto-issued'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(h.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {h.verifiedAt
                        ? <span className="text-green-600 font-medium">✅ {new Date(h.verifiedAt).toLocaleDateString()}</span>
                        : <span className="text-gray-400">Not yet</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${h.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {h.isActive ? 'Active' : 'Revoked'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIssueModal({ userId: h.userId?._id, name: h.userId?.name })}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
                          title="Issue new reward"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        {h.isActive && (
                          <button
                            onClick={() => handleRevoke(h._id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-red-500"
                            title="Revoke reward"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Issue Reward Modal */}
        {issueModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="font-bold text-lg mb-1">Issue VIP Reward</h3>
              <p className="text-sm text-gray-500 mb-4">Issuing to: <strong>{issueModal.name}</strong></p>

              <label className="block text-sm font-medium text-gray-700 mb-1">Select Reward</label>
              <select
                aria-label="Select reward type"
                value={selectedReward}
                onChange={(e) => setSelectedReward(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm mb-3 focus:outline-none focus:border-black"
              >
                {Object.entries(REWARD_LABELS).map(([key, { title, icon }]) => (
                  <option key={key} value={key}>{icon} {title}</option>
                ))}
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Special recognition for event contribution"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm mb-4 focus:outline-none focus:border-black resize-none h-20"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setIssueModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleIssue}
                  disabled={issuing}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  {issuing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Gift className="w-4 h-4" />}
                  Issue Reward
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
