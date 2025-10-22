import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { TrendingUp, Users } from 'lucide-react';

const SubscriptionsMonitoring = () => {
  const subscriptionData = [
    { id: 'user_1', name: 'John Doe', plan: 'Premium', monthlyPrice: 9.99, startDate: '2024-01-15', status: 'active', nextRenewal: '2024-02-15' },
    { id: 'user_2', name: 'Jane Smith', plan: 'Free', monthlyPrice: 0, startDate: '2024-02-20', status: 'active', nextRenewal: 'N/A' },
    { id: 'user_3', name: 'Robert Brown', plan: 'Premium', monthlyPrice: 9.99, startDate: '2023-12-10', status: 'active', nextRenewal: '2024-02-10' },
    { id: 'user_4', name: 'Emily Davis', plan: 'Premium', monthlyPrice: 9.99, startDate: '2024-01-01', status: 'cancelled', nextRenewal: 'N/A' },
  ];

  const premiumUsers = subscriptionData.filter((s) => s.plan === 'Premium').length;
  const freeUsers = subscriptionData.filter((s) => s.plan === 'Free').length;
  const cancelledSubscriptions = subscriptionData.filter((s) => s.status === 'cancelled').length;
  const monthlyRecurringRevenue = subscriptionData
    .filter((s) => s.status === 'active' && s.plan === 'Premium')
    .reduce((sum, s) => sum + s.monthlyPrice, 0);

  const churnRate = ((cancelledSubscriptions / subscriptionData.length) * 100).toFixed(1);
  const conversionRate = ((premiumUsers / (premiumUsers + freeUsers)) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Subscription Monitoring</h1>
        <p className="text-muted-foreground mt-1">Track subscriptions and plan usage</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Premium Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{premiumUsers}</p>
            <p className="text-xs text-muted-foreground mt-1">{conversionRate}% conversion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Free Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{freeUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">MRR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">${monthlyRecurringRevenue.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Monthly recurring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">{churnRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Premium</span>
                  <span className="text-sm font-semibold text-foreground">{premiumUsers}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(premiumUsers / subscriptionData.length) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Free</span>
                  <span className="text-sm font-semibold text-foreground">{freeUsers}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground transition-all"
                    style={{ width: `${(freeUsers / subscriptionData.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Recurring Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${monthlyRecurringRevenue.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Annual Revenue (est.)</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${(monthlyRecurringRevenue * 12).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>All user subscriptions and renewal dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Monthly Price</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Next Renewal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptionData.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <span className="font-medium text-foreground">{sub.name}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={sub.plan === 'Premium' ? 'default' : 'secondary'}>
                        {sub.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      ${sub.monthlyPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{sub.startDate}</TableCell>
                    <TableCell className="text-muted-foreground">{sub.nextRenewal}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          sub.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }
                      >
                        {sub.status === 'active' ? 'Active' : 'Cancelled'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionsMonitoring;
