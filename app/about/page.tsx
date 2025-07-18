'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
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
              <Link href="/features" className="text-sm hover:text-blue-600 transition-colors">Features</Link>
              <Link href="/about" className="text-sm font-medium text-blue-600">About</Link>
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

      {/* About Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                ChatNova was created with a simple mission: to make AI conversations accessible to everyone. Our team of passionate developers and AI enthusiasts has built a platform that combines the latest advancements in AI technology with a user-friendly interface.
              </p>
              <p className="text-lg mb-6">
                We believe in the power of AI to transform how we learn, work, and communicate. ChatNova is our contribution to this exciting future, providing a tool that helps you harness the capabilities of advanced language models in your everyday life.
              </p>
              <p className="text-lg mb-6">
                Whether you're looking for information, creative inspiration, or just a friendly conversation, ChatNova is here to assist you.
              </p>
              <h3 className="text-xl font-semibold mt-10 mb-4">Our Team</h3>
              <p className="text-lg mb-6">
                Our diverse team brings together expertise in artificial intelligence, software development, user experience design, and data security. We're united by our passion for creating technology that enhances human capabilities and makes complex AI accessible to everyone.
              </p>
              <h3 className="text-xl font-semibold mt-10 mb-4">Our Vision</h3>
              <p className="text-lg mb-6">
                We envision a world where AI assistants like ChatNova become trusted companions in daily life, helping people learn, create, and solve problems more effectively. We're committed to continuously improving our platform, incorporating user feedback, and staying at the forefront of AI advancements.
              </p>
              <div className="mt-12 text-center">
                <Link href="/signup">
                  <Button size="lg">Join ChatNova Today</Button>
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