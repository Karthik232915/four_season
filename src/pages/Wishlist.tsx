import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/contexts/WishlistContext';
import products from '@/data/products';

const Wishlist = () => {
  const { state, removeFromWishlist } = useWishlist();
  const wishlistProducts = products.filter((p) => state.items.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-8">
              Save your favorite items here to view them later.
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-primary to-gold-light">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">{wishlistProducts.length} items saved</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-luxury transition-all">
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <button
                  className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-red-50 transition-colors shadow-lg"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <X className="h-5 w-5 text-red-500" />
                </button>
              </div>

              <CardContent className="pt-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-3">{product.material}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold">₹{product.retailPrice.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{Math.round(product.retailPrice * 1.3).toLocaleString()}
                  </span>
                </div>
                <Link to={`/product/${product.id}`}>
                  <Button className="w-full" variant="outline" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;