'use client';

import { useAuth } from '@/lib/auth-context';
import { LoginForm } from '@/components/auth/login-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold">ChatNova</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <LoginForm onSwitchToSignup={() => router.push('/signup')} />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 bg-gray-100 dark:bg-gray-950 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ChatNova. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 