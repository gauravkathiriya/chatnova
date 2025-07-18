'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
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
              <Link href="/about" className="text-sm hover:text-blue-600 transition-colors">About</Link>
              <Link href="/contact" className="text-sm hover:text-blue-600 transition-colors">Contact</Link>
              <Link href="/privacy" className="text-sm font-medium text-blue-600">Privacy</Link>
            </nav>
            <ThemeToggle />
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Privacy Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Privacy Policy</h2>
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <p className="text-lg mb-6">
                At ChatNova, we take your privacy seriously. We are committed to protecting your personal information and ensuring that your data is handled securely.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Data Collection</h3>
              <p className="mb-4">
                We collect only the information necessary to provide our services, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Email address for account creation and authentication</li>
                <li>Chat history to maintain your conversations</li>
                <li>Usage data to improve our services</li>
                <li>Device information for security and optimization</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Data Usage</h3>
              <p className="mb-4">
                Your data is used solely to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Provide and maintain our services</li>
                <li>Improve and personalize your experience</li>
                <li>Communicate with you about our services</li>
                <li>Ensure the security of our platform</li>
              </ul>
              <p className="mb-6">
                We do not sell your personal information to third parties.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Data Security</h3>
              <p className="mb-6">
                We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction. These measures include encryption, secure authentication, and regular security audits.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Data Retention</h3>
              <p className="mb-6">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Your Rights</h3>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to our processing of your data</li>
                <li>Request a copy of your data in a structured format</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Updates to This Policy</h3>
              <p className="mb-6">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Contact Us</h3>
              <p className="mb-6">
                If you have any questions about this privacy policy, please contact us at privacy@chatnova.com.
              </p>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-10">
                Last updated: July 16, 2025
              </p>
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