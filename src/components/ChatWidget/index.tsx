
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';
import { Message } from './ChatMessage';

interface ChatWidgetProps {
  initialMessage?: string;
  botName?: string;
}

const ChatWidget = ({ initialMessage = "Hi there! How can I help you today?", botName = "Support Bot" }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Add initial message when component mounts
  useEffect(() => {
    if (initialMessage) {
      const initialMsg: Message = {
        id: uuidv4(),
        content: initialMessage,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([initialMsg]);
      setUnreadCount(1);
    }
  }, [initialMessage]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: uuidv4(),
        content: getBotResponse(content),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 1000);
  };

  // Simple bot response function - this would be replaced with actual chatbot logic
  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! How can I assist you today?`;
    } else if (lowerMessage.includes('help')) {
      return "I'm here to help! What do you need assistance with?";
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Thank you for chatting with us! Have a great day!";
    } else {
      return "Thanks for your message. Our team will get back to you soon.";
    }
  };

  return (
    <>
      <ChatBubble onClick={toggleChat} unreadMessages={unreadCount} />
      <ChatWindow 
        isOpen={isOpen} 
        onClose={toggleChat} 
        messages={messages} 
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default ChatWidget;
