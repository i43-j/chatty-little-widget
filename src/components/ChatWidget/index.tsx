
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';
import { Message } from './ChatMessage';
import { useToast } from "@/hooks/use-toast";

interface ChatWidgetProps {
  initialMessage?: string;
  botName?: string;
  webhookUrl?: string;
}

const ChatWidget = ({ 
  initialMessage = "", 
  botName = "Support Bot",
  webhookUrl = "" 
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Only add initial message if it's provided and not empty
  useEffect(() => {
    if (initialMessage && initialMessage.trim() !== '') {
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

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      if (webhookUrl) {
        // Call external API for chatbot response
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: content,
            userId: 'anonymous-user', // You can implement user identification
            timestamp: new Date().toISOString()
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to get response from chatbot');
        }
        
        const data = await response.json();
        const botResponse: Message = {
          id: uuidv4(),
          content: data.message || data.response || data.reply || "Sorry, I couldn't process that response.",
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } else {
        // Fallback to simulated response
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
      }
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      toast({
        title: "Error",
        description: "Failed to get response from chatbot service.",
        variant: "destructive",
      });
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "Sorry, I'm having trouble connecting to my brain. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
        isLoading={isLoading}
      />
    </>
  );
};

export default ChatWidget;
