export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number | null; // null if price available at cafe
  priceDisplay?: string; // e.g. "₹120" or "₹ Price at cafe"
  isVeg: boolean;
  isFeatured?: boolean;
  image: string;
  badge?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy';
  ingredients?: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  highlight?: string;
  source: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Food' | 'Interior' | 'Exterior' | 'Ambience';
  image: string;
  alt: string;
  caption: string;
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  shortDescription: string;
  fullAbout: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    plusCode: string;
    full: string;
  };
  rating: {
    score: number;
    maxScore: number;
    reviewCount: number;
    platform: string;
  };
  priceRange: string;
  openingHours: {
    openTime: string; // "09:00"
    closeTime: string; // "23:00"
    displayTime: string; // "9:00 AM – 11:00 PM"
    days: string[];
  };
  features: string[];
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  categories: string[];
  menu: MenuItem[];
  reviews: ReviewItem[];
  gallery: GalleryItem[];
}

export const restaurantData: RestaurantConfig = {
  name: "Mannat Cafe & Restaurant",
  tagline: "Good Food. Great Moments.",
  shortDescription: "Fresh flavours, comforting food and a welcoming atmosphere in the heart of Dausa.",
  fullAbout: "Mannat Cafe and Restaurant brings together comforting food, casual dining and a welcoming atmosphere in Vinayak Nagar, Dausa. Whether you're stopping by for a quick bite, enjoying a family meal or meeting friends, Mannat offers a relaxed place to enjoy a variety of Indian, Rajasthani, Chinese and popular fast-food favourites.",
  phone: "+91 99296 60850",
  phoneRaw: "9929660850",
  whatsappNumber: "919929660850",
  address: {
    street: "Sainthal Road",
    area: "Vinayak Nagar",
    city: "Dausa",
    state: "Rajasthan",
    pincode: "303303",
    plusCode: "V8XC+8QW",
    full: "V8XC+8QW, Sainthal Rd, Vinayak Nagar, Dausa, Rajasthan 303303"
  },
  rating: {
    score: 3.8,
    maxScore: 5.0,
    reviewCount: 88,
    platform: "Google Reviews"
  },
  priceRange: "₹200–₹400 per person",
  openingHours: {
    openTime: "09:00",
    closeTime: "23:00",
    displayTime: "9:00 AM – 11:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  features: [
    "Outdoor Seating",
    "Family Friendly",
    "Kids Menu",
    "Drive-thru",
    "Dine-in",
    "Takeaway",
    "Late-night Dining"
  ],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mannat+Cafe+and+Restaurant+Sainthal+Rd+Vinayak+Nagar+Dausa+Rajasthan+303303",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=V8XC%2B8QW%20Sainthal%20Rd%20Vinayak%20Nagar%20Dausa%20Rajasthan%20303303&t=&z=15&ie=UTF8&iwloc=&output=embed",
  
  categories: [
    "All",
    "Customer Favourites",
    "Snacks & Puffs",
    "Sandwiches",
    "Momos",
    "Street Food & Chaat",
    "Fast Food & Burgers",
    "Pasta",
    "Chinese",
    "North Indian",
    "Rajasthani",
    "Beverages & Shakes"
  ],

  menu: [
    // --- Snacks & Puffs ---
    {
      id: "snack-1",
      name: "Crispy Vegetable Puffs",
      category: "Snacks & Puffs",
      description: "Flaky, golden-baked multi-layered puff pastry filled with spiced potato, sweet peas, and authentic desi seasoning. Our signature known customer favourite.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: true,
      badge: "Signature Pick",
      spiceLevel: "Medium",
      ingredients: ["Flaky Puff Pastry", "Spiced Potatoes", "Sweet Peas", "Roasted Cumin", "House Dip"],
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "snack-2",
      name: "Paneer Bhurji Stuffed Puff",
      category: "Snacks & Puffs",
      description: "Golden flaky puff pastry stuffed with spiced crumbled cottage cheese, chopped onions, and fresh coriander.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["Fresh Paneer", "Crushed Spices", "Butter Puff Pastry", "Green Chillies"],
      image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "snack-3",
      name: "Melting Double Cheese Puff",
      category: "Snacks & Puffs",
      description: "Crisp baked golden puff oozing with warm mozzarella and cheddar cheese blend with mild Italian seasoning.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Mozzarella Cheese", "Cheddar Cheese", "Herb Seasoning", "Flaky Dough"],
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "snack-4",
      name: "Crispy Masala French Fries",
      category: "Snacks & Puffs",
      description: "Hot, freshly fried golden potato fries dusted with zesty peri-peri chaat masala. Served with spicy dip.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["Crisp Potatoes", "Peri-Peri Seasoning", "Chaat Masala"],
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80"
    },

    // --- Sandwiches ---
    {
      id: "sw-1",
      name: "Grilled Veg & Cheese Club Sandwich",
      category: "Sandwiches",
      description: "Triple-decker toasted sandwich packed with fresh bell peppers, cucumber, tomatoes, and melted mozzarella cheese.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: true,
      badge: "Popular Pick",
      spiceLevel: "Mild",
      ingredients: ["Amul Butter", "Mozzarella Cheese", "Bell Peppers", "Tomatoes", "Mint Chutney"],
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sw-2",
      name: "Paneer Tikka Grilled Sandwich",
      category: "Sandwiches",
      description: "Tandoori spiced paneer cubes, mint chutney, crispy capsicum, and premium butter-toasted sandwich bread.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["Tandoori Paneer", "Capsicum", "Onions", "Spiced Herb Spread"],
      image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sw-3",
      name: "Corn & Jalapeno Cheesy Toast",
      category: "Sandwiches",
      description: "Sweet golden corn and spicy jalapenos in a gooey cheddar-cheese blend toasted to golden perfection.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Sweet Corn", "Pickled Jalapenos", "Cheddar Cheese", "Cracked Pepper"],
      image: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sw-4",
      name: "Bombay Aloo Masala Toast Sandwich",
      category: "Sandwiches",
      description: "Traditional Mumbai street style spiced mashed aloo layer with crunchy onions and tangy sev sprinkled on top.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["Spiced Aloo", "Chaat Masala", "Fine Nylon Sev", "Butter Toast"],
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80"
    },

    // --- Momos ---
    {
      id: "mo-1",
      name: "Steamed Vegetable Momos",
      category: "Momos",
      description: "Delicate handmade dumplings stuffed with finely minced fresh veggies, ginger, and scallions. Served with fiery red garlic dip.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: true,
      badge: "Crowd Pick",
      spiceLevel: "Spicy",
      ingredients: ["Cabbage", "Carrots", "Spring Onions", "Fresh Ginger", "Red Garlic Dip"],
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "mo-2",
      name: "Crispy Kurkure Fried Momos",
      category: "Momos",
      description: "Crunchy crumb-coated deep-fried momos bursting with juicy spiced filling. Served with spicy schezwan dip and mayo.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["Crunchy Coating", "Minced Garden Veggies", "Schezwan Dip"],
      image: "https://images.unsplash.com/photo-1625398407797-033100652e79?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "mo-3",
      name: "Tandoori Paneer Momos",
      category: "Momos",
      description: "Juicy paneer momos marinated in spiced hung curd and roasted with onions and capsicum.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["Paneer Filling", "Tandoori Marinade", "Mint Chutney"],
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "mo-4",
      name: "Schezwan Gravy Momos",
      category: "Momos",
      description: "Tossed momos wok-cooked in sizzling spicy schezwan gravy with capsicum and chopped spring onions.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Spicy",
      ingredients: ["Schezwan Sauce", "Spring Onions", "Capsicum", "Steamed Momos"],
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80"
    },

    // --- Street Food & Chaat ---
    {
      id: "st-1",
      name: "Special Dausa Aloo Tikki Chaat",
      category: "Street Food & Chaat",
      description: "Golden griddle-crisped potato cutlet topped with spiced chole, sweetened beaten yoghurt, saunth and fresh mint chutney.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: true,
      badge: "Local Specialty",
      spiceLevel: "Medium",
      ingredients: ["Crispy Aloo Tikki", "Amritsari Chole", "Sweet Curd", "Tamarind Saunth", "Mint Chutney"],
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "st-2",
      name: "Crispy Sev Puri / Papdi Chaat",
      category: "Street Food & Chaat",
      description: "Crisp flour wafers layered with boiled potatoes, chickpeas, chilled curd, fine nylon sev and pomegranate pearls.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Crisp Papdi", "Boiled Potato & Chana", "Whipped Curd", "Nylon Sev"],
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "st-3",
      name: "Mumbai Pav Bhaji with Butter Pav",
      category: "Street Food & Chaat",
      description: "Slow-simmered spiced mixed vegetable mash tossed in generous Amul butter, served with soft toasted pavs, onion and lemon.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["Butter Bhaji", "Toasted Pav", "Diced Onions", "Lemon Wedge"],
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "st-4",
      name: "Delhi Style Chole Bhature Platter",
      category: "Street Food & Chaat",
      description: "Two puffed golden bhatures served with dark spiced Punjabi chole, pickled carrots, and green chillies.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["2 Fresh Bhature", "Spiced Punjabi Chole", "Pickled Salad"],
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },

    // --- Fast Food & Burgers ---
    {
      id: "ff-1",
      name: "Crispy Aloo Herb Supreme Burger",
      category: "Fast Food & Burgers",
      description: "Handcrafted spiced potato & green pea patty topped with sliced tomatoes, crunchy onions, and house burger sauce.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Herb Potato Patty", "Sesame Bun", "Crisp Lettuce", "Burger Sauce"],
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ff-2",
      name: "Spicy Paneer Tikka Burger",
      category: "Fast Food & Burgers",
      description: "Crispy seasoned cottage cheese steak layered with fresh lettuce, molten cheese slice, and tandoori aioli in toasted sesame buns.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["Paneer Steak", "Cheese Slice", "Tandoori Aioli", "Toasted Bun"],
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
    },

    // --- Pasta ---
    {
      id: "pa-1",
      name: "Creamy White Sauce Alfredo Pasta",
      category: "Pasta",
      description: "Penne pasta tossed in rich garlic parmesan cream sauce with sauteed bell peppers, sweet corn and Italian herbs.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: true,
      badge: "Chef's Special",
      spiceLevel: "Mild",
      ingredients: ["Penne Pasta", "Garlic Cream", "Parmesan & Mozzarella", "Sweet Corn", "Oregano"],
      image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pa-2",
      name: "Spicy Red Sauce Arrabbiata Pasta",
      category: "Pasta",
      description: "Penne tossed in slow-cooked san marzano tomato reduction with chilli flakes, basil, black olives, and cracked black pepper.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Spicy",
      ingredients: ["Tomato Reduction", "Chilli Flakes", "Black Olives", "Fresh Basil"],
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pa-3",
      name: "Pink Sauce Creamy Herb Pasta",
      category: "Pasta",
      description: "The ideal blend of rich tomato sauce and velvety cream, loaded with seasonal veggies and mozzarella cheese pull.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Tomato & Cream Blend", "Mozzarella Pull", "Mixed Peppers"],
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
    },

    // --- Chinese ---
    {
      id: "ch-1",
      name: "Desi Chilli Paneer (Dry / Gravy)",
      category: "Chinese",
      description: "Wok-tossed golden paneer cubes with crunchy bell peppers, onions, green chillies, and Indo-Chinese soya reduction.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Spicy",
      ingredients: ["Cottage Cheese Cubes", "Wok Tossed Capsicum", "Dark Soya", "Green Chillies"],
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ch-2",
      name: "Veg Hakka Chowmein Noodles",
      category: "Chinese",
      description: "Classic street-style stir-fried thin noodles with julienned cabbage, carrots, capsicum, spring onions, and fragrant aromatics.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Medium",
      ingredients: ["Thin Noodles", "Julienned Veggies", "Garlic & Spring Onions", "Wok Seasoning"],
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ch-3",
      name: "Vegetable Fried Rice",
      category: "Chinese",
      description: "Fragrant basmati rice stir-fried in a high-flame wok with fresh garden vegetables, light soy sauce, and white pepper.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Aromatic Basmati Rice", "Garden Veggies", "Light Soy", "Spring Onions"],
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ch-4",
      name: "Crispy Veg Manchurian Dry",
      category: "Chinese",
      description: "Golden fried vegetable dumplings tossed in garlic, ginger, chopped coriander, and spicy Indo-Chinese dark glaze.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Spicy",
      ingredients: ["Minced Veg Balls", "Dark Glaze", "Ginger-Garlic", "Spring Onion Greens"],
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80"
    },

    // --- North Indian & Rajasthani ---
    {
      id: "ni-1",
      name: "Paneer Butter Masala & Naan Platter",
      category: "North Indian",
      description: "Soft cottage cheese simmered in a luscious tomato cashew butter gravy, garnished with cream and served with freshly prepared tandoori breads.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Fresh Cottage Cheese", "Cashew Tomato Gravy", "Amul Butter", "Fresh Cream"],
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ni-2",
      name: "Slow-Cooked Dal Makhani",
      category: "North Indian",
      description: "Whole black lentils and kidney beans slow-cooked overnight with traditional butter and rich cream.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Black Urad Dal", "Kidney Beans", "Desi Butter", "Slow Simmered Spices"],
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "raj-1",
      name: "Traditional Dal Baati Churma",
      category: "Rajasthani",
      description: "Authentic Rajasthani delicacy featuring baked wheat baatis dipped in pure desi ghee, served with panchmel dal and sweet grain churma.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: true,
      badge: "Regional Specialty",
      spiceLevel: "Medium",
      ingredients: ["Baked Wheat Baatis", "Pure Desi Ghee", "Panchmel Dal", "Sweet Grain Churma", "Garlic Chutney"],
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },

    // --- Beverages & Shakes ---
    {
      id: "bev-1",
      name: "Rich Cold Coffee with Ice Cream",
      category: "Beverages & Shakes",
      description: "Thick brewed espresso blended with chilled milk, chocolate drizzle, and topped with a scoop of vanilla ice cream.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: true,
      badge: "Must Try",
      spiceLevel: "Mild",
      ingredients: ["Brewed Espresso", "Chilled Full Cream Milk", "Vanilla Ice Cream", "Chocolate Syrup"],
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "bev-2",
      name: "Steaming Kulhad Masala Chai",
      category: "Beverages & Shakes",
      description: "Aromatic slow-brewed Indian tea infused with crushed cardamom, ginger, cloves, and served steaming in traditional clay kulhad.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: true,
      badge: "Clay Kulhad",
      spiceLevel: "Mild",
      ingredients: ["Fresh Ginger", "Green Cardamom", "Tea Leaves", "Clay Kulhad"],
      image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "bev-3",
      name: "Thick Oreo Chocolate Shake",
      category: "Beverages & Shakes",
      description: "Crushed Oreo cookies blended with chocolate ice cream and rich creamy milk, topped with cookie crunch.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Oreo Cookies", "Chocolate Ice Cream", "Chilled Milk", "Whip Topping"],
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "bev-4",
      name: "Fresh Mint Mojito Mocktail",
      category: "Beverages & Shakes",
      description: "Muddled fresh mint leaves, zesty lemon wedges, chilled sparkling soda, and crushed ice.",
      price: null,
      priceDisplay: "₹ Price at cafe",
      isVeg: true,
      isFeatured: false,
      spiceLevel: "Mild",
      ingredients: ["Fresh Garden Mint", "Lemon Slices", "Sparkling Soda", "Crushed Ice"],
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      author: "Local Dausa Diner",
      rating: 4,
      date: "Google Review",
      content: "Nice rooftop seating area with a cool breeze in the evening. The street food and sandwiches were fresh. Good place to hang out with friends in Vinayak Nagar.",
      highlight: "Nice rooftop sitting area",
      source: "Google"
    },
    {
      id: "rev-2",
      author: "Verified Visitor",
      rating: 4,
      date: "Google Review",
      content: "Staff behaviour was polite and helpful. Good atmosphere for families on Sainthal Road. Outdoor seating is a big plus point.",
      highlight: "Courteous staff & family friendly",
      source: "Google"
    },
    {
      id: "rev-3",
      author: "Weekend Guest",
      rating: 3,
      date: "Google Review",
      content: "Ambiance is relaxing and prices are within reasonable range (around ₹250-₹350). Service can be a bit slower during peak dinner hours, but the tea and puffs were enjoyable.",
      highlight: "Relaxed ambiance & affordable",
      source: "Google"
    },
    {
      id: "rev-4",
      author: "Casual Patron",
      rating: 4,
      date: "Google Review",
      content: "Good spot for fast food and chaat in Dausa. Tried the vegetable puffs and cold coffee, both were satisfying. Decent parking space nearby.",
      highlight: "Tasty snacks & easy parking",
      source: "Google"
    },
    {
      id: "rev-5",
      author: "Local Resident",
      rating: 3,
      date: "Google Review",
      content: "Atmosphere is quite open and pleasant. Sometimes orders take time when it gets busy, but overall a decent cafe experience right here in Vinayak Nagar.",
      highlight: "Open sitting & local landmark",
      source: "Google"
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Rooftop & Outdoor Seating",
      category: "Ambience",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      alt: "Mannat Cafe outdoor and rooftop open seating area",
      caption: "Spacious outdoor dining setup in Vinayak Nagar, Dausa with gentle open evening breezes."
    },
    {
      id: "gal-2",
      title: "Fresh Baked Vegetable Puffs",
      category: "Food",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
      alt: "Golden crispy vegetable puffs served hot",
      caption: "Our renowned freshly baked Vegetable Puffs with seasoned potato masala."
    },
    {
      id: "gal-3",
      title: "Cafe Interior & Cozy Booths",
      category: "Interior",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      alt: "Warm wooden interior seating with soft lighting",
      caption: "Warm, welcoming indoor dining tables designed for casual conversations and family meals."
    },
    {
      id: "gal-4",
      title: "Sainthal Road Cafe Exterior",
      category: "Exterior",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      alt: "Front facade and approach on Sainthal Road",
      caption: "Conveniently accessible on Sainthal Road with drive-thru & takeaway parking space."
    },
    {
      id: "gal-5",
      title: "Artisanal Grilled Sandwiches",
      category: "Food",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80",
      alt: "Toasted club sandwich with melted cheese",
      caption: "Toasted to golden crunch with gourmet fillings and house dips."
    },
    {
      id: "gal-6",
      title: "Evening Ambience & Warm Lights",
      category: "Ambience",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
      alt: "Evening lights and relaxed cafe terrace vibe",
      caption: "Warm evening lighting making Mannat a favorite late-night spot until 11:00 PM."
    },
    {
      id: "gal-7",
      title: "Steamed Handmade Momos",
      category: "Food",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80",
      alt: "Steamed vegetable dumplings in basket with red chutney",
      caption: "Steaming hot vegetable momos paired with our spicy house garlic dip."
    },
    {
      id: "gal-8",
      title: "Chilled Shakes & Brewed Beverages",
      category: "Food",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80",
      alt: "Thick cold coffee with ice cream topping",
      caption: "Refreshing thick cold coffee and herbal teas served daily from 9:00 AM."
    }
  ]
};

/**
 * Utility to check if restaurant is open right now based on Indian Standard Time
 */
export function getRestaurantStatus(openTimeStr = "09:00", closeTimeStr = "23:00"): {
  isOpen: boolean;
  statusText: string;
  subText: string;
} {
  const now = new Date();
  
  // Calculate current minutes in the day
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const [openH, openM] = openTimeStr.split(":").map(Number);
  const [closeH, closeM] = closeTimeStr.split(":").map(Number);
  
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  
  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  
  if (isOpen) {
    return {
      isOpen: true,
      statusText: "Open Now",
      subText: `Closes at ${formatHour(closeH, closeM)}`
    };
  } else {
    return {
      isOpen: false,
      statusText: "Closed Now",
      subText: `Opens at ${formatHour(openH, openM)} tomorrow`
    };
  }
}

function formatHour(h: number, m: number): string {
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedH = h % 12 === 0 ? 12 : h % 12;
  const formattedM = m < 10 ? `0${m}` : m;
  return `${formattedH}:${formattedM} ${ampm}`;
}
