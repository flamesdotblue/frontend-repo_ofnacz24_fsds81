import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help you file a report, check status, or find city resources.' },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const content = input.trim();
    setInput('');
    setMessages((m) => [...m, { role: 'user', content }, { role: 'assistant', content: `You said: ${content}. Try "Create a pothole report at 3rd & Pine"` }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-[min(92vw,26rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-white">
            <div className="font-medium">City Assistant</div>
            <button onClick={() => setOpen(false)} className="rounded-md px-2 py-1 text-white/90 hover:bg-white/10">Close</button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === 'user' ? 'ml-auto bg-indigo-50 text-slate-900 dark:bg-indigo-500/10 dark:text-indigo-200' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'} max-w-[80%] rounded-xl px-3 py-2 text-sm`}>{m.content}</div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="border-t border-slate-200 p-2 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask me anything…"
                className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
              />
              <button onClick={send} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-md shadow-indigo-600/30 transition hover:brightness-110">
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Create report', 'Check status', 'City resources'].map((s) => (
                <button key={s} onClick={() => setInput(s)} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/60">{s}</button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI Assistant"
        className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-xl transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <span className="absolute inset-0 animate-pulse bg-white/20" />
        <span className="relative text-lg font-semibold">AI</span>
      </button>
    </div>
  );
}
