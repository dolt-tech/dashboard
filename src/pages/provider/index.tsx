import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { mockBookings, mockProviders, mockPayments } from '../../lib/mockData';
import { DollarSign, CheckCircle2, Clock, TrendingUp, ArrowRight, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistance, format } from 'date-fns';

const ProviderDashboard = () => {
  const navigate = useNavigate();

  // Get provider's jobs (using first provider for demo)
  const provider = mockProviders[0];
  const providerJobs = mockBookings.filter((b) => b.providerId === provider.id);

  const assignedJobs = providerJobs.filter((b) => ['pending', 'confirmed'].includes(b.status));
  const inProgressJobs = providerJobs.filter((b) => b.status === 'in_progress');
  const completedJobs = providerJobs.filter((b) => b.status === 'completed');

  const monthlyEarnings = mockPayments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-accent/20 text-accent';
      case 'confirmed':
        return 'bg-accent/20 text-accent';
      case 'in_progress':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const JobCard = ({ job }: { job: (typeof providerJobs)[0] }) => (
    <div className="border border-border rounded-lg p-4 hover:bg-muted/50 hover:border-accent/30 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-white">{job.customerName}</p>
          <p className="text-sm text-muted-foreground">{job.address}</p>
        </div>
        <Badge className={getStatusColor(job.status)}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </Badge>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
        <div>
          <p className="text-muted-foreground">Date & Time</p>
          <p className="font-medium text-white">{format(job.date, 'MMM d, h:mm a')}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Amount</p>
          <p className="font-medium text-accent font-bold">${job.amount}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Rating</p>
          <p className="font-medium text-white">
            {job.rating ? `⭐ ${job.rating}` : 'Pending'}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1 text-white border-border hover:text-accent hover:bg-accent/10">
          View Details
        </Button>
        {job.status === 'in_progress' && (
          <Button size="sm" className="flex-1" variant="default">
            Mark Complete
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome, {provider.name}!</h1>
        <p className="text-muted-foreground mt-1">Manage your jobs and track your earnings</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white">{providerJobs.length}</p>
                <p className="text-xs text-muted-foreground mt-1">All-time</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white">{inProgressJobs.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Active jobs</p>
              </div>
              <Clock className="w-8 h-8 text-accent/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-accent font-bold">${monthlyEarnings}</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white">⭐ {provider.rating}</p>
                <p className="text-xs text-muted-foreground mt-1">{completedJobs.length} reviews</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent/40" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Overview */}
      <Card>
        <CardHeader>
          <CardTitle>My Jobs</CardTitle>
          <CardDescription>View and manage your service appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assigned" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="assigned">
                Assigned ({assignedJobs.length})
              </TabsTrigger>
              <TabsTrigger value="in-progress">
                In Progress ({inProgressJobs.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedJobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assigned" className="space-y-4 mt-4">
              {assignedJobs.length > 0 ? (
                assignedJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p className="text-center text-muted-foreground py-8">No assigned jobs</p>
              )}
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-4 mt-4">
              {inProgressJobs.length > 0 ? (
                inProgressJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p className="text-center text-muted-foreground py-8">No jobs in progress</p>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-4">
              {completedJobs.length > 0 ? (
                completedJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p className="text-center text-muted-foreground py-8">No completed jobs</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Messages</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate('/provider/messages')} className="text-accent border-border hover:bg-accent/10">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border border-border rounded-lg p-3 hover:bg-muted/50 hover:border-accent/30 cursor-pointer transition-all duration-200">
                <div className="flex items-start gap-3">
                  <img
                    src="https://avatar.vercel.sh/john"
                    alt="John Doe"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm">John Doe</p>
                    <p className="text-muted-foreground text-xs truncate">When can you start the cleaning?</p>
                    <p className="text-muted-foreground text-xs mt-1">2 hours ago</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start text-white border-border hover:text-accent hover:bg-accent/10" variant="outline" onClick={() => navigate('/provider/profile')}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
            <Button className="w-full justify-start text-white border-border hover:text-accent hover:bg-accent/10" variant="outline" onClick={() => navigate('/provider/availability')}>
              <Clock className="w-4 h-4 mr-2" />
              Set Availability
            </Button>
            <Button className="w-full justify-start text-white border-border hover:text-accent hover:bg-accent/10" variant="outline" onClick={() => navigate('/provider/earnings')}>
              <DollarSign className="w-4 h-4 mr-2" />
              View Earnings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboard;