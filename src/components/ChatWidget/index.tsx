import React, { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';
import { Message } from './ChatMessage';

interface ChatWidgetProps {
  webhookUrl: string;
}

const ChatWidget = ({ webhookUrl }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Send message to webhook and handle reply
  const handleSendMessage = async (userMessage: string) => {
    console.log("handleSendMessage called with message:", userMessage);
    console.log("Webhook URL being used:", webhookUrl);

    let sessionId = localStorage.getItem('chatSessionId');
    if (!sessionId) {
      sessionId = 'user-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chatSessionId', sessionId);
    }

    // Add user's message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage
    };
    setMessages(prev => [...prev, userMsg]);

    setIsLoading(true);

    try {
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

      const botMsg: Message = {
        id: Date.now().toString() + '-bot',
        role: 'bot',
        content: botReply
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error('Fetch error:', error);

      const errorMsg: Message = {
        id: Date.now().toString() + '-error',
        role: 'bot',
        content: "Oops! Something went wrong. Please try again."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChatBubble isOpen={isOpen} onClick={() => setIsOpen(true)} />
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </>
  );
};

export default ChatWidget;
