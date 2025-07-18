'use client';

import { useAuth } from '@/lib/auth-context';
import { AuthPage } from '@/components/auth/auth-page';
import { ChatInterface } from '@/components/chat/chat-interface';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Link from 'next/link';
import { Bot, MessageCircle, Shield, Sparkles, User, Zap } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();

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

  if (user) {
    return <ChatInterface />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold">ChatNova</h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              <Link href="/features" className="text-sm hover:text-blue-600 transition-colors">Features</Link>
              <Link href="/about" className="text-sm hover:text-blue-600 transition-colors">About</Link>
              <Link href="/contact" className="text-sm hover:text-blue-600 transition-colors">Contact</Link>
              <Link href="/privacy" className="text-sm hover:text-blue-600 transition-colors">Privacy</Link>
            </nav>
            <ThemeToggle />
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Experience the Power of AI Conversations</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            ChatNova brings you intelligent conversations powered by ChatGPT. Connect, learn, and explore with our cutting-edge AI assistant.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Sparkles className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>AI-Powered Responses</CardTitle>
                <CardDescription>Get intelligent, context-aware responses from ChatGPT's powerful language model.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our integration with OpenAI's ChatGPT ensures you get the most accurate and helpful responses for any query.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>Your data is protected with Firebase's secure authentication system.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>We use industry-standard security practices to keep your conversations and account information safe.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Fast & Responsive</CardTitle>
                <CardDescription>Experience lightning-fast responses and a smooth user interface.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Built with Next.js and optimized for performance, ChatNova provides a seamless chatting experience.</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <Link href="/features">
              <Button variant="outline">View All Features</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth-section" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex justify-center space-x-4 mb-8">
                <Link href="/login">
                  <Button size="lg">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-950 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bot className="h-6 w-6 text-blue-600" />
              <span className="font-bold">ChatNova</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/features" className="text-sm hover:text-blue-600 transition-colors">Features</Link>
              <Link href="/about" className="text-sm hover:text-blue-600 transition-colors">About</Link>
              <Link href="/contact" className="text-sm hover:text-blue-600 transition-colors">Contact</Link>
              <Link href="/privacy" className="text-sm hover:text-blue-600 transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ChatNova. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
