import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ChatInput from './ChatInput';
import ChatMessage, { Message } from './ChatMessage';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>; // NEW: To update messages after sending
  isLoading?: boolean;
  webhookUrl: string; // NEW: Pass the webhook URL here
}

const ChatWindow = ({ isOpen, onClose, messages, setMessages, isLoading = false, webhookUrl }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (userMessage: string) => {
    // Get or create sessionId
    console.log("handleSendMessage called with message:", userMessage);
    console.log("Webhook URL being used:", webhookUrl);

    let sessionId = localStorage.getItem('chatSessionId');
    if (!sessionId) {
        sessionId = 'user-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('chatSessionId', sessionId);
    }

    // Add user's message to the chat immediately
    const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
        // Send message to webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: userMessage,
                sessionId: sessionId,
                userId: sessionId
            })
        });

        const data = await response.json();
        console.log("Received response from webhook:", data);
        const botReply = data.response?.reply || "I'm sorry, I didn't understand that.";

        // Add bot's reply to the chat
        const botMsg: Message = {
            id: Date.now().toString() + '-bot',
            role: 'bot',
            content: botReply
        };
        setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
        console.error("Fetch error:", error);
        console.error('Error sending message:', error);
        const errorMsg: Message = {
            id: Date.now().toString() + '-error',
            role: 'bot',
            content: "Oops! Something went wrong. Please try again."
        };
        setMessages((prev) => [...prev, errorMsg]);
    }
};


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
      <ChatInput onSendMessage={handleSendMessage} isDisabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
