import React, { useState } from 'react';
import { Shield, LogIn } from 'lucide-react';

export default function AuthCard() {
  const [mode, setMode] = useState('signin');

  return (
    <div className="relative mx-auto -mt-10 w-full max-w-md">
      <div className="absolute inset-0 -z-0 rounded-3xl bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/40 blur-2xl" />
      <div className="relative rounded-3xl border border-white/20 bg-white/30 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
              <Shield className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Secure access</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{mode === 'signin' ? 'Sign in' : 'Create account'}</h3>
            </div>
          </div>
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-sm font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
            aria-label="Switch auth mode"
          >
            {mode === 'signin' ? 'Need an account?' : 'I have an account'}
          </button>
        </div>

        <form className="space-y-3" aria-label={mode === 'signin' ? 'Sign in form' : 'Sign up form'}>
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" type="text" placeholder="Name" className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100" />
            </div>
          )}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" type="email" placeholder="Email" className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100" />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input id="password" type="password" placeholder="Password" className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100" />
          </div>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:opacity-95 dark:bg-white dark:text-slate-900"
          >
            <LogIn className="h-5 w-5" />
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-4 py-3 font-medium text-slate-900 backdrop-blur-md transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
            aria-label="Continue with social login"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
