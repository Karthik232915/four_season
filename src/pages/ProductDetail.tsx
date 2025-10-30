import { useState, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, Truck, RefreshCw, ShieldCheck, Minus, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import products from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Calculate zoom position based on cursor location
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const bounds = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    
    setZoomPosition({ x, y });
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Please select color and size');
      return;
    }

    addToCart({
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Product link copied to clipboard');
      }
    } catch (e) {
      toast.error('Unable to share - please copy the URL manually');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Lightbox / Image viewer */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button className="absolute top-6 right-6 text-white text-xl" onClick={() => setLightboxOpen(false)} aria-label="Close">✕</button>
          <button
            className="absolute left-6 text-white text-3xl"
            onClick={() => setLightboxIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
            aria-label="Previous"
          >
            ‹
          </button>
          <img src={product.images[lightboxIndex]} alt={`${product.name} large`} className="max-h-[80vh] max-w-[90vw] object-contain" />
          <button
            className="absolute right-6 text-white text-3xl"
            onClick={() => setLightboxIndex((prev) => (prev + 1) % product.images.length)}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
              <div 
                ref={imageContainerRef}
                className="aspect-square overflow-hidden rounded-lg mb-4 bg-muted relative cursor-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiPjwvY2lyY2xlPjxsaW5lIHgxPSIyMSIgeTE9IjIxIiB4Mj0iMTYuNjUiIHkyPSIxNi42NSI+PC9saW5lPjxsaW5lIHgxPSIxMSIgeTE9IjgiIHgyPSIxMSIgeTI9IjE0Ij48L2xpbmU+PGxpbmUgeDE9IjgiIHkxPSIxMSIgeDI9IjE0IiB5Mj0iMTEiPjwvbGluZT48L3N2Zz4=)_12_12,auto] group"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <button
                  onClick={() => {
                    setLightboxIndex(product.images.indexOf(mainImage || product.images[0]));
                    setLightboxOpen(true);
                  }}
                  className="w-full h-full relative"
                  aria-label="Open image"
                >
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-200"
                  />
                  {/* Zoom overlay */}
                  {showZoom && (
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{
                        background: `url(${mainImage}) no-repeat`,
                        backgroundSize: '200% 200%',
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  )}
                </button>
                {/* small thumbnails overlay on large screens */}
                <div className="hidden lg:flex absolute left-4 top-4 flex-col gap-2">
                  {product.images.slice(0, 4).map((img, i) => (
                    <button key={i} onClick={() => setMainImage(img)} className={`w-16 h-16 rounded-md overflow-hidden border ${mainImage === img ? 'border-primary' : 'border-transparent'}`}>
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(image)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    mainImage === image ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Badge className="mb-2">{product.material}</Badge>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="text-sm text-muted-foreground mb-2">SKU: <span className="font-medium text-foreground">{product.sku}</span></div>
                <div className="flex items-center gap-2">
                  {product.featured && <Badge className="text-xs">Featured</Badge>}
                  {product.status === 'active' ? (
                    <Badge className="text-xs">In Catalog</Badge>
                  ) : (
                    <Badge className="text-xs">Unavailable</Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Sold by</div>
                <div className="font-medium">Four Season Pvt. Ltd.</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">₹{product.retailPrice.toLocaleString()}</span>
              <span className="text-xl text-muted-foreground line-through">
                ₹{Math.round(product.retailPrice * 1.3).toLocaleString()}
              </span>
              <Badge variant="destructive">
                {Math.round((1 - product.retailPrice / (product.retailPrice * 1.3)) * 100)}% OFF
              </Badge>
            </div>

            {/* Stock & delivery */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${selectedSize?.stock && selectedSize.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {selectedSize?.stock && selectedSize.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>
              <div className="text-sm text-muted-foreground">Estimated delivery: <span className="text-foreground font-medium">{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span></div>
              <div className="text-sm text-muted-foreground">| Shipping: <span className="text-foreground font-medium">₹{product.retailPrice > 5000 ? 0 : 199}</span></div>
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Quick product facts */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-sm">
                <div className="text-muted-foreground">Material</div>
                <div className="font-medium">{product.material}</div>
              </div>
              <div className="text-sm">
                <div className="text-muted-foreground">Thread Count</div>
                <div className="font-medium">{product.threadCount || 'N/A'}</div>
              </div>
              <div className="text-sm">
                <div className="text-muted-foreground">Wholesale Price</div>
                <div className="font-medium">₹{product.wholesalePrice?.toLocaleString()}</div>
              </div>
              <div className="text-sm">
                <div className="text-muted-foreground">MOQ</div>
                <div className="font-medium">{product.moq || '1'}</div>
              </div>
            </div>

            {/* Bulk pricing tiers */}
            {product.bulkPricingTiers && product.bulkPricingTiers.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Bulk Pricing</h4>
                <div className="text-sm text-muted-foreground">
                  {product.bulkPricingTiers.map((t) => (
                    <div key={t.minQuantity} className="flex justify-between py-1 border-b">
                      <div>{t.minQuantity}+ units</div>
                      <div className="font-medium">₹{t.pricePerUnit.toLocaleString()} / unit</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Color: {selectedColor?.name}</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      if (color.images.length > 0) {
                        setMainImage(color.images[0]);
                      }
                    }}
                    className={`group relative`}
                    title={color.name}
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor?.name === color.name
                          ? 'border-primary scale-110'
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Size</h3>
              <Select
                value={selectedSize?.size}
                onValueChange={(value) => {
                  const size = product.sizes.find((s) => s.size === value);
                  if (size) setSelectedSize(size);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size.size} value={size.size}>
                      {size.size} - {size.dimensions}
                      {size.stock < 10 && ` (Only ${size.stock} left)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Size chart - quick view */}
              <div className="mt-3 text-sm text-muted-foreground">
                <div className="font-medium mb-1">Size chart</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {product.sizes.map((s) => (
                    <div key={s.size} className="p-2 rounded-md bg-muted/50">
                      <div className="font-medium">{s.size}</div>
                      <div className="text-muted-foreground">{s.dimensions}</div>
                      <div className="text-xs mt-1">{s.stock} in stock</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(selectedSize?.stock || 1, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedSize?.stock} available
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary to-gold-light hover:opacity-90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product.id)
                }
              >
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              </Button>
              <Button size="lg" variant="outline" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              
            </div>

            <Button size="lg" className="w-full mb-6" onClick={handleBuyNow}>
              Buy Now
            </Button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Quality Assured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="py-3 font-semibold">{key}</td>
                        <td className="py-3 text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Customer reviews will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Free shipping on orders above ₹5,000. Estimated delivery: 5-7 business days.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <Card className="group overflow-hidden hover:shadow-luxury transition-all">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-2">{p.name}</h3>
                      <p className="text-lg font-bold">₹{p.retailPrice.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
