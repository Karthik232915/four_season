import { Link } from 'react-router-dom';
import { ArrowRight, Star, Building2, Package, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import products from '@/data/products';
import { categories } from '@/data/categories';

const Index = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const testimonials = [
    {
      name: 'Raj Mehta',
      role: 'Taj Hotels - Procurement Manager',
      rating: 5,
      text: 'Outstanding quality and service. Four Season has been our trusted partner for 3 years.',
    },
    {
      name: 'Priya Sharma',
      role: 'Homeowner',
      rating: 5,
      text: 'The Egyptian cotton sheets are absolutely divine! Best sleep I\'ve ever had.',
    },
    {
      name: 'Anil Kumar',
      role: 'ITC Hotels - Operations Head',
      rating: 5,
      text: 'Bulk ordering is seamless and the quality consistency is remarkable.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=90"
            alt="Luxury bedding background"
            className="absolute inset-0 w-full h-full object-cover transform scale-105 animate-slow-zoom opacity-90"
          />
        </div>

        {/* Overlay: slightly less transparent but keep depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 to-navy/90 z-0" />

        {/* Content card: semi-opaque backdrop for readability */}
        <div className="relative z-20 px-4 py-12 max-w-5xl mx-auto animate-fade-in-up">
          <div className="mx-auto bg-navy/75 backdrop-blur-md rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-white/6">
            <div className="mb-4">
              <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold font-medium text-sm tracking-wider">EXPERIENCE LUXURY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-gold">
              Luxury Linens for
              <br />
              <span className="text-gold">Hotels & Homes</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-6 text-white/95 max-w-2xl mx-auto">
              Premium bed sheets crafted with Egyptian cotton for ultimate comfort and timeless elegance
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
              <Link to="/products" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-gold text-white hover:opacity-95 transform hover:scale-105 transition-all duration-250 shadow-md h-12 px-6"
                >
                  Shop Collection
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products?type=business" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 text-white border-white/40 hover:bg-white hover:text-navy backdrop-blur-sm transform hover:scale-105 transition-all duration-250 h-12 px-6"
                >
                  B2B Bulk Orders
                  <Building2 className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Package, title: 'Free Shipping', desc: 'On orders above ₹5,000' },
              { icon: CheckCircle, title: 'Quality Assured', desc: 'Premium materials only' },
              { icon: Building2, title: 'B2B Pricing', desc: 'Special rates for hotels' },
              { icon: Star, title: '4.8+ Rating', desc: 'Trusted by 1000+ customers' },
            ].map((feature, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-wider text-sm mb-3 block">CURATED SELECTION</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground text-lg">Handpicked luxury pieces for your sanctuary</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group overflow-hidden hover:shadow-luxury transition-all duration-500 animate-fade-in bg-white/50 backdrop-blur-sm">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.featured && (
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured Item
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-secondary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {product.material}
                      </span>
                      <div className="flex items-center gap-1 text-primary">
                        <Star className="h-4 w-4 fill-primary" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-primary">₹{product.retailPrice.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{Math.round(product.retailPrice * 1.3).toLocaleString()}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-wider text-sm mb-3 block">BROWSE COLLECTIONS</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">Discover our expertly curated collections</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 lg:gap-8">
            {categories.map((category) => {
              // Get the appropriate image for each category
              const categoryImages = {
                'bed-sheets': 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&w=800',
                'pillow-covers': 'https://images.pexels.com/photos/945688/pexels-photo-945688.jpeg?auto=compress&w=800',
                'complete-sets': 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&w=800',
                'duvets': 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&w=800',
                'blankets': 'https://images.pexels.com/photos/6585623/pexels-photo-6585623.jpeg?auto=compress&w=800',
              };

              return (
                <Link key={category.id} to={`/products?category=${category.id}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1">
                    <div className="aspect-square relative">
                      <img 
                        src={categoryImages[category.id]} 
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/5" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-primary/20 backdrop-blur-[2px]" />
                    </div>
                    <CardContent className="p-6 text-center bg-white/90 backdrop-blur-sm relative">
                      <h3 className="font-medium text-lg group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {category.subcategories.length} {category.subcategories.length === 1 ? 'style' : 'styles'}
                      </p>
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-primary text-sm font-medium inline-flex items-center">
                          Explore <ArrowRight className="h-4 w-4 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* B2B Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Building2 className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Hotels</h2>
            <p className="text-lg mb-8 text-accent-foreground/80">
              Special bulk pricing, dedicated account management, and customization options for hotels and resorts
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Register for B2B Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">Real experiences from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground">{testimonial.text}</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
