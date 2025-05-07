
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
  unreadMessages?: number;
}

const ChatBubble = ({ onClick, unreadMessages = 0 }: ChatBubbleProps) => {
  return (
    <button
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50"
      onClick={onClick}
      aria-label="Open chat"
    >
      <MessageSquare className="w-6 h-6" />
      {unreadMessages > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadMessages > 9 ? '9+' : unreadMessages}
        </span>
      )}
    </button>
  );
};

export default ChatBubble;
