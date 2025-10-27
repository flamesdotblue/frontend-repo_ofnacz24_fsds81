import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { MapPin, LocateFixed, Sun, Moon } from 'lucide-react';

const useTheme = () => {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'system';
    setTheme(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const next = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };
  const label = theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light';
  return (
    <button
      aria-label={`Theme: ${label}`}
      onClick={next}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <span className="relative inline-flex h-4 w-10 items-center rounded-full bg-white/20">
        <span
          className={`absolute h-4 w-4 rounded-full bg-white transition-transform ${
            theme === 'dark' ? 'translate-x-6' : theme === 'system' ? 'translate-x-3' : 'translate-x-0'
          }`}
        />
      </span>
      <span className="sr-only">Toggle theme</span>
      <Sun className="h-4 w-4 text-yellow-200" />
      <Moon className="h-4 w-4 text-blue-200" />
      <span className="text-white/90">{label}</span>
    </button>
  );
};

export default function HeroHome({ onRequestLocation }) {
  const [granted, setGranted] = useState(false);
  const [city, setCity] = useState('');

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      () => {
        setGranted(true);
        onRequestLocation?.();
      },
      () => setGranted(false)
    );
  };

  return (
    <section className="relative min-h-[70vh] overflow-hidden rounded-3xl border border-neutral-200/40 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white dark:via-slate-900/40 dark:to-slate-950" />

      <header className="relative z-10 flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-800 backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          SeeClickFix · City Pulse Live
        </div>
        <ThemeToggle />
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-10 pt-8 sm:px-6 md:grid-cols-3 md:pt-16">
        <div className="md:col-span-2">
          <h1 className="font-[700] tracking-tight text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white">
            Fix your city with elegance and speed
          </h1>
          <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
            Minimal, precise, and human. Report, track, and resolve civic issues with a refined, modern interface.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={requestLocation}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <LocateFixed className="h-5 w-5" />
              Use my location
            </button>
            <div className="relative">
              <input
                aria-label="City or address"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Or enter address…"
                className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 pl-10 text-slate-800 backdrop-blur-md placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
              />
              <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: 'Temp', value: '72°F', sub: 'Mild' },
              { label: 'Air', value: 'AQI 42', sub: 'Good' },
              { label: 'Traffic', value: 'Light', sub: '5m avg' },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/30 bg-white/40 p-4 text-slate-800 backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
                <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{m.label}</div>
                <div className="mt-1 text-2xl font-semibold">{m.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/50 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/40 dark:to-slate-900/40" />
            <div className="relative">
              <div className="mb-2 text-sm text-slate-600 dark:text-slate-300">Quick glance</div>
              <div className="text-3xl font-semibold text-slate-900 dark:text-white">City Snapshot</div>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Active reports</span>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-600 dark:text-emerald-400">12</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Avg. ETA</span>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 font-medium text-amber-600 dark:text-amber-400">2.4 days</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Resolution rate</span>
                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 font-medium text-indigo-600 dark:text-indigo-400">91%</span>
                </li>
              </ul>
              <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-0.5">
                <div className="rounded-[10px] bg-white/70 p-3 text-xs text-slate-700 backdrop-blur-md dark:bg-slate-950/60 dark:text-slate-200">
                  Your neighborhood health is stable. Keep reporting issues to maintain momentum.
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-200/60 dark:bg-slate-800/60"><MapPin className="h-3.5 w-3.5"/></span> Location access {granted ? 'granted' : 'pending'}.</p>
        </div>
      </div>
    </section>
  );
}
