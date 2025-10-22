import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { mockMessages } from '../../lib/mockData';
import { Search, Flag, MessageSquare } from 'lucide-react';

interface ChatConversation {
  id: string;
  user1: string;
  user2: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  flagged: boolean;
}

const ChatMonitor = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: 'conv_1',
      user1: 'John Doe',
      user2: 'Sarah Johnson',
      lastMessage: 'I will arrive around 10 AM. See you then!',
      timestamp: new Date(Date.now() - 3600000),
      messageCount: 12,
      flagged: false,
    },
    {
      id: 'conv_2',
      user1: 'Jane Smith',
      user2: 'Mike Chen',
      lastMessage: 'When is available for the job?',
      timestamp: new Date(Date.now() - 7200000),
      messageCount: 8,
      flagged: false,
    },
    {
      id: 'conv_3',
      user1: 'Robert Brown',
      user2: 'Alex Rodriguez',
      lastMessage: 'Thanks for the great service!',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 15,
      flagged: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterFlagged, setFilterFlagged] = useState(false);

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.user1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.user2.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterFlagged || conv.flagged;
    return matchesSearch && matchesFilter;
  });

  const flagConversation = (id: string) => {
    setConversations(
      conversations.map((c) => (c.id === id ? { ...c, flagged: !c.flagged } : c))
    );
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Chat Monitor</h1>
        <p className="text-muted-foreground mt-1">Monitor all user-provider conversations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{conversations.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Flagged</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">
              {conversations.filter((c) => c.flagged).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {conversations.reduce((sum, c) => sum + c.messageCount, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by user or provider name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant={filterFlagged ? 'default' : 'outline'}
            onClick={() => setFilterFlagged(!filterFlagged)}
          >
            <Flag className="w-4 h-4 mr-2" />
            Show Flagged Only
          </Button>
        </CardContent>
      </Card>

      {/* Conversations List */}
      <Card>
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors ${
                    conv.flagged ? 'border-destructive/50 bg-destructive/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-semibold text-foreground">
                          {conv.user1} ↔ {conv.user2}
                        </h3>
                        {conv.flagged && (
                          <Badge className="bg-destructive/20 text-destructive">
                            <Flag className="w-3 h-3 mr-1" />
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last message: {conv.lastMessage}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-sm text-muted-foreground">{conv.messageCount} messages</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatTime(conv.timestamp)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Conversation
                    </Button>
                    <Button
                      size="sm"
                      variant={conv.flagged ? 'default' : 'outline'}
                      onClick={() => flagConversation(conv.id)}
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      {conv.flagged ? 'Remove Flag' : 'Flag'}
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive">
                      Block Users
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No conversations found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Moderation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Moderation Guidelines</CardTitle>
          <CardDescription>What to look for when monitoring conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border-l-4 border-destructive pl-4">
              <p className="font-medium text-foreground">Abusive Language</p>
              <p className="text-sm text-muted-foreground">Flag conversations containing harassment or offensive language</p>
            </div>
            <div className="border-l-4 border-warning pl-4">
              <p className="font-medium text-foreground">Payment Issues</p>
              <p className="text-sm text-muted-foreground">Monitor discussions about payments outside the platform</p>
            </div>
            <div className="border-l-4 border-warning pl-4">
              <p className="font-medium text-foreground">Suspicious Activity</p>
              <p className="text-sm text-muted-foreground">Watch for attempts to exchange personal contact information</p>
            </div>
            <div className="border-l-4 border-info pl-4">
              <p className="font-medium text-foreground">Service Disputes</p>
              <p className="text-sm text-muted-foreground">Track unresolved service quality complaints</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatMonitor;
