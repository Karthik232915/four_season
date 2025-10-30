import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, SlidersHorizontal, Grid3x3, List, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import products from '@/data/products';
import { categories } from '@/data/categories';
import { useWishlist } from '@/contexts/WishlistContext';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const categoryFilter = searchParams.get('category') || '';
  const subcategoryFilter = searchParams.get('subcategory') || '';

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (subcategoryFilter) {
      filtered = filtered.filter((p) => p.subcategory === subcategoryFilter);
    }

    filtered = filtered.filter(
      (p) => p.retailPrice >= priceRange[0] && p.retailPrice <= priceRange[1]
    );

    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s.size))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.retailPrice - b.retailPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.retailPrice - a.retailPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Mock - in real app would use createdAt
        break;
      default:
        // popularity
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  }, [categoryFilter, subcategoryFilter, priceRange, selectedColors, selectedSizes, sortBy]);

  const colors = [
    'Pure White',
    'Ivory Cream',
    'Champagne Gold',
    'Navy Blue',
    'Royal Purple',
    'Emerald Green',
    'Charcoal Grey',
    'Rose Gold',
  ];

  const sizes = ['Single', 'Double', 'Queen', 'King', 'Super King'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Luxury Bedding Collection</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="h-5 w-5" />
                  <h2 className="font-semibold">Filters</h2>
                </div>

                <Accordion type="multiple" defaultValue={['categories', 'price']} className="space-y-2">
                  <AccordionItem value="categories">
                    <AccordionTrigger className="text-sm">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <div key={cat.id}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start text-sm ${
                                categoryFilter === cat.id ? 'bg-muted font-medium' : ''
                              }`}
                              onClick={() => {
                                setSearchParams({ category: cat.id });
                              }}
                            >
                              {cat.name}
                            </Button>
                            {categoryFilter === cat.id && (
                              <div className="ml-4 mt-1 space-y-1">
                                {cat.subcategories.map((sub) => (
                                  <Button
                                    key={sub.id}
                                    variant="ghost"
                                    size="sm"
                                    className={`w-full justify-start text-xs ${
                                      subcategoryFilter === sub.id ? 'text-primary' : ''
                                    }`}
                                    onClick={() => {
                                      setSearchParams({ category: cat.id, subcategory: sub.id });
                                    }}
                                  >
                                    {sub.name}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger className="text-sm">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          min={0}
                          max={20000}
                          step={500}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="colors">
                    <AccordionTrigger className="text-sm">Colors</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {colors.map((color) => (
                          <div key={color} className="flex items-center gap-2">
                            <Checkbox
                              id={color}
                              checked={selectedColors.includes(color)}
                              onCheckedChange={(checked) => {
                                setSelectedColors(
                                  checked
                                    ? [...selectedColors, color]
                                    : selectedColors.filter((c) => c !== color)
                                );
                              }}
                            />
                            <label htmlFor={color} className="text-sm cursor-pointer">
                              {color}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sizes">
                    <AccordionTrigger className="text-sm">Sizes</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {sizes.map((size) => (
                          <div key={size} className="flex items-center gap-2">
                            <Checkbox
                              id={size}
                              checked={selectedSizes.includes(size)}
                              onCheckedChange={(checked) => {
                                setSelectedSizes(
                                  checked
                                    ? [...selectedSizes, size]
                                    : selectedSizes.filter((s) => s !== size)
                                );
                              }}
                            />
                            <label htmlFor={size} className="text-sm cursor-pointer">
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {
                    setPriceRange([0, 20000]);
                    setSelectedColors([]);
                    setSelectedSizes([]);
                    setSearchParams({});
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-luxury transition-all animate-fade-in"
                >
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <div className={viewMode === 'grid' ? 'aspect-square' : 'aspect-video'}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <button
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                      onClick={() =>
                        isInWishlist(product.id)
                          ? removeFromWishlist(product.id)
                          : addToWishlist(product.id)
                      }
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`}
                      />
                    </button>
                    {product.featured && (
                      <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.material}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-3">
                      {product.colors.slice(0, 5).map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-border"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                      {product.colors.length > 5 && (
                        <span className="text-xs text-muted-foreground">
                          +{product.colors.length - 5}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="text-lg font-bold">
                          ₹{product.retailPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{Math.round(product.retailPrice * 1.3).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No products found</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 20000]);
                    setSelectedColors([]);
                    setSelectedSizes([]);
                    setSearchParams({});
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
