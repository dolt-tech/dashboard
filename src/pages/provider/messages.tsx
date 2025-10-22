import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { mockMessages } from '../../lib/mockData';
import { Send, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  senderName: string;
  senderAvatar: string;
}

const ProviderMessages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');

  // Group messages by conversation
  const conversations = Array.from(
    new Map(
      messages.map((msg) => [msg.senderId === 'prov_1' ? msg.receiverId : msg.senderId, msg])
    ).values()
  );

  const filteredConversations = conversations.filter((conv) =>
    conv.senderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) {
      toast.error('Please select a conversation and type a message');
      return;
    }

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: 'prov_1',
      receiverId: selectedChat,
      content: messageInput,
      timestamp: new Date(),
      read: true,
      senderName: 'You',
      senderAvatar: 'https://avatar.vercel.sh/provider',
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput('');
    toast.success('Message sent');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Chat with customers about their service requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.senderId}
                  onClick={() => setSelectedChat(conv.senderId === 'prov_1' ? conv.receiverId : conv.senderId)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === (conv.senderId === 'prov_1' ? conv.receiverId : conv.senderId)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted border border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={conv.senderAvatar}
                      alt={conv.senderName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{conv.senderName}</p>
                      <p className="text-xs opacity-75 truncate">{conv.content}</p>
                    </div>
                    {!conv.read && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedChat ? (
            <>
              <CardHeader>
                <CardTitle className="text-lg">
                  {conversations.find((c) => c.senderId === selectedChat || c.receiverId === selectedChat)?.senderName}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4">
                  {messages
                    .filter(
                      (msg) =>
                        (msg.senderId === 'prov_1' && msg.receiverId === selectedChat) ||
                        (msg.receiverId === 'prov_1' && msg.senderId === selectedChat)
                    )
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === 'prov_1' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.senderId === 'prov_1'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2 border-t border-border pt-4">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProviderMessages;
