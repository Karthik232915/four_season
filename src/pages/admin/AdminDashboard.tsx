import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { state } = useAuth();

  if (!state.isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  const stats = [
    { icon: ShoppingCart, label: "Today's Revenue", value: '₹1,24,500', color: 'text-green-600' },
    { icon: Package, label: 'Total Orders', value: '1,247', color: 'text-blue-600' },
    { icon: Users, label: 'Total Customers', value: '3,456', color: 'text-purple-600' },
    { icon: Package, label: 'Low Stock Items', value: '12', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-accent border-r">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary">Four Season Admin</h1>
          </div>
          <nav className="space-y-1 px-3">
            {[
              { icon: LayoutDashboard, label: 'Dashboard' },
              { icon: Package, label: 'Products' },
              { icon: ShoppingCart, label: 'Orders' },
              { icon: Users, label: 'Customers' },
              { icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-background transition-colors">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-10 w-10 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
