import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Four Season</h3>
            <p className="text-sm text-accent-foreground/80">
              Premium bed linens for hotels and homes. Experience luxury sleep.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=bed-sheets" className="hover:text-primary transition-colors">Bed Sheets</Link></li>
              <li><Link to="/products?category=pillow-covers" className="hover:text-primary transition-colors">Pillow Covers</Link></li>
              <li><Link to="/products?category=complete-sets" className="hover:text-primary transition-colors">Complete Sets</Link></li>
              <li><Link to="/products?category=comforters-quilts" className="hover:text-primary transition-colors">Comforters</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/account" className="hover:text-primary transition-colors">My Account</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-3 text-accent-foreground/80">Subscribe for exclusive offers</p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-background text-foreground"
              />
              <Button variant="default" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 pt-6 text-center text-sm text-accent-foreground/60">
          <p>&copy; 2024 Four Season. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
