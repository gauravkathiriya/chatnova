'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatSidebar } from './chat-sidebar';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { ChatService, Chat, Message } from '@/lib/chat-service';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { Bot, User } from 'lucide-react';

export function ChatInterface() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar
        onSelectChat={handleSelectChat}
        onCreateNewChat={handleCreateNewChat}
        selectedChatId={currentChat?.id}
      />
      
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
          <div className="flex-1 flex items-center justify-center">
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