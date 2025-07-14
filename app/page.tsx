'use client';

import { useAuth } from '@/lib/auth-context';
import { AuthPage } from '@/components/auth/auth-page';
import { ChatInterface } from '@/components/chat/chat-interface';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return <ChatInterface />;
}
