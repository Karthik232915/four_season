import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock data for addresses
const initialAddresses = [
  {
    id: 1,
    type: 'Home',
    name: 'John Doe',
    street: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 9876543210',
    isDefault: true
  },
  {
    id: 2,
    type: 'Office',
    name: 'John Doe',
    street: '456 Business Park',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400051',
    phone: '+91 9876543211',
    isDefault: false
  }
];

const AddressForm = ({ onSubmit, initialData = null, onCancel }: any) => {
  const [formData, setFormData] = useState(initialData || {
    type: '',
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Address Type
          </label>
          <Input
            id="type"
            placeholder="Home, Office, etc."
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="street" className="text-sm font-medium">
          Street Address
        </label>
        <Input
          id="street"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium">
            State
          </label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="pincode" className="text-sm font-medium">
            PIN Code
          </label>
          <Input
            id="pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
        />
        <label htmlFor="isDefault" className="text-sm">
          Set as default address
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Address</Button>
      </div>
    </form>
  );
};

const Addresses = () => {
  const { state, updateUser } = useAuth();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState(() => {
    const savedAddresses = state.user?.addresses || initialAddresses;
    return savedAddresses.map((addr: any) => ({
      ...addr,
      name: addr.name || state.user?.name || '',
      phone: addr.phone || state.user?.phone || ''
    }));
  });
  const [editingAddress, setEditingAddress] = useState<null | any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const updateUserAddresses = (newAddresses: any[]) => {
    if (state.user) {
      const updatedUser = {
        ...state.user,
        addresses: newAddresses
      };
      updateUser(updatedUser);
      setAddresses(newAddresses);
    }
  };

  const handleAddAddress = (newAddress: any) => {
    const newAddresses = [
      ...addresses,
      {
        ...newAddress,
        id: addresses.length + 1,
      },
    ];
    updateUserAddresses(newAddresses);
    setIsDialogOpen(false);
    toast({
      title: "Address Added",
      description: "Your new address has been successfully added.",
    });
  };

  const handleEditAddress = (updatedAddress: any) => {
    const newAddresses = addresses.map(addr => 
      addr.id === updatedAddress.id ? updatedAddress : addr
    );
    updateUserAddresses(newAddresses);
    setEditingAddress(null);
    setIsDialogOpen(false);
    toast({
      title: "Address Updated",
      description: "Your address has been successfully updated.",
    });
  };

  const handleDeleteAddress = (id: number) => {
    const newAddresses = addresses.filter(addr => addr.id !== id);
    updateUserAddresses(newAddresses);
    toast({
      title: "Address Deleted",
      description: "Your address has been successfully removed.",
    });
  };

  const handleSetDefault = (id: number) => {
    const newAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    updateUserAddresses(newAddresses);
    toast({
      title: "Default Address Updated",
      description: "Your default delivery address has been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Addresses</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
              </DialogHeader>
              <AddressForm
                onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
                initialData={editingAddress}
                onCancel={() => {
                  setEditingAddress(null);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-medium">{address.type}</span>
                    {address.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingAddress(address);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-medium">{address.name}</p>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.pincode}</p>
                  <p className="text-muted-foreground">Phone: {address.phone}</p>
                </div>

                {!address.isDefault && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Addresses;