'use client';

import Link from 'next/link';
import { Bot, MessageCircle, Shield, Sparkles, Zap, RefreshCw, Lock, Cpu } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FeaturesPage() {
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
            <nav className="hidden md:flex space-x-4">
              <Link href="/features" className="text-sm font-medium text-blue-600">Features</Link>
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

      {/* Features Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Features</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Discover all the powerful features that make ChatNova the perfect AI assistant for your needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>AI-Powered Responses</CardTitle>
                  <CardDescription>Get intelligent, context-aware responses from ChatGPT's powerful language model.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Our integration with OpenAI's ChatGPT ensures you get the most accurate and helpful responses for any query. The AI understands context, remembers previous messages, and can assist with a wide range of tasks.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Secure Authentication</CardTitle>
                  <CardDescription>Your data is protected with Firebase's secure authentication system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>We use industry-standard security practices to keep your conversations and account information safe. Our authentication system ensures that only you have access to your chats and personal information.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Fast & Responsive</CardTitle>
                  <CardDescription>Experience lightning-fast responses and a smooth user interface.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Built with Next.js and optimized for performance, ChatNova provides a seamless chatting experience. Our application is designed to be responsive and work flawlessly across all devices and screen sizes.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Chat History</CardTitle>
                  <CardDescription>Access and manage your conversation history with ease.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>ChatNova automatically saves all your conversations, allowing you to revisit important discussions anytime. You can easily search through past chats, edit messages, or delete conversations as needed.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <RefreshCw className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Real-time Updates</CardTitle>
                  <CardDescription>Enjoy seamless synchronization across devices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>With our real-time database integration, your chats are synchronized instantly across all your devices. Start a conversation on your phone and continue seamlessly on your computer without missing a beat.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Lock className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Privacy-Focused</CardTitle>
                  <CardDescription>Your conversations remain private and secure.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>We prioritize your privacy by ensuring that your conversations are encrypted and only accessible to you. We do not use your chat data for training our models or share it with third parties.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Cpu className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Advanced AI Capabilities</CardTitle>
                  <CardDescription>Leverage the full power of modern language models.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>ChatNova uses state-of-the-art language models to provide assistance with writing, coding, learning, brainstorming, and much more. The AI can understand complex queries and provide detailed, helpful responses.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience ChatNova?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Join thousands of users who are already enhancing their productivity and creativity with ChatNova's AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg">Sign Up Free</Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">Log In</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

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