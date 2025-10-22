import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockPayments, mockBookings, mockProviders } from '../../lib/mockData';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, TrendingUp, AlertCircle, Download } from 'lucide-react';
import { format } from 'date-fns';

const Earnings = () => {
  const provider = mockProviders[0];

  // Calculate earnings stats
  const providerPayments = mockPayments.filter((p) => {
    const booking = mockBookings.find((b) => b.id === p.bookingId);
    return booking?.providerId === provider.id;
  });

  const completedEarnings = providerPayments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingEarnings = providerPayments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const monthlyData = [
    { month: 'Jan', earnings: 1200, jobs: 8 },
    { month: 'Feb', earnings: 1500, jobs: 10 },
    { month: 'Mar', earnings: 2200, jobs: 15 },
    { month: 'Apr', earnings: 1800, jobs: 12 },
    { month: 'May', earnings: 2500, jobs: 17 },
    { month: 'Jun', earnings: 2800, jobs: 19 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Earnings</h1>
        <p className="text-muted-foreground mt-1">Track your income and payouts</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-foreground">${completedEarnings}</p>
                <p className="text-xs text-muted-foreground mt-1">All-time</p>
              </div>
              <DollarSign className="w-8 h-8 text-success/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-warning">${pendingEarnings}</p>
                <p className="text-xs text-muted-foreground mt-1">Awaiting payout</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-foreground">$2,800</p>
                <p className="text-xs text-muted-foreground mt-1">19 completed jobs</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent/40" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Trend</CardTitle>
          <CardDescription>Your earnings over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--success))', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Jobs vs Earnings */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs & Earnings</CardTitle>
          <CardDescription>Completed jobs and corresponding earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Bar dataKey="jobs" fill="hsl(var(--primary))" name="Jobs Completed" />
              <Bar dataKey="earnings" fill="hsl(var(--success))" name="Earnings ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>Your recent payouts and pending transfers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                id: 'payout_1',
                amount: 2500,
                date: new Date('2024-06-01'),
                status: 'completed',
                method: 'Bank Transfer',
              },
              {
                id: 'payout_2',
                amount: 2200,
                date: new Date('2024-05-01'),
                status: 'completed',
                method: 'Bank Transfer',
              },
              {
                id: 'payout_3',
                amount: 1800,
                date: new Date('2024-04-01'),
                status: 'completed',
                method: 'Bank Transfer',
              },
            ].map((payout) => (
              <div key={payout.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{payout.method}</p>
                    <p className="text-sm text-muted-foreground">{format(payout.date, 'MMM d, yyyy')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-success">${payout.amount}</p>
                    <Badge className="bg-success text-success-foreground">
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}

            {/* Pending Payout */}
            {pendingEarnings > 0 && (
              <div className="border-2 border-warning rounded-lg p-4 bg-warning/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Pending Payout</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your next payout will be processed on June 15th
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-lg text-warning">${pendingEarnings}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payout Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Settings</CardTitle>
          <CardDescription>Manage your payout method and frequency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Bank Account</p>
                <p className="text-sm text-muted-foreground mt-1">Wells Fargo - Checking</p>
                <p className="text-xs text-muted-foreground mt-1">•••• •••• •••• 1234</p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Payout Frequency</p>
                <p className="text-sm text-muted-foreground mt-1">Monthly on the 1st</p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </div>

          <Button className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Tax Forms (1099)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Earnings;
