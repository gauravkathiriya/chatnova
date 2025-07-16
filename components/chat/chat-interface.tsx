'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatSidebar } from './chat-sidebar';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { ChatService, Chat, Message } from '@/lib/chat-service';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { Bot, LogOut, Settings, User, Trash2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import Link from 'next/link';

export function ChatInterface() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

  const handleEditMessage = async (index: number, newContent: string) => {
    if (!currentChat || !user) return;

    try {
      await ChatService.updateMessage(currentChat.id!, index, newContent);

      // Update local messages
      const updatedMessages = [...messages];
      updatedMessages[index] = {
        ...updatedMessages[index],
        content: newContent,
        timestamp: new Date()
      };

      setMessages(updatedMessages);

      // Update current chat with edited message
      setCurrentChat(prev => prev ? {
        ...prev,
        messages: updatedMessages,
        updatedAt: new Date()
      } : null);

      toast.success('Message updated');
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const handleDeleteMessage = async (index: number) => {
    if (!currentChat || !user) return;

    try {
      await ChatService.deleteMessage(currentChat.id!, index);

      // Update local messages
      const updatedMessages = [...messages];
      updatedMessages.splice(index, 1);

      setMessages(updatedMessages);

      // Update current chat with deleted message
      setCurrentChat(prev => prev ? {
        ...prev,
        messages: updatedMessages,
        updatedAt: new Date()
      } : null);

      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const handleDeleteChat = async () => {
    if (!currentChat || !user) return;

    try {
      await ChatService.deleteChat(currentChat.id!);
      setCurrentChat(null);
      setMessages([]);
      setShowDeleteDialog(false);
      toast.success('Chat deleted');
    } catch (error) {
      toast.error('Failed to delete chat');
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
            {currentChat && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
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
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
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
                  <ChatMessage
                    key={index}
                    message={message}
                    index={index}
                    onEditMessage={handleEditMessage}
                    onDeleteMessage={handleDeleteMessage}
                  />
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

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chat</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chat? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteChat}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}