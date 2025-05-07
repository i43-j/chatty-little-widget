
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ChatInput from './ChatInput';
import ChatMessage, { Message } from './ChatMessage';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatWindow = ({ isOpen, onClose, messages, onSendMessage, isLoading = false }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-lg overflow-hidden border z-50 flex flex-col slide-in-bottom">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-primary text-white">
        <h3 className="font-medium">Chat Support</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-primary-foreground/10"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Send a message to start chatting</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-accent text-accent-foreground rounded-2xl px-4 py-2 rounded-tl-none max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent-foreground/70 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-accent-foreground/70 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-accent-foreground/70 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} isDisabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
