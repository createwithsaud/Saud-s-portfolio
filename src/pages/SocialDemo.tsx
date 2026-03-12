import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Compass, Bell, Mail, User, Settings, Image as ImageIcon, Smile, Send, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Search, ArrowLeft, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

// Types
interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export default function SocialDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/social/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    
    try {
      const res = await fetch('/api/social/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPostContent })
      });
      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLike = async (postId: string) => {
    // Optimistic update
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));

    try {
      await fetch(`/api/social/posts/${postId}/like`, { method: 'POST' });
    } catch (err) {
      console.error(err);
      // Revert on error could be implemented here
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 flex justify-center">
      {/* Container */}
      <div className="w-full max-w-7xl flex relative">
        
        {/* Left Sidebar */}
        <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-white/5 p-6">
          <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>

          <Link to="/demo/social" className="flex items-center gap-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-10">
            <Instagram className="w-8 h-8 text-pink-500" />
            <span>InstaClone</span>
          </Link>
          
          <nav className="flex-1 space-y-2">
            {[
              { icon: <Home className="w-6 h-6" />, label: 'Home', active: true },
              { icon: <Compass className="w-6 h-6" />, label: 'Explore' },
              { icon: <Bell className="w-6 h-6" />, label: 'Notifications' },
              { icon: <Mail className="w-6 h-6" />, label: 'Messages' },
              { icon: <Bookmark className="w-6 h-6" />, label: 'Bookmarks' },
              { icon: <User className="w-6 h-6" />, label: 'Profile' },
              { icon: <Settings className="w-6 h-6" />, label: 'Settings' },
            ].map((item) => (
              <button key={item.label} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${item.active ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}`}>
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold shadow-lg shadow-emerald-500/25 transition-all mt-auto">
            Post
          </button>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 max-w-2xl border-r border-white/5 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Home</h1>
            <div className="md:hidden flex items-center gap-4">
               <Link to="/" className="text-zinc-400 hover:text-white">
                 <ArrowLeft className="w-5 h-5" />
               </Link>
               <Link to="/demo/social" className="flex items-center gap-2 text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                <Instagram className="w-6 h-6 text-pink-500" />
                <span>InstaClone</span>
              </Link>
            </div>
          </header>

          {/* Create Post */}
          <div className="p-6 border-b border-white/5 flex gap-4 bg-zinc-900/20">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" alt="You" className="w-12 h-12 rounded-full object-cover" loading="lazy" />
            <div className="flex-1">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's happening?"
                className="w-full bg-transparent border-none focus:ring-0 text-lg resize-none placeholder-zinc-500 text-zinc-200 min-h-[80px] outline-none"
              />
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <button className="p-2 hover:bg-emerald-500/10 rounded-full transition-colors"><ImageIcon className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-emerald-500/10 rounded-full transition-colors"><Smile className="w-5 h-5" /></button>
                </div>
                <button 
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className="px-6 py-2 bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 text-white rounded-full font-bold transition-colors flex items-center gap-2"
                >
                  Post <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="pb-20 md:pb-0 p-4 space-y-4 bg-zinc-950">
            {isLoading ? (
              <div className="text-center py-10 text-zinc-500">Loading posts...</div>
            ) : (
              <AnimatePresence>
                {posts.map((post) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-zinc-900/40 border border-white/5 rounded-3xl hover:border-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 truncate">
                            <span className="font-bold text-zinc-200 truncate hover:underline">{post.author.name}</span>
                            <span className="text-zinc-500 truncate">{post.author.handle}</span>
                            <span className="text-zinc-600">·</span>
                            <span className="text-zinc-500 shrink-0 hover:underline">{post.timestamp}</span>
                          </div>
                          <button className="text-zinc-500 hover:text-emerald-400 transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>
                        
                        <p className="text-zinc-300 mb-4 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                        
                        {post.image && (
                          <div className="rounded-2xl overflow-hidden mb-4 border border-white/5">
                            <img src={post.image} alt="Post attachment" className="w-full h-auto object-cover" loading="lazy" />
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-zinc-500 max-w-md">
                          <button className="flex items-center gap-2 hover:text-emerald-400 transition-colors group">
                            <div className="p-2 group-hover:bg-emerald-500/10 rounded-full transition-colors">
                              <MessageCircle className="w-5 h-5" />
                            </div>
                            <span className="text-sm">{post.comments}</span>
                          </button>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
                            className={`flex items-center gap-2 transition-colors group ${post.isLiked ? 'text-rose-500' : 'hover:text-rose-500'}`}
                          >
                            <div className={`p-2 rounded-full transition-colors ${post.isLiked ? 'bg-rose-500/10' : 'group-hover:bg-rose-500/10'}`}>
                              <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                            </div>
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          
                          <button className="flex items-center gap-2 hover:text-emerald-400 transition-colors group">
                            <div className="p-2 group-hover:bg-emerald-500/10 rounded-full transition-colors">
                              <Share2 className="w-5 h-5" />
                            </div>
                          </button>
                          
                          <button className="flex items-center gap-2 hover:text-emerald-400 transition-colors group">
                            <div className="p-2 group-hover:bg-emerald-500/10 rounded-full transition-colors">
                              <Bookmark className="w-5 h-5" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-80 h-screen sticky top-0 p-6">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search Echo" 
              className="w-full bg-zinc-900 border border-white/5 rounded-full py-3 pl-12 pr-4 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-5">Trending Now</h2>
            <div className="space-y-5">
              {[
                { topic: '#ReactJS', posts: '124K' },
                { topic: '#WebDevelopment', posts: '89K' },
                { topic: 'Tailwind CSS', posts: '45K' },
                { topic: 'Framer Motion', posts: '21K' },
              ].map((trend, i) => (
                <div key={i} className="cursor-pointer group">
                  <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider font-semibold">Trending in Tech</p>
                  <p className="font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">{trend.topic}</p>
                  <p className="text-sm text-zinc-500">{trend.posts} posts</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-5">Who to follow</h2>
            <div className="space-y-5">
              {[
                { name: 'Vercel', handle: '@vercel', avatar: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=100&h=100' },
                { name: 'React', handle: '@reactjs', avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=100&h=100' },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-bold text-sm text-zinc-200 hover:underline cursor-pointer">{user.name}</p>
                      <p className="text-sm text-zinc-500">{user.handle}</p>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-white text-zinc-900 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-md border-t border-white/5 flex items-center justify-around p-3 z-50">
          <button className="p-2 text-emerald-400"><Home className="w-6 h-6" /></button>
          <button className="p-2 text-zinc-400 hover:text-zinc-200"><Search className="w-6 h-6" /></button>
          <button className="p-2 text-zinc-400 hover:text-zinc-200"><Bell className="w-6 h-6" /></button>
          <button className="p-2 text-zinc-400 hover:text-zinc-200"><Mail className="w-6 h-6" /></button>
        </nav>
      </div>
    </div>
  );
}
