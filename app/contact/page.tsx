'use client';

import Link from 'next/link';
import { Bot, Mail, MapPin, Phone } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

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
              <Link href="/contact" className="text-sm font-medium text-blue-600">Contact</Link>
              <Link href="/privacy" className="text-sm hover:text-blue-600 transition-colors">Privacy</Link>
            </nav>
            <ThemeToggle />
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Contact Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                  <p className="mb-8">
                    Have questions or feedback? We'd love to hear from you! Fill out the form or reach out to us using the contact information below.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-gray-600 dark:text-gray-400">support@chatnova.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Office</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          123 AI Boulevard<br />
                          Tech City, CA 94103<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
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