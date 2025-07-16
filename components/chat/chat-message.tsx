'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Message } from '@/lib/chat-service';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit2, Trash2, Check, X } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  index: number;
  onEditMessage: (index: number, content: string) => void;
  onDeleteMessage: (index: number) => void;
}

export function ChatMessage({ message, index, onEditMessage, onDeleteMessage }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [isHovering, setIsHovering] = useState(false);

  // Format timestamp using moment
  const formatTimestamp = () => {
    if (!message.timestamp) return 'Just now';
    return moment(message.timestamp).format('MMM D, YYYY HH:mm');
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() !== '') {
      onEditMessage(index, editedContent);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(message.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteMessage(index);
  };

  return (
    <div 
      className={`flex gap-3 group ${isUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-500 text-white">
            AI
          </AvatarFallback>
        </Avatar>
      )}

      <div className="relative max-w-[80%]">
        {isUser && isHovering && !isEditing && (
          <div className="absolute -top-2 -right-2 flex gap-1 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-full bg-white dark:bg-gray-800 shadow-sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-full bg-white dark:bg-gray-800 shadow-sm"
              onClick={handleDelete}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}

        <Card
          className={`${isUser
            ? 'bg-blue-500 text-white dark:bg-blue-600'
            : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-100'
            }`}
        >
          <CardContent className="p-3">
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[60px] text-sm dark:bg-gray-700 dark:text-white"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 px-2 text-xs"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-3 w-3 mr-1" /> Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-7 px-2 text-xs"
                    onClick={handleSaveEdit}
                  >
                    <Check className="h-3 w-3 mr-1" /> Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-2 opacity-0 transition-opacity group-hover:opacity-100 ${isUser
                    ? 'text-blue-100'
                    : 'text-gray-500 dark:text-gray-400'
                    }`}
                >
                  {formatTimestamp()}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

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