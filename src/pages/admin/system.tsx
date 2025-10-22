import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { AlertCircle, CheckCircle2, Clock, Trash2 } from 'lucide-react';

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Low Inventory Alert',
      message: 'Water Pressure Gauge (prod_5) stock below 20 units',
      timestamp: new Date(Date.now() - 3600000),
      resolved: false,
    },
    {
      id: '2',
      type: 'error',
      title: 'Failed Payment',
      message: 'Payment processing failed for order ORD_001',
      timestamp: new Date(Date.now() - 7200000),
      resolved: true,
    },
    {
      id: '3',
      type: 'info',
      title: 'New Provider Application',
      message: 'David Lee submitted application for approval',
      timestamp: new Date(Date.now() - 86400000),
      resolved: false,
    },
    {
      id: '4',
      type: 'warning',
      title: 'System Performance',
      message: 'API response time exceeded threshold',
      timestamp: new Date(Date.now() - 172800000),
      resolved: true,
    },
    {
      id: '5',
      type: 'error',
      title: 'Database Backup Failed',
      message: 'Automated backup failed for 2024-02-05',
      timestamp: new Date(Date.now() - 259200000),
      resolved: false,
    },
  ]);

  const resolveAlert = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, resolved: true } : a)));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-[#EF4444] text-white';
      case 'warning':
        return 'bg-[#FF7A00] text-white';
      case 'info':
        return 'bg-[#FF7A00] text-white';
      case 'success':
        return 'bg-[#22C55E] text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-[#EF4444]" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-[#FF7A00]" />;
      case 'info':
        return <Clock className="w-5 h-5 text-[#FF7A00]" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const resolvedAlerts = alerts.filter((a) => a.resolved);

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
        <h1 className="text-3xl font-bold text-foreground">System Alerts</h1>
        <p className="text-muted-foreground mt-1">Monitor platform health and issues</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">{activeAlerts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{resolvedAlerts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{alerts.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          {activeAlerts.length > 0 ? (
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        </div>
                        <Badge className={getAlertColor(alert.type)}>
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{formatTime(alert.timestamp)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteAlert(alert.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>All systems operational</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resolved Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Resolved Alerts</CardTitle>
          <CardDescription>Recently fixed issues</CardDescription>
        </CardHeader>
        <CardContent>
          {resolvedAlerts.length > 0 ? (
            <div className="space-y-2">
              {resolvedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-muted/20"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(alert.timestamp)}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-6 text-muted-foreground">No resolved alerts</p>
          )}
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">API Server</span>
                <Badge className="bg-[#22C55E] text-white">
                  Operational
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Response time: 45ms</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">Database</span>
                <Badge className="bg-[#22C55E] text-white">
                  Operational
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">CPU: 45% | Memory: 62%</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">Storage</span>
                <Badge className="bg-[#FF7A00] text-white">
                  Caution
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Usage: 85% | Available: 150GB</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">Backup System</span>
                <Badge className="bg-[#EF4444] text-white">
                  Error
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Last backup: 48h ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemAlerts;