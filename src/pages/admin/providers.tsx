import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { mockProviders } from '../../lib/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Search, Eye, Ban, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ProvidersManagement = () => {
  const [providers, setProviders] = useState(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filteredProviders = providers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || p.approvalStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const handleApprove = async (id: string, name: string) => {
    setProcessingId(id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setProviders(
        providers.map((p) => (p.id === id ? { ...p, approvalStatus: 'approved' } : p))
      );
      toast.success(`${name} has been approved`);
    } catch (error) {
      toast.error('Failed to approve provider');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string, name: string) => {
    setProcessingId(id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setProviders(
        providers.map((p) => (p.id === id ? { ...p, approvalStatus: 'rejected' } : p))
      );
      toast.error(`${name} has been rejected`);
    } catch (error) {
      toast.error('Failed to reject provider');
    } finally {
      setProcessingId(null);
    }
  };

  const handleSuspend = async (id: string, name: string) => {
    setProcessingId(id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setProviders(providers.filter((p) => p.id !== id));
      toast.success(`${name} has been suspended`);
    } catch (error) {
      toast.error('Failed to suspend provider');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-[#22C55E] text-white';
      case 'pending':
        return 'bg-[#FF7A00] text-white';
      case 'rejected':
        return 'bg-[#EF4444] text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const approvedCount = providers.filter((p) => p.approvalStatus === 'approved').length;
  const pendingCount = providers.filter((p) => p.approvalStatus === 'pending').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Service Providers</h1>
        <p className="text-muted-foreground mt-1">Manage and approve service providers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{providers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {(['all', 'approved', 'pending', 'rejected'] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Providers List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Jobs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.length > 0 ? (
                  filteredProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={provider.avatar}
                            alt={provider.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-medium text-foreground">{provider.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{provider.email}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {provider.skills.slice(0, 2).map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {provider.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{provider.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-foreground">
                          ⭐ {provider.rating}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-foreground">{provider.completedJobs}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(provider.approvalStatus)}>
                          {provider.approvalStatus.charAt(0).toUpperCase() +
                            provider.approvalStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {provider.joinDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {provider.approvalStatus === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={processingId === provider.id}
                                onClick={() => handleApprove(provider.id, provider.name)}
                              >
                                {processingId === provider.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={processingId === provider.id}
                                onClick={() => handleReject(provider.id, provider.name)}
                              >
                                {processingId === provider.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-destructive" />
                                )}
                              </Button>
                            </>
                          )}
                          {provider.approvalStatus === 'approved' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={processingId === provider.id}
                              onClick={() => handleSuspend(provider.id, provider.name)}
                            >
                              {processingId === provider.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Ban className="w-4 h-4 text-destructive" />
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No providers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProvidersManagement;