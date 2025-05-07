
import React from 'react';
import ChatWidget from '../components/ChatWidget';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-lg p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Chatty Widget</h1>
        <p className="text-xl text-gray-600 mb-8">
          A simple, beautiful chat widget for your website. Click the chat bubble in the bottom right to start a conversation!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Customizable</h2>
            <p className="text-gray-500">Easily adapt the widget to match your brand's colors and style.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Responsive</h2>
            <p className="text-gray-500">Works perfectly on all devices, from mobile to desktop.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Easy to Use</h2>
            <p className="text-gray-500">Simple integration with any website or application.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Lightweight</h2>
            <p className="text-gray-500">Minimal impact on your site's performance.</p>
          </div>
        </div>
      </div>
      
      {/* Chat Widget */}
      <ChatWidget initialMessage="👋 Hello! How can I help you today?" />
    </div>
  );
};

export default Index;
