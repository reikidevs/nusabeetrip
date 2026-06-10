import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login — NusaBeeTrip',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-teal-900 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/20 mb-4 text-3xl">
            🐝
          </div>
          <h1 className="text-2xl font-bold text-white">NusaBeeTrip Admin</h1>
          <p className="text-white/60 text-sm mt-1">Sign in to manage your site</p>
        </div>
        <Suspense fallback={<div className="bg-white rounded-2xl shadow-2xl p-6 h-44 animate-pulse" />}>
          <LoginForm />
        </Suspense>
        <p className="text-center text-white/40 text-xs mt-6">
          Authorized access only
        </p>
      </div>
    </div>
  );
}
