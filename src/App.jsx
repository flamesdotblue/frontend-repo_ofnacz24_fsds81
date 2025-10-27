import React from 'react';
import HeroHome from './components/HeroHome';
import AuthCard from './components/AuthCard';
import ReportsList from './components/ReportsList';
import AIChatWidget from './components/AIChatWidget';

export default function App() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <main className="mx-auto max-w-7xl space-y-10 pb-20 pt-6 sm:pt-10">
        <HeroHome />
        <AuthCard />
        <ReportsList />
      </main>
      <AIChatWidget />
      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-6 text-xs text-slate-500 sm:px-6">
        Built for a refined SeeClickFix experience · Minimal, modern, accessible
      </footer>
    </div>
  );
}
