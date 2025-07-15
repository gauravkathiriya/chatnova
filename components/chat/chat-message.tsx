'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Message } from '@/lib/chat-service';
import moment from 'moment';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // Format timestamp using moment
  const formatTimestamp = () => {
    if (!message.timestamp) return 'Just now';

    return moment(message.timestamp).format('HH:mm');
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-500 text-white">
            AI
          </AvatarFallback>
        </Avatar>
      )}

      <Card
        className={`max-w-[80%] ${isUser
          ? 'bg-blue-500 text-white dark:bg-blue-600'
          : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-100'
          }`}
      >
        <CardContent className="p-3">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p
            className={`text-xs mt-2 ${isUser
              ? 'text-blue-100'
              : 'text-gray-500 dark:text-gray-400'
              }`}
          >
            {formatTimestamp()}
          </p>
        </CardContent>
      </Card>

      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-500 text-white">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}