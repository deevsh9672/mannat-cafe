import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Plus, Sparkles, ShoppingBag, ChevronDown } from 'lucide-react';
import { restaurantData, type MenuItem } from '../data/restaurantData';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  recommendations?: MenuItem[];
  actionPrompt?: string;
}

interface MenuChatAssistantProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const MenuChatAssistant: React.FC<MenuChatAssistantProps> = ({
  onAddToCart,
  onOpenCart,
  cartCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Namaste! 🙏 Welcome to Mannat Cafe & Restaurant Dausa. I am your Digital Menu Assistant. Ask me anything or tap a suggestion below!",
      recommendations: [
        restaurantData.menu.find((m) => m.id === 'snack-1')!, // Vegetable Puffs
        restaurantData.menu.find((m) => m.id === 'sw-1')!, // Sandwich
      ].filter(Boolean),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickChips = [
    "Crispy Vegetable Puffs",
    "Best snacks for 2 people",
    "Spicy Momos & Chinese",
    "Cold Coffee & Beverages",
    "Traditional Rajasthani",
    "Pure Veg under ₹300",
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Generate smart AI Menu recommendation
    setTimeout(() => {
      const botResponse = generateAssistantResponse(userText);
      setMessages((prev) => [...prev, botResponse]);
    }, 400);
  };

  const generateAssistantResponse = (query: string): Message => {
    const q = query.toLowerCase();
    let reply = "";
    let matches: MenuItem[] = [];

    if (q.includes("puff") || q.includes("snack") || q.includes("special")) {
      reply = "Our signature baked Vegetable Puffs are freshly prepared every day with crisp golden layers! Here are our top snacks:";
      matches = restaurantData.menu.filter((m) => m.category === "Snacks" || m.id === "snack-1");
    } else if (q.includes("momo") || q.includes("chinese") || q.includes("noodle") || q.includes("spicy")) {
      reply = "Here are our fiery Chinese & Momo specialties with authentic red garlic dip and wok tossed flavours:";
      matches = restaurantData.menu.filter((m) => m.category === "Momos" || m.category === "Chinese");
    } else if (q.includes("sandwich") || q.includes("burger") || q.includes("cheese") || q.includes("pasta")) {
      reply = "Craving comfort food? Check out our loaded grilled cheese sandwiches, burgers, and creamy pastas:";
      matches = restaurantData.menu.filter((m) => m.category === "Sandwiches" || m.category === "Pasta" || m.category === "Fast Food");
    } else if (q.includes("coffee") || q.includes("tea") || q.includes("chai") || q.includes("drink") || q.includes("beverage")) {
      reply = "Here are our refreshing hot & cold beverages, including our thick Cold Coffee and Kulhad Masala Chai:";
      matches = restaurantData.menu.filter((m) => m.category === "Beverages");
    } else if (q.includes("rajasthani") || q.includes("baati") || q.includes("dal") || q.includes("north indian") || q.includes("roti") || q.includes("meal")) {
      reply = "For authentic regional tastes, we recommend our traditional Dal Baati Churma and rich North Indian platters:";
      matches = restaurantData.menu.filter((m) => m.category === "Rajasthani" || m.category === "North Indian");
    } else if (q.includes("2") || q.includes("two") || q.includes("couple") || q.includes("friends")) {
      reply = "For 2 people, a perfect combo is our Crispy Vegetable Puffs + Grilled Cheese Club Sandwich + 2 Kulhad Chais or Cold Coffees!";
      matches = [
        restaurantData.menu.find((m) => m.id === "snack-1")!,
        restaurantData.menu.find((m) => m.id === "sw-1")!,
        restaurantData.menu.find((m) => m.id === "bev-1")!,
      ].filter(Boolean);
    } else if (q.includes("price") || q.includes("300") || q.includes("budget") || q.includes("cheap")) {
      reply = "Our average cost per person is ₹200–₹400, offering generous portions and great taste! Here are top value picks:";
      matches = restaurantData.menu.filter((m) => m.isFeatured).slice(0, 3);
    } else {
      reply = `Great choice! Here are delicious customer favourites freshly prepared in our Dausa kitchen:`;
      matches = restaurantData.menu.filter((m) => m.isFeatured).slice(0, 3);
    }

    return {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: reply,
      recommendations: matches.slice(0, 3),
    };
  };

  return (
    <>
      {/* Floating Menu Chat Launcher Button */}
      <div className="fixed bottom-20 md:bottom-22 right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#16191e] border border-[#d48b38]/50 text-[#fdfbf7] shadow-2xl hover:border-[#d48b38] transition-all transform hover:scale-105 active:scale-95 group"
          aria-label="Open AI Menu Assistant"
        >
          <div className="p-1.5 rounded-full bg-[#d48b38]/20 text-[#d48b38] group-hover:bg-[#d48b38] group-hover:text-[#0d0f12] transition-colors">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold tracking-wide">Menu Assistant</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </button>
      </div>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 md:bottom-28 right-4 sm:right-6 w-[92vw] sm:w-[420px] max-h-[80vh] z-50 bg-[#121418] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn backdrop-blur-xl">
          
          {/* Header */}
          <div className="p-4 bg-[#16191e] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#d48b38]/15 border border-[#d48b38]/30 flex items-center justify-center text-[#d48b38]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#fdfbf7] flex items-center gap-1.5">
                  <span>Mannat Menu AI</span>
                  <Sparkles className="w-3 h-3 text-[#d48b38]" />
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Live Waiter Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartCount > 0 && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCart();
                  }}
                  className="p-2 rounded-xl bg-white/5 text-[#d48b38] hover:bg-white/10 text-xs font-semibold flex items-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{cartCount}</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-[#a59f93] hover:text-[#fdfbf7] hover:bg-white/5 transition-colors"
                aria-label="Close Assistant"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[460px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#d48b38] text-[#0d0f12] font-semibold rounded-tr-none'
                      : 'bg-white/5 border border-white/10 text-[#ede8df] rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Dish Recommendations in Chat */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    {msg.recommendations.map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-[#16191e] border border-white/10 flex items-center justify-between gap-3 shadow-md hover:border-[#d48b38]/40 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-11 h-11 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#fdfbf7] truncate">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-[#d48b38]">
                              {item.price ? `₹${item.price}` : item.priceDisplay || '₹ Price at cafe'}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onAddToCart(item)}
                          className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#0d0f12] bg-[#d48b38] hover:bg-[#e29d4c] transition-all transform active:scale-95"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 bg-[#0e1014] border-t border-white/5 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 min-w-max">
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 hover:bg-white/10 text-[#d3cbbe] hover:text-[#d48b38] border border-white/5 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#16191e] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask for puffs, pasta, cold coffee..."
              className="flex-1 bg-[#0d0f12] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#fdfbf7] placeholder-[#7d776c] focus:outline-none focus:border-[#d48b38]"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-2.5 rounded-xl bg-[#d48b38] hover:bg-[#e29d4c] text-[#0d0f12] font-semibold transition-colors"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
