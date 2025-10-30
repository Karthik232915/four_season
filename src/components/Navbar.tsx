import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Navbar = () => {
  const { state: cartState } = useCart();
  const auth = useAuth();
  if (!auth) throw new Error('AuthContext not available');
  const { isAuthenticated, user } = auth.state;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-[#FFD700]">
            Four Season
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search luxury bedding..."
                className="w-full pl-10"
              />
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/products" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            
            {isAuthenticated && (
              <Link to="/wishlist" className="relative hover:text-primary transition-colors">
                <Heart className="h-5 w-5" />
              </Link>
            )}

            <Link to="/cart" className="relative hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartState?.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-scale-in">
                  {cartState.itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link to="/account">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name?.split(' ')[0] || 'Account'}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-gradient-to-r from-primary to-gold-light hover:opacity-90">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
