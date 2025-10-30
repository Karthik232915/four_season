import { Link, Navigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, Lock, LogOut, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const AccountPage = () => {
  const auth = useAuth();
  if (!auth) throw new Error('AuthContext not available');
  const { isAuthenticated, isLoading } = auth.state;
  const { logout } = auth;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            My Account
          </h1>
          <p className="text-muted-foreground mb-8">Manage your account settings and preferences</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Package, 
                title: 'My Orders', 
                desc: 'Track and manage orders', 
                link: '/account/orders',
                bgImage: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&w=500&q=80'
              },
              { 
                icon: User, 
                title: 'Profile Settings', 
                desc: 'Update personal info', 
                link: '/account/profile',
                bgImage: 'https://images.unsplash.com/photo-1615920292087-6d9f818e9e13?auto=format&w=500&q=80'
              },
              { 
                icon: Heart, 
                title: 'Wishlist', 
                desc: 'Saved items', 
                link: '/wishlist',
                bgImage: 'https://images.unsplash.com/photo-1617325721270-06ef985e4798?auto=format&w=500&q=80'
              },
              { 
                icon: MapPin, 
                title: 'Addresses', 
                desc: 'Manage delivery addresses', 
                link: '/account/addresses',
                bgImage: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&w=500&q=80'
              },
              { 
                icon: Lock, 
                title: 'Change Password', 
                desc: 'Update security', 
                link: '/account/password',
                bgImage: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&w=500&q=80'
              },
            ].map((item) => (
              <Link key={item.title} to={item.link}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative bg-card hover:bg-gradient-to-br hover:from-card hover:to-card/95 border border-border/50">
                  <div 
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background opacity-80 group-hover:opacity-90" />
                  <CardContent className="pt-8 pb-8 text-center relative z-10">
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-300" />
                      <div className="relative z-10 bg-background/80 rounded-full p-3 backdrop-blur-sm group-hover:backdrop-blur-md transition-all">
                        <item.icon className="h-12 w-12 mx-auto text-primary transform group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80">{item.desc}</p>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </Link>
            ))}
            <Card 
              onClick={logout}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative bg-card hover:bg-gradient-to-br hover:from-destructive/10 hover:to-destructive/5 border border-border/50 cursor-pointer"
            >
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-cover bg-center"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&w=500&q=80)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background opacity-80 group-hover:opacity-90" />
              <CardContent className="pt-8 pb-8 text-center relative z-10">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-destructive/10 rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-300" />
                  <div className="relative z-10 bg-background/80 rounded-full p-3 backdrop-blur-sm group-hover:backdrop-blur-md transition-all">
                    <LogOut className="h-12 w-12 mx-auto text-destructive transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-destructive transition-colors">Logout</h3>
                <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80">Sign out of account</p>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;