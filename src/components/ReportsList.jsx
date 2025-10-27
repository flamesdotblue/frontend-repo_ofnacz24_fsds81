import React, { useEffect, useState } from 'react';
import { Plus, MapPin, Loader2 } from 'lucide-react';

function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/60">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function ReportsList() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setReports([
        {
          id: 'r1',
          title: 'Pothole near 3rd & Pine',
          type: 'Road',
          eta: '2 days',
          progress: 60,
          anonymous: true,
          address: '312 Pine St',
        },
        {
          id: 'r2',
          title: 'Streetlight flickering',
          type: 'Lighting',
          eta: '1 day',
          progress: 35,
          anonymous: false,
          address: '8 Harbor Ave',
        },
        {
          id: 'r3',
          title: 'Overflowing trash bin',
          type: 'Sanitation',
          eta: '5 hours',
          progress: 80,
          anonymous: false,
          address: 'Town Square',
        },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Your Reports</h2>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 dark:bg-white dark:text-slate-900"
        >
          <Plus className="h-4 w-4" /> Create report
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="h-32 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="mt-3 h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-2 h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-4 h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => (
            <article key={r.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                <div className="absolute right-3 top-3 rounded-full bg-white/80 px-2 py-1 text-xs font-medium text-slate-700 backdrop-blur-md dark:bg-slate-900/60 dark:text-slate-200">{r.type}</div>
                {r.anonymous && (
                  <div className="absolute left-3 top-3 rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">Anonymous</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="line-clamp-1 font-medium text-slate-900 dark:text-white">{r.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="h-4 w-4" /> {r.address}
                </div>
                <div className="mt-3">
                  <ProgressBar value={r.progress} />
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">ETA {r.eta} · {r.progress}%</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Create Report">
        <CreateReportForm onClose={() => setOpen(false)} />
      </Modal>
    </section>
  );
}

function CreateReportForm({ onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [anon, setAnon] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onClose?.();
    }, 1000);
  };

  return (
    <form className="space-y-3" onSubmit={submit} aria-label="Create report form">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm text-slate-600 dark:text-slate-300">Title</label>
          <input id="title" required className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100" placeholder="Describe the issue" />
        </div>
        <div>
          <label htmlFor="type" className="mb-1 block text-sm text-slate-600 dark:text-slate-300">Type</label>
          <select id="type" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100">
            <option>Road</option>
            <option>Lighting</option>
            <option>Sanitation</option>
            <option>Parks</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="address" className="mb-1 block text-sm text-slate-600 dark:text-slate-300">Address</label>
        <div className="relative">
          <input id="address" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pl-9 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100" placeholder="Search address" />
          <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-slate-600 dark:text-slate-300">Photo</label>
        <input type="file" accept="image/*" className="w-full cursor-pointer rounded-xl border border-dashed border-slate-300 px-3 py-6 text-center text-sm text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-900/40" />
      </div>
      <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
        <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600" />
        Submit as anonymous
      </label>
      <div className="flex items-center justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60">Cancel</button>
        <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-600/30 transition hover:brightness-110 disabled:opacity-60">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? 'Submitting' : 'Submit report'}
        </button>
      </div>
    </form>
  );
}
