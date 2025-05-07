import React, { useState, useEffect } from 'react';
import ChatWidget from '../components/ChatWidget';
import { Input } from '@components/ui/input';
import { useToast } from '@hooks/use-toast';

const Index = () => {
  const defaultWebhook = 'https://mactest2.app.n8n.cloud/webhook-test/cb3e7489-f7ea-45bf-8bd2-646b7942479b';

  const [webhookUrl, setWebhookUrl] = useState(defaultWebhook);
  const { toast } = useToast();

  // On mount, load webhook from localStorage if available
  useEffect(() => {
    const savedUrl = localStorage.getItem('chatbot-webhook-url');
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, []);

  const handleSaveWebhook = () => {
    if (webhookUrl) {
      localStorage.setItem('chatbot-webhook-url', webhookUrl);
      toast({
        title: 'Webhook Saved',
        description: 'Your chatbot webhook has been saved and will be used for all conversations.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center max-w-lg p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Chatty Widget</h1>
        <p className="text-xl text-gray-600 mb-8">
          A simple, beautiful chat widget for your website. Click the chat bubble to start a conversation!
        </p>

        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Connect Your Chatbot</h2>
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="Enter your chatbot webhook URL"
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <button
            onClick={handleSaveWebhook}
            className="w-full bg-primary text-white rounded px-4 py-2"
          >
            Save Webhook
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Enter the URL of your chatbot webhook. The chat widget will send user messages to this URL and display responses.
          </p>
        </div>
      </div>

      <ChatWidget webhookUrl={webhookUrl} />
    </div>
  );
};

export default Index;
