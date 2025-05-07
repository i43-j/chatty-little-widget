
import React from 'react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full mb-2 scale-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-accent text-accent-foreground rounded-tl-none"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p 
          className={cn(
            "text-xs mt-1",
            isUser ? "text-primary-foreground/70" : "text-accent-foreground/70"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
