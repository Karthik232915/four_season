import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Package, ChevronDown, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Order, OrderItem } from '@/types';

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    orderNumber: 'ORD-2025-001',
    date: '2025-10-25',
    customerId: 'USR001',
    customerName: 'John Doe',
    customerType: 'individual',
    customerEmail: 'john@example.com',
    customerPhone: '+91 9876543210',
    shippingAddress: {
      id: '1',
      type: 'shipping',
      fullName: 'John Doe',
      phone: '+91 9876543210',
      addressLine1: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    billingAddress: {
      id: '1',
      type: 'billing',
      fullName: 'John Doe',
      phone: '+91 9876543210',
      addressLine1: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    items: [
      {
        productId: 'PDT001',
        productName: 'Luxury Duvet Cover',
        sku: 'DUV-001',
        image: '/images/products/duvet-cover.jpg',
        name: 'Luxury Duvet Cover - Queen Size, White',
        color: 'White',
        size: 'Queen',
        quantity: 1,
        price: 199.99,
        subtotal: 199.99
      },
      {
        productId: 'PDT002',
        productName: 'Premium Pillowcases',
        sku: 'PIL-002',
        image: '/images/products/pillowcases.jpg',
        name: 'Premium Pillowcases - Standard, White',
        color: 'White',
        size: 'Standard',
        quantity: 2,
        price: 50.00,
        subtotal: 100.00
      }
    ],
    subtotal: 299.99,
    tax: 15.00,
    shippingCost: 0,
    shipping: {
      method: 'Standard Delivery',
      trackingNumber: 'TRACK001',
      estimatedDelivery: '2025-10-30'
    },
    discount: 0,
    total: 314.99,
    status: 'Delivered',
    paymentMethod: 'card',
    paymentStatus: 'completed',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-10-25T10:00:00Z',
        note: 'Order placed'
      },
      {
        status: 'Processing',
        timestamp: '2025-10-25T10:30:00Z',
        note: 'Payment confirmed'
      },
      {
        status: 'Shipped',
        timestamp: '2025-10-26T14:00:00Z',
        note: 'Order shipped via Standard Delivery'
      },
      {
        status: 'Delivered',
        timestamp: '2025-10-27T11:00:00Z',
        note: 'Order delivered'
      }
    ],
    notes: 'Handle with care',
    gstNumber: 'GST123456',
    createdAt: '2025-10-25T10:00:00Z',
    estimatedDelivery: '2025-10-30'
  },
  {
    id: 'ORD-2025-002',
    orderNumber: 'ORD-2025-002',
    date: '2025-10-28',
    customerId: 'USR001',
    customerName: 'John Doe',
    customerType: 'individual',
    customerEmail: 'john@example.com',
    customerPhone: '+91 9876543210',
    shippingAddress: {
      id: '1',
      type: 'shipping',
      fullName: 'John Doe',
      phone: '+91 9876543210',
      addressLine1: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    billingAddress: {
      id: '1',
      type: 'billing',
      fullName: 'John Doe',
      phone: '+91 9876543210',
      addressLine1: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    items: [
      {
        productId: 'PDT003',
        productName: 'Egyptian Cotton Sheet Set',
        sku: 'SHT-003',
        image: '/images/products/sheet-set.jpg',
        name: 'Egyptian Cotton Sheet Set - King Size, Ivory',
        color: 'Ivory',
        size: 'King',
        quantity: 1,
        price: 449.99,
        subtotal: 449.99
      }
    ],
    subtotal: 449.99,
    tax: 22.50,
    shippingCost: 0,
    shipping: {
      method: 'Express Delivery',
      trackingNumber: 'TRACK002',
      estimatedDelivery: '2025-10-31'
    },
    discount: 0,
    total: 472.49,
    status: 'Processing',
    paymentMethod: 'card',
    paymentStatus: 'completed',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-10-28T09:00:00Z',
        note: 'Order placed'
      },
      {
        status: 'Processing',
        timestamp: '2025-10-28T09:30:00Z',
        note: 'Payment confirmed'
      }
    ],
    notes: 'Priority order',
    gstNumber: 'GST123456',
    createdAt: '2025-10-28T09:00:00Z',
    estimatedDelivery: '2025-10-31'
  }
];

const Orders = () => {
  const { state } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // Update orders when user data changes
  useEffect(() => {
    if (state.user?.orders) {
      setOrders(state.user.orders);
    }
  }, [state.user?.orders]);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <div className="text-sm text-muted-foreground">
              ({orders.length} {orders.length === 1 ? 'order' : 'orders'})
            </div>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by order ID or product..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No orders found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? 'Try a different search term' : 'You haven\'t placed any orders yet'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Ordered on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                         order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                         order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' :
                         order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                         order.status === 'Refunded' ? 'bg-purple-100 text-purple-800' :
                         'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                      <p className="mt-1 font-medium">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-between"
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  >
                    <span>Order Details</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      selectedOrder === order.id ? 'rotate-180' : ''
                    }`} />
                  </Button>

                  {selectedOrder === order.id && (
                    <div className="mt-4 space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-t">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{item.price.toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between items-center py-2 border-t">
                        <Button variant="outline">Track Order</Button>
                        <Button variant="outline">Download Invoice</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;