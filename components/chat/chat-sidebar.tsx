'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { ChatService, Chat } from '@/lib/chat-service';
import { format } from 'date-fns';

interface ChatSidebarProps {
  onSelectChat: (chat: Chat) => void;
  onCreateNewChat: () => void;
  selectedChatId?: string;
}

export function ChatSidebar({ onSelectChat, onCreateNewChat, selectedChatId }: ChatSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadChats();
    }
  }, [user]);

  const loadChats = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const userChats = await ChatService.getChats(user.uid);
      setChats(userChats);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col h-full">
      <div className="p-4 border-b dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Chats</h2>
        </div>
        
        <Button onClick={onCreateNewChat} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading chats...</div>
        ) : chats.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
            <p>No chats yet</p>
            <p className="text-sm">Start a new conversation!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {chats.map((chat) => (
              <Card
                key={chat.id}
                className={`cursor-pointer transition-colors ${
                  selectedChatId === chat.id
                    ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => onSelectChat(chat)}
              >
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm truncate">
                    {chat.title || 'New Chat'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {format(chat.updatedAt, 'MMM d, HH:mm')}
                  </p>
                  {chat.messages.length > 0 && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">
                      {chat.messages[chat.messages.length - 1].content}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 