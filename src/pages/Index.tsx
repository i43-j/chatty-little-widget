
import React, { useState } from 'react';
import ChatWidget from '../components/ChatWidget';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const { toast } = useToast();

  const handleSaveWebhook = () => {
    if (webhookUrl) {
      localStorage.setItem('chatbot-webhook-url', webhookUrl);
      toast({
        title: "Webhook Saved",
        description: "Your chatbot webhook has been saved and will be used for all conversations.",
      });
    }
  };

  // Load webhook from localStorage on mount
  React.useEffect(() => {
    const savedUrl = localStorage.getItem('chatbot-webhook-url');
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center max-w-lg p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Chatty Widget</h1>
        <p className="text-xl text-gray-600 mb-8">
          A simple, beautiful chat widget for your website. Click the chat bubble in the bottom right to start a conversation!
        </p>
        
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Connect Your Chatbot</h2>
          <div className="flex flex-col gap-4">
            <Input
              type="url"
              placeholder="Enter your chatbot webhook URL"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full"
            />
            <button 
              onClick={handleSaveWebhook}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Save Webhook
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Enter the URL of your chatbot webhook. The chat widget will send user messages to this URL and display responses.
          </p>
        </div>
      </div>
      
      {/* Chat Widget with no initial message */}
      <ChatWidget 
        webhookUrl={webhookUrl}
      />
    </div>
  );
};

export default Index;
