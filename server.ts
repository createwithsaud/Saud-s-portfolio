import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from 'better-sqlite3';

const db = new Database('portfolio.db');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS social_posts (
    id TEXT PRIMARY KEY,
    author_name TEXT,
    author_handle TEXT,
    author_avatar TEXT,
    content TEXT,
    image TEXT,
    timestamp TEXT,
    likes INTEGER,
    comments INTEGER,
    isLiked INTEGER
  );

  CREATE TABLE IF NOT EXISTS ecommerce_products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL,
    rating REAL,
    reviews INTEGER,
    image TEXT,
    category TEXT
  );
`);

// Seed initial data if empty
const postCount = db.prepare('SELECT COUNT(*) as count FROM social_posts').get() as { count: number };
if (postCount.count === 0) {
  const insertPost = db.prepare(`
    INSERT INTO social_posts (id, author_name, author_handle, author_avatar, content, image, timestamp, likes, comments, isLiked)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const initialPosts = [
    {
      id: '1',
      author: {
        name: 'Sarah Jenkins',
        handle: '@sarahj',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100',
      },
      content: 'Just deployed my new portfolio using React and Tailwind! The developer experience is absolutely incredible. 🚀✨',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&h=400',
      timestamp: '2h ago',
      likes: 248,
      comments: 42,
      isLiked: 0,
    },
    {
      id: '2',
      author: {
        name: 'Alex Chen',
        handle: '@alexc_dev',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100',
      },
      content: 'Anyone else finding that Framer Motion makes UI animations almost too easy? Building a new social app and the layout transitions are butter smooth.',
      image: null,
      timestamp: '4h ago',
      likes: 112,
      comments: 18,
      isLiked: 1,
    },
    {
      id: '3',
      author: {
        name: 'Elena Rodriguez',
        handle: '@elena_codes',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100',
      },
      content: 'Just finished a deep dive into WebGL and Three.js. The possibilities for 3D web experiences are blowing my mind right now. 🤯',
      image: null,
      timestamp: '6h ago',
      likes: 89,
      comments: 12,
      isLiked: 0,
    }
  ];

  initialPosts.forEach(p => {
    insertPost.run(p.id, p.author.name, p.author.handle, p.author.avatar, p.content, p.image, p.timestamp, p.likes, p.comments, p.isLiked);
  });
}

const productCount = db.prepare('SELECT COUNT(*) as count FROM ecommerce_products').get() as { count: number };
if (productCount.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO ecommerce_products (id, name, price, rating, reviews, image, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const initialProducts = [
    {
      id: 1,
      name: 'Minimalist Chronograph',
      price: 249.99,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600&h=600',
      category: 'Watches'
    },
    {
      id: 2,
      name: 'Premium Wireless Headphones',
      price: 349.00,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600&h=600',
      category: 'Audio'
    },
    {
      id: 3,
      name: 'Leather Messenger Bag',
      price: 189.50,
      rating: 4.7,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600&h=600',
      category: 'Accessories'
    },
    {
      id: 4,
      name: 'Smart Home Speaker',
      price: 129.99,
      rating: 4.5,
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=600&h=600',
      category: 'Electronics'
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      price: 159.00,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600&h=600',
      category: 'Electronics'
    },
    {
      id: 6,
      name: 'Ceramic Coffee Dripper',
      price: 45.00,
      rating: 4.6,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600&h=600',
      category: 'Home'
    }
  ];

  initialProducts.forEach(p => {
    insertProduct.run(p.id, p.name, p.price, p.rating, p.reviews, p.image, p.category);
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // --- Social Media API ---
  app.get("/api/social/posts", (req, res) => {
    const rows = db.prepare('SELECT * FROM social_posts ORDER BY id DESC').all() as any[];
    const posts = rows.map(row => ({
      id: row.id,
      author: {
        name: row.author_name,
        handle: row.author_handle,
        avatar: row.author_avatar,
      },
      content: row.content,
      image: row.image,
      timestamp: row.timestamp,
      likes: row.likes,
      comments: row.comments,
      isLiked: Boolean(row.isLiked),
    }));
    res.json(posts);
  });

  app.post("/api/social/posts", (req, res) => {
    const newPost = {
      id: Date.now().toString(),
      author: {
        name: 'Guest User',
        handle: '@guest',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100',
      },
      content: req.body.content,
      image: null,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: 0,
    };
    
    const insertPost = db.prepare(`
      INSERT INTO social_posts (id, author_name, author_handle, author_avatar, content, image, timestamp, likes, comments, isLiked)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertPost.run(
      newPost.id, 
      newPost.author.name, 
      newPost.author.handle, 
      newPost.author.avatar, 
      newPost.content, 
      newPost.image, 
      newPost.timestamp, 
      newPost.likes, 
      newPost.comments, 
      newPost.isLiked
    );
    
    res.json({ ...newPost, isLiked: false });
  });

  app.post("/api/social/posts/:id/like", (req, res) => {
    const post = db.prepare('SELECT * FROM social_posts WHERE id = ?').get(req.params.id) as any;
    
    if (post) {
      const newIsLiked = post.isLiked ? 0 : 1;
      const newLikes = post.likes + (newIsLiked ? 1 : -1);
      
      db.prepare('UPDATE social_posts SET isLiked = ?, likes = ? WHERE id = ?')
        .run(newIsLiked, newLikes, req.params.id);
        
      res.json({
        id: post.id,
        author: {
          name: post.author_name,
          handle: post.author_handle,
          avatar: post.author_avatar,
        },
        content: post.content,
        image: post.image,
        timestamp: post.timestamp,
        likes: newLikes,
        comments: post.comments,
        isLiked: Boolean(newIsLiked),
      });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  });

  // --- E-commerce API ---
  app.get("/api/ecommerce/products", (req, res) => {
    const products = db.prepare('SELECT * FROM ecommerce_products').all();
    res.json(products);
  });

  app.post("/api/ecommerce/checkout", (req, res) => {
    // In a real app, this would process payment and create an order
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid cart items" });
    }
    
    // Simulate processing delay
    setTimeout(() => {
      res.json({ success: true, message: "Order placed successfully", orderId: `ORD-${Date.now()}` });
    }, 1500);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
