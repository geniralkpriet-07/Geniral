'use client';
import { ExternalLink, MessageCircle, Send, Hash } from 'lucide-react';

interface Props {
  whatsapp?: string;
  telegram?: string;
  discord?: string;
  label?: string;
}

export default function OneTapJoin({ whatsapp, telegram, discord, label = 'Join Community' }: Props) {
  const links = [
    { href: whatsapp, icon: MessageCircle, label: 'WhatsApp', color: 'bg-green-500 hover:bg-green-400' },
    { href: telegram, icon: Send, label: 'Telegram', color: 'bg-blue-500 hover:bg-blue-400' },
    { href: discord, icon: Hash, label: 'Discord', color: 'bg-indigo-500 hover:bg-indigo-400' },
  ].filter((l) => !!l.href);

  if (!links.length) return null;

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <p className="text-black font-bold text-sm mb-3 flex items-center gap-2">
        <ExternalLink className="w-4 h-4 text-violet-600" />
        {label}
      </p>
      <div className="flex flex-wrap gap-3">
        {links.map(({ href, icon: Icon, label: btnLabel, color }) => (
          <a
            key={btnLabel}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold transition-colors shadow-sm ${color.replace('-400', '-600').replace('-500', '-600')}`}
          >
            <Icon className="w-4 h-4" />
            {btnLabel}
          </a>
        ))}
      </div>
    </div>
  );
}
