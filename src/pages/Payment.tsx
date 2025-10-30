import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, Wallet, Banknote, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Payment = () => {
  const navigate = useNavigate();
  const { state: cartState, clearCart } = useCart();
  const { state: authState } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderNumber = 'ORD-' + Date.now();
      localStorage.setItem('lastOrder', JSON.stringify({
        orderNumber,
        total: cartState.total,
        items: cartState.items,
        date: new Date(),
      }));

      clearCart();
      setIsProcessing(false);
      navigate('/order-confirmation');
    }, 2000);
  };

  if (cartState.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const paymentMethods = [
    { id: 'card', icon: CreditCard, label: 'Credit / Debit Card' },
    { id: 'upi', icon: Smartphone, label: 'UPI' },
    { id: 'netbanking', icon: Building2, label: 'Net Banking' },
    { id: 'wallet', icon: Wallet, label: 'Wallets' },
    { id: 'cod', icon: Banknote, label: 'Cash on Delivery' },
  ];

  if (authState.user?.customerType === 'business') {
    paymentMethods.splice(4, 0, { id: 'bank-transfer', icon: Building2, label: 'Bank Transfer' });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="text-sm text-muted-foreground">Cart</span>
            </div>
            <div className="flex-1 h-0.5 bg-primary mx-4" />
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="text-sm text-muted-foreground">Shipping</span>
            </div>
            <div className="flex-1 h-0.5 bg-primary mx-4" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <span className="font-semibold">Payment</span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-4" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                4
              </div>
              <span className="text-muted-foreground">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {paymentMethods.map((method) => (
                    <Card key={method.id} className={paymentMethod === method.id ? 'border-primary' : ''}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1">
                            <method.icon className="h-5 w-5 text-primary" />
                            <span className="font-medium">{method.label}</span>
                          </Label>
                        </div>

                        {paymentMethod === method.id && (
                          <div className="mt-4 pl-9 space-y-4">
                            {method.id === 'card' && (
                              <>
                                <div className="space-y-2">
                                  <Label htmlFor="cardNumber">Card Number</Label>
                                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input id="cvv" placeholder="123" />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cardName">Cardholder Name</Label>
                                  <Input id="cardName" placeholder="Name on card" />
                                </div>
                              </>
                            )}

                            {method.id === 'upi' && (
                              <div className="space-y-2">
                                <Label htmlFor="upiId">UPI ID</Label>
                                <Input id="upiId" placeholder="yourname@upi" />
                              </div>
                            )}

                            {method.id === 'netbanking' && (
                              <div className="space-y-2">
                                <Label htmlFor="bank">Select Bank</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose your bank" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="sbi">State Bank of India</SelectItem>
                                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                    <SelectItem value="icici">ICICI Bank</SelectItem>
                                    <SelectItem value="axis">Axis Bank</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            {method.id === 'wallet' && (
                              <div className="space-y-2">
                                <Label>Select Wallet</Label>
                                <div className="grid grid-cols-3 gap-3">
                                  <Button variant="outline">Paytm</Button>
                                  <Button variant="outline">PhonePe</Button>
                                  <Button variant="outline">Google Pay</Button>
                                </div>
                              </div>
                            )}

                            {method.id === 'bank-transfer' && (
                              <div className="space-y-2 bg-muted p-4 rounded-lg">
                                <p className="text-sm font-medium">Bank Account Details</p>
                                <p className="text-xs text-muted-foreground">
                                  Account Name: Four Season Pvt Ltd<br />
                                  Account Number: 1234567890<br />
                                  IFSC Code: HDFC0001234<br />
                                  Bank: HDFC Bank
                                </p>
                              </div>
                            )}

                            {method.id === 'cod' && (
                              <p className="text-sm text-muted-foreground">
                                Pay with cash when your order is delivered. COD charges may apply.
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </RadioGroup>

                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Secure payment with 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({cartState.itemCount})</span>
                    <span>₹{cartState.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{cartState.gst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">
                      {cartState.subtotal >= 5000 ? 'FREE' : '₹99'}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total Amount</span>
                  <span className="text-primary">
                    ₹{(cartState.total + (cartState.subtotal >= 5000 ? 0 : 99)).toLocaleString()}
                  </span>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-gold-light hover:opacity-90"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ← Back to Shipping
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
