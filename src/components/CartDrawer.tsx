import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';
import type { CartItem, CustomerOrderDetails } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [details, setDetails] = useState<CustomerOrderDetails>({
    customerName: '',
    phone: '',
    orderType: 'takeaway',
    addressOrTable: '',
    specialInstructions: '',
  });

  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  // Calculate pricing total for items that have numeric prices
  const knownTotal = cart.reduce((sum, item) => {
    return sum + (item.menuItem.price ? item.menuItem.price * item.quantity : 0);
  }, 0);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Formulate WhatsApp order message
  const handlePlaceOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    let itemsText = cart
      .map((item, index) => {
        const priceText = item.menuItem.price
          ? `₹${item.menuItem.price * item.quantity}`
          : 'Price at cafe';
        return `${index + 1}. *${item.menuItem.name}* x ${item.quantity} (${priceText})`;
      })
      .join('\n');

    const totalEstimateText = knownTotal > 0 ? `\n*Subtotal Estimate:* ₹${knownTotal}` : '';

    const message =
      `*NEW ORDER - MANNAT CAFE & RESTAURANT*\n` +
      `--------------------------------------\n` +
      `*Customer:* ${details.customerName || 'Valued Guest'}\n` +
      `*Phone:* ${details.phone || 'Not provided'}\n` +
      `*Order Type:* ${details.orderType.toUpperCase()}\n` +
      `*Location/Table:* ${details.addressOrTable || 'Counter Pickup'}\n` +
      (details.specialInstructions ? `*Special Notes:* ${details.specialInstructions}\n` : '') +
      `--------------------------------------\n` +
      `*ITEMS ORDERED:*\n` +
      `${itemsText}\n` +
      `--------------------------------------` +
      `${totalEstimateText}\n\n` +
      `Please confirm order preparation and timing. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${restaurantData.whatsappNumber}?text=${encoded}`, '_blank');
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121418] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#16191e]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#d48b38]/15 text-[#d48b38]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-title text-lg font-bold text-[#fdfbf7]">
                  Your Order Cart
                </h3>
                <span className="text-xs text-[#a59f93]">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#a59f93] hover:text-[#fdfbf7] hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-[#8f897d]/40 mx-auto mb-3" />
                <h4 className="text-base font-bold text-[#fdfbf7]">Your cart is empty</h4>
                <p className="text-xs text-[#a59f93] max-w-xs mx-auto mt-1 mb-6">
                  Browse our menu and pick vegetable puffs, sandwiches, beverages, or meals to get started.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c]"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs text-[#a59f93]">
                  <span>Selected Dishes</span>
                  <button
                    onClick={onClearCart}
                    className="text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-[#fdfbf7] truncate">
                          {item.menuItem.name}
                        </div>
                        <div className="text-[11px] text-[#d48b38]">
                          {item.menuItem.price
                            ? `₹${item.menuItem.price * item.quantity}`
                            : item.menuItem.priceDisplay || 'Price at cafe'}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="inline-flex items-center gap-1.5 bg-[#16191e] border border-white/10 rounded-lg px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                          className="text-[#a59f93] hover:text-[#fdfbf7]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#fdfbf7] min-w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                          className="text-[#a59f93] hover:text-[#fdfbf7]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.menuItem.id)}
                        className="p-1.5 text-[#8f897d] hover:text-rose-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Customer Details Form */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d48b38]">
                    Order &amp; Delivery Details
                  </h4>

                  <div>
                    <label className="block text-[11px] font-medium text-[#a59f93] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={details.customerName}
                      onChange={(e) =>
                        setDetails({ ...details, customerName: e.target.value })
                      }
                      placeholder="e.g. Vikram Meena"
                      className="w-full bg-[#16191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#fdfbf7] placeholder-[#6d685e] focus:outline-none focus:border-[#d48b38]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#a59f93] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={details.phone}
                      onChange={(e) =>
                        setDetails({ ...details, phone: e.target.value })
                      }
                      placeholder="e.g. 9876543210"
                      className="w-full bg-[#16191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#fdfbf7] placeholder-[#6d685e] focus:outline-none focus:border-[#d48b38]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {(['takeaway', 'dine-in', 'delivery'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setDetails({ ...details, orderType: type })}
                        className={`py-2 px-1 text-[11px] font-semibold rounded-lg capitalize border transition-all ${
                          details.orderType === type
                            ? 'bg-[#d48b38] text-[#0d0f12] border-[#d48b38]'
                            : 'bg-white/5 text-[#a59f93] border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#a59f93] mb-1">
                      {details.orderType === 'dine-in'
                        ? 'Table Number (if seated)'
                        : details.orderType === 'takeaway'
                        ? 'Pickup Time / Curbside Car info'
                        : 'Delivery Address in Dausa'}
                    </label>
                    <input
                      type="text"
                      value={details.addressOrTable}
                      onChange={(e) =>
                        setDetails({ ...details, addressOrTable: e.target.value })
                      }
                      placeholder={
                        details.orderType === 'dine-in'
                          ? 'e.g. Table 4 Rooftop'
                          : details.orderType === 'takeaway'
                          ? 'e.g. Sainthal Rd curbside pickup in 15 mins'
                          : 'e.g. Vinayak Nagar near Sainthal Rd'
                      }
                      className="w-full bg-[#16191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#fdfbf7] placeholder-[#6d685e] focus:outline-none focus:border-[#d48b38]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#a59f93] mb-1">
                      Cooking Notes / Instructions
                    </label>
                    <input
                      type="text"
                      value={details.specialInstructions}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          specialInstructions: e.target.value,
                        })
                      }
                      placeholder="e.g. Extra spicy chutney, less oil, well-toasted"
                      className="w-full bg-[#16191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#fdfbf7] placeholder-[#6d685e] focus:outline-none focus:border-[#d48b38]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action Buttons */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-white/10 bg-[#16191e] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#d3cbbe]">
                <span>Total Items:</span>
                <span className="font-bold text-[#fdfbf7]">{totalItemsCount}</span>
              </div>

              {knownTotal > 0 && (
                <div className="flex items-center justify-between text-sm text-[#fdfbf7] font-bold">
                  <span>Estimated Total:</span>
                  <span className="text-[#e29d4c]">₹{knownTotal}</span>
                </div>
              )}

              <div className="text-[11px] text-[#8f897d]">
                * Final bill will be verified directly by cafe staff on WhatsApp/Call.
              </div>

              {orderSent && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Order formulated! WhatsApp opened for confirmation.</span>
                </div>
              )}

              {/* Checkout Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handlePlaceOrderWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] transition-all shadow-lg shadow-[#d48b38]/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Place Order via WhatsApp</span>
                </button>

                <a
                  href={`tel:${restaurantData.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#ede8df] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#d48b38]" />
                  <span>Call to Order ({restaurantData.phone})</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
