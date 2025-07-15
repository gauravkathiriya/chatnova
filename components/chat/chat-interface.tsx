'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatSidebar } from './chat-sidebar';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { ChatService, Chat, Message } from '@/lib/chat-service';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { Bot, LogOut, Settings, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export function ChatInterface() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectChat = (chat: Chat) => {
    setCurrentChat(chat);
    setMessages(chat.messages || []);
  };

  const handleCreateNewChat = async () => {
    if (!user) return;

    try {
      const chatId = await ChatService.createChat(user.uid, 'New Chat');
      const newChat: Chat = {
        id: chatId,
        userId: user.uid,
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setCurrentChat(newChat);
      setMessages([]);
    } catch (error) {
      toast.error('Failed to create new chat');
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentChat || !user) return;

    setIsLoading(true);
    try {
      const response = await ChatService.sendMessage(currentChat.id!, user.uid, content);
      
      // Update messages with both user and assistant messages
      const userMessage: Message = {
        role: 'user',
        content,
        timestamp: new Date()
      };
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage, assistantMessage]);
      
      // Update current chat with new messages
      setCurrentChat(prev => prev ? {
        ...prev,
        messages: [...prev.messages, userMessage, assistantMessage],
        updatedAt: new Date()
      } : null);

    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950">
      <ChatSidebar
        onSelectChat={handleSelectChat}
        onCreateNewChat={handleCreateNewChat}
        selectedChatId={currentChat?.id}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header with user profile and theme toggle */}
        <div className="border-b p-3 flex justify-between items-center">
          <div className="text-lg font-medium">
            {currentChat ? currentChat.title : 'ChatNova'}
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || ''} />
                    <AvatarFallback>{user?.displayName?.[0] || user?.email?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.displayName && (
                      <p className="font-medium">{user.displayName}</p>
                    )}
                    {user?.email && (
                      <p className="w-[200px] truncate text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex w-full items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {currentChat ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-950">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Bot className="h-16 w-16 mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
                  <p className="text-sm text-center max-w-md">
                    Ask me anything! I'm here to help with your questions, creative projects, 
                    coding problems, or just to chat.
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-950">
            <div className="text-center text-gray-500">
              <Bot className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Welcome to ChatNova</h3>
              <p className="text-sm">Select a chat or create a new one to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 