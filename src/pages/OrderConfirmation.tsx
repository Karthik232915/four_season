import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const OrderConfirmation = () => {
  const lastOrder = JSON.parse(localStorage.getItem('lastOrder') || '{}');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 animate-scale-in">
            <CheckCircle className="h-24 w-24 mx-auto mb-6 text-green-600" />
            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-2">Thank you for your purchase</p>
            <p className="text-lg font-semibold text-primary">Order #{lastOrder.orderNumber}</p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Total</span>
                  <span className="font-bold">₹{lastOrder.total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span className="font-medium">5-7 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/account">
              <Button size="lg" className="bg-gradient-to-r from-primary to-gold-light">
                <Package className="mr-2 h-5 w-5" />
                Track Order
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Download className="mr-2 h-5 w-5" />
              Download Invoice
            </Button>
          </div>

          <Link to="/">
            <Button variant="link" className="mt-8">Continue Shopping</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
